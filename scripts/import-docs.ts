import fs from 'node:fs'
import path from 'node:path'

const SRC_DIR = path.join(process.cwd(), '..', 'docs')
const DEST_DIR = path.join(process.cwd(), 'content', 'docs-imported')

// Curated allowlist from repo/docs mapped to target slugs
const curated: Record<string, string> = {
  '02-Architecture.md': 'architecture',
  '03-Routes-and-Middleware.md': 'routes-and-middleware',
  '05-Observability-and-Metrics.md': 'observability-and-metrics',
  '04-Config-and-Env-Matrix.md': 'config-and-env',
  '01-Executive-Overview.md': 'executive-overview'
}

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function main() {
  ensureDir(DEST_DIR)
  if (!fs.existsSync(SRC_DIR)) {
    console.warn('docs/ not found; nothing to import.')
    return
  }
  const entries = Object.keys(curated)
  for (const name of entries) {
    const srcPath = path.join(SRC_DIR, name)
    if (!fs.existsSync(srcPath)) {
      console.warn('missing curated doc:', name)
      continue
    }
    const raw = fs.readFileSync(srcPath, 'utf8')
    const slug = curated[name]
    const out = path.join(DEST_DIR, `${slug}.mdx`)
    const banner = `{/* imported from repo/docs/${name}; review for secrets/PII before publishing */}\n\n`
    fs.writeFileSync(out, banner + raw, 'utf8')
    if (slug === 'executive-overview') {
      const appendix = `\n## Admin Console Overview\n\n- 144+ pages covering onboarding workflows, API definition designer, deployment lifecycle (preview → staged → promoted), observability dashboards, billing attribution, and audits.\n- Delegated administration with RBAC/ABAC, session management, and per-tenant views.\n- Integration orchestration: webhook subscriptions, automation hooks, and configuration catalogues for environments.\n\n## gRPC Support\n\n- Native gRPC/grpcs routing with service reflection, mTLS, custom CA bundles, and streaming interceptors.\n- Per-method rate limiting, circuit breaker protection, and Prometheus metrics per RPC.\n- Admin Console designer for gRPC definitions alongside REST and GraphQL.\n\n## Webhook Orchestration\n\n- Event subscriptions for tenant lifecycle, deployments, policies, and consumer activity.\n- Delivery policies with retry backoff, dead-letter queues, replay tools, and signature rotation.\n- Delivery analytics, alerting hooks, and automation-friendly APIs.\n\n## Consumer Groups & Multi-Tenancy\n\n- Group consumers under a tenant, share credentials, and apply shared policies and quotas.\n- End-to-end isolation with org-scoped data, delegated administrators, and export tooling.\n- Reporting and billing attribution by consumer group, surfaced in the Admin Console dashboards.\n`
      fs.appendFileSync(out, appendix, 'utf8')
    }
    console.log('imported', name, '->', out)
  }
}

main()
