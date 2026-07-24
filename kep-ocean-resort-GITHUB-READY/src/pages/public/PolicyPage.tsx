import { useParams, Navigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { resortConfig } from '../../data/resortConfig';

const content: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'This demo website does not collect, store, or process real personal data. Any information entered into forms during this demo is used only to display sample interactions within your browser session.',
      'In a production version, this page would describe how Kep Ocean Resort collects, uses, and protects guest information in line with applicable data protection requirements.',
    ],
  },
  'booking-terms': {
    title: 'Booking Terms',
    body: [
      `A deposit of ${resortConfig.policies.depositPercent}% is typically required to confirm a booking, with the remaining balance payable at the resort unless otherwise agreed.`,
      'These terms are placeholder text for client review and should be finalized with the resort management before publishing.',
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    body: [resortConfig.policies.cancellation, 'Final cancellation terms should be confirmed by Kep Ocean Resort management before this site goes live.'],
  },
};

export default function PolicyPage() {
  const { slug } = useParams();
  const data = content[slug ?? ''];
  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold mb-6">{data.title}</h1>
        {data.body.map((p, i) => (
          <p key={i} className="text-charcoal-600 leading-relaxed mb-4">{p}</p>
        ))}
      </Container>
    </div>
  );
}
