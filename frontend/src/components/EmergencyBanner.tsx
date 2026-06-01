import { Phone, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmergencyBanner() {
  const { t } = useApp();

  return (
    <div className="bg-red-600 emergency-pulse text-white px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="flex-shrink-0" />
          <p className="text-sm font-semibold">{t.chatEmergencyAlert}</p>
        </div>
        <a
          href="tel:108"
          className="flex items-center gap-2 bg-white text-red-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors whitespace-nowrap shadow-sm"
        >
          <Phone size={16} />
          {t.chatCallEmergency}
        </a>
      </div>
    </div>
  );
}
