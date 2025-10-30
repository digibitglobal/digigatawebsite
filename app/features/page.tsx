'use client'

import { motion } from 'framer-motion'
import {
  LockKeyhole,
  ShieldCheck,
  GitBranch,
  Network,
  Activity,
  Gauge,
  Check,
  Zap,
  Code,
  Database,
  ServerCog,
  Webhook,
  Workflow,
  Users2,
  LayoutDashboard
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AnimatedBackground, GradientText } from '@/components/ui/animated-background'
import { CodeBlock } from '@/components/ui/code-block'

const features = [
  {
    icon: <LockKeyhole className="h-8 w-8" />,
    title: 'Auth & Identity',
    description: 'OAuth2/JWT verification, optional mTLS, org/tenant context, RBAC/ABAC enforcement.',
    color: 'from-purple-500 to-pink-500',
    highlights: ['OAuth2 / JWT', 'mTLS Support', 'RBAC / ABAC', 'Multi-tenant'],
    code: `auth:
  oauth2:
    enabled: true
    jwks_url: "https://auth.example.com/.well-known/jwks.json"
  mtls:
    enabled: optional
    ca_cert_path: "/certs/ca.pem"
  rbac:
    enabled: true
    roles: ["admin", "platform", "viewer"]`
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Policy & Rate Limits',
    description: 'Per-API quotas with Redis token buckets, global ceilings, and consumer-group overrides.',
    color: 'from-brand-500 to-cyan-500',
    highlights: ['Redis-backed', 'Burst Control', 'Consumer Groups', 'Prometheus Metrics'],
    code: `rate_limit:
  redis:
    enabled: true
    address: "redis:6379"
  rules:
    - path: "/tenant/{org}/**"
      requests_per_minute: 1000
      burst_size: 100
    - consumer_group: "partners"
      requests_per_minute: 200
      burst_size: 40`
  },
  {
    icon: <LayoutDashboard className="h-8 w-8" />,
    title: 'Admin Console',
    description: '144-page management console for onboarding, definitions, deployments, billing, and audits.',
    color: 'from-indigo-500 to-sky-500',
    highlights: ['Onboarding Workflows', 'Deployment Lifecycle', 'Observability Dashboards', 'Audit Trails'],
    code: `admin_console:
  sso:
    enabled: true
    provider: "okta"
  features:
    onboarding: enabled
    deployment_pipeline: enabled
    feedback_center: enabled`
  },
  {
    icon: <GitBranch className="h-8 w-8" />,
    title: 'GraphQL & APQ',
    description: 'GraphQL proxying with persisted queries, schema stabilisation, and caching controls.',
    color: 'from-orange-500 to-red-500',
    highlights: ['Persisted Queries', 'Schema Registry', 'Playground Control', 'Response Caching'],
    code: `graphql:
  upstream: "https://rates.example.com/graphql"
  persisted_queries:
    enabled: true
    header: "X-Query-Id"
  introspection:
    production: false
  cache:
    ttl: 60`
  },
  {
    icon: <ServerCog className="h-8 w-8" />,
    title: 'gRPC Gateway',
    description: 'mTLS-secured gRPC proxy with per-method rate limiting, reflection, and custom CA bundles.',
    color: 'from-amber-500 to-orange-500',
    highlights: ['Reflection', 'mTLS', 'Per-method Limits', 'Custom CA Support'],
    code: `definitions:
  - name: account-grpc
    protocol: grpc
    grpc_services:
      - "accounts.v1.Accounts"
    upstream_urls:
      - "grpcs://accounts:9443"
    grpc_security:
      client_ca_file: "/certs/clients.pem"
      enforce_rate_limit: true`
  },
  {
    icon: <Webhook className="h-8 w-8" />,
    title: 'Webhooks & Events',
    description: 'Event subscriptions, delivery policies, replay tooling, and signature verification.',
    color: 'from-rose-500 to-fuchsia-500',
    highlights: ['Delivery History', 'Replay', 'Secret Rotation', 'Dead-letter Queue'],
    code: `webhooks:
  events:
    - tenant.created
    - definition.promoted
  delivery:
    retries: 5
    backoff: exponential
  signing:
    algorithm: "HMAC-SHA256"
    secret_ref: "kv/webhooks/signing"`
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: 'Transformations & Aggregation',
    description: 'Request/response transforms, Go templates, header rewrites, and parallel aggregation.',
    color: 'from-teal-500 to-emerald-500',
    highlights: ['Body Templates', 'Header Rules', 'Aggregation', 'Go Templates'],
    code: `transformations:
  request:
    - name: add-tenant-header
      target: headers
      action: set
      key: "X-Tenant-ID"
      value: "{{ .OrgID }}"
  aggregation:
    jobs:
      - name: "get-user"
        endpoint: "user-service"
      - name: "get-metrics"
        endpoint: "metrics-service"`
  },
  {
    icon: <Users2 className="h-8 w-8" />,
    title: 'Consumer Groups',
    description: 'Organize consumers, apply shared credentials, policies, and analytics per group.',
    color: 'from-cyan-500 to-blue-500',
    highlights: ['Scoped Credentials', 'Group Quotas', 'Analytics', 'Admin Console CRUD'],
    code: `consumer_groups:
  - name: "internal-services"
    description: "Trusted internal workloads"
    rate_limit:
      requests_per_minute: 300
      burst_size: 60
    consumers:
      - "svc-payments"
      - "svc-orders"`
  },
  {
    icon: <Network className="h-8 w-8" />,
    title: 'Service Discovery & Routing',
    description: 'Consul discovery with versioned, weighted routing, health checks, and failover orchestration.',
    color: 'from-sky-500 to-blue-600',
    highlights: ['Consul Integration', 'Weighted Routing', 'Health Checks', 'Failover'],
    code: `service_discovery:
  consul:
    address: "consul:8500"
    cache_ttl: 15s
  routing:
    rules:
      type: "weight_based"
      endpoints:
        - service_name: "orders-v1"
          weight: 20
        - service_name: "orders-v2"
          weight: 80`
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: 'OpenAPI Validation',
    description: 'Request and response schema validation with normalization and contract governance.',
    color: 'from-green-500 to-emerald-500',
    highlights: ['Schema Validation', 'Response Checks', 'Normalization', 'Governance'],
    code: `openapi:
  spec_path: "./openapi.yaml"
  validate_requests: true
  validate_responses: true
  strict_mode: true`
  },
  {
    icon: <Gauge className="h-8 w-8" />,
    title: 'Observability',
    description: 'Prometheus metrics, correlation IDs, trace exporters, and circuit breaker analytics.',
    color: 'from-violet-500 to-purple-500',
    highlights: ['Prometheus', 'Correlation IDs', 'Trace Exporters', 'Circuit Breakers'],
    code: `observability:
  prometheus:
    enabled: true
    path: "/metrics"
  tracing:
    exporter: "jaeger"
    sample_rate: 0.2
  logging:
    structured: true`
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function FeaturesPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-gray-200/40 dark:border-gray-800">
        <AnimatedBackground variant="mesh" />

        <div className="container-default relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="brand" className="mb-6">
              <Zap className="h-3 w-3 mr-2" />
              Enterprise-Grade Features
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Everything you need to <GradientText>manage APIs</GradientText>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Production-ready features designed for security, scalability, and developer experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid with Tabs */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="container-default">
          <Tabs defaultValue={features[0].title} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="inline-flex flex-wrap gap-2 bg-transparent">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.title}
                    value={feature.title}
                    className="data-[state=active]:bg-gradient-brand data-[state=active]:text-white"
                  >
                    {feature.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {features.map((feature, index) => (
              <TabsContent key={feature.title} value={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} p-4 text-white shadow-lg mb-6`}>
                      {feature.icon}
                    </div>

                    <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {feature.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <CodeBlock
                      code={feature.code}
                      language="yaml"
                      filename="config.yaml"
                      showLineNumbers={false}
                    />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* All Features Overview */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Complete Feature <GradientText>Overview</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300">
              All the tools you need in one powerful platform
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card
                  variant="elevated"
                  className="h-full group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg mb-4`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
