export const metadata = { title: 'Observability' }

export default function ObservabilityPage() {
  return (
    <article>
      <h1>Observability</h1>
      <p>Metrics are exposed at <code>/metrics</code> (Prometheus format). Common series include:</p>
      <ul>
        <li><code>api_gateway_requests_total</code></li>
        <li><code>api_gateway_request_latency_seconds_bucket</code></li>
        <li>Rate‑limit counters</li>
        <li>Circuit breaker state transitions</li>
      </ul>
      <p>Correlation IDs propagate via <code>X-Correlation-ID</code>.</p>
    </article>
  )
}

