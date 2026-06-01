import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import EmergencyPage from './pages/EmergencyPage';
import HospitalFinderPage from './pages/HospitalFinderPage';
import MedicineReminderPage from './pages/MedicineReminderPage';
import HealthHistoryPage from './pages/HealthHistoryPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/hospitals" element={<HospitalFinderPage />} />
              <Route path="/reminders" element={<MedicineReminderPage />} />
              <Route path="/history" element={<HealthHistoryPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
