import { resortConfig } from '../data/resortConfig';

export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatKHR(amountUsd: number): string {
  const khr = Math.round(amountUsd * resortConfig.policies.khrExchangeRate);
  return `${khr.toLocaleString('en-US')} KHR`;
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateShort(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  return Math.max(0, Math.round((b - a) / 86400000));
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
