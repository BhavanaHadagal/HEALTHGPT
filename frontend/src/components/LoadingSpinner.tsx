import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots() {
  return (
    <div className="loading-dots flex items-center gap-0.5">
      <span />
      <span />
      <span />
    </div>
  );
}

export function ChatTypingIndicator() {
  const { t } = useApp();
  return (
    <div className="flex gap-3 items-start animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
        <Heart size={14} className="text-white fill-white" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <p className="text-xs text-gray-400 mb-2">{t.chatThinking}</p>
        <LoadingDots />
      </div>
    </div>
  );
}

export default function LoadingSpinner({ message, size = 'md' }: LoadingSpinnerProps) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizes[size]} border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        style={{ borderWidth: '3px' }}
      />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}
