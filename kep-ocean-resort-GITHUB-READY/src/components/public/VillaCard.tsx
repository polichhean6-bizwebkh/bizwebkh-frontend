import { Link } from 'react-router-dom';
import { Users, BedDouble, Maximize, ArrowRight } from 'lucide-react';
import type { Villa } from '../../types';
import Badge from '../ui/Badge';
import { formatUSD } from '../../lib/format';

export default function VillaCard({ villa }: { villa: Villa }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-charcoal-100 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={villa.images[0]}
          alt={villa.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge>{villa.status}</Badge>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg font-semibold text-charcoal-900">{villa.name}</h3>
        </div>
        <p className="text-sm text-charcoal-600 leading-relaxed mb-4">{villa.shortDescription}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-charcoal-500 mb-4">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {villa.maxGuests} guests</span>
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {villa.beds}</span>
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {villa.sizeSqm} m²</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {villa.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-[11px] bg-sand-100 text-charcoal-600 rounded-full px-2.5 py-1">{a}</span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-charcoal-100">
          <div>
            <p className="text-xl font-semibold text-ocean-800">{formatUSD(villa.pricePerNight)}</p>
            <p className="text-xs text-charcoal-500">per night</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/villas/${villa.slug}`} className="text-sm font-medium text-ocean-700 hover:text-ocean-900 inline-flex items-center gap-1">
              Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to={`/book?villa=${villa.slug}`}
              className="rounded-full bg-ocean-700 hover:bg-ocean-800 text-white text-sm font-medium px-4 py-2"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
