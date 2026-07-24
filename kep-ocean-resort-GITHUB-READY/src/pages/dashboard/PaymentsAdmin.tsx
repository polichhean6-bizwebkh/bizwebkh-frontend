import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import Badge from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatUSD, formatDate } from '../../lib/format';
import type { PaymentMethod } from '../../types';

export default function PaymentsAdmin() {
  const { bookings, updateBooking } = useAppData();
  const [modalId, setModalId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('Cash');

  const booking = bookings.find((b) => b.id === modalId);

  const openModal = (id: string) => {
    setModalId(id);
    setAmount('');
    setMethod('Cash');
  };

  const submitPayment = () => {
    if (!booking) return;
    const amt = Math.min(booking.balance, Math.max(0, Number(amount) || 0));
    const paid = Math.round((booking.paidAmount + amt) * 100) / 100;
    const balance = Math.round((booking.total - paid) * 100) / 100;
    updateBooking(booking.id, {
      paidAmount: paid,
      balance,
      paymentMethod: method,
      paymentStatus: balance <= 0 ? 'Paid' : paid > 0 ? 'Partially Paid' : 'Unpaid',
    });
    setModalId(null);
  };

  const totalOutstanding = bookings.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.balance, 0);
  const totalCollected = bookings.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.paidAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Payments</h1>
        <p className="text-charcoal-500 text-sm">Demo payment records — no real money is processed.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-5">
          <p className="text-xs text-charcoal-500 mb-1">Total Collected</p>
          <p className="text-2xl font-semibold text-turquoise-700">{formatUSD(totalCollected)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-charcoal-100 p-5">
          <p className="text-xs text-charcoal-500 mb-1">Total Outstanding</p>
          <p className="text-2xl font-semibold text-red-600">{formatUSD(totalOutstanding)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
              <th className="py-3 px-4 font-medium">Booking</th>
              <th className="py-3 px-4 font-medium">Guest</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Paid</th>
              <th className="py-3 px-4 font-medium">Balance</th>
              <th className="py-3 px-4 font-medium">Method</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-charcoal-50 last:border-0">
                <td className="py-2.5 px-4 font-medium text-ocean-700">{b.id}</td>
                <td className="py-2.5 px-4">{b.guestName}</td>
                <td className="py-2.5 px-4">{formatUSD(b.total)}</td>
                <td className="py-2.5 px-4">{formatUSD(b.paidAmount)}</td>
                <td className="py-2.5 px-4">{formatUSD(b.balance)}</td>
                <td className="py-2.5 px-4 text-charcoal-500">{b.paymentMethod ?? '—'}</td>
                <td className="py-2.5 px-4"><Badge>{b.paymentStatus}</Badge></td>
                <td className="py-2.5 px-4">
                  {b.balance > 0 && b.status !== 'Cancelled' && (
                    <Button size="sm" variant="outlineLight" onClick={() => openModal(b.id)}><Wallet className="h-3.5 w-3.5" /> Record</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {booking && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={() => setModalId(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg font-semibold mb-1">Record Payment</h3>
            <p className="text-xs text-charcoal-500 mb-4">{booking.id} · {booking.guestName} · Balance {formatUSD(booking.balance)}</p>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Amount (USD)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} max={booking.balance} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm mb-4" placeholder={`Up to ${booking.balance}`} />
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm mb-5">
              {(['Cash', 'Bank Transfer', 'KHQR', 'Card', 'Other'] as PaymentMethod[]).map((m) => <option key={m}>{m}</option>)}
            </select>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="outlineLight" onClick={() => setModalId(null)}>Cancel</Button>
              <Button size="sm" onClick={submitPayment}>Save Payment</Button>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-charcoal-400 text-center">Payment date: {formatDate(new Date().toISOString().slice(0,10))} · This is a demo interaction only.</p>
    </div>
  );
}
