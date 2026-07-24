import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Users, Minus, Plus, AlertCircle } from 'lucide-react';
import { useBookingFlow } from '../../context/BookingFlowContext';
import { getVillaBySlug, villas } from '../../data/villas';
import { Button } from '../../components/ui/Button';
import { todayISO } from '../../lib/format';

const maxCapacity = Math.max(...villas.map((v) => v.maxGuests));

export default function StepSearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { state, setState } = useBookingFlow();
  const today = todayISO();

  const [checkIn, setCheckIn] = useState(state.checkIn || params.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(state.checkOut || params.get('checkOut') || '');
  const [adults, setAdults] = useState(state.adults || Number(params.get('guests')) || 2);
  const [children, setChildren] = useState(state.children || 0);
  const [villaCount, setVillaCount] = useState(state.villaCount || 1);
  const [error, setError] = useState('');

  useEffect(() => {
    const villaSlug = params.get('villa');
    if (villaSlug) {
      const v = getVillaBySlug(villaSlug);
      if (v) setState((s) => ({ ...s, selectedVilla: v }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    if (!checkIn || !checkOut) return setError('Please select both check-in and check-out dates.');
    if (checkIn < today) return setError('Check-in date cannot be in the past.');
    if (checkOut <= checkIn) return setError('Check-out date must be after check-in date.');
    const totalGuests = adults + children;
    if (totalGuests > maxCapacity * villaCount) return setError(`Guest number exceeds the capacity available. Our largest villa sleeps ${maxCapacity} guests — consider booking more than one villa.`);
    setError('');
    setState((s) => ({ ...s, checkIn, checkOut, adults, children, villaCount }));
    navigate('/book/select');
  };

  return (
    <div className="bg-white rounded-3xl border border-charcoal-100 p-6 sm:p-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-2">Search Availability</h1>
      <p className="text-charcoal-500 text-sm mb-8">Step 1 of 5 — choose your dates and number of guests.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-charcoal-700 flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Check-in</span>
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-charcoal-700 flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Check-out</span>
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Counter label="Adults" icon={<Users className="h-4 w-4" />} value={adults} min={1} onChange={setAdults} />
        <Counter label="Children" value={children} min={0} onChange={setChildren} />
        <Counter label="Number of Villas" value={villaCount} min={1} max={3} onChange={setVillaCount} />
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <Button size="lg" onClick={handleContinue} className="w-full sm:w-auto">Search Villas</Button>
    </div>
  );
}

function Counter({ label, icon, value, min, max = 10, onChange }: { label: string; icon?: React.ReactNode; value: number; min: number; max?: number; onChange: (n: number) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-charcoal-700 flex items-center gap-1.5">{icon} {label}</span>
      <div className="flex items-center justify-between border border-charcoal-200 rounded-lg px-3 py-2">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="p-1 rounded-full hover:bg-charcoal-100"><Minus className="h-4 w-4" /></button>
        <span className="text-sm font-medium">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="p-1 rounded-full hover:bg-charcoal-100"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
