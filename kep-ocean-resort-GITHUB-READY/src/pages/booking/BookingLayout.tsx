import { Outlet, Link, useLocation } from 'react-router-dom';
import { Waves, Check } from 'lucide-react';
import Container from '../../components/ui/Container';

const steps = [
  { path: '/book/search', label: 'Search' },
  { path: '/book/select', label: 'Select Villa' },
  { path: '/book/extras', label: 'Extras' },
  { path: '/book/guest-info', label: 'Guest Info' },
  { path: '/book/review', label: 'Review' },
];

export default function BookingLayout() {
  const location = useLocation();
  const isConfirmation = location.pathname === '/book/confirmation';
  const currentIndex = steps.findIndex((s) => s.path === location.pathname);

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      <header className="bg-white border-b border-charcoal-100 sticky top-0 z-30">
        <Container className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean-700"><Waves className="h-4 w-4 text-white" /></span>
            <span className="font-display font-semibold text-charcoal-900">Kep Ocean Resort</span>
          </Link>
          <span className="text-xs text-charcoal-400 hidden sm:inline">Booking demo — no payment will be charged</span>
        </Container>

        {!isConfirmation && (
          <Container className="pb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
              {steps.map((s, i) => {
                const done = currentIndex > i;
                const active = currentIndex === i;
                return (
                  <div key={s.path} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                      active ? 'bg-ocean-700 text-white' : done ? 'bg-turquoise-100 text-turquoise-800' : 'bg-charcoal-100 text-charcoal-500'
                    }`}>
                      {done ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                    {i < steps.length - 1 && <span className="h-px w-4 sm:w-6 bg-charcoal-200" />}
                  </div>
                );
              })}
            </div>
          </Container>
        )}
      </header>

      <main className="flex-1 py-8 sm:py-12">
        <Container className="max-w-4xl">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
