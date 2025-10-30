export const metadata = { title: 'Security' }

export default function SecurityPage() {
  return (
    <section className="container-default py-14">
      <h1 className="text-3xl font-semibold">Security</h1>
      <div className="mt-4 space-y-6 text-gray-600 dark:text-gray-300">
        <div>
          <h2 className="text-xl font-semibold">Practices</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Secrets: never committed; environment variables and secret stores recommended.</li>
            <li>Auth: OAuth2/JWT verification, optional mTLS, RBAC/ABAC policy enforcement.</li>
            <li>TLS: Supports mTLS at the edge; ensure server `tls.Config` is properly set.</li>
            <li>RBAC: Role and permission management with audit‑friendly APIs.</li>
            <li>Audit: Structured logs with correlation IDs; redact PII in examples.</li>
            <li>SAST: Integrate with your CI for static scans (configuration hooks provided).</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Data Handling</h2>
          <p>We avoid storing sensitive payloads in logs. Metrics are aggregated and do not contain PII.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Reporting</h2>
          <p>Report issues to security@example.com with steps to reproduce. Do not include secrets.</p>
        </div>
      </div>
    </section>
  )
}

