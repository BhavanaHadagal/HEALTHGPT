import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Plus, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { sendChatMessage } from '../utils/api';
import ChatMessage from '../components/ChatMessage';
import { ChatTypingIndicator } from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import LanguageSelector from '../components/LanguageSelector';
import EmergencyBanner from '../components/EmergencyBanner';

export default function ChatPage() {
  const { t, language, sessionId, messages, addMessage, clearMessages, isApiConnected, setIsApiConnected } = useApp();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: voiceSupported,
    error: voiceError,
  } = useVoiceInput(language);

  // Auto-fill input from voice transcript
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    resetTranscript();
    setError(null);
    setShowEmergency(false);

    addMessage({ role: 'user', content: trimmed });
    setIsLoading(true);

    try {
      const result = await sendChatMessage(trimmed, language, sessionId);
      setIsApiConnected(true);

      if (result.isEmergency) setShowEmergency(true);

      addMessage({
        role: 'assistant',
        content: result.response,
        isEmergency: result.isEmergency,
      });
    } catch (err) {
      console.error('Chat error:', err);
      setIsApiConnected(false);
      setError(t.error);
      addMessage({
        role: 'assistant',
        content: `⚠️ ${t.error} Please check your connection and try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, language, sessionId, addMessage, resetTranscript, setIsApiConnected, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleNewChat = () => {
    clearMessages();
    setShowEmergency(false);
    setError(null);
    setInput('');
    resetTranscript();
  };

  // Suggested prompts per language
  const suggestions: Record<string, string[]> = {
    en: ['I have a fever and headache', 'My stomach is hurting', 'I have a cough for 3 days', 'I feel very weak'],
    hi: ['मुझे बुखार और सिरदर्द है', 'पेट में दर्द हो रहा है', 'मुझे 3 दिनों से खांसी है', 'मैं बहुत कमजोर महसूस कर रहा हूं'],
    kn: ['ನನಗೆ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ', 'ಹೊಟ್ಟೆ ನೋವು ಆಗುತ್ತಿದೆ', 'ನನಗೆ 3 ದಿನದಿಂದ ಕೆಮ್ಮು ಇದೆ', 'ತುಂಬಾ ದಣಿದ ಭಾವನೆ'],
  };

  const currentSuggestions = suggestions[language] || suggestions.en;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Emergency banner */}
      {showEmergency && <EmergencyBanner />}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-gray-900 text-base md:text-lg">{t.chatTitle}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              {isApiConnected ? (
                <span className="flex items-center gap-1 text-xs text-primary-600">
                  <Wifi size={10} /> AI Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <WifiOff size={10} /> Disconnected
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector variant="tabs" className="hidden sm:flex" />
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
              title={t.chatNewChat}
            >
              <Plus size={14} />
              <span className="hidden sm:inline">{t.chatNewChat}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile language selector */}
      <div className="sm:hidden bg-white border-b border-gray-100 px-4 py-2">
        <div className="max-w-3xl mx-auto">
          <LanguageSelector variant="tabs" />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-3xl flex items-center justify-center mb-4">
                <span className="text-3xl">🩺</span>
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-1">HealthGPT</h2>
              <p className="text-gray-500 text-sm max-w-xs mb-6">
                {language === 'hi'
                  ? 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। कोई भी स्वास्थ्य सवाल पूछें।'
                  : language === 'kn'
                  ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ. ಯಾವುದೇ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
                  : 'Hello! I am your health assistant. Ask me any health question.'}
              </p>

              {/* Suggested prompts */}
              <div className="w-full max-w-sm space-y-2">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                  Try asking:
                </p>
                {currentSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="w-full text-left text-sm bg-white border border-gray-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl px-4 py-3 text-gray-700 transition-colors"
                  >
                    💬 {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <ChatTypingIndicator />}
            </>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="text-red-500 text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600 text-xs"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Safety disclaimer */}
      <SafetyDisclaimer variant="banner" />

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {/* Voice error */}
          {voiceError && (
            <p className="text-xs text-amber-600 mb-2 text-center">{voiceError}</p>
          )}

          {/* Listening indicator */}
          {isListening && (
            <div className="flex items-center justify-center gap-2 mb-2 py-1.5 bg-red-50 rounded-lg border border-red-100">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-sm text-red-600 font-medium">{t.chatListening}</p>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Voice button */}
            {voiceSupported && (
              <button
                onClick={handleVoiceToggle}
                style={{ height: '44px', minHeight: '44px' }}
                className={`flex-shrink-0 w-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? 'bg-red-500 text-white voice-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? t.chatVoiceStop : t.chatVoice}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            )}

            {/* Text input */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatPlaceholder}
                rows={1}
                disabled={isLoading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all disabled:opacity-50 block"
                style={{ minHeight: '44px', maxHeight: '160px', lineHeight: '1.5', paddingTop: '11px', paddingBottom: '11px' }}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{ height: '44px', minHeight: '44px' }}
              className="flex-shrink-0 w-11 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
              title={t.chatSend}
            >
              <Send size={18} />
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
