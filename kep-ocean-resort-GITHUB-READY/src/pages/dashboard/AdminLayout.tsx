import { useState } from 'react';
import { Outlet, NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CalendarRange, BookOpen, Home, Users, UtensilsCrossed,
  CreditCard, BarChart3, FileText, Settings, LogOut, Menu, X, Waves,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { to: '/admin/calendar', label: 'Calendar', icon: CalendarRange },
  { to: '/admin/villas', label: 'Villas', icon: Home },
  { to: '/admin/guests', label: 'Guests', icon: Users },
  { to: '/admin/food-bar', label: 'Food & Bar', icon: UtensilsCrossed },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/content', label: 'Website Content', icon: FileText },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { isAuthenticated, adminName, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean-700"><Waves className="h-4 w-4 text-white" /></span>
        <div>
          <p className="font-display font-semibold text-white text-sm leading-tight">Kep Ocean Resort</p>
          <p className="text-white/50 text-[11px]">Management Dashboard</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" /> {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 w-full">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-sand-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-ocean-950 shrink-0">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-ocean-950 flex flex-col">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 text-white/70"><X className="h-5 w-5" /></button>
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-charcoal-100 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 text-charcoal-700"><Menu className="h-5 w-5" /></button>
              <span className="text-sm font-medium text-charcoal-500">Welcome back,</span>
              <span className="text-sm font-semibold text-charcoal-900">{adminName}</span>
            </div>
            <span className="hidden sm:inline text-xs bg-sand-100 text-charcoal-500 px-3 py-1.5 rounded-full" title="Sample information for design and workflow review">Demo Environment — Sample Data</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
