import { Language } from '../types';

export interface Translations {
  // Navbar
  appName: string;
  appTagline: string;

  // Nav links
  navHome: string;
  navChat: string;
  navEmergency: string;
  navHospitals: string;
  navReminders: string;
  navHistory: string;

  // Landing
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaStart: string;
  ctaEmergency: string;
  featureTitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
  feature6Title: string;
  feature6Desc: string;

  // Chat
  chatTitle: string;
  chatPlaceholder: string;
  chatSend: string;
  chatVoice: string;
  chatVoiceStop: string;
  chatListening: string;
  chatThinking: string;
  chatDisclaimer: string;
  chatEmergencyAlert: string;
  chatCallEmergency: string;
  chatNewChat: string;

  // Emergency
  emergencyTitle: string;
  emergencySubtitle: string;
  emergencyCall108: string;
  emergencyCall112: string;
  emergencyCallText: string;
  firstAidTitle: string;

  // Hospital Finder
  hospitalTitle: string;
  hospitalSubtitle: string;
  hospitalFindNearby: string;
  hospitalLoading: string;
  hospitalPermissionDenied: string;
  hospitalNoResults: string;
  hospitalCall: string;
  hospitalDistance: string;
  hospitalOpen: string;
  hospitalClosed: string;

  // Reminders
  reminderTitle: string;
  reminderSubtitle: string;
  reminderAdd: string;
  reminderMedicineName: string;
  reminderDosage: string;
  reminderFrequency: string;
  reminderTime: string;
  reminderStartDate: string;
  reminderEndDate: string;
  reminderNotes: string;
  reminderSave: string;
  reminderCancel: string;
  reminderNoReminders: string;
  reminderActive: string;
  reminderInactive: string;
  reminderDelete: string;

  // History
  historyTitle: string;
  historySubtitle: string;
  historyNoHistory: string;
  historyClear: string;
  historyMessages: string;
  historyViewChat: string;

  // Common
  loading: string;
  error: string;
  retry: string;
  close: string;
  save: string;
  delete: string;
  cancel: string;
  confirm: string;
  yes: string;
  no: string;
  languageSelect: string;

  // Disclaimer
  disclaimerText: string;
}

const en: Translations = {
  appName: 'HealthGPT',
  appTagline: 'Rural Health Assistant',

  navHome: 'Home',
  navChat: 'Ask Doctor AI',
  navEmergency: 'Emergency',
  navHospitals: 'Hospitals',
  navReminders: 'Reminders',
  navHistory: 'History',

  heroTitle: 'HealthGPT for Rural Areas',
  heroSubtitle: 'Your AI Health Assistant',
  heroDescription:
    'Get simple, safe health guidance in your language. Ask about symptoms, get first-aid tips, find nearby hospitals — available 24/7.',
  ctaStart: 'Ask Health Question',
  ctaEmergency: 'Emergency Help',
  featureTitle: 'Everything you need for rural health care',
  feature1Title: 'AI Health Guidance',
  feature1Desc: 'Get instant answers to health questions in simple language',
  feature2Title: 'Voice Input',
  feature2Desc: 'Speak your symptoms — no typing needed',
  feature3Title: 'Emergency Help',
  feature3Desc: 'First-aid tips and emergency contacts at your fingertips',
  feature4Title: 'Hospital Finder',
  feature4Desc: 'Find nearby hospitals, clinics, and PHCs',
  feature5Title: 'Medicine Reminders',
  feature5Desc: 'Never miss your medicine with smart reminders',
  feature6Title: 'Health History',
  feature6Desc: 'Keep track of all your past health conversations',

  chatTitle: 'Ask Your Health Question',
  chatPlaceholder: 'Describe your symptoms or ask a health question...',
  chatSend: 'Send',
  chatVoice: 'Voice Input',
  chatVoiceStop: 'Stop',
  chatListening: 'Listening...',
  chatThinking: 'HealthGPT is thinking...',
  chatDisclaimer:
    '⚕️ This is not a medical diagnosis. Please consult a doctor for serious symptoms.',
  chatEmergencyAlert: '🚨 Emergency Detected! Please seek immediate medical help.',
  chatCallEmergency: 'Call 108 Now',
  chatNewChat: 'New Chat',

  emergencyTitle: 'Emergency Help',
  emergencySubtitle: 'For life-threatening emergencies, call immediately',
  emergencyCall108: 'Call 108 — Ambulance',
  emergencyCall112: 'Call 112 — Police',
  emergencyCallText: 'Tap to call',
  firstAidTitle: 'First Aid Tips',

  hospitalTitle: 'Nearby Hospitals & Clinics',
  hospitalSubtitle: 'Find healthcare facilities near you',
  hospitalFindNearby: 'Find Nearby Hospitals',
  hospitalLoading: 'Finding hospitals near you...',
  hospitalPermissionDenied: 'Location permission denied. Please enable location to find nearby hospitals.',
  hospitalNoResults: 'No hospitals found nearby. Try a broader search.',
  hospitalCall: 'Call',
  hospitalDistance: 'km away',
  hospitalOpen: 'Open',
  hospitalClosed: 'Closed',

  reminderTitle: 'Medicine Reminders',
  reminderSubtitle: 'Never miss your medicine',
  reminderAdd: '+ Add Reminder',
  reminderMedicineName: 'Medicine Name',
  reminderDosage: 'Dosage (e.g. 1 tablet)',
  reminderFrequency: 'Frequency',
  reminderTime: 'Time',
  reminderStartDate: 'Start Date',
  reminderEndDate: 'End Date (optional)',
  reminderNotes: 'Notes (optional)',
  reminderSave: 'Save Reminder',
  reminderCancel: 'Cancel',
  reminderNoReminders: 'No medicine reminders yet. Add your first reminder!',
  reminderActive: 'Active',
  reminderInactive: 'Inactive',
  reminderDelete: 'Delete',

  historyTitle: 'Health History',
  historySubtitle: 'Your past health conversations',
  historyNoHistory: 'No chat history yet. Start a conversation with HealthGPT!',
  historyClear: 'Clear History',
  historyMessages: 'messages',
  historyViewChat: 'View Chat',

  loading: 'Loading...',
  error: 'Something went wrong. Please try again.',
  retry: 'Retry',
  close: 'Close',
  save: 'Save',
  delete: 'Delete',
  cancel: 'Cancel',
  confirm: 'Confirm',
  yes: 'Yes',
  no: 'No',
  languageSelect: 'Language',

  disclaimerText:
    '⚕️ This is not a medical diagnosis. Always consult a qualified doctor for serious symptoms or emergencies.',
};

const hi: Translations = {
  appName: 'HealthGPT',
  appTagline: 'ग्रामीण स्वास्थ्य सहायक',

  navHome: 'होम',
  navChat: 'डॉक्टर AI से पूछें',
  navEmergency: 'आपातकाल',
  navHospitals: 'अस्पताल',
  navReminders: 'दवा याद',
  navHistory: 'इतिहास',

  heroTitle: 'HealthGPT — ग्रामीण क्षेत्रों के लिए',
  heroSubtitle: 'आपका AI स्वास्थ्य सहायक',
  heroDescription:
    'अपनी भाषा में सरल और सुरक्षित स्वास्थ्य मार्गदर्शन पाएं। लक्षणों के बारे में पूछें, प्राथमिक चिकित्सा जानें, नजदीकी अस्पताल खोजें।',
  ctaStart: 'स्वास्थ्य सवाल पूछें',
  ctaEmergency: 'आपातकालीन मदद',
  featureTitle: 'ग्रामीण स्वास्थ्य के लिए सब कुछ',
  feature1Title: 'AI स्वास्थ्य मार्गदर्शन',
  feature1Desc: 'सरल भाषा में तुरंत स्वास्थ्य जानकारी पाएं',
  feature2Title: 'आवाज़ से पूछें',
  feature2Desc: 'बोलकर अपने लक्षण बताएं — टाइपिंग की जरूरत नहीं',
  feature3Title: 'आपातकालीन मदद',
  feature3Desc: 'प्राथमिक चिकित्सा और आपातकालीन संपर्क',
  feature4Title: 'अस्पताल खोजें',
  feature4Desc: 'नजदीकी अस्पताल, क्लीनिक और PHC खोजें',
  feature5Title: 'दवा रिमाइंडर',
  feature5Desc: 'समय पर दवा लें, रिमाइंडर के साथ',
  feature6Title: 'स्वास्थ्य इतिहास',
  feature6Desc: 'पिछली सभी बातचीत का रिकॉर्ड',

  chatTitle: 'अपना स्वास्थ्य सवाल पूछें',
  chatPlaceholder: 'अपने लक्षण बताएं या स्वास्थ्य सवाल पूछें...',
  chatSend: 'भेजें',
  chatVoice: 'आवाज़ से पूछें',
  chatVoiceStop: 'रोकें',
  chatListening: 'सुन रहा हूं...',
  chatThinking: 'HealthGPT सोच रहा है...',
  chatDisclaimer: '⚕️ यह चिकित्सा निदान नहीं है। गंभीर लक्षणों के लिए डॉक्टर से मिलें।',
  chatEmergencyAlert: '🚨 आपातकाल! तुरंत चिकित्सा सहायता लें।',
  chatCallEmergency: '108 पर कॉल करें',
  chatNewChat: 'नई बातचीत',

  emergencyTitle: 'आपातकालीन मदद',
  emergencySubtitle: 'जानलेवा स्थिति में तुरंत कॉल करें',
  emergencyCall108: '108 कॉल करें — एम्बुलेंस',
  emergencyCall112: '112 कॉल करें — पुलिस',
  emergencyCallText: 'कॉल करने के लिए टैप करें',
  firstAidTitle: 'प्राथमिक चिकित्सा',

  hospitalTitle: 'नजदीकी अस्पताल और क्लीनिक',
  hospitalSubtitle: 'आपके पास स्वास्थ्य सेवाएं खोजें',
  hospitalFindNearby: 'नजदीकी अस्पताल खोजें',
  hospitalLoading: 'अस्पताल खोज रहे हैं...',
  hospitalPermissionDenied: 'लोकेशन की अनुमति नहीं मिली। कृपया लोकेशन चालू करें।',
  hospitalNoResults: 'नजदीक कोई अस्पताल नहीं मिला।',
  hospitalCall: 'कॉल करें',
  hospitalDistance: 'किमी दूर',
  hospitalOpen: 'खुला',
  hospitalClosed: 'बंद',

  reminderTitle: 'दवा रिमाइंडर',
  reminderSubtitle: 'दवा का समय मत भूलें',
  reminderAdd: '+ रिमाइंडर जोड़ें',
  reminderMedicineName: 'दवा का नाम',
  reminderDosage: 'खुराक (जैसे 1 गोली)',
  reminderFrequency: 'कितनी बार',
  reminderTime: 'समय',
  reminderStartDate: 'शुरुआत की तारीख',
  reminderEndDate: 'अंत की तारीख (वैकल्पिक)',
  reminderNotes: 'नोट्स (वैकल्पिक)',
  reminderSave: 'रिमाइंडर सहेजें',
  reminderCancel: 'रद्द करें',
  reminderNoReminders: 'अभी कोई रिमाइंडर नहीं है।',
  reminderActive: 'सक्रिय',
  reminderInactive: 'निष्क्रिय',
  reminderDelete: 'हटाएं',

  historyTitle: 'स्वास्थ्य इतिहास',
  historySubtitle: 'आपकी पिछली बातचीत',
  historyNoHistory: 'अभी कोई इतिहास नहीं है।',
  historyClear: 'इतिहास साफ करें',
  historyMessages: 'संदेश',
  historyViewChat: 'बातचीत देखें',

  loading: 'लोड हो रहा है...',
  error: 'कुछ गलत हुआ। फिर कोशिश करें।',
  retry: 'फिर कोशिश करें',
  close: 'बंद करें',
  save: 'सहेजें',
  delete: 'हटाएं',
  cancel: 'रद्द करें',
  confirm: 'पुष्टि करें',
  yes: 'हां',
  no: 'नहीं',
  languageSelect: 'भाषा',

  disclaimerText:
    '⚕️ यह चिकित्सा निदान नहीं है। गंभीर लक्षणों या आपातकाल में योग्य डॉक्टर से मिलें।',
};

const kn: Translations = {
  appName: 'HealthGPT',
  appTagline: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಸಹಾಯಕ',

  navHome: 'ಮನೆ',
  navChat: 'ವೈದ್ಯ AI ಕೇಳಿ',
  navEmergency: 'ತುರ್ತು',
  navHospitals: 'ಆಸ್ಪತ್ರೆಗಳು',
  navReminders: 'ಔಷಧ ನೆನಪು',
  navHistory: 'ಇತಿಹಾಸ',

  heroTitle: 'HealthGPT — ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಗೆ',
  heroSubtitle: 'ನಿಮ್ಮ AI ಆರೋಗ್ಯ ಸಹಾಯಕ',
  heroDescription:
    'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಸರಳ, ಸುರಕ್ಷಿತ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ. ರೋಗಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ಕೇಳಿ, ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ತಿಳಿಯಿರಿ.',
  ctaStart: 'ಆರೋಗ್ಯ ಪ್ರಶ್ನೆ ಕೇಳಿ',
  ctaEmergency: 'ತುರ್ತು ಸಹಾಯ',
  featureTitle: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ರಕ್ಷಣೆಗೆ ಎಲ್ಲವೂ',
  feature1Title: 'AI ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ',
  feature1Desc: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ತ್ವರಿತ ಆರೋಗ್ಯ ಮಾಹಿತಿ',
  feature2Title: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್',
  feature2Desc: 'ಮಾತಾಡಿ ನಿಮ್ಮ ರೋಗಲಕ್ಷಣ ಹೇಳಿ',
  feature3Title: 'ತುರ್ತು ಸಹಾಯ',
  feature3Desc: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕಗಳು',
  feature4Title: 'ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ',
  feature4Desc: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಕ್ಲಿನಿಕ್ ಹುಡುಕಿ',
  feature5Title: 'ಔಷಧ ನೆನಪು',
  feature5Desc: 'ಸಮಯಕ್ಕೆ ಔಷಧ ತೆಗೆದುಕೊಳ್ಳಿ',
  feature6Title: 'ಆರೋಗ್ಯ ಇತಿಹಾಸ',
  feature6Desc: 'ಹಿಂದಿನ ಎಲ್ಲ ಸಂಭಾಷಣೆಗಳ ದಾಖಲೆ',

  chatTitle: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆ ಕೇಳಿ',
  chatPlaceholder: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣ ಅಥವಾ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ...',
  chatSend: 'ಕಳುಹಿಸಿ',
  chatVoice: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್',
  chatVoiceStop: 'ನಿಲ್ಲಿಸಿ',
  chatListening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ...',
  chatThinking: 'HealthGPT ಯೋಚಿಸುತ್ತಿದೆ...',
  chatDisclaimer: '⚕️ ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಲ್ಲ. ಗಂಭೀರ ರೋಗಲಕ್ಷಣಗಳಿಗೆ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
  chatEmergencyAlert: '🚨 ತುರ್ತು ಪರಿಸ್ಥಿತಿ! ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
  chatCallEmergency: '108 ಗೆ ಕರೆ ಮಾಡಿ',
  chatNewChat: 'ಹೊಸ ಸಂಭಾಷಣೆ',

  emergencyTitle: 'ತುರ್ತು ಸಹಾಯ',
  emergencySubtitle: 'ಜೀವ ಬೆದರಿಕೆ ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣ ಕರೆ ಮಾಡಿ',
  emergencyCall108: '108 ಕರೆ ಮಾಡಿ — ಆಂಬ್ಯುಲೆನ್ಸ್',
  emergencyCall112: '112 ಕರೆ ಮಾಡಿ — ಪೊಲೀಸ್',
  emergencyCallText: 'ಕರೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
  firstAidTitle: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',

  hospitalTitle: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಕ್ಲಿನಿಕ್',
  hospitalSubtitle: 'ನಿಮ್ಮ ಬಳಿ ಆರೋಗ್ಯ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ',
  hospitalFindNearby: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ',
  hospitalLoading: 'ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕುತ್ತಿದೆ...',
  hospitalPermissionDenied: 'ಸ್ಥಳ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ.',
  hospitalNoResults: 'ಹತ್ತಿರ ಯಾವುದೇ ಆಸ್ಪತ್ರೆ ಕಂಡುಬಂದಿಲ್ಲ.',
  hospitalCall: 'ಕರೆ ಮಾಡಿ',
  hospitalDistance: 'ಕಿ.ಮೀ ದೂರ',
  hospitalOpen: 'ತೆರೆದಿದೆ',
  hospitalClosed: 'ಮುಚ್ಚಲಾಗಿದೆ',

  reminderTitle: 'ಔಷಧ ನೆನಪು',
  reminderSubtitle: 'ನಿಮ್ಮ ಔಷಧ ಮರೆಯಬೇಡಿ',
  reminderAdd: '+ ನೆನಪು ಸೇರಿಸಿ',
  reminderMedicineName: 'ಔಷಧದ ಹೆಸರು',
  reminderDosage: 'ಪ್ರಮಾಣ (ಉದಾ: 1 ಮಾತ್ರೆ)',
  reminderFrequency: 'ಎಷ್ಟು ಬಾರಿ',
  reminderTime: 'ಸಮಯ',
  reminderStartDate: 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
  reminderEndDate: 'ಅಂತ್ಯ ದಿನಾಂಕ (ಐಚ್ಛಿಕ)',
  reminderNotes: 'ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)',
  reminderSave: 'ನೆನಪು ಉಳಿಸಿ',
  reminderCancel: 'ರದ್ದು ಮಾಡಿ',
  reminderNoReminders: 'ಇನ್ನೂ ಯಾವುದೇ ನೆನಪು ಇಲ್ಲ.',
  reminderActive: 'ಸಕ್ರಿಯ',
  reminderInactive: 'ನಿಷ್ಕ್ರಿಯ',
  reminderDelete: 'ಅಳಿಸಿ',

  historyTitle: 'ಆರೋಗ್ಯ ಇತಿಹಾಸ',
  historySubtitle: 'ನಿಮ್ಮ ಹಿಂದಿನ ಸಂಭಾಷಣೆಗಳು',
  historyNoHistory: 'ಇನ್ನೂ ಯಾವುದೇ ಇತಿಹಾಸ ಇಲ್ಲ.',
  historyClear: 'ಇತಿಹಾಸ ತೆರವುಗೊಳಿಸಿ',
  historyMessages: 'ಸಂದೇಶಗಳು',
  historyViewChat: 'ಸಂಭಾಷಣೆ ನೋಡಿ',

  loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
  close: 'ಮುಚ್ಚಿ',
  save: 'ಉಳಿಸಿ',
  delete: 'ಅಳಿಸಿ',
  cancel: 'ರದ್ದು ಮಾಡಿ',
  confirm: 'ದೃಢಪಡಿಸಿ',
  yes: 'ಹೌದು',
  no: 'ಇಲ್ಲ',
  languageSelect: 'ಭಾಷೆ',

  disclaimerText:
    '⚕️ ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಲ್ಲ. ಗಂಭೀರ ರೋಗಲಕ್ಷಣಗಳಿಗೆ ಅರ್ಹ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
};

export const translations: Record<Language, Translations> = { en, hi, kn };

export const useTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};
