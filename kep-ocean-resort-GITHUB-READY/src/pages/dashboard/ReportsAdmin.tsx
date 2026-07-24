import { useMemo } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { villas } from '../../data/villas';
import { guestOrders } from '../../data/orders';
import { formatUSD } from '../../lib/format';

function BarRow({ label, value, max, formatted }: { label: string; value: number; max: number; formatted: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-32 shrink-0 text-charcoal-600 truncate">{label}</span>
      <div className="flex-1 h-2.5 bg-charcoal-100 rounded-full overflow-hidden">
        <div className="h-full bg-ocean-600 rounded-full" style={{ width: `${max ? (value / max) * 100 : 0}%` }} />
      </div>
      <span className="w-16 text-right font-medium text-charcoal-800 shrink-0">{formatted}</span>
    </div>
  );
}

export default function ReportsAdmin() {
  const { bookings } = useAppData();

  const active = bookings.filter((b) => b.status !== 'Cancelled');
  const cancelled = bookings.filter((b) => b.status === 'Cancelled');
  const cancellationRate = bookings.length ? Math.round((cancelled.length / bookings.length) * 100) : 0;

  const revenueByVilla = useMemo(() => {
    return villas.map((v) => ({
      name: v.name,
      revenue: active.filter((b) => b.villaId === v.id).reduce((s, b) => s + b.paidAmount, 0),
      bookings: active.filter((b) => b.villaId === v.id).length,
    })).sort((a, b) => b.revenue - a.revenue);
  }, [active]);

  const sourceBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => { map[b.source] = (map[b.source] ?? 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [bookings]);

  const totalNightsBooked = active.reduce((s, b) => s + b.nights, 0);
  const totalNightsAvailable = villas.length * 30; // demo: 30-day window
  const occupancyRate = Math.min(100, Math.round((totalNightsBooked / totalNightsAvailable) * 100));

  const totalRevenue = active.reduce((s, b) => s + b.paidAmount, 0);
  const outstanding = active.reduce((s, b) => s + b.balance, 0);
  const foodBarRevenue = guestOrders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);

  const maxVillaRevenue = Math.max(...revenueByVilla.map((v) => v.revenue), 1);
  const maxSource = Math.max(...sourceBreakdown.map(([, c]) => c), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Reports</h1>
        <p className="text-charcoal-500 text-sm">Simple performance summaries using sample data.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length },
          { label: 'Occupancy Rate', value: `${occupancyRate}%` },
          { label: 'Revenue Collected', value: formatUSD(totalRevenue) },
          { label: 'Outstanding Balance', value: formatUSD(outstanding) },
          { label: 'Cancellation Rate', value: `${cancellationRate}%` },
          { label: 'Food & Bar Sales', value: formatUSD(foodBarRevenue) },
          { label: 'Avg. Nights / Booking', value: (totalNightsBooked / (active.length || 1)).toFixed(1) },
          { label: 'Active Bookings', value: active.length },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-charcoal-100 p-5">
            <p className="text-xs text-charcoal-500 mb-1">{c.label}</p>
            <p className="text-xl font-semibold text-charcoal-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Villa Performance (Revenue)</h3>
          <div className="space-y-3">
            {revenueByVilla.map((v) => (
              <BarRow key={v.name} label={v.name} value={v.revenue} max={maxVillaRevenue} formatted={formatUSD(v.revenue)} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
          <h3 className="font-semibold text-charcoal-900 mb-4">Booking Sources</h3>
          <div className="space-y-3">
            {sourceBreakdown.map(([source, count]) => (
              <BarRow key={source} label={source} value={count} max={maxSource} formatted={String(count)} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6">
        <h3 className="font-semibold text-charcoal-900 mb-4">Booking Summary by Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="text-left text-xs text-charcoal-400 border-b border-charcoal-100">
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Count</th>
                <th className="py-2 font-medium">Share</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bookings.reduce((acc: Record<string, number>, b) => { acc[b.status] = (acc[b.status] ?? 0) + 1; return acc; }, {})).map(([status, count]) => (
                <tr key={status} className="border-b border-charcoal-50 last:border-0">
                  <td className="py-2">{status}</td>
                  <td className="py-2">{count}</td>
                  <td className="py-2">{Math.round((count / bookings.length) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
