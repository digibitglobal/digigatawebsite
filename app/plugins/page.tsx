export const metadata = { title: 'Plugins' }

type Plugin = {
  name: string
  summary: string
  benefits: string[]
  snippet: string
  docsHref: string
}

const plugins: Plugin[] = [
  {
    name: 'OpenAPI/Swagger Importer (Beta)',
    summary: 'Validate requests and responses against OpenAPI schemas. Importer and normalizer are currently Beta.',
    benefits: ['Schema-first governance', 'Early error detection', 'Safer upgrades'],
    snippet: `openapi:
  enabled: true
  strict_response_validation: true`,
    docsHref: '/docs'
  },
  {
    name: 'GraphQL Upstream',
    summary: 'Proxy upstream GraphQL services with persisted queries, introspection guardrails, and caching.',
    benefits: ['Unified ingress', 'Persisted query header', 'Introspection controls'],
    snippet: `graphql:
  enable_get: true
  persisted_query_header_key: X-Query-Id`,
    docsHref: '/docs'
  },
  {
    name: 'gRPC Gateway',
    summary: 'Route gRPC/grpcs upstreams with mTLS, service reflection, and per-method rate limiting.',
    benefits: ['Reflection aware', 'Custom CA bundles', 'Per-method quotas'],
    snippet: `definitions:
  - name: ledger-grpc
    protocol: grpc
    grpc_services:
      - ledger.v1.API
    upstream_urls:
      - grpcs://ledger:9443`,
    docsHref: '/docs'
  },
  {
    name: 'Webhook Orchestration',
    summary: 'Manage event subscriptions, delivery policies, signatures, and replay tooling.',
    benefits: ['Event subscriptions', 'Replay & DLQ', 'Alert hooks'],
    snippet: `webhooks:
  events:
    - tenant.created
    - deployment.promoted
  delivery:
    retries: 5
    backoff: exponential`,
    docsHref: '/docs'
  },
  {
    name: 'Request Transformation',
    summary: 'Apply header/body rewrites, Go template payload transforms, and aggregation jobs.',
    benefits: ['Header rules', 'Body templates', 'Aggregation jobs'],
    snippet: `transformations:
  request:
    - name: add-org
      target: headers
      action: set
      key: X-Org-ID
      value: "{{ .OrgID }}"`,
    docsHref: '/docs'
  },
  {
    name: 'Consul Discovery',
    summary: 'Discover healthy upstreams with caching, TTLs, and weighted routing.',
    benefits: ['Auto-failover', 'Version/weight routing', 'Operational visibility'],
    snippet: `consul:
  address: consul:8500
routing:
  type: round_robin`,
    docsHref: '/docs'
  },
  {
    name: 'Redis Cache + Rate Limits',
    summary: 'Use Redis for quotas, caching definitions, and global request backpressure.',
    benefits: ['High performance', 'Global quotas', 'Backpressure'],
    snippet: `rate_limit:
  redis_enabled: true
  requests_per_minute: 1000`,
    docsHref: '/docs'
  },
  {
    name: 'Postgres Migrations/Seeders',
    summary: 'Auto-migrate core tables and seed definitions for new tenants.',
    benefits: ['Reliable provisioning', 'Idempotent', 'Tenant-aware models'],
    snippet: `# migration/migration.go
# AutoMigrate Organization, API, Definition, ...`,
    docsHref: '/docs'
  },
  {
    name: 'Prometheus Metrics',
    summary: 'Expose gateway, rate limit, and webhook metrics in Prometheus format.',
    benefits: ['Unified telemetry', 'SLOs & alerts', 'Capacity planning'],
    snippet: `GET /metrics
# api_gateway_requests_total, histogram buckets, rate_limit counters`,
    docsHref: '/docs'
  }
]

export default function PluginsPage() {
  return (
    <section className="container-default py-14">
      <h1 className="text-3xl font-semibold">Plugin Gallery</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {plugins.map((plugin) => (
          <article key={plugin.name} className="rounded-lg border border-gray-200/60 p-6 dark:border-gray-800">
            <h2 className="text-xl font-semibold">{plugin.name}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{plugin.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
              {plugin.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-100"><code>{plugin.snippet}</code></pre>
            <a href={plugin.docsHref} className="mt-3 inline-block text-brand">
              Read the docs →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
