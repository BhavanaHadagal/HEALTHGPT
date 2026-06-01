import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, MessageCircle, Trash2, Clock, Globe, Search, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatSession } from '../types';
import { getAllChatSessions, getChatHistory, clearChatHistory } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const LANGUAGE_LABELS: Record<string, string> = {
  en: '🇬🇧 English',
  hi: '🇮🇳 हिंदी',
  kn: '🇮🇳 ಕನ್ನಡ',
};

const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export default function HealthHistoryPage() {
  const { t, sessionId, language, setMessages, clearMessages } = useApp();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      const data = await getAllChatSessions(sessionId);
      setSessions(data.sessions || []);
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, t.error]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleViewSession = async (sess: ChatSession) => {
    setIsLoadingSession(true);
    try {
      const data = await getChatHistory(sess.sessionId);
      setSelectedSession({ ...sess, messages: data.messages || [] });
    } catch {
      setError(t.error);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleLoadIntoChat = (sess: ChatSession) => {
    if (!sess.messages) return;
    clearMessages();
    setMessages(
      sess.messages.map((m, idx) => ({
        ...m,
        id: `${sess.sessionId}-${idx}`,
        timestamp: new Date(m.timestamp),
      }))
    );
    navigate('/chat');
  };

  const handleClearHistory = async () => {
    try {
      await clearChatHistory(sessionId);
      setSessions([]);
      clearMessages();
      setShowClearConfirm(false);
    } catch {
      setError(t.error);
    }
  };

  const filteredSessions = sessions.filter(
    (s) =>
      searchQuery === '' ||
      s.firstMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
              <History size={20} className="text-teal-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.historyTitle}</h1>
              <p className="text-sm text-gray-500">{t.historySubtitle}</p>
            </div>
          </div>

          {sessions.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">{t.historyClear}</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-red-600">{error}</p>
            <button onClick={() => setError(null)}><X size={16} className="text-red-400" /></button>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner message={t.loading} />
        ) : sessions.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-600 mb-6">{t.historyNoHistory}</p>
            <button onClick={() => navigate('/chat')} className="btn-primary mx-auto">
              <MessageCircle size={16} />
              {t.navChat}
            </button>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'hi' ? 'इतिहास खोजें...' : language === 'kn' ? 'ಇತಿಹಾಸ ಹುಡುಕಿ...' : 'Search history...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9"
              />
            </div>

            {/* Sessions list */}
            <div className="space-y-3">
              {filteredSessions.map((sess) => (
                <div key={sess.sessionId} className="card hover:shadow-md transition-shadow group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                      <MessageCircle size={18} className="text-teal-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Globe size={12} />
                          {LANGUAGE_LABELS[sess.language] || sess.language}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          {formatDate(sess.updatedAt)}
                        </span>
                        <span className="badge bg-gray-100 text-gray-600 text-xs">
                          {sess.messageCount} {t.historyMessages}
                        </span>
                      </div>

                      {sess.firstMessage && (
                        <p className="text-sm text-gray-800 font-medium truncate">
                          💬 {sess.firstMessage}
                          {(sess.firstMessage?.length || 0) >= 80 ? '...' : ''}
                        </p>
                      )}
                      {sess.lastMessage && sess.lastMessage !== sess.firstMessage && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          🤖 {sess.lastMessage}
                          {(sess.lastMessage?.length || 0) >= 80 ? '...' : ''}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleViewSession(sess)}
                        className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        {t.historyViewChat}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Session detail modal */}
      {(selectedSession || isLoadingSession) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="font-bold text-gray-900">
                {language === 'hi' ? 'बातचीत का विवरण' : language === 'kn' ? 'ಸಂಭಾಷಣೆ ವಿವರ' : 'Chat Detail'}
              </h2>
              <div className="flex gap-2">
                {selectedSession && (
                  <button
                    onClick={() => handleLoadIntoChat(selectedSession)}
                    className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold hover:bg-primary-100 transition-colors"
                  >
                    {language === 'hi' ? 'चैट में खोलें' : language === 'kn' ? 'ಚಾಟ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ' : 'Open in Chat'}
                  </button>
                )}
                <button onClick={() => setSelectedSession(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {isLoadingSession ? (
                <LoadingSpinner message={t.loading} />
              ) : selectedSession?.messages && selectedSession.messages.length > 0 ? (
                selectedSession.messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-8">{t.historyNoHistory}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clear confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <AlertTriangle size={36} className="text-amber-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              {language === 'hi' ? 'सारा इतिहास मिटाएं?' : language === 'kn' ? 'ಎಲ್ಲ ಇತಿಹಾಸ ಅಳಿಸಬೇಕೇ?' : 'Clear all history?'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {language === 'hi' ? 'सभी चैट हटा दिए जाएंगे।' : language === 'kn' ? 'ಎಲ್ಲ ಚಾಟ್‌ಗಳನ್ನು ಅಳಿಸಲಾಗುತ್ತದೆ.' : 'All chats will be permanently deleted.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowClearConfirm(false)} className="btn-secondary flex-1">{t.cancel}</button>
              <button onClick={handleClearHistory} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 transition-colors">
                {t.historyClear}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
