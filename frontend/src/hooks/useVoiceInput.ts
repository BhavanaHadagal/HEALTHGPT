import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';

// Web Speech API types (not in standard TS DOM lib for all configs)
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => void) | null;
}

interface ISpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): ISpeechRecognitionAlternative;
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface ISpeechRecognitionResultList {
  readonly length: number;
  item(index: number): ISpeechRecognitionResult;
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
  }
}

const LANGUAGE_CODES: Record<Language, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  kn: 'kn-IN',
};

export interface UseVoiceInputOptions {
  onFinalResult?: (text: string) => void;
}

export interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  status: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
}

export const useVoiceInput = (language: Language, options?: UseVoiceInputOptions): UseVoiceInputReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const accumulatedRef = useRef('');
  const shouldKeepListeningRef = useRef(false);
  const onFinalResultRef = useRef(options?.onFinalResult);
  onFinalResultRef.current = options?.onFinalResult;

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const createAndStart = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = LANGUAGE_CODES[language];
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('[Voice] Recognition started, lang:', LANGUAGE_CODES[language]);
        setIsListening(true);
        setError(null);
        setStatus('Listening… speak now');
      };

      recognition.onresult = (event: ISpeechRecognitionEvent) => {
        let finalText = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) {
          accumulatedRef.current += (accumulatedRef.current ? ' ' : '') + finalText;
          setStatus('Got it!');
        }

        setTranscript(accumulatedRef.current || interimText);
      };

      recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
        console.log('[Voice] Error:', event.error);
        if (event.error === 'no-speech') {
          setStatus('Tap mic and speak clearly…');
          return;
        }
        if (event.error === 'aborted') {
          return;
        }
        const messages: Record<string, string> = {
          'not-allowed': 'Microphone permission denied. Click the lock icon in the browser address bar and allow microphone.',
          'audio-capture': 'No microphone found. Please connect a microphone.',
          'network': 'Network error. Speech recognition requires internet.',
          'service-not-allowed': 'Voice service blocked. Try Chrome or Edge browser.',
        };
        setError(messages[event.error] || `Voice error: ${event.error}`);
        shouldKeepListeningRef.current = false;
        setIsListening(false);
        setStatus('');
      };

      recognition.onend = () => {
        console.log('[Voice] Recognition ended. Accumulated:', accumulatedRef.current || '(none)');
        recognitionRef.current = null;

        if (accumulatedRef.current.trim()) {
          // Got speech — fire callback and stop
          shouldKeepListeningRef.current = false;
          setIsListening(false);
          setStatus('');
          onFinalResultRef.current?.(accumulatedRef.current.trim());
        } else if (shouldKeepListeningRef.current) {
          // No speech captured — restart once more
          setStatus('Speak clearly into your microphone…');
          setTimeout(() => {
            if (shouldKeepListeningRef.current) {
              createAndStart();
            }
          }, 300);
        } else {
          setIsListening(false);
          setStatus('');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setError('Could not start voice input. Please try again.');
      shouldKeepListeningRef.current = false;
      setIsListening(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, isSupported]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Voice input is not supported. Please use Chrome or Edge browser.');
      return;
    }
    accumulatedRef.current = '';
    shouldKeepListeningRef.current = true;
    setTranscript('');
    setError(null);
    createAndStart();
  }, [isSupported, createAndStart]);

  const stopListening = useCallback(() => {
    shouldKeepListeningRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setStatus('');

    // If user manually stops with accumulated text, still send it
    if (accumulatedRef.current.trim()) {
      onFinalResultRef.current?.(accumulatedRef.current.trim());
      accumulatedRef.current = '';
    }
  }, []);

  const resetTranscript = useCallback(() => {
    accumulatedRef.current = '';
    setTranscript('');
    setError(null);
    setStatus('');
  }, []);

  // Stop if language changes while listening
  useEffect(() => {
    if (isListening) {
      stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      shouldKeepListeningRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    status,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
  };
};
