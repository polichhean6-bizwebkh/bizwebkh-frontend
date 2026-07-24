import { useMemo, useState } from 'react';
import { Fragment } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { villas } from '../../data/villas';
import { todayISO } from '../../lib/format';
import Badge from '../../components/ui/Badge';

type ViewMode = 'Week' | 'Month' | 'Timeline';
const dayCounts: Record<ViewMode, number> = { Week: 7, Month: 30, Timeline: 14 };

function addDays(iso: string, n: number) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const statusColor: Record<string, string> = {
  'Checked In': 'bg-ocean-500',
  Confirmed: 'bg-turquoise-500',
  Pending: 'bg-sand-400',
  New: 'bg-charcoal-400',
  'Checked Out': 'bg-charcoal-300',
};

export default function CalendarPage() {
  const { bookings } = useAppData();
  const [view, setView] = useState<ViewMode>('Week');
  const [start, setStart] = useState(todayISO());
  const [selected, setSelected] = useState<string | null>(null);

  const days = useMemo(() => Array.from({ length: dayCounts[view] }, (_, i) => addDays(start, i)), [start, view]);

  const shift = (dir: 1 | -1) => setStart((s) => addDays(s, dir * dayCounts[view]));

  const bookingsForVilla = (villaId: string) => bookings.filter((b) => b.villaId === villaId && b.status !== 'Cancelled');

  const selectedBooking = bookings.find((b) => b.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Booking Calendar</h1>
          <p className="text-charcoal-500 text-sm">8 villas · reservation overview</p>
        </div>
        <div className="flex items-center gap-2">
          {(['Week', 'Month', 'Timeline'] as ViewMode[]).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${view === v ? 'bg-ocean-700 text-white border-ocean-700' : 'bg-white text-charcoal-600 border-charcoal-200'}`}>{v}</button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white rounded-2xl border border-charcoal-100 px-4 py-3">
        <button onClick={() => shift(-1)} className="p-1.5 rounded-lg hover:bg-charcoal-50"><ChevronLeft className="h-4 w-4" /></button>
        <span className="text-sm font-medium text-charcoal-700">{days[0]} → {days[days.length - 1]}</span>
        <button onClick={() => shift(1)} className="p-1.5 rounded-lg hover:bg-charcoal-50"><ChevronRight className="h-4 w-4" /></button>
      </div>

      {/* Desktop / tablet grid */}
      <div className="hidden sm:block bg-white rounded-2xl border border-charcoal-100 p-4 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid" style={{ gridTemplateColumns: `140px repeat(${days.length}, minmax(36px, 1fr))` }}>
            <div />
            {days.map((d) => (
              <div key={d} className="text-center text-[10px] text-charcoal-400 pb-2">{d.slice(5)}</div>
            ))}
            {villas.map((villa) => {
              const vBookings = bookingsForVilla(villa.id);
              return (
                <Fragment key={villa.id}>
                  <div className="text-xs font-medium text-charcoal-700 py-2 pr-2 truncate border-t border-charcoal-50">{villa.name}</div>
                  {days.map((d) => {
                    const booking = vBookings.find((b) => d >= b.checkIn && d < b.checkOut);
                    const maintenance = villa.status === 'Maintenance' && !booking;
                    return (
                      <button
                        key={villa.id + d}
                        onClick={() => booking && setSelected(booking.id)}
                        className={`h-9 border-t border-l border-charcoal-50 flex items-center justify-center ${booking ? `${statusColor[booking.status] ?? 'bg-charcoal-300'} cursor-pointer` : maintenance ? 'bg-red-50' : 'bg-turquoise-50/40'}`}
                        title={booking ? `${booking.guestName} · ${booking.status}` : maintenance ? 'Maintenance' : 'Available'}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-charcoal-500">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-turquoise-50/40 border border-turquoise-100" /> Available</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-ocean-500" /> Checked In</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-turquoise-500" /> Confirmed</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-sand-400" /> Pending</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-red-50 border border-red-100" /> Maintenance</span>
        </div>
      </div>

      {/* Mobile simplified list */}
      <div className="sm:hidden space-y-3">
        {villas.map((villa) => {
          const active = bookingsForVilla(villa.id).find((b) => days[0] >= b.checkIn && days[0] < b.checkOut);
          return (
            <div key={villa.id} className="bg-white rounded-xl border border-charcoal-100 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-charcoal-900">{villa.name}</p>
                <p className="text-xs text-charcoal-500">{active ? active.guestName : 'Available'}</p>
              </div>
              <Badge>{active ? active.status : villa.status}</Badge>
            </div>
          );
        })}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-semibold">{selectedBooking.id}</h3>
              <Badge>{selectedBooking.status}</Badge>
            </div>
            <p className="text-sm text-charcoal-600 mb-1"><strong>{selectedBooking.guestName}</strong> · {selectedBooking.villaName}</p>
            <p className="text-sm text-charcoal-500">{selectedBooking.checkIn} → {selectedBooking.checkOut}</p>
            <button onClick={() => setSelected(null)} className="mt-4 text-sm text-ocean-700 font-medium">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
