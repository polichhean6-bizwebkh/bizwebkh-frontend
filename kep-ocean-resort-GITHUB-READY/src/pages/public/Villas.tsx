import { useMemo, useState } from 'react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import VillaCard from '../../components/public/VillaCard';
import { villas } from '../../data/villas';

export default function Villas() {
  const [maxPrice, setMaxPrice] = useState(200);
  const [guests, setGuests] = useState(0);
  const [view, setView] = useState('All');

  const filtered = useMemo(() => {
    return villas.filter((v) => {
      if (v.pricePerNight > maxPrice) return false;
      if (guests && v.maxGuests < guests) return false;
      if (view !== 'All' && v.view !== view) return false;
      return true;
    });
  }, [maxPrice, guests, view]);

  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeading eyebrow="Stay With Us" title="Our 8 Private Villas" subtitle="Every villa at Kep Ocean Resort is private and individually styled — browse all 8 to find the right fit for your stay." align="left" />

        <div className="bg-white rounded-2xl border border-charcoal-100 p-5 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-charcoal-500 text-xs font-medium">Max price / night: ${maxPrice}</span>
            <input type="range" min={50} max={150} step={5} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-charcoal-500 text-xs font-medium">Guest capacity</span>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="border border-charcoal-200 rounded-lg px-3 py-2">
              <option value={0}>Any</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-charcoal-500 text-xs font-medium">View type</span>
            <select value={view} onChange={(e) => setView(e.target.value)} className="border border-charcoal-200 rounded-lg px-3 py-2">
              <option>All</option>
              <option>Ocean View</option>
              <option>Garden View</option>
              <option>Pool View</option>
              <option>Sunset View</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-charcoal-500 py-16">No villas match your filters. Try adjusting the options above.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => <VillaCard key={v.id} villa={v} />)}
          </div>
        )}
      </Container>
    </div>
  );
}
