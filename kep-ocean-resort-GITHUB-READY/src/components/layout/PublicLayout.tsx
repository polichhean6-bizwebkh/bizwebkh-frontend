import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Sticky mobile booking bar so Book Now is always reachable on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-charcoal-100 p-3 flex items-center justify-between gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="text-sm">
          <p className="font-semibold text-charcoal-900">Ready to relax?</p>
          <p className="text-charcoal-500 text-xs">From $58/night</p>
        </div>
        <Link to="/book" className="rounded-full bg-turquoise-600 text-white text-sm font-semibold px-5 py-2.5 shrink-0">
          Book Now
        </Link>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
