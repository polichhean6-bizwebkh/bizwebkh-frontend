import { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { resortConfig } from '../../data/resortConfig';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    if (!form.message.trim()) next.message = 'Please enter a message.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeading eyebrow="Get In Touch" title="Contact & Location" subtitle="Have a question before you book? Reach out — our team is happy to help." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-charcoal-100 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Address</p>
                  <p className="text-sm text-charcoal-600">{resortConfig.contact.addressLine1}, {resortConfig.contact.addressLine2}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Phone</p>
                  <p className="text-sm text-charcoal-600">{resortConfig.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Email</p>
                  <p className="text-sm text-charcoal-600">{resortConfig.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Send className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Telegram</p>
                  <p className="text-sm text-charcoal-600">{resortConfig.contact.telegram}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">WhatsApp</p>
                  <p className="text-sm text-charcoal-600">{resortConfig.contact.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-ocean-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Check-in / Check-out</p>
                  <p className="text-sm text-charcoal-600">From {resortConfig.contact.checkIn} / Until {resortConfig.contact.checkOut}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-charcoal-100 aspect-video bg-sand-100 flex items-center justify-center text-charcoal-400 text-sm">
              Google Maps placeholder — {resortConfig.contact.mapsQuery}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-charcoal-100 p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-turquoise-600 mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">Message sent</h3>
                <p className="text-charcoal-600 text-sm">Thank you for reaching out. Our team will get back to you shortly. (Demo only — no message was actually sent.)</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" placeholder="Your name" />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" placeholder="you@example.com" />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full border border-charcoal-200 rounded-lg px-4 py-2.5 text-sm" placeholder="How can we help?" />
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
