import axios from 'axios';
import { Language, ChatApiResponse, RemindersApiResponse, Reminder, CreateReminderPayload } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Chat API
export const sendChatMessage = async (
  message: string,
  language: Language,
  sessionId: string
): Promise<ChatApiResponse> => {
  const { data } = await api.post<ChatApiResponse>('/chat', {
    message,
    language,
    sessionId,
  });
  return data;
};

// History API
export const getChatHistory = async (sessionId: string) => {
  const { data } = await api.get(`/history/${sessionId}`);
  return data;
};

export const getAllChatSessions = async (sessionId: string) => {
  const { data } = await api.get(`/history?sessionId=${sessionId}`);
  return data;
};

export const clearChatHistory = async (sessionId: string) => {
  const { data } = await api.delete(`/history/${sessionId}`);
  return data;
};

// Reminders API
export const getReminders = async (sessionId: string): Promise<RemindersApiResponse> => {
  const { data } = await api.get<RemindersApiResponse>(`/reminders/${sessionId}`);
  return data;
};

export const createReminder = async (payload: CreateReminderPayload): Promise<{ success: boolean; reminder: Reminder }> => {
  const { data } = await api.post('/reminders', payload);
  return data;
};

export const toggleReminder = async (id: string): Promise<{ success: boolean; reminder: Reminder }> => {
  const { data } = await api.put(`/reminders/${id}/toggle`);
  return data;
};

export const deleteReminder = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.delete(`/reminders/${id}`);
  return data;
};

// Hospitals API
export const getNearbyHospitals = async (
  lat: number,
  lng: number,
  radius = 10000
): Promise<{ success: boolean; hospitals: import('../types').NearbyHospital[]; total: number; source: string }> => {
  const { data } = await api.get(`/hospitals?lat=${lat}&lng=${lng}&radius=${radius}`);
  return data;
};

// Health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch {
    return false;
  }
};
