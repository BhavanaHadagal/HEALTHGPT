import { Router } from 'express';
import { getNearbyHospitals } from '../controllers/hospitalController';

const router = Router();

// GET /api/hospitals?lat=12.9716&lng=77.5946&radius=10000
router.get('/', getNearbyHospitals);

export default router;
