import { ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SafetyDisclaimerProps {
  variant?: 'banner' | 'card' | 'inline';
}

export default function SafetyDisclaimer({ variant = 'banner' }: SafetyDisclaimerProps) {
  const { t } = useApp();

  if (variant === 'inline') {
    return (
      <p className="text-xs text-gray-400 text-center">
        <ShieldCheck size={12} className="inline mr-1 text-primary-500" />
        {t.disclaimerText}
      </p>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">{t.disclaimerText}</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-t border-amber-200 px-4 py-2.5 flex items-center gap-2">
      <ShieldCheck size={14} className="text-amber-600 flex-shrink-0" />
      <p className="text-xs text-amber-700 leading-relaxed">{t.chatDisclaimer}</p>
    </div>
  );
}
