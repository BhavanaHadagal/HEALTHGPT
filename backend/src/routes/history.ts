import { Router } from 'express';
import { getHistory, getAllSessions, clearHistory } from '../controllers/historyController';

const router = Router();

// GET /api/history?sessionId=xxx — Get all session summaries for a user
router.get('/', getAllSessions);

// GET /api/history/:sessionId — Get full chat history for a session
router.get('/:sessionId', getHistory);

// DELETE /api/history/:sessionId — Clear chat history for a session
router.delete('/:sessionId', clearHistory);

export default router;
