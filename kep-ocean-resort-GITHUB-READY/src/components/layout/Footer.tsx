import { Link } from 'react-router-dom';
import { Waves, Share2, Camera, Send, Phone, Mail, MapPin } from 'lucide-react';
import { resortConfig } from '../../data/resortConfig';
import Container from '../ui/Container';

export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-white/80">
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Waves className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-lg font-semibold text-white">{resortConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed">{resortConfig.hero.subtitle}</p>
            <div className="flex items-center gap-3 mt-5">
              <a href={resortConfig.social.facebook} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Facebook"><Share2 className="h-4 w-4" /></a>
              <a href={resortConfig.social.instagram} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Instagram"><Camera className="h-4 w-4" /></a>
              <a href={resortConfig.social.telegram} className="p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Telegram"><Send className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/villas" className="hover:text-white">Villas</Link></li>
              <li><Link to="/dining" className="hover:text-white">Dining</Link></li>
              <li><Link to="/bar" className="hover:text-white">Bar</Link></li>
              <li><Link to="/experiences" className="hover:text-white">Experiences</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Villas</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/villas/ocean-view-villa" className="hover:text-white">Ocean View Villa</Link></li>
              <li><Link to="/villas/family-villa" className="hover:text-white">Family Villa</Link></li>
              <li><Link to="/villas/deluxe-couple-villa" className="hover:text-white">Deluxe Couple Villa</Link></li>
              <li><Link to="/villas/premium-ocean-villa" className="hover:text-white">Premium Ocean Villa</Link></li>
              <li><Link to="/book" className="text-turquoise-300 hover:text-turquoise-200 font-medium">Book Now →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {resortConfig.contact.addressLine1}, {resortConfig.contact.addressLine2}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {resortConfig.contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> {resortConfig.contact.email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {resortConfig.name}. All rights reserved. Demo site prepared by BizWeb KH.</p>
          <div className="flex items-center gap-5">
            <Link to="/policies/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/policies/booking-terms" className="hover:text-white">Booking Terms</Link>
            <Link to="/policies/cancellation" className="hover:text-white">Cancellation Policy</Link>
            <Link to="/admin" className="hover:text-white/80 text-white/40">Management Login</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
