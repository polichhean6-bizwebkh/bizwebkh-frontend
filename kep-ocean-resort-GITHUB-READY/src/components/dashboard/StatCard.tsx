import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: 'ocean' | 'turquoise' | 'sand' | 'red';
  sub?: string;
}

const tones = {
  ocean: 'bg-ocean-50 text-ocean-700',
  turquoise: 'bg-turquoise-50 text-turquoise-700',
  sand: 'bg-sand-100 text-sand-800',
  red: 'bg-red-50 text-red-700',
};

export default function StatCard({ label, value, icon: Icon, tone = 'ocean', sub }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal-100 p-5 flex items-start gap-4">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-charcoal-500 mb-1 truncate">{label}</p>
        <p className="text-2xl font-semibold text-charcoal-900">{value}</p>
        {sub && <p className="text-xs text-charcoal-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
