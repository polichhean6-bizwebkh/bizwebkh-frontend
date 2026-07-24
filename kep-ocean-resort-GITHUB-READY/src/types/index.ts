// Shared TypeScript types for Kep Ocean Resort demo.
// NOTE: This is a frontend demo. In production these types would mirror
// a real backend/database schema shared via generated API types.

export type ViewType = 'Ocean View' | 'Garden View' | 'Pool View' | 'Sunset View';

export interface Villa {
  id: string;
  code: string;
  slug: string;
  name: string;
  type: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  maxGuests: number;
  beds: string;
  bathrooms: number;
  sizeSqm: number;
  view: ViewType;
  amenities: string[];
  houseRules: string[];
  pricePerNight: number;
  status: 'Available' | 'Reserved' | 'Occupied' | 'Cleaning' | 'Maintenance' | 'Blocked';
  cleaningStatus: 'Clean' | 'Cleaning' | 'Needs Cleaning';
  maintenanceNote?: string;
  currentGuest?: string;
  featured?: boolean;
}

export type BookingStatus =
  | 'New'
  | 'Pending'
  | 'Confirmed'
  | 'Checked In'
  | 'Checked Out'
  | 'Cancelled'
  | 'No Show';

export type PaymentStatus = 'Unpaid' | 'Deposit Paid' | 'Partially Paid' | 'Paid' | 'Refunded';
export type PaymentMethod = 'Cash' | 'Bank Transfer' | 'KHQR' | 'Card' | 'Other';
export type BookingSource = 'Website' | 'Phone' | 'Walk-in' | 'Telegram' | 'WhatsApp' | 'Facebook' | 'Agent';

export interface BookingExtra {
  id: string;
  label: string;
  price: number;
}

export interface Booking {
  id: string; // e.g. KOR-2026-0001
  guestId: string;
  guestName: string;
  villaId: string;
  villaName: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  adults: number;
  children: number;
  extras: BookingExtra[];
  nightlyRate: number;
  subtotal: number;
  serviceCharge: number;
  total: number;
  depositAmount: number;
  paidAmount: number;
  balance: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  source: BookingSource;
  status: BookingStatus;
  contactMethod: 'Phone' | 'Email' | 'Telegram' | 'WhatsApp';
  contactValue: string;
  specialRequests?: string;
  internalNotes?: string;
  createdAt: string;
  arrivalTime?: string;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationality: string;
  stays: number;
  lastStay?: string;
  upcomingBooking?: string;
  totalSpending: number;
  notes?: string;
  preferences?: string;
}

export type MenuCategory =
  | 'Breakfast'
  | 'Khmer Food'
  | 'Seafood'
  | 'Western Food'
  | 'Snacks'
  | 'Cocktails'
  | 'Beer'
  | 'Wine'
  | 'Soft Drinks'
  | 'Juice'
  | 'Coffee';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  image: string;
  description: string;
  available: boolean;
}

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface OrderLineItem {
  menuItemId: string;
  name: string;
  qty: number;
  price: number;
}

export interface GuestOrder {
  id: string;
  guestName: string;
  villaName: string;
  items: OrderLineItem[];
  total: number;
  orderTime: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
}

export interface Experience {
  id: string;
  name: string;
  image: string;
  description: string;
  operatedByResort: boolean;
}

export interface Review {
  id: string;
  guestName: string;
  country: string;
  rating: number;
  review: string;
  stayType: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: 'Villas' | 'Food' | 'Bar' | 'Ocean' | 'Experiences';
  alt: string;
}
