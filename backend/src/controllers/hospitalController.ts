import { Request, Response, NextFunction } from 'express';
import { createError } from '../middleware/errorHandler';

interface OverpassElement {
  id: number;
  type: 'node' | 'way' | 'relation';
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface HospitalResult {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'phc' | 'chc';
  distance?: string;
  address: string;
  phone?: string;
  isOpen?: boolean;
  lat?: number;
  lng?: number;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
};

const buildAddress = (tags: Record<string, string>): string => {
  const parts = [
    tags['addr:housename'],
    tags['addr:housenumber'] && tags['addr:street']
      ? `${tags['addr:housenumber']} ${tags['addr:street']}`
      : tags['addr:street'],
    tags['addr:suburb'] || tags['addr:village'] || tags['addr:town'],
    tags['addr:city'] || tags['addr:district'],
    tags['addr:state'],
  ].filter(Boolean);

  if (parts.length > 0) return parts.join(', ');
  if (tags['addr:full']) return tags['addr:full'];
  return tags['operator'] ? `${tags['operator']}` : 'Address not available';
};

const mapAmenityToType = (amenity: string): HospitalResult['type'] => {
  switch (amenity) {
    case 'hospital': return 'hospital';
    case 'pharmacy': return 'pharmacy';
    case 'health_post': return 'phc';
    case 'community_health_centre': return 'chc';
    default: return 'clinic';
  }
};

export const getNearbyHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { lat, lng, radius = '10000' } = req.query as Record<string, string>;

  if (!lat || !lng) return next(createError('lat and lng query parameters are required.', 400));

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const searchRadius = Math.min(parseInt(radius), 20000); // max 20km

  if (isNaN(userLat) || isNaN(userLng)) {
    return next(createError('Invalid lat/lng values.', 400));
  }

  // Overpass QL query — fetch healthcare amenities near the user
  const overpassQuery = `[out:json][timeout:30];(node["amenity"~"^(hospital|clinic|pharmacy|doctors|health_post|community_health_centre|dentist)$"](around:${searchRadius},${userLat},${userLng});way["amenity"~"^(hospital|clinic|pharmacy|doctors|health_post|community_health_centre)$"](around:${searchRadius},${userLat},${userLng});relation["amenity"~"^(hospital|clinic)$"](around:${searchRadius},${userLat},${userLng}););out center tags;`;

  // Overpass API mirror endpoints to try in order
  const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  ];

  const fetchFromOverpass = async (): Promise<{ elements: OverpassElement[] }> => {
    for (const endpoint of OVERPASS_ENDPOINTS) {
      try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 25000);
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'User-Agent': 'HealthGPT-RuralHealth/1.0 (healthcare assistant for rural India)',
          },
          body: `data=${encodeURIComponent(overpassQuery)}`,
          signal: ctrl.signal,
        });
        clearTimeout(tid);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json() as { elements: OverpassElement[] };
        console.log(`[Hospitals] Overpass success via ${endpoint}`);
        return json;
      } catch (err) {
        console.warn(`[Hospitals] Endpoint ${endpoint} failed:`, (err as Error).message);
      }
    }
    throw new Error('All Overpass API endpoints failed. Please try again later.');
  };

  try {
    const data = await fetchFromOverpass();
    const elements: OverpassElement[] = data.elements || [];

    const hospitals: HospitalResult[] = elements
      .filter((el) => el.tags?.name && el.tags?.amenity)
      .map((el) => {
        const elLat = el.lat ?? el.center?.lat;
        const elLng = el.lon ?? el.center?.lon;
        const tags = el.tags!;

        const distance =
          elLat != null && elLng != null
            ? calculateDistance(userLat, userLng, elLat, elLng)
            : undefined;

        const phone =
          tags['phone'] ||
          tags['contact:phone'] ||
          tags['contact:mobile'] ||
          tags['mobile'];

        return {
          id: String(el.id),
          name: tags['name'],
          type: mapAmenityToType(tags['amenity']),
          distance: distance != null ? String(distance) : undefined,
          address: buildAddress(tags),
          phone: phone?.replace(/\s+/g, '').replace(/^0/, '+91') || undefined,
          lat: elLat,
          lng: elLng,
        };
      })
      .sort((a, b) => {
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return parseFloat(a.distance) - parseFloat(b.distance);
      })
      .slice(0, 30);

    console.log(`[Hospitals] Found ${hospitals.length} facilities within ${searchRadius}m of (${userLat}, ${userLng})`);

    res.json({
      success: true,
      hospitals,
      total: hospitals.length,
      source: 'OpenStreetMap',
      searchRadius,
    });
  } catch (error) {
    const err = error as Error;
    console.error('[Hospitals] Error:', err.message);
    next(createError(`Unable to fetch nearby hospitals: ${err.message}`, 502));
  }
};
