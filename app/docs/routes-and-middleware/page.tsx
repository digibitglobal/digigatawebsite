// app/docs/routes/page.tsx
import type { Metadata } from 'next';
import RoutesAndMiddlewarePageClient from './RoutesAndMiddlewarePageClient';

export const metadata: Metadata = {
  title: 'Routes & Middleware - Modern API Gateway',
  description:
    'Explore advanced routing capabilities and middleware stack including OAuth2/JWT, rate limiting, OpenAPI validation, and more.',
};

export default function RoutesAndMiddlewarePage() {
  return <RoutesAndMiddlewarePageClient />;
}
