import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { experiences } from '../../data/experiences';
import { Button } from '../../components/ui/Button';

export default function Experiences() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Explore"
          title="Experiences in and around Kep"
          subtitle="A mix of resort moments and popular nearby attractions. Items marked 'Nearby Attraction' are not operated by the resort — we're happy to help with directions and information."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={e.image} alt={e.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-medium text-charcoal-900">{e.name}</h3>
                  <span className={`text-[11px] px-2 py-1 rounded-full shrink-0 ${e.operatedByResort ? 'bg-turquoise-100 text-turquoise-800' : 'bg-sand-100 text-charcoal-600'}`}>
                    {e.operatedByResort ? 'Resort Service' : 'Nearby Attraction'}
                  </span>
                </div>
                <p className="text-sm text-charcoal-600 leading-relaxed mb-4 flex-1">{e.description}</p>
                <Button variant="outlineLight" size="sm" className="self-start">
                  Ask About This
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
