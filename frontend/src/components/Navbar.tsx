import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  AlertTriangle,
  MapPin,
  Bell,
  History,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'HI' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'KN' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: t.navHome, icon: <Heart size={16} /> },
    { to: '/chat', label: t.navChat, icon: <MessageCircle size={16} /> },
    { to: '/emergency', label: t.navEmergency, icon: <AlertTriangle size={16} />, emergency: true },
    { to: '/hospitals', label: t.navHospitals, icon: <MapPin size={16} /> },
    { to: '/reminders', label: t.navReminders, icon: <Bell size={16} /> },
    { to: '/history', label: t.navHistory, icon: <History size={16} /> },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
              <Heart size={18} className="text-white fill-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-gray-900 text-lg leading-none">HealthGPT</span>
              <p className="text-xs text-gray-500 leading-none mt-0.5">{t.appTagline}</p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link text-xs ${
                    item.emergency
                      ? isActive
                        ? 'bg-red-50 text-red-700'
                        : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      : isActive
                      ? 'nav-link-active'
                      : 'nav-link-inactive'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: Language + hamburger */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors"
              >
                <Globe size={14} className="text-gray-500" />
                <span>{currentLang?.short}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        language === lang.code
                          ? 'text-primary-600 font-semibold bg-primary-50'
                          : 'text-gray-700'
                      }`}
                    >
                      {lang.label}
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    item.emergency
                      ? isActive
                        ? 'bg-red-50 text-red-700'
                        : 'text-red-600 hover:bg-red-50'
                      : isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close lang menu */}
      {showLangMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLangMenu(false)}
        />
      )}
    </nav>
  );
}
