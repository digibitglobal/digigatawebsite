// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us - Modern API Gateway',
  description:
    'Get in touch with our team for enterprise inquiries, technical support, or partnership opportunities.',
};

export default function ContactPage() {
  // Server Component wrapper renders the Client Component
  return <ContactPageClient />;
}
