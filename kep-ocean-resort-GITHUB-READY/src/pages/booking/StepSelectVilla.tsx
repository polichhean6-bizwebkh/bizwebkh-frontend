import { useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Users, BedDouble, ArrowLeft, Check } from 'lucide-react';
import { useBookingFlow } from '../../context/BookingFlowContext';
import { villas } from '../../data/villas';
import { formatUSD, nightsBetween, formatDate } from '../../lib/format';
import { Button } from '../../components/ui/Button';

export default function StepSelectVilla() {
  const navigate = useNavigate();
  const { state, setState } = useBookingFlow();
  const [maxPrice, setMaxPrice] = useState(200);
  const [view, setView] = useState('All');

  if (!state.checkIn || !state.checkOut) return <Navigate to="/book/search" replace />;

  const nights = nightsBetween(state.checkIn, state.checkOut);
  const totalGuests = state.adults + state.children;

  const matches = useMemo(() => {
    return villas.filter((v) => {
      if (v.status !== 'Available') return false;
      if (v.maxGuests < Math.ceil(totalGuests / state.villaCount)) return false;
      if (v.pricePerNight > maxPrice) return false;
      if (view !== 'All' && v.view !== view) return false;
      return true;
    });
  }, [maxPrice, view, totalGuests, state.villaCount]);

  const handleSelect = (villaId: string) => {
    const villa = villas.find((v) => v.id === villaId)!;
    setState((s) => ({ ...s, selectedVilla: villa }));
    navigate('/book/extras');
  };

  return (
    <div>
      <button onClick={() => navigate('/book/search')} className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Edit search
      </button>

      <div className="bg-white rounded-3xl border border-charcoal-100 p-6 sm:p-8 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">Select Your Villa</h1>
        <p className="text-charcoal-500 text-sm mb-6">
          Step 2 of 5 — {formatDate(state.checkIn)} to {formatDate(state.checkOut)} · {nights} night{nights !== 1 ? 's' : ''} · {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-charcoal-500 text-xs font-medium">Max price / night: ${maxPrice}</span>
            <input type="range" min={50} max={150} step={5} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-charcoal-500 text-xs font-medium">View type</span>
            <select value={view} onChange={(e) => setView(e.target.value)} className="border border-charcoal-200 rounded-lg px-3 py-2">
              <option>All</option>
              <option>Ocean View</option>
              <option>Garden View</option>
              <option>Pool View</option>
              <option>Sunset View</option>
            </select>
          </label>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-charcoal-100 p-10 text-center text-charcoal-500">
          No villas match your search. Try adjusting filters or guest count.
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((v) => {
            const total = v.pricePerNight * nights;
            const selected = state.selectedVilla?.id === v.id;
            return (
              <div key={v.id} className={`bg-white rounded-2xl border p-5 flex flex-col sm:flex-row gap-5 ${selected ? 'border-ocean-500 ring-2 ring-ocean-100' : 'border-charcoal-100'}`}>
                <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden shrink-0">
                  <img src={v.images[0]} alt={v.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-display text-lg font-semibold">{v.name}</h3>
                    <span className="text-lg font-semibold text-ocean-800 shrink-0">{formatUSD(v.pricePerNight)}<span className="text-xs font-normal text-charcoal-500">/night</span></span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal-500 mb-3">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Up to {v.maxGuests} guests</span>
                    <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {v.beds}</span>
                    <span>{v.view}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {v.amenities.slice(0, 4).map((a) => <span key={a} className="text-[11px] bg-sand-100 text-charcoal-600 rounded-full px-2.5 py-1">{a}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-charcoal-600">Estimated total: <span className="font-semibold text-charcoal-900">{formatUSD(total)}</span> for {nights} night{nights !== 1 ? 's' : ''}</p>
                    <Button onClick={() => handleSelect(v.id)} variant={selected ? 'secondary' : 'primary'} size="sm">
                      {selected ? <><Check className="h-4 w-4" /> Selected</> : 'Select'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
