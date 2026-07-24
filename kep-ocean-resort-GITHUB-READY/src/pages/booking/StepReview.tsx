import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Landmark, QrCode, Banknote, CreditCard } from 'lucide-react';
import { useBookingFlow } from '../../context/BookingFlowContext';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/ui/Button';
import { formatUSD, formatDate, nightsBetween } from '../../lib/format';
import { resortConfig } from '../../data/resortConfig';
import type { Booking } from '../../types';

const paymentOptions = [
  { id: 'Pay at Resort', label: 'Pay at Resort', icon: Wallet },
  { id: 'Bank Transfer', label: 'Bank Transfer', icon: Landmark },
  { id: 'KHQR', label: 'KHQR', icon: QrCode },
  { id: 'Cash', label: 'Cash', icon: Banknote },
] as const;

export default function StepReview() {
  const navigate = useNavigate();
  const { state, reset } = useBookingFlow();
  const { bookings, addBooking } = useAppData();
  const [paymentMethod, setPaymentMethod] = useState<typeof paymentOptions[number]['id']>('Pay at Resort');
  const [agreed, setAgreed] = useState(false);

  if (!state.selectedVilla) return <Navigate to="/book/select" replace />;

  const villa = state.selectedVilla;
  const nights = nightsBetween(state.checkIn, state.checkOut);
  const extrasTotal = state.extras.reduce((s, e) => s + e.price, 0);
  const subtotal = villa.pricePerNight * nights + extrasTotal;
  const serviceCharge = Math.round(subtotal * (resortConfig.policies.serviceChargePercent / 100) * 100) / 100;
  const total = Math.round((subtotal + serviceCharge) * 100) / 100;
  const deposit = Math.round(total * (resortConfig.policies.depositPercent / 100) * 100) / 100;
  const remaining = Math.round((total - deposit) * 100) / 100;

  const handleConfirm = () => {
    const nextNum = bookings.length + 1;
    const id = `KOR-2026-${String(nextNum).padStart(4, '0')}`;
    const contactValue =
      state.guestInfo.preferredContact === 'Email' ? state.guestInfo.email
      : state.guestInfo.preferredContact === 'Phone' ? state.guestInfo.phone
      : state.guestInfo.contactValue;

    const booking: Booking = {
      id,
      guestId: 'new-guest',
      guestName: state.guestInfo.fullName,
      villaId: villa.id,
      villaName: villa.name,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      nights,
      adults: state.adults,
      children: state.children,
      extras: state.extras,
      nightlyRate: villa.pricePerNight,
      subtotal,
      serviceCharge,
      total,
      depositAmount: deposit,
      paidAmount: 0,
      balance: total,
      paymentStatus: 'Unpaid',
      paymentMethod: paymentMethod === 'Pay at Resort' ? undefined : paymentMethod,
      source: 'Website',
      status: 'Pending',
      contactMethod: state.guestInfo.preferredContact,
      contactValue,
      specialRequests: state.guestInfo.specialRequests || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
      arrivalTime: state.guestInfo.arrivalTime || undefined,
    };

    addBooking(booking);
    sessionStorage.setItem('kor_last_booking', JSON.stringify(booking));
    reset();
    navigate('/book/confirmation');
  };

  return (
    <div>
      <button onClick={() => navigate('/book/guest-info')} className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-charcoal-100 p-6 sm:p-8">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">Review Your Booking</h1>
            <p className="text-charcoal-500 text-sm mb-6">Step 5 of 5 — please confirm the details below.</p>

            <div className="flex gap-4 mb-6 pb-6 border-b border-charcoal-100">
              <img src={villa.images[0]} alt={villa.name} className="h-24 w-32 object-cover rounded-xl shrink-0" />
              <div>
                <h3 className="font-medium text-charcoal-900">{villa.name}</h3>
                <p className="text-sm text-charcoal-500">{formatDate(state.checkIn)} → {formatDate(state.checkOut)} · {nights} night{nights !== 1 ? 's' : ''}</p>
                <p className="text-sm text-charcoal-500">{state.adults} adults, {state.children} children</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-charcoal-700 mb-2">Guest Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-charcoal-600 mb-6">
              <p><span className="text-charcoal-400">Name:</span> {state.guestInfo.fullName}</p>
              <p><span className="text-charcoal-400">Phone:</span> {state.guestInfo.phone}</p>
              <p><span className="text-charcoal-400">Email:</span> {state.guestInfo.email}</p>
              <p><span className="text-charcoal-400">Nationality:</span> {state.guestInfo.nationality}</p>
              <p><span className="text-charcoal-400">Contact via:</span> {state.guestInfo.preferredContact}</p>
              {state.guestInfo.arrivalTime && <p><span className="text-charcoal-400">Arrival:</span> {state.guestInfo.arrivalTime}</p>}
            </div>

            {state.extras.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-2">Extras</h3>
                <ul className="text-sm text-charcoal-600 space-y-1 mb-6">
                  {state.extras.map((e) => (
                    <li key={e.id} className="flex justify-between"><span>{e.label}</span><span>{e.price > 0 ? formatUSD(e.price) : 'Inquiry'}</span></li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-sm font-semibold text-charcoal-700 mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
              {paymentOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium ${paymentMethod === p.id ? 'border-ocean-500 bg-ocean-50 text-ocean-800' : 'border-charcoal-200 text-charcoal-600'}`}
                >
                  <p.icon className="h-5 w-5" /> {p.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-charcoal-400 mb-2">
              <CreditCard className="h-3.5 w-3.5" /> Card Payment — coming later
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 bg-white rounded-3xl border border-charcoal-100 p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Price Summary</h3>
            <div className="space-y-2 text-sm text-charcoal-600 mb-4">
              <div className="flex justify-between"><span>{formatUSD(villa.pricePerNight)} × {nights} nights</span><span>{formatUSD(villa.pricePerNight * nights)}</span></div>
              {extrasTotal > 0 && <div className="flex justify-between"><span>Extras</span><span>{formatUSD(extrasTotal)}</span></div>}
              <div className="flex justify-between"><span>Subtotal</span><span>{formatUSD(subtotal)}</span></div>
              <div className="flex justify-between"><span>Service charge ({resortConfig.policies.serviceChargePercent}%)</span><span>{formatUSD(serviceCharge)}</span></div>
            </div>
            <div className="flex justify-between font-semibold text-charcoal-900 border-t border-charcoal-100 pt-3 mb-3">
              <span>Total</span><span>{formatUSD(total)}</span>
            </div>
            <div className="bg-sand-50 rounded-xl p-3 text-xs text-charcoal-600 space-y-1 mb-5">
              <div className="flex justify-between"><span>Deposit due now ({resortConfig.policies.depositPercent}%)</span><span className="font-medium">{formatUSD(deposit)}</span></div>
              <div className="flex justify-between"><span>Remaining at resort</span><span className="font-medium">{formatUSD(remaining)}</span></div>
            </div>
            <label className="flex items-start gap-2 text-xs text-charcoal-500 mb-4">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-ocean-700" />
              I agree to the booking terms and cancellation policy.
            </label>
            <Button size="lg" onClick={handleConfirm} disabled={!agreed} className="w-full">Submit Booking Request</Button>
            <p className="text-[11px] text-center text-charcoal-400 mt-2">No payment is processed now — this is a demo request.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
