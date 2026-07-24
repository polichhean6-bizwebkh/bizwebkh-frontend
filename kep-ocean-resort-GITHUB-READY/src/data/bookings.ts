import type { Booking, BookingStatus, PaymentStatus, PaymentMethod, BookingSource, BookingExtra } from '../types';
import { villas } from './villas';
import { guests } from './guests';
import { resortConfig } from './resortConfig';

interface Raw {
  guestId: string;
  villaId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  extras?: BookingExtra[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paidRatio: number; // 0-1 of total already paid
  source: BookingSource;
  contactMethod: 'Phone' | 'Email' | 'Telegram' | 'WhatsApp';
  createdDaysBefore: number;
  specialRequests?: string;
  internalNotes?: string;
  arrivalTime?: string;
}

const villaById = (id: string) => villas.find((v) => v.id === id)!;
const nightsBetween = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

function build(raw: Raw[]): Booking[] {
  return raw.map((r, i) => {
    const villa = villaById(r.villaId);
    const guest = guests.find((g) => g.id === r.guestId)!;
    const nights = nightsBetween(r.checkIn, r.checkOut);
    const extras = r.extras ?? [];
    const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
    const subtotal = villa.pricePerNight * nights + extrasTotal;
    const serviceCharge = Math.round(subtotal * (resortConfig.policies.serviceChargePercent / 100) * 100) / 100;
    const total = Math.round((subtotal + serviceCharge) * 100) / 100;
    const depositAmount = Math.round(total * (resortConfig.policies.depositPercent / 100) * 100) / 100;
    const paidAmount = Math.round(total * r.paidRatio * 100) / 100;
    const balance = Math.round((total - paidAmount) * 100) / 100;
    const created = new Date(r.checkIn);
    created.setDate(created.getDate() - r.createdDaysBefore);
    return {
      id: `KOR-2026-${String(i + 1).padStart(4, '0')}`,
      guestId: guest.id,
      guestName: guest.name,
      villaId: villa.id,
      villaName: villa.name,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      nights,
      adults: r.adults,
      children: r.children,
      extras,
      nightlyRate: villa.pricePerNight,
      subtotal,
      serviceCharge,
      total,
      depositAmount,
      paidAmount,
      balance,
      paymentStatus: r.paymentStatus,
      paymentMethod: r.paymentMethod,
      source: r.source,
      status: r.status,
      contactMethod: r.contactMethod,
      contactValue: r.contactMethod === 'Email' ? guest.email : guest.phone,
      specialRequests: r.specialRequests,
      internalNotes: r.internalNotes,
      createdAt: created.toISOString().slice(0, 10),
      arrivalTime: r.arrivalTime,
    };
  });
}

// Anchor "today" for this demo dataset is 2026-07-24.
export const bookingsRaw: Raw[] = [
  { guestId: 'g4', villaId: 'v1', checkIn: '2026-07-24', checkOut: '2026-07-27', adults: 2, children: 0, status: 'Checked In', paymentStatus: 'Paid', paymentMethod: 'KHQR', paidRatio: 1, source: 'Website', contactMethod: 'Telegram', createdDaysBefore: 14, arrivalTime: '15:30', specialRequests: 'High floor if possible' },
  { guestId: 'g16', villaId: 'v6', checkIn: '2026-07-26', checkOut: '2026-07-28', adults: 2, children: 1, status: 'Confirmed', paymentStatus: 'Deposit Paid', paymentMethod: 'Bank Transfer', paidRatio: 0.3, source: 'Website', contactMethod: 'WhatsApp', createdDaysBefore: 10 },
  { guestId: 'g14', villaId: 'v3', checkIn: '2026-07-29', checkOut: '2026-08-02', adults: 2, children: 2, status: 'Confirmed', paymentStatus: 'Deposit Paid', paymentMethod: 'KHQR', paidRatio: 0.3, source: 'Facebook', contactMethod: 'Telegram', createdDaysBefore: 20 },
  { guestId: 'g8', villaId: 'v8', checkIn: '2026-08-02', checkOut: '2026-08-06', adults: 2, children: 0, status: 'Pending', paymentStatus: 'Unpaid', paidRatio: 0, source: 'Website', contactMethod: 'Email', createdDaysBefore: 5, specialRequests: 'Anniversary — romantic setup requested', extras: [{ id: 'x1', label: 'Romantic Room Setup', price: 20 }] },
  { guestId: 'g11', villaId: 'v4', checkIn: '2026-08-10', checkOut: '2026-08-13', adults: 2, children: 0, status: 'Confirmed', paymentStatus: 'Deposit Paid', paymentMethod: 'Card', paidRatio: 0.3, source: 'Agent', contactMethod: 'Email', createdDaysBefore: 25 },
  { guestId: 'g1', villaId: 'v2', checkIn: '2026-07-18', checkOut: '2026-07-20', adults: 1, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Cash', paidRatio: 1, source: 'Phone', contactMethod: 'Phone', createdDaysBefore: 6 },
  { guestId: 'g2', villaId: 'v4', checkIn: '2026-05-12', checkOut: '2026-05-15', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'KHQR', paidRatio: 1, source: 'Website', contactMethod: 'Email', createdDaysBefore: 30, extras: [{ id: 'x2', label: 'Romantic Room Setup', price: 20 }] },
  { guestId: 'g3', villaId: 'v1', checkIn: '2026-06-01', checkOut: '2026-06-04', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Bank Transfer', paidRatio: 1, source: 'Website', contactMethod: 'WhatsApp', createdDaysBefore: 15 },
  { guestId: 'g5', villaId: 'v6', checkIn: '2026-03-28', checkOut: '2026-03-30', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Card', paidRatio: 1, source: 'Website', contactMethod: 'Email', createdDaysBefore: 12 },
  { guestId: 'g6', villaId: 'v7', checkIn: '2026-03-06', checkOut: '2026-03-08', adults: 1, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Cash', paidRatio: 1, source: 'Walk-in', contactMethod: 'Phone', createdDaysBefore: 0 },
  { guestId: 'g7', villaId: 'v3', checkIn: '2026-06-16', checkOut: '2026-06-19', adults: 2, children: 1, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'KHQR', paidRatio: 1, source: 'Telegram', contactMethod: 'Telegram', createdDaysBefore: 8 },
  { guestId: 'g9', villaId: 'v5', checkIn: '2026-07-03', checkOut: '2026-07-06', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Bank Transfer', paidRatio: 1, source: 'Website', contactMethod: 'Email', createdDaysBefore: 18 },
  { guestId: 'g10', villaId: 'v1', checkIn: '2026-06-23', checkOut: '2026-06-25', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'KHQR', paidRatio: 1, source: 'Website', contactMethod: 'Telegram', createdDaysBefore: 9 },
  { guestId: 'g12', villaId: 'v8', checkIn: '2026-05-20', checkOut: '2026-05-24', adults: 2, children: 1, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Card', paidRatio: 1, source: 'Agent', contactMethod: 'Email', createdDaysBefore: 40 },
  { guestId: 'g13', villaId: 'v2', checkIn: '2026-07-16', checkOut: '2026-07-18', adults: 1, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Cash', paidRatio: 1, source: 'Walk-in', contactMethod: 'Phone', createdDaysBefore: 1 },
  { guestId: 'g15', villaId: 'v4', checkIn: '2026-06-28', checkOut: '2026-06-30', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'Bank Transfer', paidRatio: 1, source: 'Website', contactMethod: 'WhatsApp', createdDaysBefore: 22 },
  { guestId: 'g4', villaId: 'v5', checkIn: '2026-07-08', checkOut: '2026-07-10', adults: 2, children: 0, status: 'Checked Out', paymentStatus: 'Paid', paymentMethod: 'KHQR', paidRatio: 1, source: 'Website', contactMethod: 'Telegram', createdDaysBefore: 7 },
  { guestId: 'g3', villaId: 'v6', checkIn: '2026-08-15', checkOut: '2026-08-18', adults: 2, children: 0, status: 'New', paymentStatus: 'Unpaid', paidRatio: 0, source: 'Website', contactMethod: 'Email', createdDaysBefore: 1, specialRequests: 'Late check-in around 22:00' },
  { guestId: 'g6', villaId: 'v7', checkIn: '2026-08-05', checkOut: '2026-08-07', adults: 2, children: 0, status: 'Cancelled', paymentStatus: 'Refunded', paymentMethod: 'Bank Transfer', paidRatio: 0, source: 'Website', contactMethod: 'Email', createdDaysBefore: 15, internalNotes: 'Guest cancelled due to flight change. Deposit refunded.' },
  { guestId: 'g9', villaId: 'v3', checkIn: '2026-07-24', checkOut: '2026-07-26', adults: 3, children: 1, status: 'Checked In', paymentStatus: 'Partially Paid', paymentMethod: 'Cash', paidRatio: 0.6, source: 'Phone', contactMethod: 'Phone', createdDaysBefore: 3, arrivalTime: '13:00' },
  { guestId: 'g10', villaId: 'v8', checkIn: '2026-08-20', checkOut: '2026-08-24', adults: 2, children: 2, status: 'Confirmed', paymentStatus: 'Deposit Paid', paymentMethod: 'KHQR', paidRatio: 0.3, source: 'Website', contactMethod: 'Telegram', createdDaysBefore: 12, extras: [{ id: 'x3', label: 'Airport Transfer', price: 15 }, { id: 'x4', label: 'Breakfast (per day)', price: 24 }] },
  { guestId: 'g12', villaId: 'v1', checkIn: '2026-07-24', checkOut: '2026-07-25', adults: 2, children: 0, status: 'Checked In', paymentStatus: 'Paid', paymentMethod: 'Card', paidRatio: 1, source: 'Website', contactMethod: 'Email', createdDaysBefore: 4, arrivalTime: '14:45' },
  { guestId: 'g13', villaId: 'v5', checkIn: '2026-08-01', checkOut: '2026-08-03', adults: 2, children: 0, status: 'No Show', paymentStatus: 'Unpaid', paidRatio: 0, source: 'Walk-in', contactMethod: 'Phone', createdDaysBefore: 0, internalNotes: 'Guest did not arrive, no contact received.' },
  { guestId: 'g7', villaId: 'v2', checkIn: '2026-07-22', checkOut: '2026-07-24', adults: 2, children: 0, status: 'Checked In', paymentStatus: 'Paid', paymentMethod: 'Cash', paidRatio: 1, source: 'Walk-in', contactMethod: 'Phone', createdDaysBefore: 1 },
];

export const bookings: Booking[] = build(bookingsRaw);

export const getBookingById = (id: string) => bookings.find((b) => b.id === id);
