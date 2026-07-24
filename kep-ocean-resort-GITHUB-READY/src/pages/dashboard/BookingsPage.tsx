import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { villas } from '../../data/villas';
import Badge from '../../components/ui/Badge';
import { formatUSD, formatDateShort } from '../../lib/format';
import type { BookingStatus, PaymentStatus } from '../../types';

const statuses: (BookingStatus | 'All')[] = ['All', 'New', 'Pending', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled', 'No Show'];
const paymentStatuses: (PaymentStatus | 'All')[] = ['All', 'Unpaid', 'Deposit Paid', 'Partially Paid', 'Paid', 'Refunded'];

export default function BookingsPage() {
  const { bookings } = useAppData();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<BookingStatus | 'All'>('All');
  const [villa, setVilla] = useState('All');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | 'All'>('All');

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (status !== 'All' && b.status !== status) return false;
      if (villa !== 'All' && b.villaName !== villa) return false;
      if (paymentStatus !== 'All' && b.paymentStatus !== paymentStatus) return false;
      if (search && !b.guestName.toLowerCase().includes(search.toLowerCase()) && !b.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [bookings, status, villa, paymentStatus, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Bookings</h1>
          <p className="text-charcoal-500 text-sm">{filtered.length} of {bookings.length} bookings</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <label className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guest or booking ID" className="w-full border border-charcoal-200 rounded-lg pl-9 pr-3 py-2 text-sm" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value as BookingStatus | 'All')} className="border border-charcoal-200 rounded-lg px-3 py-2 text-sm">
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={villa} onChange={(e) => setVilla(e.target.value)} className="border border-charcoal-200 rounded-lg px-3 py-2 text-sm">
          <option>All</option>
          {villas.map((v) => <option key={v.id}>{v.name}</option>)}
        </select>
        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus | 'All')} className="border border-charcoal-200 rounded-lg px-3 py-2 text-sm">
          {paymentStatuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
              <th className="py-3 px-4 font-medium">Booking ID</th>
              <th className="py-3 px-4 font-medium">Guest</th>
              <th className="py-3 px-4 font-medium">Villa</th>
              <th className="py-3 px-4 font-medium">Check-in</th>
              <th className="py-3 px-4 font-medium">Check-out</th>
              <th className="py-3 px-4 font-medium">Nights</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Balance</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-charcoal-50 last:border-0 hover:bg-sand-50/50">
                <td className="py-3 px-4 font-medium text-ocean-700">{b.id}</td>
                <td className="py-3 px-4">{b.guestName}</td>
                <td className="py-3 px-4 text-charcoal-500">{b.villaName}</td>
                <td className="py-3 px-4">{formatDateShort(b.checkIn)}</td>
                <td className="py-3 px-4">{formatDateShort(b.checkOut)}</td>
                <td className="py-3 px-4">{b.nights}</td>
                <td className="py-3 px-4">{formatUSD(b.total)}</td>
                <td className="py-3 px-4">{formatUSD(b.balance)}</td>
                <td className="py-3 px-4"><Badge>{b.status}</Badge></td>
                <td className="py-3 px-4">
                  <Link to={`/admin/bookings/${b.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-ocean-700 hover:underline">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((b) => (
          <Link key={b.id} to={`/admin/bookings/${b.id}`} className="block bg-white rounded-2xl border border-charcoal-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-ocean-700 text-sm">{b.id}</span>
              <Badge>{b.status}</Badge>
            </div>
            <p className="font-medium text-charcoal-900">{b.guestName}</p>
            <p className="text-sm text-charcoal-500 mb-2">{b.villaName}</p>
            <div className="flex items-center justify-between text-xs text-charcoal-500">
              <span>{formatDateShort(b.checkIn)} → {formatDateShort(b.checkOut)}</span>
              <span className="font-medium text-charcoal-800">{formatUSD(b.total)}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-charcoal-400 py-10">No bookings match your filters.</p>}
    </div>
  );
}
