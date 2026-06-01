import { Router } from 'express';
import { sendMessage } from '../controllers/chatController';

const router = Router();

// POST /api/chat — Send a health query and get AI response
router.post('/', sendMessage);

export default router;
