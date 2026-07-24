import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { galleryImages } from '../../data/gallery';

const categories = ['All', 'Villas', 'Food', 'Bar', 'Ocean', 'Experiences'] as const;

export default function Gallery() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? galleryImages : galleryImages.filter((g) => g.category === active);

  const openAt = (idx: number) => setLightbox(idx);
  const close = () => setLightbox(null);
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeading eyebrow="Gallery" title="A Glimpse of Kep Ocean Resort" subtitle="Browse photos of our villas, food, bar, the ocean, and local experiences." />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${active === c ? 'bg-ocean-700 text-white border-ocean-700' : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-ocean-300'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 sm:columns-3 gap-3 [column-fill:_balance]">
          {filtered.map((g, idx) => (
            <button key={g.id} onClick={() => openAt(idx)} className="mb-3 block w-full break-inside-avoid rounded-2xl overflow-hidden">
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full object-cover hover:scale-105 transition-transform duration-300" />
            </button>
          ))}
        </div>
      </Container>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[100] bg-charcoal-950/95 flex items-center justify-center p-4" onClick={close}>
          <button className="absolute top-5 right-5 text-white p-2" onClick={close} aria-label="Close"><X className="h-7 w-7" /></button>
          <button className="absolute left-3 sm:left-6 text-white p-2" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft className="h-8 w-8" /></button>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-xl object-contain" />
          <button className="absolute right-3 sm:right-6 text-white p-2" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight className="h-8 w-8" /></button>
        </div>
      )}
    </div>
  );
}
