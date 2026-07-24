import { Heart, Compass, Home as HomeIcon, Users } from 'lucide-react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { resortConfig } from '../../data/resortConfig';
import { lifestyleImages } from '../../data/images';

export default function About() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <img src={lifestyleImages.aerial} alt="Aerial view of Kep Ocean Resort coastline" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="A small resort, built around genuine hospitality" subtitle={resortConfig.about.story} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: HomeIcon, title: 'Boutique by Design', text: 'Only 8 villas, so every guest gets real attention.' },
            { icon: Heart, title: 'Friendly Service', text: 'A small team that genuinely enjoys hosting guests.' },
            { icon: Compass, title: 'Connected to Kep', text: 'Positioned to enjoy the coastline, food, and nature of Kep.' },
            { icon: Users, title: 'For Everyone', text: 'Suitable for couples, families, and small groups alike.' },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-2xl border border-charcoal-100 p-6 text-center flex flex-col items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-50 text-ocean-700"><v.icon className="h-5 w-5" /></span>
              <h3 className="font-medium text-charcoal-900">{v.title}</h3>
              <p className="text-sm text-charcoal-600">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-charcoal-100 p-8 sm:p-12 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-charcoal-600 leading-relaxed mb-6">{resortConfig.about.mission}</p>
          <ul className="text-sm text-charcoal-600 space-y-2 text-left inline-block">
            {resortConfig.about.values.map((v) => (
              <li key={v} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-turquoise-600 shrink-0" /> {v}</li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
