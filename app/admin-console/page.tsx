export const metadata = {
  title: 'Admin Console',
  description: 'Full-featured management console for Modern API Management Solution.',
}

const highlights = [
  {
    title: 'Tenant & Org Control',
    description: 'Create organizations, assign plans, and manage onboarding workflows with approvals and audit history.',
  },
  {
    title: 'API Lifecycle',
    description: 'Design, stage, preview, and promote API definitions with diff views, rollback support, and bulk ZIP import.',
  },
  {
    title: 'Operational Visibility',
    description: 'Live dashboards for rate limits, consumer groups, deployment changes, webhooks, circuit breakers, and health checks.',
  },
  {
    title: 'Security & Access',
    description: 'Fine-grained RBAC + ABAC, session management, SSO integrations, API key rotation, custom CA management for mTLS.',
  },
]

const consoleSections = [
  {
    heading: 'What is inside the Admin Console?',
    items: [
      '144+ pages covering every facet of gateway operations.',
      'Org, user, and consumer group administration with rate-limit policies and quotas.',
      'Webhook orchestration (subscriptions, delivery logs, replay tools).',
      'Deployment lifecycle hub with Preview → Staged → Promoted flows and rollback automation.',
      'Config Catalog for environment-specific overrides, tags, feature flags, and localization strings.',
      'Observability center: Prometheus charts, log tailing, trace sampling, and circuit breaker state modelling.',
      'Feedback center, ticket triage, and billing + plan attribution per tenant.',
    ],
  },
  {
    heading: 'Highlights for Platform Teams',
    items: [
      'Definition designer with OpenAPI, GraphQL, and gRPC definitions, including aggregation and transformation editors.',
      'Bulk onboarding wizards for new tenants, including sample upstreams, secrets bootstrap, and verification tasks.',
      'Session intelligence: view active sessions, revoke credentials, and enforce step-up auth.',
      'Release checklists, change approvals, and automated post-deploy smoke tests.',
    ],
  },
]

export default function AdminConsolePage() {
  return (
    <section className="container-default py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Admin Console</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Operate your APIs with a 144-page enterprise console</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            The DigiGate Admin Console is a comprehensive management experience covering onboarding, definitions, deployments, observability, and compliance. Give platform engineers, SREs, and product teams the context they need to ship safely.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200/60 p-4 dark:border-gray-800">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
          <div className="relative flex h-full flex-col gap-3 p-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-200">Admin Console Sneak Peek</span>
              <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-brand">245+ UI components</span>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Multi-tenant org selector with RBAC-aware navigation</li>
              <li>• Definition designer with request/response transforms, APQ, and aggregation previews</li>
              <li>• Deployment timeline with diff view and automated verification results</li>
              <li>• Health dashboards summarising rate-limit, circuit breaker, and webhook delivery metrics</li>
              <li>• Live session inspector with revoke + forced MFA prompts</li>
            </ul>
            <div className="mt-4 rounded-lg border border-dashed border-brand/60 p-3 text-xs text-brand">
              Screenshots & demo videos coming soon. Want early access? Reach out via the Contact page for a guided walkthrough.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {consoleSections.map((section) => (
          <div key={section.heading} className="rounded-2xl border border-gray-200/60 p-6 dark:border-gray-800">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              {section.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200/60 p-6 dark:border-gray-800">
          <h3 className="text-xl font-semibold">Admin Console for every tier</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Free tier includes read-only dashboards and definition previews. Team tier unlocks CRUD for webhooks, consumer groups, and deployments. Enterprise tier adds SSO, delegated administration, sandbox environments, and audit exports.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200/60 p-6 dark:border-gray-800">
          <h3 className="text-xl font-semibold">See it in action</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We are preparing guided tours, Storybook-powered component explorer demos, and video walkthroughs. Contact us for a curated preview or join the upcoming webinar to watch the full deployment workflow end-to-end.
          </p>
        </div>
      </div>
    </section>
  )
}

