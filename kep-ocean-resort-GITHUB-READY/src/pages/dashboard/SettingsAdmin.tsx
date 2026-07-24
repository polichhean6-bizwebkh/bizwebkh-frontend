import { useState } from 'react';
import { Info, RotateCcw } from 'lucide-react';
import { resortConfig, demoDisclaimer } from '../../data/resortConfig';
import { Button } from '../../components/ui/Button';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import { useAppData } from '../../context/AppDataContext';

export default function SettingsAdmin() {
  const [form, setForm] = useState({
    currency: resortConfig.policies.currency,
    secondaryCurrency: resortConfig.policies.secondaryCurrency,
    checkIn: resortConfig.contact.checkIn,
    checkOut: resortConfig.contact.checkOut,
    serviceCharge: resortConfig.policies.serviceChargePercent,
    depositPercent: resortConfig.policies.depositPercent,
    confirmationMessage: resortConfig.policies.confirmationMessage,
    notifyEmail: true,
    notifyTelegram: false,
    language: 'English',
  });
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const { resetDemoData, lastReset } = useAppData();

  const handleReset = () => {
    resetDemoData();
    setConfirmReset(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Settings</h1>
        <p className="text-charcoal-500 text-sm">Resort-wide configuration for this demo.</p>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6 space-y-5">
        <h3 className="font-semibold text-charcoal-900">Resort & Contact Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><label className="block text-xs text-charcoal-500 mb-1">Resort Name</label><input defaultValue={resortConfig.name} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
          <div><label className="block text-xs text-charcoal-500 mb-1">Phone</label><input defaultValue={resortConfig.contact.phone} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
        </div>

        <h3 className="font-semibold text-charcoal-900 pt-2">Currency & Pricing</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><label className="block text-xs text-charcoal-500 mb-1">Default Currency</label>
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2">
              <option>USD</option>
            </select>
          </div>
          <div><label className="block text-xs text-charcoal-500 mb-1">Secondary Display Currency</label>
            <select value={form.secondaryCurrency} onChange={(e) => setForm({ ...form, secondaryCurrency: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2">
              <option>KHR</option>
              <option>None</option>
            </select>
          </div>
          <div><label className="block text-xs text-charcoal-500 mb-1">Service Charge (%)</label><input type="number" value={form.serviceCharge} onChange={(e) => setForm({ ...form, serviceCharge: Number(e.target.value) })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
          <div><label className="block text-xs text-charcoal-500 mb-1">Deposit Percentage (%)</label><input type="number" value={form.depositPercent} onChange={(e) => setForm({ ...form, depositPercent: Number(e.target.value) })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
        </div>

        <h3 className="font-semibold text-charcoal-900 pt-2">Check-in / Check-out</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><label className="block text-xs text-charcoal-500 mb-1">Check-in Time</label><input type="time" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
          <div><label className="block text-xs text-charcoal-500 mb-1">Check-out Time</label><input type="time" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2" /></div>
        </div>

        <h3 className="font-semibold text-charcoal-900 pt-2">Booking Confirmation Message</h3>
        <textarea value={form.confirmationMessage} onChange={(e) => setForm({ ...form, confirmationMessage: e.target.value })} rows={3} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm" />

        <h3 className="font-semibold text-charcoal-900 pt-2">Notification Preferences</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.notifyEmail} onChange={(e) => setForm({ ...form, notifyEmail: e.target.checked })} className="accent-ocean-700" /> Email notifications for new bookings</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.notifyTelegram} onChange={(e) => setForm({ ...form, notifyTelegram: e.target.checked })} className="accent-ocean-700" /> Telegram notifications for new bookings</label>
        </div>

        <h3 className="font-semibold text-charcoal-900 pt-2">Language</h3>
        <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm">
          <option>English</option>
          <option>Khmer</option>
        </select>

        <Button onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Settings'}</Button>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6 space-y-3">
        <h3 className="font-semibold text-charcoal-900">Demo Data</h3>
        <p className="text-sm text-charcoal-600">
          This demo uses sample bookings, guests, villa statuses, and menu availability so you
          can freely test the dashboard. If sample data gets out of order while testing, you can
          restore it to its original state at any time.
        </p>
        <Button variant="outlineLight" size="sm" onClick={() => setConfirmReset(true)}>
          <RotateCcw className="h-4 w-4" /> Reset Demo Data
        </Button>
        {resetDone && <p className="text-xs text-turquoise-700 font-medium">Demo data has been restored to its original sample state.</p>}
        {!resetDone && lastReset && <p className="text-xs text-charcoal-400">Last reset: {lastReset}</p>}
      </div>

      <div className="flex items-start gap-2 bg-sand-50 border border-sand-200 rounded-lg px-4 py-3 text-xs text-charcoal-600">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-ocean-700" />
        {demoDisclaimer}
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset demo data?"
        message="This restores the original sample bookings, guests' booking history, villa statuses, and menu availability for this demo. It does not affect the public website design or any source files. This action cannot be undone."
        confirmLabel="Reset Demo Data"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
