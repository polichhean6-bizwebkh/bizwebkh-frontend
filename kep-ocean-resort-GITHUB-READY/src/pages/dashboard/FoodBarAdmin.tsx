import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { guestOrders } from '../../data/orders';
import Badge from '../../components/ui/Badge';
import { formatUSD } from '../../lib/format';
import type { MenuCategory } from '../../types';

const tabs = ['Menu Items', 'Guest Orders', 'Categories', 'Availability'] as const;
const categories: MenuCategory[] = ['Breakfast', 'Khmer Food', 'Seafood', 'Western Food', 'Snacks', 'Cocktails', 'Beer', 'Wine', 'Soft Drinks', 'Juice', 'Coffee'];

export default function FoodBarAdmin() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Menu Items');
  const { menuItems: items, toggleMenuAvailability: toggleAvailability } = useAppData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Food & Bar</h1>
        <p className="text-charcoal-500 text-sm">Frontend demonstration only — not a real restaurant POS.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium border ${tab === t ? 'bg-ocean-700 text-white border-ocean-700' : 'bg-white text-charcoal-600 border-charcoal-200'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Menu Items' && (
        <div className="bg-white rounded-2xl border border-charcoal-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                <th className="py-3 px-4 font-medium">Item</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Available</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id} className="border-b border-charcoal-50 last:border-0">
                  <td className="py-2.5 px-4 flex items-center gap-3">
                    <img src={m.image} alt={m.name} className="h-9 w-9 rounded-lg object-cover" /> {m.name}
                  </td>
                  <td className="py-2.5 px-4 text-charcoal-500">{m.category}</td>
                  <td className="py-2.5 px-4">{formatUSD(m.price)}</td>
                  <td className="py-2.5 px-4">
                    <button onClick={() => toggleAvailability(m.id)} className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.available ? 'bg-turquoise-100 text-turquoise-800' : 'bg-charcoal-100 text-charcoal-500'}`}>
                      {m.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Guest Orders' && (
        <div className="bg-white rounded-2xl border border-charcoal-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                <th className="py-3 px-4 font-medium">Order</th>
                <th className="py-3 px-4 font-medium">Guest</th>
                <th className="py-3 px-4 font-medium">Villa</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {guestOrders.map((o) => (
                <tr key={o.id} className="border-b border-charcoal-50 last:border-0">
                  <td className="py-2.5 px-4 font-medium text-ocean-700">{o.id}</td>
                  <td className="py-2.5 px-4">{o.guestName}</td>
                  <td className="py-2.5 px-4 text-charcoal-500">{o.villaName}</td>
                  <td className="py-2.5 px-4 text-charcoal-500">{o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}</td>
                  <td className="py-2.5 px-4">{formatUSD(o.total)}</td>
                  <td className="py-2.5 px-4"><Badge>{o.status}</Badge></td>
                  <td className="py-2.5 px-4"><Badge>{o.paymentStatus}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Categories' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => {
            const count = items.filter((i) => i.category === c).length;
            return (
              <div key={c} className="bg-white rounded-xl border border-charcoal-100 p-4">
                <p className="text-sm font-medium text-charcoal-900">{c}</p>
                <p className="text-xs text-charcoal-500">{count} item{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'Availability' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-charcoal-100 p-4 flex items-center justify-between">
              <span className="text-sm text-charcoal-800">{m.name}</span>
              <button onClick={() => toggleAvailability(m.id)} className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.available ? 'bg-turquoise-100 text-turquoise-800' : 'bg-charcoal-100 text-charcoal-500'}`}>
                {m.available ? 'Available' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
