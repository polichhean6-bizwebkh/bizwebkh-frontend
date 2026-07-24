import type { ReactNode } from 'react';

const styles: Record<string, string> = {
  // Booking statuses
  New: 'bg-charcoal-100 text-charcoal-700',
  Pending: 'bg-sand-200 text-sand-900',
  Confirmed: 'bg-turquoise-100 text-turquoise-800',
  'Checked In': 'bg-ocean-100 text-ocean-800',
  'Checked Out': 'bg-charcoal-100 text-charcoal-600',
  Cancelled: 'bg-red-100 text-red-700',
  'No Show': 'bg-red-100 text-red-700',
  // Payment statuses
  Unpaid: 'bg-red-100 text-red-700',
  'Deposit Paid': 'bg-sand-200 text-sand-900',
  'Partially Paid': 'bg-sand-200 text-sand-900',
  Paid: 'bg-turquoise-100 text-turquoise-800',
  Refunded: 'bg-charcoal-100 text-charcoal-600',
  // Villa statuses
  Available: 'bg-turquoise-100 text-turquoise-800',
  Reserved: 'bg-sand-200 text-sand-900',
  Occupied: 'bg-ocean-100 text-ocean-800',
  Cleaning: 'bg-yellow-100 text-yellow-800',
  Maintenance: 'bg-red-100 text-red-700',
  Blocked: 'bg-charcoal-200 text-charcoal-700',
  // Order statuses
  Preparing: 'bg-sand-200 text-sand-900',
  Ready: 'bg-turquoise-100 text-turquoise-800',
  Delivered: 'bg-charcoal-100 text-charcoal-600',
};

export default function Badge({ children }: { children: ReactNode }) {
  const key = String(children);
  const cls = styles[key] ?? 'bg-charcoal-100 text-charcoal-700';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${cls}`}>
      {children}
    </span>
  );
}
