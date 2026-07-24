import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Printer, Download, Home, MessageCircle } from 'lucide-react';
import { Button, LinkButton } from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { formatUSD, formatDate } from '../../lib/format';
import type { Booking } from '../../types';
import { resortConfig } from '../../data/resortConfig';

export default function Confirmation() {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('kor_last_booking');
    if (raw) setBooking(JSON.parse(raw));
  }, []);

  if (!booking) return <Navigate to="/book/search" replace />;

  const handleDownload = () => {
    const text = `Kep Ocean Resort — Booking Summary (Demo)
Booking Reference: ${booking.id}
Status: ${booking.status}

Guest: ${booking.guestName}
Villa: ${booking.villaName}
Check-in: ${formatDate(booking.checkIn)}
Check-out: ${formatDate(booking.checkOut)}
Nights: ${booking.nights}
Guests: ${booking.adults} adults, ${booking.children} children

Total: ${formatUSD(booking.total)}
Deposit Due: ${formatUSD(booking.depositAmount)}

This is a demo booking summary. No payment has been processed.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${booking.id}-summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center">
      <div className="bg-white rounded-3xl border border-charcoal-100 p-8 sm:p-12 print:border-none">
        <CheckCircle2 className="h-16 w-16 text-turquoise-600 mx-auto mb-5" />
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-700 mb-2">Booking Request Received</p>
        <h1 className="font-display text-3xl font-semibold mb-3">Thank You, {booking.guestName.split(' ')[0] || 'Guest'}!</h1>
        <p className="text-charcoal-600 max-w-lg mx-auto leading-relaxed mb-6">{resortConfig.policies.confirmationMessage}</p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-sm text-charcoal-500">Booking Reference:</span>
          <span className="font-mono font-semibold text-ocean-800">{booking.id}</span>
          <Badge>{booking.status}</Badge>
        </div>

        <div className="text-left max-w-md mx-auto bg-sand-50 rounded-2xl p-6 space-y-2 text-sm text-charcoal-700 mb-8">
          <div className="flex justify-between"><span className="text-charcoal-400">Villa</span><span className="font-medium">{booking.villaName}</span></div>
          <div className="flex justify-between"><span className="text-charcoal-400">Check-in</span><span className="font-medium">{formatDate(booking.checkIn)}</span></div>
          <div className="flex justify-between"><span className="text-charcoal-400">Check-out</span><span className="font-medium">{formatDate(booking.checkOut)}</span></div>
          <div className="flex justify-between"><span className="text-charcoal-400">Guests</span><span className="font-medium">{booking.adults} adults, {booking.children} children</span></div>
          <div className="flex justify-between"><span className="text-charcoal-400">Contact Method</span><span className="font-medium">{booking.contactMethod}</span></div>
          <div className="flex justify-between pt-2 border-t border-sand-200"><span className="text-charcoal-400">Total</span><span className="font-semibold">{formatUSD(booking.total)}</span></div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Button variant="outlineLight" size="md" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print Booking</Button>
          <Button variant="outlineLight" size="md" onClick={handleDownload}><Download className="h-4 w-4" /> Download Summary</Button>
          <LinkButton to="/" variant="primary" size="md"><Home className="h-4 w-4" /> Return Home</LinkButton>
          <LinkButton to="/contact" variant="ghost" size="md"><MessageCircle className="h-4 w-4" /> Contact Resort</LinkButton>
        </div>
      </div>
      <p className="text-xs text-charcoal-400 mt-6">Demo booking — this reservation exists only in this browser session.</p>
    </div>
  );
}
