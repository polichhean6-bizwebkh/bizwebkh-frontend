import { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { menuItems } from '../../data/menu';
import { barImagePool } from '../../data/images';
import { formatUSD } from '../../lib/format';
import type { MenuCategory } from '../../types';

const barCategories: MenuCategory[] = ['Cocktails', 'Beer', 'Wine', 'Soft Drinks', 'Juice', 'Coffee'];

export default function Bar() {
  const [active, setActive] = useState<'All' | MenuCategory>('All');
  const items = useMemo(
    () => menuItems.filter((m) => barCategories.includes(m.category) && (active === 'All' || m.category === active)),
    [active]
  );

  return (
    <div>
      <section className="relative h-[50vh] min-h-[380px] flex items-end pt-24">
        <img src={barImagePool.sunsetDrinks} alt="Sunset drinks at the resort bar" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
        <Container className="relative pb-12 text-white">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-300">The Bar</span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold mt-2">Enjoy the Kep Sunset</h1>
          <p className="flex items-center gap-2 mt-3 text-white/85 text-sm"><Clock className="h-4 w-4" /> Open daily 11:00 – 23:00</p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Drinks Menu" title="A relaxed, small resort bar" subtitle="Cocktails, cold beer, wine, soft drinks, fresh juice, and coffee — a sample of what's available." />

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {['All', ...barCategories].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c as 'All' | MenuCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${active === c ? 'bg-ocean-700 text-white border-ocean-700' : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-ocean-300'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-charcoal-900">{m.name}</h3>
                    <span className="font-semibold text-ocean-800 shrink-0">{formatUSD(m.price)}</span>
                  </div>
                  <p className="text-xs text-charcoal-500 mb-2">{m.category}</p>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
