import { Request, Response, NextFunction } from 'express';
import { getAIResponse } from '../utils/aiService';
import { buildHealthPrompt, detectEmergency, SupportedLanguage } from '../utils/promptBuilder';
import ChatSession from '../models/ChatHistory';
import { createError } from '../middleware/errorHandler';

interface ChatRequest {
  message: string;
  language: SupportedLanguage;
  sessionId: string;
}

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, language = 'en', sessionId } = req.body as ChatRequest;

    if (!message?.trim()) {
      return next(createError('Message is required.', 400));
    }

    if (!sessionId?.trim()) {
      return next(createError('Session ID is required.', 400));
    }

    const validLanguages: SupportedLanguage[] = ['en', 'hi', 'kn'];
    if (!validLanguages.includes(language)) {
      return next(createError('Invalid language. Supported: en, hi, kn.', 400));
    }

    const trimmedMessage = message.trim().slice(0, 1000);
    const isEmergency = detectEmergency(trimmedMessage);

    // Build the AI prompt
    const prompt = buildHealthPrompt(trimmedMessage, language, isEmergency);

    // Get AI response
    const aiResponse = await getAIResponse(prompt);

    // Save to MongoDB
    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({ sessionId, language, messages: [] });
    }

    session.language = language;
    session.messages.push(
      { role: 'user', content: trimmedMessage, timestamp: new Date() },
      { role: 'assistant', content: aiResponse, timestamp: new Date() }
    );

    // Keep only last 50 messages per session to avoid bloat
    if (session.messages.length > 50) {
      session.messages = session.messages.slice(-50);
    }

    await session.save();

    res.json({
      success: true,
      response: aiResponse,
      isEmergency,
      sessionId,
      language,
    });
  } catch (error) {
    next(error);
  }
};
