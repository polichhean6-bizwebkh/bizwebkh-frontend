import { useState } from 'react';
import { Info } from 'lucide-react';
import { resortConfig } from '../../data/resortConfig';
import { villas } from '../../data/villas';
import { Button } from '../../components/ui/Button';

const sections = ['Hero', 'About', 'Contact', 'Villas', 'Menus', 'Gallery', 'Promotions', 'Policies'] as const;

export default function ContentAdmin() {
  const [tab, setTab] = useState<(typeof sections)[number]>('Hero');
  const [hero, setHero] = useState({ title: resortConfig.hero.title, subtitle: resortConfig.hero.subtitle });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Website Content</h1>
        <p className="text-charcoal-500 text-sm">Preview and edit public site content. Frontend simulation only — changes here are not saved permanently.</p>
      </div>

      <div className="flex items-start gap-2 bg-sand-50 border border-sand-200 rounded-lg px-4 py-3 text-xs text-charcoal-600">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-ocean-700" />
        This module simulates a content editor for client review. A production build would connect these fields to a real content management system or database.
      </div>

      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button key={s} onClick={() => setTab(s)} className={`px-4 py-2 rounded-full text-sm font-medium border ${tab === s ? 'bg-ocean-700 text-white border-ocean-700' : 'bg-white text-charcoal-600 border-charcoal-200'}`}>{s}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 p-6 max-w-2xl">
        {tab === 'Hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Hero Title</label>
              <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Hero Subtitle</label>
              <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <Button size="sm" onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Changes'}</Button>
          </div>
        )}

        {tab === 'About' && (
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Resort Story</label>
            <textarea defaultValue={resortConfig.about.story} rows={6} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm mb-4" />
            <Button size="sm" onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Changes'}</Button>
          </div>
        )}

        {tab === 'Contact' && (
          <div className="space-y-3">
            {Object.entries(resortConfig.contact).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-charcoal-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input defaultValue={String(value)} className="w-full border border-charcoal-200 rounded-lg px-3 py-2 text-sm" />
              </div>
            ))}
            <Button size="sm" onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Changes'}</Button>
          </div>
        )}

        {tab === 'Villas' && (
          <div className="space-y-3">
            {villas.map((v) => (
              <div key={v.id} className="flex items-center justify-between border border-charcoal-100 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={v.images[0]} alt={v.name} className="h-10 w-14 rounded-lg object-cover" />
                  <span className="text-sm font-medium">{v.name}</span>
                </div>
                <span className="text-sm text-charcoal-500">${v.pricePerNight}/night</span>
              </div>
            ))}
            <p className="text-xs text-charcoal-400">Edit individual villa pricing, images, and descriptions from Villa Management.</p>
          </div>
        )}

        {(tab === 'Menus' || tab === 'Gallery' || tab === 'Promotions' || tab === 'Policies') && (
          <div className="text-sm text-charcoal-500">
            <p className="mb-3">This section previews {tab.toLowerCase()} content that will be editable here in the production build.</p>
            <Button size="sm" onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Changes'}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
