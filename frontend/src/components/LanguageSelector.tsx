import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
];

interface LanguageSelectorProps {
  variant?: 'tabs' | 'buttons';
  className?: string;
}

export default function LanguageSelector({
  variant = 'tabs',
  className = '',
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useApp();

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        <Globe size={16} className="text-gray-400" />
        <span className="text-sm text-gray-500">{t.languageSelect}:</span>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              language === lang.code
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lang.nativeLabel}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center bg-gray-100 rounded-xl p-1 gap-0.5 ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            language === lang.code
              ? 'bg-white text-primary-700 shadow-sm font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {lang.nativeLabel}
        </button>
      ))}
    </div>
  );
}
