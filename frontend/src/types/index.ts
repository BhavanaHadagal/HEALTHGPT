export type Language = 'en' | 'hi' | 'kn';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isEmergency?: boolean;
}

export interface ChatSession {
  sessionId: string;
  language: Language;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  messageCount?: number;
  firstMessage?: string;
  lastMessage?: string;
}

export interface Reminder {
  _id: string;
  sessionId: string;
  medicineName: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'thrice' | 'custom';
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateReminderPayload {
  sessionId: string;
  medicineName: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'thrice' | 'custom';
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface ChatApiResponse {
  success: boolean;
  response: string;
  isEmergency: boolean;
  sessionId: string;
  language: Language;
}

export interface HistoryApiResponse {
  success: boolean;
  sessions: ChatSession[];
}

export interface RemindersApiResponse {
  success: boolean;
  reminders: Reminder[];
}

export interface NearbyHospital {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'chc' | 'phc';
  distance?: string;
  address: string;
  phone?: string;
  isOpen?: boolean;
  lat?: number;
  lng?: number;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  icon: string;
}
