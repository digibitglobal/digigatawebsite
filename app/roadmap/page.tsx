export const metadata = {
  title: 'Roadmap',
  description: 'What is coming next for DigiGate.',
}

const roadmap = [
  {
    quarter: 'Q2 2025',
    items: [
      'Storybook-powered Admin Console demo gallery with live API mocks.',
      'Interactive API playground (REST + GraphQL + gRPC) with code snippets.',
      'Automated deployment pipeline visualisation with approvals and SLO guardrails.',
    ],
  },
  {
    quarter: 'Q3 2025',
    items: [
      'Comparison guide versus Kong, Tyk, Apigee, and AWS API Gateway.',
      'Public roadmap voting + status updates inside the Admin Console.',
      'Case studies: fintech, SaaS, and marketplace rollouts with performance benchmarks.',
    ],
  },
  {
    quarter: 'Q4 2025',
    items: [
      'Hybrid cloud deployment guide with Terraform modules and GitOps recipes.',
      'Advanced analytics with anomaly detection and predictive throttling.',
      'CLI tooling for scripting tenant automation and integrating with CI/CD.',
    ],
  },
]

export default function RoadmapPage() {
  return (
    <section className="container-default py-16">
      <h1 className="text-4xl font-semibold">Product Roadmap</h1>
      <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-300">
        We keep DigiGate transparent. Below is what we are actively building. Customer feedback—in the Admin Console feedback hub or via Contact—helps us prioritize.
      </p>

      <div className="mt-10 space-y-8">
        {roadmap.map((entry) => (
          <article key={entry.quarter} className="rounded-2xl border border-gray-200/60 p-6 dark:border-gray-800">
            <h2 className="text-2xl font-semibold">{entry.quarter}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-brand/60 p-6 text-sm text-brand">
        Want to influence the roadmap? Join the design partner programme, access private preview builds, and vote on upcoming features directly inside the Admin Console.
      </div>
    </section>
  )
}

