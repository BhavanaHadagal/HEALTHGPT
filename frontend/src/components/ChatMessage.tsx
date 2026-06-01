import { Heart, User, AlertTriangle, Phone } from 'lucide-react';
import { Message } from '../types';
import { useApp } from '../context/AppContext';

interface ChatMessageProps {
  message: Message;
}

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
};

// Render AI response with basic markdown-like formatting
const renderContent = (content: string): React.ReactNode => {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    // Bold: **text**
    const parts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      return (
        <li key={idx} className="ml-4 list-disc">
          {parts}
        </li>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      return (
        <li key={idx} className="ml-4 list-decimal">
          {parts}
        </li>
      );
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      return <br key={idx} />;
    }

    return (
      <p key={idx} className="mb-1">
        {parts}
      </p>
    );
  });
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const { t } = useApp();
  const isUser = message.role === 'user';
  const isEmergency = message.isEmergency && !isUser;

  return (
    <div
      className={`flex gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isUser
            ? 'bg-primary-600'
            : isEmergency
            ? 'bg-red-500'
            : 'bg-gradient-to-br from-primary-500 to-primary-700'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Heart size={14} className="text-white fill-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Emergency banner */}
        {isEmergency && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-1 w-full">
            <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-xs font-semibold">{t.chatEmergencyAlert}</p>
            <a
              href="tel:108"
              className="ml-auto flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              <Phone size={12} />
              {t.chatCallEmergency}
            </a>
          </div>
        )}

        {/* Message content */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-primary-600 text-white rounded-br-sm'
              : isEmergency
              ? 'bg-red-50 border border-red-100 text-gray-800 rounded-bl-sm'
              : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="ai-response">{renderContent(message.content)}</div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400 px-1">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}
