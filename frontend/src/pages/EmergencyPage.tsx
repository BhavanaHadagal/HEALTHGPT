import { Phone, Heart, AlertTriangle, Droplets, Wind, Eye, Baby, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EmergencyContact {
  number: string;
  name: string;
  description: string;
  color: string;
  textColor: string;
}

interface FirstAidTip {
  emoji: string;
  title: string;
  steps: string[];
  warning?: string;
  icon: React.ReactNode;
  color: string;
}

export default function EmergencyPage() {
  const { t, language } = useApp();

  const emergencyContacts: EmergencyContact[] = [
    {
      number: '108',
      name: language === 'hi' ? 'एम्बुलेंस' : language === 'kn' ? 'ಆಂಬ್ಯುಲೆನ್ಸ್' : 'Ambulance',
      description: language === 'hi' ? 'राष्ट्रीय स्वास्थ्य हेल्पलाइन' : language === 'kn' ? 'ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಹೆಲ್ಪ್‌ಲೈನ್' : 'National Health Helpline',
      color: 'bg-red-600',
      textColor: 'text-white',
    },
    {
      number: '112',
      name: language === 'hi' ? 'राष्ट्रीय आपातकाल' : language === 'kn' ? 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು' : 'National Emergency',
      description: language === 'hi' ? 'पुलिस / अग्नि / चिकित्सा' : language === 'kn' ? 'ಪೊಲೀಸ್ / ಅಗ್ನಿ / ವೈದ್ಯಕೀಯ' : 'Police / Fire / Medical',
      color: 'bg-blue-600',
      textColor: 'text-white',
    },
    {
      number: '102',
      name: language === 'hi' ? 'जनन सेवाएं' : language === 'kn' ? 'ಜನನ ಸೇವೆಗಳು' : 'Janani Express',
      description: language === 'hi' ? 'गर्भवती महिलाओं के लिए' : language === 'kn' ? 'ಗರ್ಭಿಣಿ ಮಹಿಳೆಯರಿಗಾಗಿ' : 'For pregnant women',
      color: 'bg-pink-600',
      textColor: 'text-white',
    },
    {
      number: '1097',
      name: language === 'hi' ? 'स्वास्थ्य हेल्पलाइन' : language === 'kn' ? 'ಆರೋಗ್ಯ ಹೆಲ್ಪ್‌ಲೈನ್' : 'Health Helpline',
      description: language === 'hi' ? 'राष्ट्रीय स्वास्थ्य' : language === 'kn' ? 'ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ' : 'National Health',
      color: 'bg-green-600',
      textColor: 'text-white',
    },
  ];

  const firstAidTips: FirstAidTip[] = language === 'hi'
    ? [
        {
          emoji: '💓',
          title: 'दिल का दौरा',
          steps: ['तुरंत 108 पर कॉल करें', 'व्यक्ति को लेटाएं और शांत रखें', 'कपड़े ढीले करें', 'CPR सिखे हैं तो करें', 'डॉक्टर आने तक पास रहें'],
          warning: 'चेतावनी: छाती में दर्द, बाएं हाथ में दर्द, पसीना — तुरंत 108 कॉल करें',
          icon: <Heart size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '🩸',
          title: 'अत्यधिक रक्तस्राव',
          steps: ['साफ कपड़े से दबाव लगाएं', 'घाव को हृदय से ऊपर उठाएं', 'दबाव कम मत करें', 'तुरंत अस्पताल जाएं'],
          warning: 'खून बहना बंद न हो तो तुरंत 108 कॉल करें',
          icon: <Droplets size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '😮‍💨',
          title: 'सांस लेने में तकलीफ',
          steps: ['व्यक्ति को सीधा बैठाएं', 'तंग कपड़े ढीले करें', 'ताजी हवा दें', '108 पर तुरंत कॉल करें'],
          icon: <Wind size={20} />,
          color: 'border-blue-200 bg-blue-50',
        },
        {
          emoji: '🤕',
          title: 'बेहोशी',
          steps: ['व्यक्ति को पीठ के बल लेटाएं', 'पैर थोड़े ऊपर उठाएं', 'हवा की व्यवस्था करें', 'कुछ भी मुंह में न डालें', '108 पर कॉल करें'],
          icon: <Eye size={20} />,
          color: 'border-purple-200 bg-purple-50',
        },
        {
          emoji: '🤰',
          title: 'प्रसव पीड़ा / जटिलताएं',
          steps: ['102 या 108 तुरंत कॉल करें', 'महिला को लेटाएं और आराम दें', 'स्वच्छ कपड़े तैयार रखें', 'अनुभवी व्यक्ति को बुलाएं'],
          icon: <Baby size={20} />,
          color: 'border-pink-200 bg-pink-50',
        },
        {
          emoji: '🐍',
          title: 'सांप का काटना',
          steps: ['व्यक्ति को हिलने न दें', 'काटी हुई जगह को दिल से नीचे रखें', 'काटने की जगह नहीं काटें', 'कोई घरेलू उपाय नहीं', 'तुरंत 108 कॉल करें'],
          warning: 'समय बहुत महत्वपूर्ण है। तुरंत अस्पताल जाएं!',
          icon: <Zap size={20} />,
          color: 'border-amber-200 bg-amber-50',
        },
      ]
    : language === 'kn'
    ? [
        {
          emoji: '💓',
          title: 'ಹೃದಯಾಘಾತ',
          steps: ['ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ', 'ವ್ಯಕ್ತಿಯನ್ನು ಮಲಗಿಸಿ', 'ಉಡುಪು ಸಡಿಲಿಸಿ', 'CPR ತಿಳಿದಿದ್ದರೆ ಮಾಡಿ', 'ವೈದ್ಯರು ಬರುವವರೆಗೂ ಇರಿ'],
          warning: 'ಎದೆ ನೋವು, ಎಡ ತೋಳು ನೋವು — ತಕ್ಷಣ 108 ಕರೆ ಮಾಡಿ',
          icon: <Heart size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '🩸',
          title: 'ಭಾರಿ ರಕ್ತಸ್ರಾವ',
          steps: ['ಸ್ವಚ್ಛ ಬಟ್ಟೆಯಿಂದ ಒತ್ತಡ ಹಾಕಿ', 'ಗಾಯವನ್ನು ಎತ್ತರಕ್ಕೆ ಇಡಿ', 'ಒತ್ತಡ ಕಡಿಮೆ ಮಾಡಬೇಡಿ', 'ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ'],
          icon: <Droplets size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '😮‍💨',
          title: 'ಉಸಿರಾಟ ತೊಂದರೆ',
          steps: ['ವ್ಯಕ್ತಿಯನ್ನು ನೇರವಾಗಿ ಕೂರಿಸಿ', 'ಬಿಗಿ ಬಟ್ಟೆ ಸಡಿಲಿಸಿ', 'ತಾಜಾ ಗಾಳಿ ಕೊಡಿ', 'ತಕ್ಷಣ 108 ಕರೆ ಮಾಡಿ'],
          icon: <Wind size={20} />,
          color: 'border-blue-200 bg-blue-50',
        },
        {
          emoji: '🤕',
          title: 'ಪ್ರಜ್ಞಾಹೀನತೆ',
          steps: ['ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿಸಿ', 'ಕಾಲುಗಳನ್ನು ಸ್ವಲ್ಪ ಎತ್ತಿ', 'ಗಾಳಿ ಒದಗಿಸಿ', 'ಬಾಯಿಗೆ ಏನೂ ಹಾಕಬೇಡಿ', '108 ಕರೆ ಮಾಡಿ'],
          icon: <Eye size={20} />,
          color: 'border-purple-200 bg-purple-50',
        },
        {
          emoji: '🤰',
          title: 'ಹೆರಿಗೆ ನೋವು / ತೊಡಕುಗಳು',
          steps: ['102 ಅಥವಾ 108 ಕರೆ ಮಾಡಿ', 'ಮಹಿಳೆಯನ್ನು ಮಲಗಿಸಿ', 'ಸ್ವಚ್ಛ ಬಟ್ಟೆ ಸಿದ್ಧಪಡಿಸಿ', 'ಅನುಭವಿ ವ್ಯಕ್ತಿಯನ್ನು ಕರೆಯಿರಿ'],
          icon: <Baby size={20} />,
          color: 'border-pink-200 bg-pink-50',
        },
        {
          emoji: '🐍',
          title: 'ಹಾವು ಕಚ್ಚಿದಾಗ',
          steps: ['ವ್ಯಕ್ತಿಯನ್ನು ಚಲಿಸಲು ಬಿಡಬೇಡಿ', 'ಕಚ್ಚಿದ ಜಾಗವನ್ನು ಕೆಳಗೆ ಇಡಿ', 'ಕಚ್ಚಿದ ಜಾಗ ಕತ್ತರಿಸಬೇಡಿ', 'ಮನೆ ಪರಿಹಾರ ಬೇಡ', 'ತಕ್ಷಣ 108 ಕರೆ ಮಾಡಿ'],
          warning: 'ಸಮಯ ಬಹಳ ಮುಖ್ಯ. ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ!',
          icon: <Zap size={20} />,
          color: 'border-amber-200 bg-amber-50',
        },
      ]
    : [
        {
          emoji: '💓',
          title: 'Heart Attack',
          steps: ['Call 108 immediately', 'Keep the person calm and still', 'Loosen tight clothing', 'Perform CPR if trained', 'Stay until help arrives'],
          warning: 'Warning signs: Chest pain, left arm pain, sweating — Call 108 NOW',
          icon: <Heart size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '🩸',
          title: 'Severe Bleeding',
          steps: ['Apply firm pressure with clean cloth', 'Elevate wound above heart level', 'Do not remove the cloth', 'Rush to hospital immediately'],
          warning: 'If bleeding does not stop, call 108 immediately',
          icon: <Droplets size={20} />,
          color: 'border-red-200 bg-red-50',
        },
        {
          emoji: '😮‍💨',
          title: 'Difficulty Breathing',
          steps: ['Sit the person upright', 'Loosen tight clothing', 'Provide fresh air', 'Call 108 immediately'],
          icon: <Wind size={20} />,
          color: 'border-blue-200 bg-blue-50',
        },
        {
          emoji: '🤕',
          title: 'Unconsciousness',
          steps: ['Lay person on their back', 'Raise legs slightly', 'Ensure airway is clear', 'Do not give food or water', 'Call 108 immediately'],
          icon: <Eye size={20} />,
          color: 'border-purple-200 bg-purple-50',
        },
        {
          emoji: '🤰',
          title: 'Pregnancy Emergency',
          steps: ['Call 102 or 108 immediately', 'Keep woman lying down comfortably', 'Prepare clean cloths', 'Contact experienced person'],
          icon: <Baby size={20} />,
          color: 'border-pink-200 bg-pink-50',
        },
        {
          emoji: '🐍',
          title: 'Snake Bite',
          steps: ['Keep victim completely still', 'Keep bite below heart level', 'Do NOT cut the wound', 'Do NOT apply home remedies', 'Call 108 immediately'],
          warning: 'Time is critical. Reach hospital within 1 hour!',
          icon: <Zap size={20} />,
          color: 'border-amber-200 bg-amber-50',
        },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency header */}
      <div className="bg-red-600 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <AlertTriangle size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{t.emergencyTitle}</h1>
          <p className="text-red-100 text-sm">{t.emergencySubtitle}</p>
        </div>
      </div>

      {/* Emergency call buttons */}
      <div className="bg-white border-b border-gray-100 px-4 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className={`${contact.color} ${contact.textColor} rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-all duration-150 text-center`}
              >
                <Phone size={24} className="flex-shrink-0" />
                <span className="text-2xl font-bold leading-none">{contact.number}</span>
                <span className="text-sm font-semibold leading-tight">{contact.name}</span>
                <span className="text-xs opacity-80 leading-tight">{contact.description}</span>
                <span className="text-xs opacity-70 mt-1">{t.emergencyCallText}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* First aid tips */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🩺</span>
          {t.firstAidTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firstAidTips.map((tip, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 ${tip.color} p-4`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tip.emoji}</span>
                <h3 className="font-bold text-gray-900">{tip.title}</h3>
              </div>

              <ol className="space-y-1.5 mb-3">
                {tip.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              {tip.warning && (
                <div className="bg-white/70 rounded-xl px-3 py-2 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 font-medium">{tip.warning}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom reminder */}
        <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-center">
          <p className="text-red-700 font-bold text-base mb-1">
            {language === 'hi'
              ? '⚠️ याद रखें: यह जानकारी प्राथमिक मदद के लिए है।'
              : language === 'kn'
              ? '⚠️ ನೆನಪಿಡಿ: ಈ ಮಾಹಿತಿ ಪ್ರಾಥಮಿಕ ಸಹಾಯಕ್ಕಾಗಿ ಮಾತ್ರ.'
              : '⚠️ Remember: This is for first aid only.'}
          </p>
          <p className="text-red-600 text-sm">
            {language === 'hi'
              ? 'किसी भी आपात स्थिति में तुरंत 108 पर कॉल करें और नजदीकी अस्पताल जाएं।'
              : language === 'kn'
              ? 'ಯಾವುದೇ ತುರ್ತು ಸ್ಥಿತಿಯಲ್ಲಿ ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ ಮತ್ತು ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.'
              : 'In any emergency, immediately call 108 and go to the nearest hospital.'}
          </p>
        </div>
      </div>
    </div>
  );
}
