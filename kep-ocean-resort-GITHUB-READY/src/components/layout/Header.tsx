import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Waves } from 'lucide-react';
import { resortConfig } from '../../data/resortConfig';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/villas', label: 'Villas' },
  { to: '/dining', label: 'Dining' },
  { to: '/bar', label: 'Bar' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'KH'>('EN');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur shadow-sm'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${transparent ? 'bg-white/20' : 'bg-ocean-700'}`}>
              <Waves className={`h-5 w-5 ${transparent ? 'text-white' : 'text-white'}`} />
            </span>
            <span className={`font-display text-lg font-semibold leading-tight ${transparent ? 'text-white' : 'text-charcoal-900'}`}>
              {resortConfig.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    transparent
                      ? isActive ? 'text-white' : 'text-white/85 hover:text-white'
                      : isActive ? 'text-ocean-800' : 'text-charcoal-700 hover:text-ocean-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'EN' ? 'KH' : 'EN')}
              className={`text-sm font-medium rounded-full px-3 py-1 border ${
                transparent ? 'border-white/50 text-white' : 'border-charcoal-200 text-charcoal-700'
              }`}
              aria-label="Switch language"
            >
              {lang === 'EN' ? 'EN / KH' : 'KH / EN'}
            </button>
            <Link
              to="/book"
              className="rounded-full bg-turquoise-600 hover:bg-turquoise-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              Book Now
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 rounded-md ${transparent ? 'text-white' : 'text-charcoal-900'}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-charcoal-100 shadow-lg max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-3 px-2 rounded-lg text-base font-medium ${isActive ? 'bg-ocean-50 text-ocean-800' : 'text-charcoal-800'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-charcoal-100">
              <button
                onClick={() => setLang(lang === 'EN' ? 'KH' : 'EN')}
                className="text-sm font-medium rounded-full px-3 py-2 border border-charcoal-200 text-charcoal-700"
              >
                {lang === 'EN' ? 'EN / KH' : 'KH / EN'}
              </button>
              <Link
                to="/book"
                className="rounded-full bg-turquoise-600 text-white text-sm font-semibold px-5 py-3"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
