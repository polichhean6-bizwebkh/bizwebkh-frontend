import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import Badge from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatUSD } from '../../lib/format';
import type { Villa } from '../../types';

const statusOptions: Villa['status'][] = ['Available', 'Reserved', 'Occupied', 'Cleaning', 'Maintenance', 'Blocked'];

export default function VillasAdmin() {
  const { villas, updateVillaStatus } = useAppData();
  const [editing, setEditing] = useState<Villa | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Villa Management</h1>
        <p className="text-charcoal-500 text-sm">8 villas · update status, pricing, and maintenance notes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {villas.map((v) => (
          <div key={v.id} className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
            <img src={v.images[0]} alt={v.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="font-semibold text-charcoal-900 text-sm">{v.name}</p>
                  <p className="text-xs text-charcoal-400">{v.code} · {v.type}</p>
                </div>
                <Badge>{v.status}</Badge>
              </div>
              <div className="text-xs text-charcoal-500 space-y-1 my-3">
                <p>Capacity: {v.maxGuests} guests</p>
                <p>Rate: {formatUSD(v.pricePerNight)} / night</p>
                <p>Cleaning: {v.cleaningStatus}</p>
                {v.currentGuest && <p>Current guest: {v.currentGuest}</p>}
                {v.maintenanceNote && <p className="text-red-600">Note: {v.maintenanceNote}</p>}
              </div>
              <select
                value={v.status}
                onChange={(e) => updateVillaStatus(v.id, e.target.value as Villa['status'])}
                className="w-full border border-charcoal-200 rounded-lg px-2.5 py-1.5 text-xs mb-2"
              >
                {statusOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <Button size="sm" variant="outlineLight" className="w-full" onClick={() => setEditing(v)}>View / Edit Details</Button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg font-semibold mb-4">{editing.name}</h3>
            <dl className="text-sm space-y-2 text-charcoal-600 mb-5">
              <div className="flex justify-between"><dt>Villa Code</dt><dd>{editing.code}</dd></div>
              <div className="flex justify-between"><dt>Type</dt><dd>{editing.type}</dd></div>
              <div className="flex justify-between"><dt>Capacity</dt><dd>{editing.maxGuests} guests</dd></div>
              <div className="flex justify-between"><dt>Beds</dt><dd>{editing.beds}</dd></div>
              <div className="flex justify-between"><dt>Size</dt><dd>{editing.sizeSqm} m²</dd></div>
              <div className="flex justify-between"><dt>Rate</dt><dd>{formatUSD(editing.pricePerNight)} / night</dd></div>
              <div className="flex justify-between"><dt>Status</dt><dd><Badge>{editing.status}</Badge></dd></div>
            </dl>
            <p className="text-xs text-charcoal-400 mb-4">Full editing of pricing, amenities, and images is available in Website Content Management.</p>
            <Button size="sm" onClick={() => setEditing(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
