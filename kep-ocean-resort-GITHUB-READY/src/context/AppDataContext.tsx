import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Booking, Villa, MenuItem } from '../types';
import { bookings as seedBookings } from '../data/bookings';
import { villas as seedVillas } from '../data/villas';
import { menuItems as seedMenuItems } from '../data/menu';

interface AppDataContextValue {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  villas: Villa[];
  updateVillaStatus: (id: string, status: Villa['status']) => void;
  menuItems: MenuItem[];
  toggleMenuAvailability: (id: string) => void;
  resetDemoData: () => void;
  lastReset: string | null;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

// In-memory app data store for this demo. Booking submissions made during the
// browser session — plus villa status and menu availability changes made in
// the dashboard — are held here so they immediately reflect across the admin
// dashboard, without any backend/database in place yet. "Reset Demo Data" in
// Settings restores everything back to the original sample dataset.
export function AppDataProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [villas, setVillas] = useState<Villa[]>(seedVillas);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(seedMenuItems);
  const [lastReset, setLastReset] = useState<string | null>(null);

  const addBooking = (booking: Booking) => setBookings((prev) => [booking, ...prev]);
  const updateBooking = (id: string, patch: Partial<Booking>) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const updateVillaStatus = (id: string, status: Villa['status']) =>
    setVillas((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));

  const toggleMenuAvailability = (id: string) =>
    setMenuItems((prev) => prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m)));

  const resetDemoData = () => {
    setBookings(seedBookings);
    setVillas(seedVillas);
    setMenuItems(seedMenuItems);
    setLastReset(new Date().toLocaleString());
  };

  return (
    <AppDataContext.Provider
      value={{ bookings, addBooking, updateBooking, villas, updateVillaStatus, menuItems, toggleMenuAvailability, resetDemoData, lastReset }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
