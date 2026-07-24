import { Link } from 'react-router-dom';
import { Heart, Users2, Waves, UtensilsCrossed, Star, MapPin } from 'lucide-react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { LinkButton } from '../../components/ui/Button';
import SearchWidget from '../../components/public/SearchWidget';
import VillaCard from '../../components/public/VillaCard';
import { villas } from '../../data/villas';
import { experiences } from '../../data/experiences';
import { reviews } from '../../data/reviews';
import { heroImages, lifestyleImages, barImagePool } from '../../data/images';
import { resortConfig } from '../../data/resortConfig';

export default function Home() {
  const featured = villas.filter((v) => v.featured);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end">
        <div className="absolute inset-0">
          <img src={heroImages[0]} alt="Kep Ocean Resort seaside view" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-charcoal-950/10" />
        </div>
        <Container className="relative pb-14 pt-40">
          <span className="inline-block text-white/90 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Kep, Cambodia · Boutique Seaside Resort
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-2xl leading-tight">
            {resortConfig.hero.title}
          </h1>
          <p className="text-white/90 mt-5 max-w-xl text-base sm:text-lg leading-relaxed">
            {resortConfig.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 mt-7 mb-10">
            <LinkButton to="/book" variant="primary" size="lg" className="bg-turquoise-600 hover:bg-turquoise-700">
              Book Now
            </LinkButton>
            <LinkButton to="/villas" variant="outline" size="lg">
              View Villas
            </LinkButton>
          </div>
          <SearchWidget variant="hero" />
        </Container>
      </section>

      {/* INTRO */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Welcome"
            title="A small, peaceful resort on the Kep coastline"
            subtitle="Kep Ocean Resort is a boutique retreat with only 8 private villas. We keep things small on purpose — so every guest receives genuine, personal service in a calm coastal setting."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Heart, label: 'Private & Peaceful' },
              { icon: Users2, label: 'Personalized Service' },
              { icon: Waves, label: 'Coastal Location' },
              { icon: UtensilsCrossed, label: 'Fresh Food & Drinks' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center gap-3 bg-white rounded-2xl border border-charcoal-100 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-turquoise-50 text-turquoise-700">
                  <f.icon className="h-6 w-6" />
                </span>
                <p className="text-sm font-medium text-charcoal-800">{f.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED VILLAS */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading eyebrow="Stay" title="Featured Villas" subtitle="Each of our 8 villas has its own character — from garden hideaways to panoramic ocean views." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((v) => <VillaCard key={v.id} villa={v} />)}
          </div>
          <div className="text-center mt-10">
            <LinkButton to="/villas" variant="outlineLight" size="md">
              View All 8 Villas
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* DINING TEASER */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={lifestyleImages.family} alt="Guests enjoying fresh Khmer food" className="h-full w-full object-cover" />
            </div>
            <div>
              <SectionHeading align="left" eyebrow="Dining" title="Fresh food from our small kitchen" subtitle="From Kep's famous crab to simple Western favorites, our kitchen prepares fresh meals for guests throughout their stay. Guests can view a sample menu or request meals during their visit." />
              <LinkButton to="/dining" variant="primary" size="md">View Menu</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* BAR TEASER */}
      <section className="py-20 sm:py-28 bg-ocean-950 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-300">The Bar</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3 mb-4">Enjoy the Kep Sunset</h2>
              <p className="text-white/80 leading-relaxed mb-7 max-w-md">
                Cocktails, cold beer, wine, and fresh juice, served as the sun sets over the Gulf of Kep. A relaxed spot to end the day.
              </p>
              <LinkButton to="/bar" variant="outline" size="md">View Drinks Menu</LinkButton>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={barImagePool.sunsetDrinks} alt="Sunset drinks at the resort bar" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* EXPERIENCES */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading eyebrow="Explore" title="Experiences Around Kep" subtitle="Nearby attractions and resort moments to fill your stay. Some are operated by the resort; others are popular local attractions." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experiences.slice(0, 4).map((e) => (
              <div key={e.id} className="rounded-2xl overflow-hidden border border-charcoal-100 group">
                <div className="aspect-square overflow-hidden">
                  <img src={e.image} alt={e.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-charcoal-900 mb-1">{e.name}</h3>
                  <p className="text-xs text-charcoal-500">{e.operatedByResort ? 'Resort experience' : 'Nearby attraction'}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <LinkButton to="/experiences" variant="outlineLight" size="md">
              See All Experiences
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* REVIEWS */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Guest Reviews" title="What our guests say" subtitle="Sample reviews shown for this demo — to be replaced with real guest feedback." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-charcoal-100 p-6">
                <div className="flex items-center gap-1 mb-3 text-sand-500">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm text-charcoal-700 leading-relaxed mb-4">"{r.review}"</p>
                <p className="text-sm font-semibold text-charcoal-900">{r.guestName}</p>
                <p className="text-xs text-charcoal-500">{r.country} · {r.stayType}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-turquoise-700 text-white">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-1">Ready for your peaceful escape?</h3>
            <p className="text-white/85 flex items-center gap-1 justify-center sm:justify-start"><MapPin className="h-4 w-4" /> {resortConfig.contact.addressLine2}</p>
          </div>
          <LinkButton to="/book" variant="white" size="lg">
            Book Your Villa
          </LinkButton>
        </Container>
      </section>
    </div>
  );
}
