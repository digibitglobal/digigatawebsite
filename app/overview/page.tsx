export const metadata = { title: 'Product Overview' }

export default function Overview() {
  return (
    <section className="container-default py-14">
      <div className="mx-auto max-w-3xl rounded-lg border border-gray-200/60 p-8 text-sm leading-6 dark:border-gray-800">
        <h1 className="mb-4 text-center text-2xl font-semibold">DigiGate — Product Overview</h1>
        <ul className="list-disc space-y-2 pl-6">
          <li>Secure by default: OAuth2/JWT, optional mTLS, RBAC/ABAC, org/tenant context.</li>
          <li>Programmable: definitions, request/response transforms, version/weight routing.</li>
          <li>Reliable: Redis rate limits, circuit breakers, health checks.</li>
          <li>Observable: Prometheus metrics, correlation IDs; tracing hooks on the roadmap.</li>
          <li>Standards: OpenAPI request/response validation; GraphQL upstream proxy.</li>
        </ul>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">Use your browser’s Print → Save as PDF to export this page.</p>
      </div>
    </section>
  )
}

