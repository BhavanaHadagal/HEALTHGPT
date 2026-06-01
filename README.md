# 🏥 HealthGPT for Rural Areas

> A multilingual AI-powered healthcare assistant designed for rural communities in India.  
> Supports **English**, **Hindi (हिंदी)**, and **Kannada (ಕನ್ನಡ)**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Health Chat** | Ask health questions in your language — powered by Gemini / OpenAI |
| 🎙️ **Voice Input** | Speak your symptoms using Web Speech API (no typing needed) |
| 🚨 **Emergency Mode** | First-aid tips + one-tap emergency call buttons (108, 112, 102) |
| 🗺️ **Hospital Finder** | Find nearby hospitals, PHCs, CHCs using location |
| 💊 **Medicine Reminders** | Set up daily medicine reminders with custom schedules |
| 📋 **Health History** | View and revisit all past health conversations |
| 🌐 **Multilingual** | Full UI + AI responses in English, Hindi, Kannada |
| 📱 **Mobile Responsive** | Designed mobile-first for rural smartphone users |

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript (Vite)
- Tailwind CSS
- React Router v6
- Lucide React Icons
- Web Speech API

**Backend:**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Google Gemini 1.5 Flash API (primary)
- OpenAI GPT-4o Mini (fallback)
- Helmet + Rate Limiting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local) or MongoDB Atlas account
- Google Gemini API key (**free**) — [Get it here](https://aistudio.google.com/app/apikey)
- OR OpenAI API key — [Get it here](https://platform.openai.com/api-keys)

---

### 1. Clone & Setup

```bash
# Navigate to the project root
cd HealthGPT
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
# Edit .env with your values (see below)

# Start development server
npm run dev
```

Backend runs on: `http://localhost:5000`

#### Backend `.env` configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthgpt
GEMINI_API_KEY=your_actual_gemini_api_key
AI_PROVIDER=gemini
FRONTEND_URL=http://localhost:5173
```

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

> **Note:** The Vite dev server automatically proxies `/api/*` requests to `http://localhost:5000`, so no extra CORS configuration is needed during development.

---

### 4. Build for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Serve the dist/ folder with any static server
```

---

## 🔑 Getting API Keys

### Google Gemini (Recommended — Free Tier Available)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key to your `.env` file as `GEMINI_API_KEY`
5. Set `AI_PROVIDER=gemini`

### OpenAI (Alternative)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Copy to `.env` as `OPENAI_API_KEY`
4. Set `AI_PROVIDER=openai`

---

## 📁 Project Structure

```
HealthGPT/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   ├── models/
│   │   │   ├── ChatHistory.ts  # MongoDB chat session model
│   │   │   └── Reminder.ts     # Medicine reminder model
│   │   ├── routes/
│   │   │   ├── chat.ts         # POST /api/chat
│   │   │   ├── history.ts      # GET/DELETE /api/history
│   │   │   └── reminders.ts    # CRUD /api/reminders
│   │   ├── controllers/        # Route handlers
│   │   ├── utils/
│   │   │   ├── aiService.ts    # Gemini + OpenAI integration
│   │   │   └── promptBuilder.ts # Safety-first AI prompts
│   │   └── middleware/
│   │       └── errorHandler.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── App.tsx             # Root app + routing
│   │   ├── main.tsx
│   │   ├── index.css           # Global styles + Tailwind
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   ├── EmergencyPage.tsx
│   │   │   ├── HospitalFinderPage.tsx
│   │   │   ├── MedicineReminderPage.tsx
│   │   │   └── HealthHistoryPage.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── SafetyDisclaimer.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── EmergencyBanner.tsx
│   │   ├── context/
│   │   │   └── AppContext.tsx  # Global state
│   │   ├── hooks/
│   │   │   └── useVoiceInput.ts # Web Speech API hook
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── api.ts          # Axios API calls
│   │       └── translations.ts # EN/HI/KN translations
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send health query, get AI response |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/history/:sessionId` | Get full chat history |
| `GET` | `/api/history?sessionId=xxx` | Get session summaries |
| `DELETE` | `/api/history/:sessionId` | Clear chat history |
| `POST` | `/api/reminders` | Create medicine reminder |
| `GET` | `/api/reminders/:sessionId` | Get all reminders |
| `PUT` | `/api/reminders/:id/toggle` | Toggle active/inactive |
| `DELETE` | `/api/reminders/:id` | Delete reminder |

### Chat API Example

```json
POST /api/chat
{
  "message": "I have a fever of 102°F for 2 days",
  "language": "en",
  "sessionId": "uuid-here"
}
```

Response:
```json
{
  "success": true,
  "response": "I understand you're feeling unwell with a fever...",
  "isEmergency": false,
  "sessionId": "uuid-here",
  "language": "en"
}
```

---

## 🛡️ AI Safety Rules

The AI is programmed with strict safety guidelines:

1. **No Diagnosis** — Never provides a definitive medical diagnosis
2. **No Dosages** — Never recommends specific medication dosages
3. **Emergency Detection** — Auto-detects emergency keywords and prominently displays 108 call button
4. **Doctor Referral** — Always recommends consulting a doctor for persistent or serious symptoms
5. **Simple Language** — Responds in simple, rural-friendly language appropriate for the selected language

Emergency trigger keywords include: chest pain, breathing difficulty, heavy bleeding, unconsciousness, stroke symptoms, pregnancy complications, snake bite, seizure, and more.

---

## 📸 Demo Pages

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Hero page with CTA and features |
| Chat | `/chat` | AI health chat with voice input |
| Emergency | `/emergency` | First-aid tips + emergency contacts |
| Hospitals | `/hospitals` | Nearby hospital finder |
| Reminders | `/reminders` | Medicine reminder manager |
| History | `/history` | Past chat history viewer |

---

## 🏆 Hackathon Notes

- Built for rural healthcare accessibility
- Works in low-bandwidth environments (minimal JS bundle)
- Supports offline-friendly UI patterns
- Tested on mobile devices (Android Chrome, Safari)
- Voice input supports Indian English, Hindi, and Kannada accents

---

## 📄 License

MIT License — built for educational and hackathon purposes.

---

> ⚕️ **Disclaimer:** HealthGPT is not a substitute for professional medical advice. Always consult a qualified doctor for serious health concerns.
