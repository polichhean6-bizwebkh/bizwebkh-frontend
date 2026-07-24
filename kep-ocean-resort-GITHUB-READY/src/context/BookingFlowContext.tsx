import { createContext, useContext, useState, type ReactNode } from 'react';
import type { BookingExtra, Villa } from '../types';

export interface GuestInfo {
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  arrivalTime: string;
  specialRequests: string;
  preferredContact: 'Phone' | 'Email' | 'Telegram' | 'WhatsApp';
  contactValue: string;
  notes: string;
}

export interface BookingFlowState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  villaCount: number;
  selectedVilla: Villa | null;
  extras: BookingExtra[];
  guestInfo: GuestInfo;
  paymentMethod: 'Pay at Resort' | 'Bank Transfer' | 'KHQR' | 'Cash' | 'Card';
}

const defaultGuestInfo: GuestInfo = {
  fullName: '', phone: '', email: '', nationality: '', arrivalTime: '',
  specialRequests: '', preferredContact: 'Phone', contactValue: '', notes: '',
};

const defaultState: BookingFlowState = {
  checkIn: '', checkOut: '', adults: 2, children: 0, villaCount: 1,
  selectedVilla: null, extras: [], guestInfo: defaultGuestInfo, paymentMethod: 'Pay at Resort',
};

interface BookingFlowContextValue {
  state: BookingFlowState;
  setState: React.Dispatch<React.SetStateAction<BookingFlowState>>;
  reset: () => void;
}

const BookingFlowContext = createContext<BookingFlowContextValue | undefined>(undefined);

export function BookingFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingFlowState>(defaultState);
  const reset = () => setState(defaultState);
  return (
    <BookingFlowContext.Provider value={{ state, setState, reset }}>
      {children}
    </BookingFlowContext.Provider>
  );
}

export function useBookingFlow() {
  const ctx = useContext(BookingFlowContext);
  if (!ctx) throw new Error('useBookingFlow must be used within BookingFlowProvider');
  return ctx;
}
