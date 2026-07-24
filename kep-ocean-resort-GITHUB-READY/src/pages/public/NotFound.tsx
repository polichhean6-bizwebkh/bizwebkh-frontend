import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-[60vh] flex items-center">
      <Container className="text-center">
        <h1 className="font-display text-5xl font-semibold text-ocean-800 mb-4">404</h1>
        <p className="text-charcoal-600 mb-8">We couldn't find the page you were looking for.</p>
        <Link to="/"><Button>Return Home</Button></Link>
      </Container>
    </div>
  );
}
