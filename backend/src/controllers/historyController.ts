import { Request, Response, NextFunction } from 'express';
import ChatSession from '../models/ChatHistory';
import { createError } from '../middleware/errorHandler';

export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return next(createError('Session ID is required.', 400));

    const session = await ChatSession.findOne({ sessionId })
      .select('sessionId language messages createdAt updatedAt')
      .lean();

    if (!session) {
      res.json({ success: true, session: null, messages: [] });
      return;
    }

    res.json({ success: true, session, messages: session.messages });
  } catch (error) {
    next(error);
  }
};

export const getAllSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.query as { sessionId?: string };
    if (!sessionId) return next(createError('Session ID is required.', 400));

    // Return session summaries — first and last message snippet
    const sessions = await ChatSession.find({ sessionId })
      .sort({ updatedAt: -1 })
      .limit(20)
      .select('sessionId language createdAt updatedAt messages')
      .lean();

    const summaries = sessions.map((s) => ({
      sessionId: s.sessionId,
      language: s.language,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      messageCount: s.messages.length,
      firstMessage: s.messages[0]?.content?.slice(0, 80) || '',
      lastMessage: s.messages[s.messages.length - 1]?.content?.slice(0, 80) || '',
    }));

    res.json({ success: true, sessions: summaries });
  } catch (error) {
    next(error);
  }
};

export const clearHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return next(createError('Session ID is required.', 400));

    await ChatSession.deleteMany({ sessionId });
    res.json({ success: true, message: 'Chat history cleared.' });
  } catch (error) {
    next(error);
  }
};
