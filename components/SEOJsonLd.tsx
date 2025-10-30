export default function SEOJsonLd() {
  const product = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Modern API Gateway',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description:
      'Secure, programmable gateway with OAuth2/JWT, mTLS, OpenAPI validation, dynamic routing, and observability.',
  }
  const howto = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Route requests through the gateway',
    step: [
      { '@type': 'HowToStep', name: 'Configure OAuth2/JWT and mTLS' },
      { '@type': 'HowToStep', name: 'Define APIs and rate limits' },
      { '@type': 'HowToStep', name: 'Enable Consul discovery' },
      { '@type': 'HowToStep', name: 'Deploy and monitor with Prometheus' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
    </>
  )
}

