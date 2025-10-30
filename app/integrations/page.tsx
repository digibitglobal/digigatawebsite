export const metadata = {
  title: 'Integrations',
  description: 'Connect DigiGate with the rest of your platform.',
}

const integrations = [
  {
    name: 'Webhook Orchestration',
    details: 'Subscribe to gateway, org, and consumer events. Manage retries, delivery policies, and signature secrets.',
    actions: ['Event subscriptions with filters', 'Delivery history & replay', 'Automatic dead-letter queue integration'],
  },
  {
    name: 'Service Discovery',
    details: 'Native Consul support plus adapters for Kubernetes, HashiCorp Nomad, and static registries.',
    actions: ['Consul health checks', 'Weighted + versioned routing', 'Cache TTL controls'],
  },
  {
    name: 'Observability',
    details: 'Emit Prometheus metrics, push traces to Jaeger/Zipkin, and stream logs to your SIEM.',
    actions: ['Prometheus /metrics', 'Trace exporters', 'Structured log forwarding'],
  },
  {
    name: 'Identity Providers',
    details: 'OAuth2/OIDC, SAML, and mTLS integrations with custom CA bundles and automated certificate rotation.',
    actions: ['JWKS fetch & refresh', 'Step-up auth policies', 'Client certificate enrollment'],
  },
  {
    name: 'Billing & Usage',
    details: 'Tie requests, webhooks, and consumer activity to billing systems for chargeback and quota enforcement.',
    actions: ['Usage export jobs', 'Plan enforcement hooks', 'Integration with Finance via webhooks'],
  },
]

export default function IntegrationsPage() {
  return (
    <section className="container-default py-16">
      <h1 className="text-4xl font-semibold">Integrations</h1>
      <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-300">
        DigiGate plugs into your platform out of the box. From webhook orchestration and service discovery to observability and billing, the gateway keeps your tools in sync.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <article key={integration.name} className="rounded-2xl border border-gray-200/60 p-6 dark:border-gray-800">
            <h2 className="text-2xl font-semibold">{integration.name}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{integration.details}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
              {integration.actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-brand/60 p-6 text-sm text-brand">
        Need a custom integration? The Admin Console includes integration orchestration pipelines with approval workflows, mock upstreams, automated smoke tests, and scriptable deploy hooks. Reach out to collaborate on roadmap additions.
      </div>
    </section>
  )
}

