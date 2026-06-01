import { Request, Response, NextFunction } from 'express';
import Reminder from '../models/Reminder';
import { createError } from '../middleware/errorHandler';

export const createReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId, medicineName, dosage, frequency, times, startDate, endDate, notes } =
      req.body;

    if (!sessionId || !medicineName || !dosage || !frequency || !times || !startDate) {
      return next(createError('Missing required fields.', 400));
    }

    const reminder = new Reminder({
      sessionId,
      medicineName: medicineName.trim(),
      dosage: dosage.trim(),
      frequency,
      times,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      notes: notes?.trim(),
      isActive: true,
    });

    await reminder.save();
    res.status(201).json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};

export const getReminders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return next(createError('Session ID is required.', 400));

    const reminders = await Reminder.find({ sessionId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, reminders });
  } catch (error) {
    next(error);
  }
};

export const toggleReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findById(id);
    if (!reminder) return next(createError('Reminder not found.', 404));

    reminder.isActive = !reminder.isActive;
    await reminder.save();

    res.json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findByIdAndDelete(id);
    if (!reminder) return next(createError('Reminder not found.', 404));

    res.json({ success: true, message: 'Reminder deleted.' });
  } catch (error) {
    next(error);
  }
};
