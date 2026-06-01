import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Mic,
  AlertTriangle,
  MapPin,
  Bell,
  History,
  MessageCircle,
  ArrowRight,
  Shield,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const FEATURE_ICONS = [MessageCircle, Mic, AlertTriangle, MapPin, Bell, History];

export default function LandingPage() {
  const { t } = useApp();
  const navigate = useNavigate();

  const features = [
    { titleKey: t.feature1Title, descKey: t.feature1Desc, color: 'bg-blue-50 text-blue-600', route: '/chat' },
    { titleKey: t.feature2Title, descKey: t.feature2Desc, color: 'bg-purple-50 text-purple-600', route: '/chat' },
    { titleKey: t.feature3Title, descKey: t.feature3Desc, color: 'bg-red-50 text-red-600', route: '/emergency' },
    { titleKey: t.feature4Title, descKey: t.feature4Desc, color: 'bg-green-50 text-green-600', route: '/hospitals' },
    { titleKey: t.feature5Title, descKey: t.feature5Desc, color: 'bg-amber-50 text-amber-600', route: '/reminders' },
    { titleKey: t.feature6Title, descKey: t.feature6Desc, color: 'bg-teal-50 text-teal-600', route: '/history' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          {/* Language selector at top */}
          <div className="flex justify-center mb-10">
            <LanguageSelector className="bg-white/10 rounded-xl p-1" />
          </div>

          {/* Hero content */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
                <Heart size={40} className="text-white fill-white" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-primary-100 font-medium mb-3">
              {t.heroSubtitle}
            </p>

            <p className="text-sm md:text-base text-primary-100 max-w-2xl mx-auto leading-relaxed mb-10">
              {t.heroDescription}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl text-base md:text-lg shadow-lg hover:shadow-xl hover:bg-primary-50 transition-all duration-200 group"
              >
                <MessageCircle size={20} />
                {t.ctaStart}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/emergency')}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <AlertTriangle size={20} />
                {t.ctaEmergency}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
            {[
              { label: '3 Languages', icon: '🌐' },
              { label: '24/7 Available', icon: '⏰' },
              { label: 'Free to Use', icon: '✅' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-3 border border-white/20"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-xs text-primary-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t.featureTitle}
            </h2>
            <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, idx) => {
              const Icon = FEATURE_ICONS[idx];
              return (
                <button
                  key={idx}
                  onClick={() => navigate(feature.route)}
                  className="text-left group p-5 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.titleKey}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.descKey}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
            <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: '🗣️',
                title: 'Describe Symptoms',
                desc: 'Type or speak your health problem in your language',
              },
              {
                step: '2',
                icon: '🤖',
                title: 'AI Analyzes',
                desc: 'Our AI understands and gives safe, simple health guidance',
              },
              {
                step: '3',
                icon: '👨‍⚕️',
                title: 'Get Guidance',
                desc: 'Receive practical advice and know when to see a doctor',
              },
            ].map((step) => (
              <div key={step.step} className="card text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <div className="text-4xl mb-3 mt-2">{step.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Shield, label: 'Safety First', sub: 'Always recommends doctors' },
              { icon: Smartphone, label: 'Mobile Ready', sub: 'Works on any device' },
              { icon: Heart, label: 'Rural Focused', sub: 'Designed for communities' },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{badge.label}</p>
                    <p className="text-xs text-gray-500">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <SafetyDisclaimer variant="card" />
          <p className="text-center text-xs text-gray-400 mt-4">
            © 2026 HealthGPT for Rural Areas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
