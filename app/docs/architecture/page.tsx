// app/docs/architecture/page.tsx
import type { Metadata } from 'next';
import ArchitecturePageClient from './ArchitecturePageClient';

export const metadata: Metadata = {
  title: 'System Architecture - Modern API Gateway',
  description:
    'Explore the technical architecture of our modern API gateway with dynamic routing, security layers, and observability features.',
};

export default function ArchitecturePage() {
  return <ArchitecturePageClient />;
}
