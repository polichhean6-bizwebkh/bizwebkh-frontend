import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Users, BedDouble, Bath, Maximize, Eye, Check, ArrowLeft } from 'lucide-react';
import Container from '../../components/ui/Container';
import { LinkButton } from '../../components/ui/Button';
import VillaCard from '../../components/public/VillaCard';
import Badge from '../../components/ui/Badge';
import { getVillaBySlug, villas } from '../../data/villas';
import { formatUSD } from '../../lib/format';
import { resortConfig } from '../../data/resortConfig';

export default function VillaDetail() {
  const { slug } = useParams();
  const villa = getVillaBySlug(slug ?? '');
  const [activeImage, setActiveImage] = useState(0);

  if (!villa) return <Navigate to="/villas" replace />;

  const similar = villas.filter((v) => v.id !== villa.id && v.view === villa.view).slice(0, 3);
  const fallbackSimilar = villas.filter((v) => v.id !== villa.id).slice(0, 3);
  const similarVillas = similar.length ? similar : fallbackSimilar;

  return (
    <div className="pt-24 pb-24">
      <Container>
        <Link to="/villas" className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-ocean-700 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to all villas
        </Link>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-8">
          <div className="lg:col-span-3 rounded-3xl overflow-hidden aspect-[16/10]">
            <img src={villa.images[activeImage]} alt={villa.name} className="h-full w-full object-cover" />
          </div>
          <div className="hidden lg:grid grid-rows-4 gap-3">
            {villa.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`rounded-2xl overflow-hidden aspect-[4/3] border-2 ${activeImage === i ? 'border-ocean-600' : 'border-transparent'}`}>
                <img src={img} alt={`${villa.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex lg:hidden gap-2 overflow-x-auto">
            {villa.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`shrink-0 rounded-xl overflow-hidden h-20 w-28 border-2 ${activeImage === i ? 'border-ocean-600' : 'border-transparent'}`}>
                <img src={img} alt={`${villa.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <Badge>{villa.status}</Badge>
              <span className="text-xs text-charcoal-500">{villa.code}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal-900 mb-3">{villa.name}</h1>
            <p className="text-charcoal-600 leading-relaxed mb-6">{villa.shortDescription}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Users, label: `${villa.maxGuests} guests` },
                { icon: BedDouble, label: villa.beds },
                { icon: Bath, label: `${villa.bathrooms} bathroom${villa.bathrooms > 1 ? 's' : ''}` },
                { icon: Maximize, label: `${villa.sizeSqm} m²` },
              ].map((f) => (
                <div key={f.label} className="bg-white border border-charcoal-100 rounded-xl p-4 flex flex-col items-center text-center gap-1.5">
                  <f.icon className="h-5 w-5 text-ocean-700" />
                  <span className="text-xs text-charcoal-600">{f.label}</span>
                </div>
              ))}
            </div>

            <h2 className="font-display text-xl font-semibold mb-3">About This Villa</h2>
            <p className="text-charcoal-600 leading-relaxed mb-8">{villa.fullDescription}</p>

            <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2"><Eye className="h-5 w-5 text-ocean-700" /> Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
              {villa.amenities.map((a) => (
                <span key={a} className="flex items-center gap-2 text-sm text-charcoal-700"><Check className="h-4 w-4 text-turquoise-600" /> {a}</span>
              ))}
            </div>

            <h2 className="font-display text-xl font-semibold mb-3">House Rules</h2>
            <ul className="list-disc list-inside text-sm text-charcoal-600 space-y-1.5 mb-8">
              {villa.houseRules.map((r) => <li key={r}>{r}</li>)}
            </ul>

            <div className="bg-white border border-charcoal-100 rounded-2xl p-5 grid grid-cols-2 gap-4 mb-8 text-sm">
              <div><p className="text-charcoal-500 text-xs mb-1">Check-in</p><p className="font-medium">{resortConfig.contact.checkIn}</p></div>
              <div><p className="text-charcoal-500 text-xs mb-1">Check-out</p><p className="font-medium">{resortConfig.contact.checkOut}</p></div>
              <div className="col-span-2"><p className="text-charcoal-500 text-xs mb-1">Cancellation</p><p className="font-medium">{resortConfig.policies.cancellation}</p></div>
            </div>

            <h2 className="font-display text-xl font-semibold mb-3">Availability Preview</h2>
            <div className="bg-white border border-charcoal-100 rounded-2xl p-5 mb-4">
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-charcoal-500 mb-2">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 28 }).map((_, i) => {
                  const busy = [3, 4, 5, 11, 18, 19, 24].includes(i);
                  return (
                    <div key={i} className={`aspect-square rounded-md flex items-center justify-center text-[11px] ${busy ? 'bg-red-100 text-red-600' : 'bg-turquoise-50 text-turquoise-700'}`}>
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-charcoal-500">
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-turquoise-50 border border-turquoise-200" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-red-100 border border-red-200" /> Booked</span>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div>
            <div className="sticky top-28 bg-white border border-charcoal-100 rounded-2xl p-6 shadow-sm">
              <p className="text-2xl font-semibold text-ocean-800">{formatUSD(villa.pricePerNight)} <span className="text-sm font-normal text-charcoal-500">/ night</span></p>
              <p className="text-xs text-charcoal-500 mb-5">Taxes & service charge calculated at booking</p>
              <LinkButton to={`/book?villa=${villa.slug}`} variant="primary" size="lg" className="w-full">
                Book This Villa
              </LinkButton>
              <p className="text-xs text-center text-charcoal-400 mt-3">You won't be charged yet</p>
            </div>
          </div>
        </div>

        {/* Similar villas */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-6">Similar Villas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVillas.map((v) => <VillaCard key={v.id} villa={v} />)}
          </div>
        </div>
      </Container>
    </div>
  );
}
