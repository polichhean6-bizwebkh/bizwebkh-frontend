import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Search } from 'lucide-react';
import { todayISO } from '../../lib/format';

interface Props {
  variant?: 'hero' | 'card';
}

export default function SearchWidget({ variant = 'hero' }: Props) {
  const navigate = useNavigate();
  const today = todayISO();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    if (checkIn < today) {
      setError('Check-in date cannot be in the past.');
      return;
    }
    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    setError('');
    navigate(`/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const wrap = variant === 'hero'
    ? 'bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-4 sm:p-5'
    : 'bg-white rounded-2xl border border-charcoal-100 p-4';

  return (
    <div className={wrap}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <label className="flex flex-col gap-1 bg-sand-50 rounded-xl px-4 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Check-in
          </span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent text-sm font-medium text-charcoal-900 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 bg-sand-50 rounded-xl px-4 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Check-out
          </span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent text-sm font-medium text-charcoal-900 outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 bg-sand-50 rounded-xl px-4 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-500 flex items-center gap-1">
            <Users className="h-3 w-3" /> Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent text-sm font-medium text-charcoal-900 outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-xl bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold text-sm px-5 py-3"
        >
          <Search className="h-4 w-4" /> Search Villas
        </button>
      </div>
      {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
    </div>
  );
}
