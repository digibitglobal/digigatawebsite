export const metadata = { title: 'How it Works' }

export default function HowItWorksPage() {
  const seq = `sequenceDiagram
  participant Client
  participant Gateway
  participant Consul
  participant Upstream
  Client->>Gateway: HTTP Request
  Gateway->>Gateway: JWT/mTLS Auth + Org Context
  Gateway->>Gateway: Definition Resolution + Rate Limit
  Gateway->>Consul: Service Discovery (cache)
  Consul-->>Gateway: Healthy instances
  Gateway->>Upstream: Forward with timeouts/circuit breaker
  Upstream-->>Gateway: Response
  Gateway-->>Client: Response + Correlation ID`

  const flow = `flowchart LR
  A[OpenAPI/Swagger] --> B[Parse + Validate]
  B --> C[Normalize]
  C --> D[Gateway Definition]
  D --> E[Routing + Middleware]`

  return (
    <section className="container-default py-14">
      <h1 className="text-3xl font-semibold">How It Works</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">DigiGate processes each request through a composable chain.</p>
      <div className="mt-6 rounded-lg border border-gray-200/60 p-4 dark:border-gray-800">
        <pre className="overflow-x-auto text-xs"><code>{`mermaid\n${seq}`}</code></pre>
      </div>
      <h2 className="mt-10 text-2xl font-semibold">OpenAPI/Swagger ingest and validation</h2>
      <div className="mt-4 rounded-lg border border-gray-200/60 p-4 dark:border-gray-800">
        <pre className="overflow-x-auto text-xs"><code>{`mermaid\n${flow}`}</code></pre>
      </div>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
        <li>OpenAPI request/response validation is implemented in middleware.</li>
        <li>Ingestion/normalization labeled Beta/Roadmap until end‑to‑end automation is enabled.</li>
      </ul>
    </section>
  )
}

