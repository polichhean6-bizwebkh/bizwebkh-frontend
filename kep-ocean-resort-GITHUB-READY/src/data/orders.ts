import type { GuestOrder, OrderLineItem } from '../types';
import { menuItems } from './menu';

const item = (id: string, qty: number): OrderLineItem => {
  const m = menuItems.find((i) => i.id === id)!;
  return { menuItemId: m.id, name: m.name, qty, price: m.price };
};
const total = (items: OrderLineItem[]) => Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;

const rawOrders: Omit<GuestOrder, 'total'>[] = [
  { id: 'ORD-0001', guestName: 'Sok Dara', villaName: 'Ocean View Villa', items: [item('m4', 1), item('m18', 2)], orderTime: '2026-07-24 12:30', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0002', guestName: 'Heng Vibol', villaName: 'Garden Villa', items: [item('m7', 1), item('m20', 1)], orderTime: '2026-07-24 13:05', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0003', guestName: 'Sok Chan Sopheak', villaName: 'Family Villa', items: [item('m11', 2), item('m21', 2)], orderTime: '2026-07-24 13:40', status: 'Ready', paymentStatus: 'Unpaid' },
  { id: 'ORD-0004', guestName: 'Kenji Nakamura', villaName: 'Sunset Villa', items: [item('m15', 2)], orderTime: '2026-07-24 18:10', status: 'Preparing', paymentStatus: 'Unpaid' },
  { id: 'ORD-0005', guestName: 'Sok Dara', villaName: 'Ocean View Villa', items: [item('m2', 1), item('m22', 1)], orderTime: '2026-07-24 08:15', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0006', guestName: 'Ly Sophea', villaName: 'Poolside Villa', items: [item('m16', 2), item('m13', 1)], orderTime: '2026-07-23 19:20', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0007', guestName: 'Oliver Bennett', villaName: 'Premium Ocean Villa', items: [item('m6', 1), item('m19', 1)], orderTime: '2026-07-23 19:45', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0008', guestName: 'Pich Chanthy', villaName: 'Garden Villa', items: [item('m9', 1)], orderTime: '2026-07-23 12:00', status: 'Cancelled', paymentStatus: 'Refunded' },
  { id: 'ORD-0009', guestName: 'Marc Dubois', villaName: 'Deluxe Couple Villa', items: [item('m17', 2), item('m14', 1)], orderTime: '2026-07-22 20:00', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0010', guestName: 'Chan Sreymom', villaName: 'Sunset Villa', items: [item('m5', 1), item('m23', 1)], orderTime: '2026-07-10 09:30', status: 'Delivered', paymentStatus: 'Paid' },
  { id: 'ORD-0011', guestName: 'Grace Kim', villaName: 'Family Villa', items: [item('m1', 2), item('m3', 1)], orderTime: '2026-07-24 09:00', status: 'New', paymentStatus: 'Unpaid' },
];

export const guestOrders: GuestOrder[] = rawOrders.map((o) => ({ ...o, total: total(o.items) }));
