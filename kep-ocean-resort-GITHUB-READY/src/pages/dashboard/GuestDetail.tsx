import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { guests } from '../../data/guests';
import { useAppData } from '../../context/AppDataContext';
import Badge from '../../components/ui/Badge';
import { formatUSD, formatDate } from '../../lib/format';

export default function GuestDetail() {
  const { id } = useParams();
  const { bookings } = useAppData();
  const guest = guests.find((g) => g.id === id);
  if (!guest) return <Navigate to="/admin/guests" replace />;

  const history = bookings.filter((b) => b.guestId === guest.id || b.guestName === guest.name);

  return (
    <div className="max-w-3xl space-y-6">
      <Link to="/admin/guests" className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700">
        <ArrowLeft className="h-4 w-4" /> Back to guests
      </Link>

      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">{guest.name}</h1>
        <p className="text-charcoal-500 text-sm">{guest.nationality}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-3">Contact Information</h3>
          <dl className="text-sm space-y-2 text-charcoal-600">
            <div className="flex justify-between"><dt className="text-charcoal-400">Phone</dt><dd>{guest.phone}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Email</dt><dd>{guest.email}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Stays</dt><dd>{guest.stays}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Total Spending</dt><dd className="font-medium text-charcoal-900">{formatUSD(guest.totalSpending)}</dd></div>
          </dl>
        </div>
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-3">Preferences & Notes</h3>
          <p className="text-sm text-charcoal-600 mb-2">{guest.preferences || 'No preferences on file.'}</p>
          <p className="text-sm text-charcoal-500">{guest.notes || 'No internal notes.'}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
        <h3 className="font-semibold text-charcoal-900 mb-4">Booking History</h3>
        {history.length === 0 ? <p className="text-sm text-charcoal-400">No bookings on record for this guest.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                  <th className="py-2 font-medium">Booking</th>
                  <th className="py-2 font-medium">Villa</th>
                  <th className="py-2 font-medium">Dates</th>
                  <th className="py-2 font-medium">Total</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((b) => (
                  <tr key={b.id} className="border-b border-charcoal-50 last:border-0">
                    <td className="py-2.5"><Link to={`/admin/bookings/${b.id}`} className="text-ocean-700 font-medium hover:underline">{b.id}</Link></td>
                    <td className="py-2.5 text-charcoal-500">{b.villaName}</td>
                    <td className="py-2.5">{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</td>
                    <td className="py-2.5">{formatUSD(b.total)}</td>
                    <td className="py-2.5"><Badge>{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
