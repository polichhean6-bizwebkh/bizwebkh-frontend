import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useBookingFlow } from '../../context/BookingFlowContext';
import { Button } from '../../components/ui/Button';

export default function StepGuestInfo() {
  const navigate = useNavigate();
  const { state, setState } = useBookingFlow();
  const [form, setForm] = useState(state.guestInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!state.selectedVilla) return <Navigate to="/book/select" replace />;

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleContinue = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!form.phone.trim()) next.phone = 'Phone number is required.';
    if (!form.email.trim() || !form.email.includes('@')) next.email = 'A valid email is required.';
    if (!form.nationality.trim()) next.nationality = 'Nationality is required.';
    if (form.preferredContact !== 'Phone' && form.preferredContact !== 'Email' && !form.contactValue.trim()) {
      next.contactValue = `Please provide your ${form.preferredContact} number.`;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setState((s) => ({ ...s, guestInfo: form }));
    navigate('/book/review');
  };

  return (
    <div>
      <button onClick={() => navigate('/book/extras')} className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="bg-white rounded-3xl border border-charcoal-100 p-6 sm:p-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">Guest Information</h1>
        <p className="text-charcoal-500 text-sm mb-8">Step 4 of 5 — tell us about yourself.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name" error={errors.fullName}>
            <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputCls(errors.fullName)} placeholder="e.g. Sok Dara" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls(errors.phone)} placeholder="+855 ..." />
          </Field>
          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls(errors.email)} placeholder="you@example.com" />
          </Field>
          <Field label="Nationality" error={errors.nationality}>
            <input value={form.nationality} onChange={(e) => update('nationality', e.target.value)} className={inputCls(errors.nationality)} placeholder="e.g. Cambodia" />
          </Field>
          <Field label="Expected Arrival Time">
            <input type="time" value={form.arrivalTime} onChange={(e) => update('arrivalTime', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Preferred Contact Method">
            <select value={form.preferredContact} onChange={(e) => update('preferredContact', e.target.value)} className={inputCls()}>
              <option>Phone</option>
              <option>Email</option>
              <option>Telegram</option>
              <option>WhatsApp</option>
            </select>
          </Field>
          {(form.preferredContact === 'Telegram' || form.preferredContact === 'WhatsApp') && (
            <Field label={`${form.preferredContact} Number`} error={errors.contactValue}>
              <input value={form.contactValue} onChange={(e) => update('contactValue', e.target.value)} className={inputCls(errors.contactValue)} placeholder="+855 ..." />
            </Field>
          )}
          <Field label="Special Requests" full>
            <textarea value={form.specialRequests} onChange={(e) => update('specialRequests', e.target.value)} rows={3} className={inputCls()} placeholder="Anything we should know?" />
          </Field>
          <Field label="Additional Notes" full>
            <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={2} className={inputCls()} placeholder="Optional" />
          </Field>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 rounded-lg px-4 py-3 text-sm mt-6">
            <AlertCircle className="h-4 w-4 shrink-0" /> Please correct the highlighted fields.
          </div>
        )}

        <Button size="lg" onClick={handleContinue} className="w-full sm:w-auto mt-6">Continue to Review</Button>
      </div>
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full border rounded-lg px-4 py-2.5 text-sm ${error ? 'border-red-400' : 'border-charcoal-200'}`;
}

function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-sm font-medium text-charcoal-700">{label}</span>
      {children}
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </label>
  );
}
