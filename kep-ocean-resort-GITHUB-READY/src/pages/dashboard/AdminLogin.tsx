import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Waves, Info, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Button } from '../../components/ui/Button';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) navigate('/admin');
    else setError('Incorrect email or password. Use the demo credentials below.');
  };

  return (
    <div className="min-h-screen bg-ocean-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-3"><Waves className="h-6 w-6 text-white" /></span>
          <h1 className="font-display text-xl font-semibold text-white">Kep Ocean Resort</h1>
          <p className="text-white/60 text-sm">Management Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" placeholder="admin@kepoceanresort.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Password</label>
            <div className="relative">
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} className="w-full border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm pr-10" placeholder="••••••••" />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <Button type="submit" size="lg" className="w-full">Log In</Button>

          <div className="flex items-start gap-2 bg-sand-50 border border-sand-200 rounded-lg px-3 py-2.5 text-xs text-charcoal-600">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-ocean-700" />
            <span>
              Demo login only — not secure production authentication.<br />
              Email: <span className="font-mono">admin@kepoceanresort.com</span><br />
              Password: <span className="font-mono">demo123</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
