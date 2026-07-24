import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Printer, MessageCircle, CheckCircle2, LogIn, LogOut, Ban, Wallet } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import Badge from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import { formatUSD, formatDate } from '../../lib/format';
import type { BookingStatus } from '../../types';

export default function BookingDetail() {
  const { id } = useParams();
  const { bookings, updateBooking } = useAppData();
  const booking = bookings.find((b) => b.id === id);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [notes, setNotes] = useState(booking?.internalNotes ?? '');

  if (!booking) return <Navigate to="/admin/bookings" replace />;

  const setStatus = (status: BookingStatus) => updateBooking(booking.id, { status });
  const recordPayment = () => {
    const paid = Math.min(booking.total, booking.paidAmount + booking.depositAmount || booking.total);
    updateBooking(booking.id, { paidAmount: paid, balance: Math.round((booking.total - paid) * 100) / 100, paymentStatus: paid >= booking.total ? 'Paid' : 'Partially Paid' });
  };
  const saveNotes = () => updateBooking(booking.id, { internalNotes: notes });

  const timeline = [
    { label: 'Booking created', date: booking.createdAt },
    ...(booking.status !== 'New' && booking.status !== 'Pending' ? [{ label: 'Booking confirmed', date: booking.createdAt }] : []),
    ...(booking.status === 'Checked In' || booking.status === 'Checked Out' ? [{ label: 'Guest checked in', date: booking.checkIn }] : []),
    ...(booking.status === 'Checked Out' ? [{ label: 'Guest checked out', date: booking.checkOut }] : []),
    ...(booking.status === 'Cancelled' ? [{ label: 'Booking cancelled', date: booking.createdAt }] : []),
  ];

  return (
    <div className="max-w-4xl">
      <Link to="/admin/bookings" className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to bookings
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900 flex items-center gap-3">
            {booking.id} <Badge>{booking.status}</Badge>
          </h1>
          <p className="text-charcoal-500 text-sm">Created {formatDate(booking.createdAt)} via {booking.source}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {booking.status !== 'Confirmed' && booking.status !== 'Checked In' && booking.status !== 'Checked Out' && booking.status !== 'Cancelled' && (
            <Button size="sm" variant="outlineLight" onClick={() => setStatus('Confirmed')}><CheckCircle2 className="h-4 w-4" /> Confirm</Button>
          )}
          {booking.status === 'Confirmed' && (
            <Button size="sm" variant="outlineLight" onClick={() => setStatus('Checked In')}><LogIn className="h-4 w-4" /> Check In</Button>
          )}
          {booking.status === 'Checked In' && (
            <Button size="sm" variant="outlineLight" onClick={() => setStatus('Checked Out')}><LogOut className="h-4 w-4" /> Check Out</Button>
          )}
          {booking.status !== 'Cancelled' && booking.status !== 'Checked Out' && (
            <Button size="sm" variant="danger" onClick={() => setConfirmCancel(true)}><Ban className="h-4 w-4" /> Cancel</Button>
          )}
          <Button size="sm" variant="outlineLight" onClick={recordPayment}><Wallet className="h-4 w-4" /> Record Payment</Button>
          <Button size="sm" variant="outlineLight" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print</Button>
          <Button size="sm" variant="outlineLight"><MessageCircle className="h-4 w-4" /> Contact Guest</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-3">Guest Details</h3>
          <dl className="text-sm space-y-2 text-charcoal-600">
            <div className="flex justify-between"><dt className="text-charcoal-400">Name</dt><dd>{booking.guestName}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Contact via</dt><dd>{booking.contactMethod}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Contact value</dt><dd>{booking.contactValue}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Guests</dt><dd>{booking.adults} adults, {booking.children} children</dd></div>
          </dl>
        </div>
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-3">Stay Information</h3>
          <dl className="text-sm space-y-2 text-charcoal-600">
            <div className="flex justify-between"><dt className="text-charcoal-400">Villa</dt><dd>{booking.villaName}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Check-in</dt><dd>{formatDate(booking.checkIn)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Check-out</dt><dd>{formatDate(booking.checkOut)}</dd></div>
            <div className="flex justify-between"><dt className="text-charcoal-400">Nights</dt><dd>{booking.nights}</dd></div>
            {booking.arrivalTime && <div className="flex justify-between"><dt className="text-charcoal-400">Arrival time</dt><dd>{booking.arrivalTime}</dd></div>}
          </dl>
        </div>
      </div>

      {booking.extras.length > 0 && (
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6 mb-6">
          <h3 className="font-semibold text-charcoal-900 mb-3">Extras</h3>
          <ul className="text-sm text-charcoal-600 space-y-1.5">
            {booking.extras.map((e) => <li key={e.id} className="flex justify-between"><span>{e.label}</span><span>{e.price > 0 ? formatUSD(e.price) : 'Inquiry'}</span></li>)}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6 mb-6">
        <h3 className="font-semibold text-charcoal-900 mb-3">Payment History</h3>
        <dl className="text-sm space-y-2 text-charcoal-600">
          <div className="flex justify-between"><dt>Total</dt><dd className="font-medium text-charcoal-900">{formatUSD(booking.total)}</dd></div>
          <div className="flex justify-between"><dt>Paid</dt><dd>{formatUSD(booking.paidAmount)}</dd></div>
          <div className="flex justify-between"><dt>Balance</dt><dd>{formatUSD(booking.balance)}</dd></div>
          <div className="flex justify-between"><dt>Payment status</dt><dd><Badge>{booking.paymentStatus}</Badge></dd></div>
          {booking.paymentMethod && <div className="flex justify-between"><dt>Method</dt><dd>{booking.paymentMethod}</dd></div>}
        </dl>
      </div>

      {booking.specialRequests && (
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6 mb-6">
          <h3 className="font-semibold text-charcoal-900 mb-2">Special Requests</h3>
          <p className="text-sm text-charcoal-600">{booking.specialRequests}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6 mb-6">
        <h3 className="font-semibold text-charcoal-900 mb-3">Internal Notes</h3>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm mb-3" placeholder="Notes visible to staff only" />
        <Button size="sm" variant="outlineLight" onClick={saveNotes}>Save Notes</Button>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
        <h3 className="font-semibold text-charcoal-900 mb-4">Activity Timeline</h3>
        <ol className="relative border-l border-charcoal-200 pl-5 space-y-4">
          {timeline.map((t, i) => (
            <li key={i}>
              <span className="absolute -left-[5px] h-2.5 w-2.5 rounded-full bg-ocean-600" />
              <p className="text-sm font-medium text-charcoal-800">{t.label}</p>
              <p className="text-xs text-charcoal-400">{formatDate(t.date)}</p>
            </li>
          ))}
        </ol>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this booking?"
        message="This will mark the booking as Cancelled. This action can be reversed manually if needed."
        confirmLabel="Cancel Booking"
        onConfirm={() => { setStatus('Cancelled'); setConfirmCancel(false); }}
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
}
