import { useState, useEffect, useCallback } from 'react';
import { Bell, Plus, Trash2, Power, Clock, Calendar, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reminder, CreateReminderPayload } from '../types';
import { getReminders, createReminder, toggleReminder, deleteReminder } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const FREQUENCY_OPTIONS = [
  { value: 'once', label: { en: 'Once daily', hi: 'दिन में एक बार', kn: 'ದಿನಕ್ಕೊಮ್ಮೆ' } },
  { value: 'twice', label: { en: 'Twice daily', hi: 'दिन में दो बार', kn: 'ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ' } },
  { value: 'thrice', label: { en: 'Three times daily', hi: 'दिन में तीन बार', kn: 'ದಿನಕ್ಕೆ ಮೂರು ಬಾರಿ' } },
  { value: 'custom', label: { en: 'Custom', hi: 'कस्टम', kn: 'ಕಸ್ಟಮ್' } },
];

const DEFAULT_TIMES: Record<string, string[]> = {
  once: ['08:00'],
  twice: ['08:00', '20:00'],
  thrice: ['08:00', '14:00', '20:00'],
  custom: ['08:00'],
};

interface ReminderFormData {
  medicineName: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'thrice' | 'custom';
  times: string[];
  startDate: string;
  endDate: string;
  notes: string;
}

const today = new Date().toISOString().split('T')[0];

export default function MedicineReminderPage() {
  const { t, sessionId, language } = useApp();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [form, setForm] = useState<ReminderFormData>({
    medicineName: '',
    dosage: '',
    frequency: 'twice',
    times: DEFAULT_TIMES.twice,
    startDate: today,
    endDate: '',
    notes: '',
  });

  const loadReminders = useCallback(async () => {
    try {
      const data = await getReminders(sessionId);
      setReminders(data.reminders || []);
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, t.error]);

  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const handleFrequencyChange = (freq: 'once' | 'twice' | 'thrice' | 'custom') => {
    setForm((f) => ({ ...f, frequency: freq, times: DEFAULT_TIMES[freq] }));
  };

  const handleTimeChange = (idx: number, value: string) => {
    setForm((f) => {
      const times = [...f.times];
      times[idx] = value;
      return { ...f, times };
    });
  };

  const addTime = () => {
    setForm((f) => ({ ...f, times: [...f.times, '08:00'] }));
  };

  const removeTime = (idx: number) => {
    setForm((f) => ({ ...f, times: f.times.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.medicineName.trim() || !form.dosage.trim()) return;

    setIsSaving(true);
    setError(null);

    const payload: CreateReminderPayload = {
      sessionId,
      medicineName: form.medicineName,
      dosage: form.dosage,
      frequency: form.frequency,
      times: form.times,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      notes: form.notes || undefined,
    };

    try {
      const data = await createReminder(payload);
      setReminders((prev) => [data.reminder, ...prev]);
      setShowForm(false);
      setForm({ medicineName: '', dosage: '', frequency: 'twice', times: DEFAULT_TIMES.twice, startDate: today, endDate: '', notes: '' });
    } catch {
      setError(t.error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const data = await toggleReminder(id);
      setReminders((prev) => prev.map((r) => (r._id === id ? data.reminder : r)));
    } catch {
      setError(t.error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r._id !== id));
      setDeleteConfirmId(null);
    } catch {
      setError(t.error);
    }
  };

  const freqLabel = (freq: string): string => {
    const opt = FREQUENCY_OPTIONS.find((o) => o.value === freq);
    return opt?.label[language as 'en' | 'hi' | 'kn'] || freq;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Bell size={20} className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.reminderTitle}</h1>
              <p className="text-sm text-gray-500">{t.reminderSubtitle}</p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-sm py-2 px-4"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">{t.reminderAdd}</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-red-600">{error}</p>
            <button onClick={() => setError(null)}><X size={16} className="text-red-400" /></button>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner message={t.loading} />
        ) : reminders.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-3">💊</div>
            <p className="text-gray-600 mb-4">{t.reminderNoReminders}</p>
            <button onClick={() => setShowForm(true)} className="btn-primary mx-auto">
              <Plus size={16} />
              {t.reminderAdd}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder._id}
                className={`card transition-opacity ${!reminder.isActive ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl mt-0.5">💊</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900">{reminder.medicineName}</h3>
                        <span className={`badge text-xs ${reminder.isActive ? 'badge-green' : 'bg-gray-100 text-gray-500'}`}>
                          {reminder.isActive ? t.reminderActive : t.reminderInactive}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{reminder.dosage}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {freqLabel(reminder.frequency)} — {reminder.times.join(', ')}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          {new Date(reminder.startDate).toLocaleDateString()}
                          {reminder.endDate && ` → ${new Date(reminder.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      {reminder.notes && (
                        <p className="text-xs text-gray-400 mt-1 italic">{reminder.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(reminder._id)}
                      className={`p-2 rounded-lg transition-colors ${reminder.isActive ? 'bg-primary-50 text-primary-600 hover:bg-primary-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                      title={reminder.isActive ? t.reminderInactive : t.reminderActive}
                    >
                      <Power size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(reminder._id)}
                      className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title={t.reminderDelete}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="font-bold text-gray-900 text-lg">{t.reminderAdd}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.reminderMedicineName} *</label>
                <input
                  type="text"
                  value={form.medicineName}
                  onChange={(e) => setForm((f) => ({ ...f, medicineName: e.target.value }))}
                  className="input-field"
                  placeholder={language === 'hi' ? 'जैसे: Paracetamol' : language === 'kn' ? 'ಉದಾ: Paracetamol' : 'e.g. Paracetamol'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.reminderDosage} *</label>
                <input
                  type="text"
                  value={form.dosage}
                  onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
                  className="input-field"
                  placeholder={language === 'hi' ? 'जैसे: 1 गोली' : language === 'kn' ? 'ಉದಾ: 1 ಮಾತ್ರೆ' : 'e.g. 1 tablet'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.reminderFrequency}</label>
                <div className="grid grid-cols-2 gap-2">
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleFrequencyChange(opt.value as 'once' | 'twice' | 'thrice' | 'custom')}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors text-center ${
                        form.frequency === opt.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {opt.label[language as 'en' | 'hi' | 'kn']}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.reminderTime}</label>
                <div className="space-y-2">
                  {form.times.map((time, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(idx, e.target.value)}
                        className="input-field flex-1"
                      />
                      {form.times.length > 1 && (
                        <button type="button" onClick={() => removeTime(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {form.frequency === 'custom' && (
                    <button type="button" onClick={addTime} className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
                      <Plus size={14} /> Add Time
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.reminderStartDate} *</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.reminderEndDate}</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="input-field"
                    min={form.startDate}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.reminderNotes}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="input-field"
                  rows={2}
                  placeholder={language === 'hi' ? 'जैसे: खाने के बाद लें' : language === 'kn' ? 'ಉದಾ: ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ' : 'e.g. Take after meals'}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  {t.reminderCancel}
                </button>
                <button type="submit" disabled={isSaving} className="btn-primary flex-1">
                  {isSaving ? t.loading : t.reminderSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-900 mb-2">
              {language === 'hi' ? 'रिमाइंडर हटाएं?' : language === 'kn' ? 'ನೆನಪು ಅಳಿಸಬೇಕೇ?' : 'Delete reminder?'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {language === 'hi' ? 'यह क्रिया वापस नहीं की जा सकती।' : language === 'kn' ? 'ಈ ಕ್ರಿಯೆಯನ್ನು ರದ್ದು ಮಾಡಲಾಗುವುದಿಲ್ಲ.' : 'This action cannot be undone.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="btn-secondary flex-1">{t.cancel}</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 transition-colors">
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
