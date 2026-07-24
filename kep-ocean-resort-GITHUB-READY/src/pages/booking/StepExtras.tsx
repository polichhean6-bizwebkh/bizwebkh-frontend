import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBookingFlow } from '../../context/BookingFlowContext';
import { Button } from '../../components/ui/Button';
import { formatUSD } from '../../lib/format';

const extraOptions = [
  { id: 'breakfast', label: 'Breakfast (per day)', price: 6, note: 'Added per night of stay' },
  { id: 'extrabed', label: 'Extra Bed', price: 10, note: 'One-time charge' },
  { id: 'transfer', label: 'Airport / Bus Station Transfer', price: 15, note: 'One-time charge' },
  { id: 'rabbitisland', label: 'Rabbit Island Trip Inquiry', price: 0, note: 'We will contact you with details — no charge yet' },
  { id: 'romantic', label: 'Romantic Room Setup', price: 20, note: 'Flowers & decoration on arrival' },
  { id: 'extraguest', label: 'Additional Guest', price: 12, note: 'One-time charge' },
  { id: 'latecheckout', label: 'Late Checkout Request', price: 10, note: 'Subject to availability' },
];

export default function StepExtras() {
  const navigate = useNavigate();
  const { state, setState } = useBookingFlow();

  if (!state.selectedVilla) return <Navigate to="/book/select" replace />;

  const toggle = (opt: typeof extraOptions[number]) => {
    setState((s) => {
      const exists = s.extras.find((e) => e.id === opt.id);
      const extras = exists ? s.extras.filter((e) => e.id !== opt.id) : [...s.extras, { id: opt.id, label: opt.label, price: opt.price }];
      return { ...s, extras };
    });
  };

  return (
    <div>
      <button onClick={() => navigate('/book/select')} className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to villas
      </button>

      <div className="bg-white rounded-3xl border border-charcoal-100 p-6 sm:p-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">Optional Extras</h1>
        <p className="text-charcoal-500 text-sm mb-1">Step 3 of 5 — these are demo options only.</p>
        <p className="text-charcoal-400 text-xs mb-8">You can skip this step if you don't need any extras.</p>

        <div className="space-y-3 mb-8">
          {extraOptions.map((opt) => {
            const checked = !!state.extras.find((e) => e.id === opt.id);
            return (
              <label key={opt.id} className={`flex items-center justify-between gap-4 border rounded-xl px-4 py-3.5 cursor-pointer ${checked ? 'border-ocean-400 bg-ocean-50' : 'border-charcoal-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={checked} onChange={() => toggle(opt)} className="h-4 w-4 accent-ocean-700" />
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{opt.label}</p>
                    <p className="text-xs text-charcoal-500">{opt.note}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-charcoal-800 shrink-0">{opt.price > 0 ? formatUSD(opt.price) : 'Free inquiry'}</span>
              </label>
            );
          })}
        </div>

        <Button size="lg" onClick={() => navigate('/book/guest-info')} className="w-full sm:w-auto">Continue</Button>
      </div>
    </div>
  );
}
