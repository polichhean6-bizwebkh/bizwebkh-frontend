import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, CheckCircle2, LogIn, LogOut, Home, DoorOpen, DollarSign, AlertCircle,
  PlusCircle, Ban, UserPlus, Wallet, ClipboardEdit,
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { villas } from '../../data/villas';
import StatCard from '../../components/dashboard/StatCard';
import Badge from '../../components/ui/Badge';
import { formatUSD, formatDateShort, todayISO } from '../../lib/format';

export default function Overview() {
  const { bookings } = useAppData();
  const today = todayISO();

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const pending = bookings.filter((b) => b.status === 'Pending' || b.status === 'New').length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
    const arrivalsToday = bookings.filter((b) => b.checkIn === today && b.status !== 'Cancelled');
    const departuresToday = bookings.filter((b) => b.checkOut === today && b.status !== 'Cancelled');
    const occupied = villas.filter((v) => v.status === 'Occupied').length;
    const available = villas.filter((v) => v.status === 'Available').length;
    const revenue = bookings.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.paidAmount, 0);
    const outstanding = bookings.filter((b) => b.status !== 'Cancelled').reduce((s, b) => s + b.balance, 0);
    return { totalBookings, pending, confirmed, arrivalsToday, departuresToday, occupied, available, revenue, outstanding };
  }, [bookings, today]);

  const recentBookings = [...bookings].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 6);

  const sourceCounts = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => { map[b.source] = (map[b.source] ?? 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [bookings]);

  const upcoming = [...bookings]
    .filter((b) => b.checkIn >= today && b.status !== 'Cancelled')
    .sort((a, b) => (a.checkIn > b.checkIn ? 1 : -1))
    .slice(0, 5);

  const quickActions = [
    { label: 'New Booking', icon: PlusCircle, to: '/admin/bookings' },
    { label: 'Block Villa', icon: Ban, to: '/admin/villas' },
    { label: 'Add Guest', icon: UserPlus, to: '/admin/guests' },
    { label: 'Record Payment', icon: Wallet, to: '/admin/payments' },
    { label: 'Add Expense', icon: ClipboardEdit, to: '/admin/reports' },
    { label: 'Update Villa Status', icon: Home, to: '/admin/villas' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Overview</h1>
        <p className="text-charcoal-500 text-sm">Here's what's happening at Kep Ocean Resort today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bookings" value={stats.totalBookings} icon={BookOpen} tone="ocean" />
        <StatCard label="Pending Bookings" value={stats.pending} icon={Clock} tone="sand" />
        <StatCard label="Confirmed Bookings" value={stats.confirmed} icon={CheckCircle2} tone="turquoise" />
        <StatCard label="Check-ins Today" value={stats.arrivalsToday.length} icon={LogIn} tone="ocean" />
        <StatCard label="Check-outs Today" value={stats.departuresToday.length} icon={LogOut} tone="ocean" />
        <StatCard label="Occupied Villas" value={`${stats.occupied} / 8`} icon={Home} tone="turquoise" />
        <StatCard label="Available Villas" value={`${stats.available} / 8`} icon={DoorOpen} tone="turquoise" />
        <StatCard label="Estimated Revenue" value={formatUSD(stats.revenue)} icon={DollarSign} tone="sand" />
        <StatCard label="Outstanding Payments" value={formatUSD(stats.outstanding)} icon={AlertCircle} tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.to} className="flex flex-col items-center text-center gap-2 border border-charcoal-100 rounded-xl p-3 hover:border-ocean-300 hover:bg-ocean-50 transition-colors">
                <a.icon className="h-5 w-5 text-ocean-700" />
                <span className="text-xs font-medium text-charcoal-700">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Today's Arrivals</h3>
          {stats.arrivalsToday.length === 0 ? <p className="text-sm text-charcoal-400">No arrivals scheduled today.</p> : (
            <ul className="space-y-3">
              {stats.arrivalsToday.map((b) => (
                <li key={b.id} className="flex items-center justify-between text-sm">
                  <div><p className="font-medium text-charcoal-800">{b.guestName}</p><p className="text-xs text-charcoal-400">{b.villaName} {b.arrivalTime && `· ${b.arrivalTime}`}</p></div>
                  <Badge>{b.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Today's Departures</h3>
          {stats.departuresToday.length === 0 ? <p className="text-sm text-charcoal-400">No departures scheduled today.</p> : (
            <ul className="space-y-3">
              {stats.departuresToday.map((b) => (
                <li key={b.id} className="flex items-center justify-between text-sm">
                  <div><p className="font-medium text-charcoal-800">{b.guestName}</p><p className="text-xs text-charcoal-400">{b.villaName}</p></div>
                  <Badge>{b.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-charcoal-100 p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-charcoal-900">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-xs font-medium text-ocean-700 hover:underline">View all</Link>
          </div>
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                <th className="py-2 font-medium">Booking</th>
                <th className="py-2 font-medium">Guest</th>
                <th className="py-2 font-medium">Villa</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-charcoal-50 last:border-0">
                  <td className="py-2.5"><Link to={`/admin/bookings/${b.id}`} className="text-ocean-700 font-medium hover:underline">{b.id}</Link></td>
                  <td className="py-2.5">{b.guestName}</td>
                  <td className="py-2.5 text-charcoal-500">{b.villaName}</td>
                  <td className="py-2.5"><Badge>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Booking Source</h3>
          <ul className="space-y-2.5">
            {sourceCounts.map(([source, count]) => (
              <li key={source} className="flex items-center justify-between text-sm">
                <span className="text-charcoal-600">{source}</span>
                <div className="flex items-center gap-2 flex-1 mx-3">
                  <div className="h-1.5 bg-ocean-100 rounded-full flex-1">
                    <div className="h-1.5 bg-ocean-600 rounded-full" style={{ width: `${(count / bookings.length) * 100}%` }} />
                  </div>
                </div>
                <span className="font-medium text-charcoal-800 w-5 text-right">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
        <h3 className="font-semibold text-charcoal-900 mb-4">Upcoming Reservations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                <th className="py-2 font-medium">Guest</th>
                <th className="py-2 font-medium">Villa</th>
                <th className="py-2 font-medium">Check-in</th>
                <th className="py-2 font-medium">Check-out</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((b) => (
                <tr key={b.id} className="border-b border-charcoal-50 last:border-0">
                  <td className="py-2.5">{b.guestName}</td>
                  <td className="py-2.5 text-charcoal-500">{b.villaName}</td>
                  <td className="py-2.5">{formatDateShort(b.checkIn)}</td>
                  <td className="py-2.5">{formatDateShort(b.checkOut)}</td>
                  <td className="py-2.5"><Badge>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
