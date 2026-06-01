import { useState } from 'react';
import { MapPin, Phone, Navigation, Search, RefreshCw, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NearbyHospital } from '../types';
import { getNearbyHospitals } from '../utils/api';

type FacilityType = 'all' | 'hospital' | 'clinic' | 'pharmacy' | 'phc';

const FACILITY_EMOJI: Record<string, string> = {
  hospital: '🏥',
  clinic: '🏨',
  pharmacy: '💊',
  phc: '🏘️',
  chc: '🏛️',
};

export default function HospitalFinderPage() {
  const { t, language } = useApp();
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
  const [selectedType, setSelectedType] = useState<FacilityType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchRadius, setSearchRadius] = useState(10000);
  const [dataSource, setDataSource] = useState('');

  const fetchHospitals = (lat: number, lng: number, radius: number) => {
    setLocationStatus('loading');
    setHospitals([]);

    getNearbyHospitals(lat, lng, radius)
      .then((data) => {
        setHospitals(data.hospitals || []);
        setDataSource(data.source || 'OpenStreetMap');
        setLocationStatus('success');
      })
      .catch((err) => {
        console.error('Hospital fetch error:', err);
        setErrorMsg(
          language === 'hi'
            ? 'अस्पताल खोजने में समस्या हुई। फिर कोशिश करें।'
            : language === 'kn'
            ? 'ಆಸ್ಪತ್ರೆ ಹುಡುಕುವಾಗ ದೋಷ ಆಯಿತು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
            : 'Could not fetch hospitals. Please try again.'
        );
        setLocationStatus('error');
      });
  };

  const handleFindHospitals = () => {
    setErrorMsg('');
    if (!navigator.geolocation) {
      setErrorMsg(t.hospitalPermissionDenied);
      setLocationStatus('error');
      return;
    }

    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setUserLocation({ lat, lng });
        fetchHospitals(lat, lng, searchRadius);
      },
      () => {
        setErrorMsg(t.hospitalPermissionDenied);
        setLocationStatus('error');
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  const handleExpandSearch = () => {
    if (!userLocation) return;
    const newRadius = searchRadius + 5000;
    setSearchRadius(newRadius);
    fetchHospitals(userLocation.lat, userLocation.lng, newRadius);
  };

  const openDirections = (hospital: NearbyHospital) => {
    if (hospital.lat && hospital.lng) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`,
        '_blank'
      );
    } else if (userLocation) {
      window.open(
        `https://www.google.com/maps/search/${encodeURIComponent(hospital.name)}/@${userLocation.lat},${userLocation.lng},14z`,
        '_blank'
      );
    }
  };

  const filteredHospitals = hospitals.filter((h) => {
    const matchesType =
      selectedType === 'all' ||
      h.type === selectedType ||
      (selectedType === 'phc' && (h.type === 'phc' || h.type === 'chc'));
    const matchesSearch =
      searchQuery === '' ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filterTabs: { key: FacilityType; label: string }[] = [
    { key: 'all', label: language === 'hi' ? 'सभी' : language === 'kn' ? 'ಎಲ್ಲಾ' : 'All' },
    { key: 'hospital', label: language === 'hi' ? 'अस्पताल' : language === 'kn' ? 'ಆಸ್ಪತ್ರೆ' : 'Hospital' },
    { key: 'phc', label: 'PHC/CHC' },
    { key: 'clinic', label: language === 'hi' ? 'क्लीनिक' : language === 'kn' ? 'ಕ್ಲಿನಿಕ್' : 'Clinic' },
    { key: 'pharmacy', label: language === 'hi' ? 'दवाखाना' : language === 'kn' ? 'ಔಷಧಾಲಯ' : 'Pharmacy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.hospitalTitle}</h1>
              <p className="text-sm text-gray-500">{t.hospitalSubtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5">

        {/* Idle — location request */}
        {locationStatus === 'idle' && (
          <div className="card text-center py-12">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MapPin size={36} className="text-green-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-2">
              {language === 'hi' ? 'अपना स्थान साझा करें' : language === 'kn' ? 'ನಿಮ್ಮ ಸ್ಥಳ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Your Location'}
            </h2>
            <p className="text-gray-500 text-sm mb-2 max-w-sm mx-auto">
              {language === 'hi'
                ? 'नजदीकी अस्पताल, क्लीनिक, PHC और दवाखाना खोजने के लिए लोकेशन परमिशन दें।'
                : language === 'kn'
                ? 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ, ಕ್ಲಿನಿಕ್, PHC ಮತ್ತು ಔಷಧಾಲಯ ಹುಡುಕಲು ಸ್ಥಳ ಅನುಮತಿ ನೀಡಿ.'
                : 'Allow location access to find real nearby hospitals, clinics, PHCs and pharmacies.'}
            </p>
            <p className="text-xs text-gray-400 mb-6">
              {language === 'hi' ? 'डेटा: OpenStreetMap (मुफ़्त, कोई API key नहीं)' : language === 'kn' ? 'ಡೇಟಾ: OpenStreetMap' : 'Powered by OpenStreetMap — free & no API key needed'}
            </p>

            {/* Radius selector */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-sm text-gray-600">
                {language === 'hi' ? 'खोज दायरा:' : language === 'kn' ? 'ಹುಡುಕಾಟ ವ್ಯಾಪ್ತಿ:' : 'Search radius:'}
              </span>
              {[5000, 10000, 15000].map((r) => (
                <button
                  key={r}
                  onClick={() => setSearchRadius(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    searchRadius === r
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r / 1000} km
                </button>
              ))}
            </div>

            <button onClick={handleFindHospitals} className="btn-primary mx-auto w-auto">
              <Navigation size={18} />
              {t.hospitalFindNearby}
            </button>
          </div>
        )}

        {/* Loading */}
        {locationStatus === 'loading' && (
          <div className="card text-center py-14">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-700 font-semibold">{t.hospitalLoading}</p>
            <p className="text-gray-400 text-xs mt-2">
              {language === 'hi'
                ? `${searchRadius / 1000} किमी के दायरे में खोज रहे हैं...`
                : language === 'kn'
                ? `${searchRadius / 1000} ಕಿ.ಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಹುಡುಕುತ್ತಿದೆ...`
                : `Searching within ${searchRadius / 1000} km radius...`}
            </p>
            {userLocation && (
              <p className="text-xs text-gray-300 mt-1">
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </p>
            )}
          </div>
        )}

        {/* Error */}
        {locationStatus === 'error' && (
          <div className="card text-center py-10">
            <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">{errorMsg || t.hospitalPermissionDenied}</p>
            <p className="text-gray-400 text-xs mb-5">
              {language === 'hi'
                ? 'ब्राउज़र सेटिंग में लोकेशन चालू करें'
                : language === 'kn'
                ? 'ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ನಲ್ಲಿ ಸ್ಥಳ ಸಕ್ರಿಯಗೊಳಿಸಿ'
                : 'Enable location in browser settings and try again'}
            </p>
            <button onClick={handleFindHospitals} className="btn-secondary mx-auto">
              <RefreshCw size={16} />
              {t.retry}
            </button>
          </div>
        )}

        {/* Results */}
        {locationStatus === 'success' && (
          <>
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-green text-xs">
                  {filteredHospitals.length} {language === 'hi' ? 'परिणाम' : language === 'kn' ? 'ಫಲಿತಾಂಶಗಳು' : 'results'}
                </span>
                {dataSource && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    📍 {dataSource} • {searchRadius / 1000} km
                  </span>
                )}
              </div>
              <button
                onClick={() => setLocationStatus('idle')}
                className="text-xs text-primary-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} />
                {language === 'hi' ? 'दोबारा खोजें' : language === 'kn' ? 'ಮತ್ತೆ ಹುಡುಕಿ' : 'Search again'}
              </button>
            </div>

            {/* Search + filter */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'नाम या पता खोजें...' : language === 'kn' ? 'ಹೆಸರು ಅಥವಾ ವಿಳಾಸ ಹುಡುಕಿ...' : 'Search by name or address...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-9"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedType(tab.key)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === tab.key
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital cards */}
            {filteredHospitals.length === 0 ? (
              <div className="card text-center py-10">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-600 font-medium mb-1">{t.hospitalNoResults}</p>
                <p className="text-gray-400 text-sm mb-4">
                  {language === 'hi' ? 'दायरा बढ़ाकर देखें' : language === 'kn' ? 'ವ್ಯಾಪ್ತಿ ಹೆಚ್ಚಿಸಿ' : 'Try expanding the search radius'}
                </p>
                <button onClick={handleExpandSearch} className="btn-secondary mx-auto">
                  <Navigation size={16} />
                  {language === 'hi' ? `${(searchRadius + 5000) / 1000} किमी तक खोजें` : language === 'kn' ? `${(searchRadius + 5000) / 1000} ಕಿ.ಮೀ ವರೆಗೆ ಹುಡುಕಿ` : `Expand to ${(searchRadius + 5000) / 1000} km`}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHospitals.map((hospital) => (
                  <div key={hospital.id} className="card hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                        {FACILITY_EMOJI[hospital.type] || '🏥'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{hospital.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{hospital.address}</p>

                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          {hospital.distance && (
                            <span className="flex items-center gap-1 text-xs font-medium text-primary-600">
                              <Navigation size={11} />
                              {hospital.distance} {t.hospitalDistance}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-gray-400 capitalize">
                            <Clock size={11} />
                            {FACILITY_EMOJI[hospital.type]} {hospital.type === 'phc' ? 'PHC' : hospital.type === 'chc' ? 'CHC' : hospital.type.charAt(0).toUpperCase() + hospital.type.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        {hospital.phone && (
                          <a
                            href={`tel:${hospital.phone}`}
                            className="flex items-center gap-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                          >
                            <Phone size={13} />
                            <span className="hidden sm:inline">{t.hospitalCall}</span>
                          </a>
                        )}
                        <button
                          onClick={() => openDirections(hospital)}
                          className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                          title="Open in Google Maps"
                        >
                          <ExternalLink size={13} />
                          <span className="hidden sm:inline">
                            {language === 'hi' ? 'नक्शा' : language === 'kn' ? 'ನಕ್ಷೆ' : 'Maps'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load more / expand */}
                <div className="text-center pt-2">
                  <button onClick={handleExpandSearch} className="btn-secondary mx-auto text-sm">
                    <Navigation size={15} />
                    {language === 'hi'
                      ? `और खोजें — ${(searchRadius + 5000) / 1000} किमी तक`
                      : language === 'kn'
                      ? `ಇನ್ನಷ್ಟು ಹುಡುಕಿ — ${(searchRadius + 5000) / 1000} ಕಿ.ಮೀ`
                      : `Search wider — up to ${(searchRadius + 5000) / 1000} km`}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* OSM attribution (required) */}
        <p className="text-xs text-gray-300 text-center mt-6">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">OpenStreetMap</a> contributors
        </p>
      </div>
    </div>
  );
}
