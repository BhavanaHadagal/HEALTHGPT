import { Router } from 'express';
import {
  createReminder,
  getReminders,
  toggleReminder,
  deleteReminder,
} from '../controllers/reminderController';

const router = Router();

// POST /api/reminders — Create a new medicine reminder
router.post('/', createReminder);

// GET /api/reminders/:sessionId — Get all reminders for a user
router.get('/:sessionId', getReminders);

// PUT /api/reminders/:id/toggle — Toggle active/inactive
router.put('/:id/toggle', toggleReminder);

// DELETE /api/reminders/:id — Delete a reminder
router.delete('/:id', deleteReminder);

export default router;
