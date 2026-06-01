import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Language, Message } from '../types';
import { useTranslation, Translations } from '../utils/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  sessionId: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Message;
  clearMessages: () => void;
  t: Translations;
  isApiConnected: boolean;
  setIsApiConnected: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SESSION_KEY = 'healthgpt_session_id';
const LANGUAGE_KEY = 'healthgpt_language';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    return saved && ['en', 'hi', 'kn'].includes(saved) ? saved : 'en';
  });

  const [sessionId] = useState<string>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem(SESSION_KEY, newId);
    return newId;
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isApiConnected, setIsApiConnected] = useState(true);

  const t = useTranslation(language);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>): Message => {
    const newMessage: Message = {
      ...msg,
      id: uuidv4(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Persist messages to sessionStorage for current session
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('healthgpt_messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const saved = sessionStorage.getItem('healthgpt_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Message[];
        setMessages(parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        sessionId,
        messages,
        setMessages,
        addMessage,
        clearMessages,
        t,
        isApiConnected,
        setIsApiConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
