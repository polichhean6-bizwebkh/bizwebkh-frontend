import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { guests } from '../../data/guests';
import { formatUSD, formatDate } from '../../lib/format';

export default function GuestsAdmin() {
  const [search, setSearch] = useState('');
  const filtered = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Guests</h1>
          <p className="text-charcoal-500 text-sm">{guests.length} guest records</p>
        </div>
        <label className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guests" className="border border-charcoal-200 rounded-lg pl-9 pr-3 py-2 text-sm" />
        </label>
      </div>

      <div className="hidden lg:block bg-white rounded-2xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Phone</th>
              <th className="py-3 px-4 font-medium">Nationality</th>
              <th className="py-3 px-4 font-medium">Stays</th>
              <th className="py-3 px-4 font-medium">Last Stay</th>
              <th className="py-3 px-4 font-medium">Total Spending</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-b border-charcoal-50 last:border-0 hover:bg-sand-50/50">
                <td className="py-3 px-4 font-medium text-charcoal-900">{g.name}</td>
                <td className="py-3 px-4 text-charcoal-500">{g.phone}</td>
                <td className="py-3 px-4">{g.nationality}</td>
                <td className="py-3 px-4">{g.stays}</td>
                <td className="py-3 px-4">{g.lastStay ? formatDate(g.lastStay) : '—'}</td>
                <td className="py-3 px-4">{formatUSD(g.totalSpending)}</td>
                <td className="py-3 px-4"><Link to={`/admin/guests/${g.id}`} className="text-xs font-medium text-ocean-700 hover:underline">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-3">
        {filtered.map((g) => (
          <Link key={g.id} to={`/admin/guests/${g.id}`} className="block bg-white rounded-2xl border border-charcoal-100 p-4">
            <p className="font-medium text-charcoal-900">{g.name}</p>
            <p className="text-sm text-charcoal-500">{g.nationality} · {g.stays} stays</p>
            <p className="text-sm font-medium text-ocean-700 mt-1">{formatUSD(g.totalSpending)} total</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
