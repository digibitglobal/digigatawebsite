export const metadata = { title: 'Docs' }

export default function DocsIndex() {
  return (
    <article>
      <h1>Getting Started</h1>
      <p>Modern API Gateway is a programmable, multi‑tenant gateway.</p>
      <ol>
        <li>Configure <code>config.yaml</code> (OAuth2/JWT, mTLS optional, Redis, Consul)</li>
        <li>Seed definitions and run migrations</li>
        <li>Start the gateway and point traffic to it</li>
      </ol>
      <p>See the sections on Architecture, Routes &amp; Middleware, and Observability to dive deeper.</p>
    </article>
  )
}

