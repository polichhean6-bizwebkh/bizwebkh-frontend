import { useMemo, useState } from 'react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { menuItems } from '../../data/menu';
import { formatUSD } from '../../lib/format';
import type { MenuCategory } from '../../types';

const foodCategories: MenuCategory[] = ['Breakfast', 'Khmer Food', 'Seafood', 'Western Food', 'Snacks'];

export default function Dining() {
  const [active, setActive] = useState<'All' | MenuCategory>('All');
  const items = useMemo(
    () => menuItems.filter((m) => foodCategories.includes(m.category) && (active === 'All' || m.category === active)),
    [active]
  );

  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeading eyebrow="Dining" title="Fresh Food from Our Small Kitchen" subtitle="Kep Ocean Resort has a small kitchen preparing fresh meals for guests. This is a sample menu — guests can order at the resort or request meals during their stay." />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['All', ...foodCategories].map((c) => (
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
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                {!m.available && (
                  <span className="absolute top-3 right-3 bg-charcoal-900/80 text-white text-xs px-2.5 py-1 rounded-full">Unavailable</span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
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

        <div className="mt-12 bg-sand-100 border border-sand-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <p className="text-sm text-charcoal-700">
            This is a sample menu, not an online ordering system. Guests can order meals directly at the resort or request them in advance during their stay.
          </p>
        </div>
      </Container>
    </div>
  );
}
