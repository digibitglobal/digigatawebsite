'use client'

import { motion } from 'framer-motion'
import {
  HelpCircle,
  LayoutDashboard,
  Code,
  ServerCog,
  Users2,
  Shield,
  Zap,
  Server,
  Search,
  BookOpen,
  BarChart
} from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { AnimatedBackground, GradientText } from '@/components/ui/animated-background'
import Link from 'next/link'

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: <HelpCircle className="h-5 w-5" />,
    color: 'from-blue-500 to-cyan-500',
    faqs: [
      {
        q: 'What is DigiGate?',
        a: 'DigiGate is an enterprise-grade, multi-tenant API management platform that provides centralized control over API exposure, security, observability, and lifecycle management. It combines a high-performance Go-based gateway with a Next.js admin console.'
      },
      {
        q: 'Who should use this gateway?',
        a: 'This gateway is ideal for enterprises managing multiple microservices, SaaS platforms requiring multi-tenant isolation, platform teams building API-as-a-Service offerings, and organizations needing advanced API governance and security.'
      },
      {
        q: 'What makes this different from other API gateways?',
        a: 'Key differentiators include: Multi-tenancy first design with built-in tenant isolation, zero-downtime operations with hot-reload of configurations, comprehensive observability with Prometheus and Jaeger out of the box, modern Go + Next.js stack, and developer-friendly OpenAPI integration with bulk import capabilities.'
      },
      {
        q: 'Is this production-ready?',
        a: 'Yes. The gateway is production-ready with comprehensive test coverage (>80% backend, >70% frontend), circuit breakers and health checks for resilience, distributed rate limiting, full audit logging for compliance, and multi-factor authentication support.'
      },
      {
        q: 'What license does this use?',
        a: 'Copyright Â© 2024 ABDUL Shadrach. All rights reserved. Contact admin@katanga.com for licensing inquiries.'
      }
    ]
  },
  {
    id: 'installation',
    title: 'Installation & Setup',
    icon: <Code className="h-5 w-5" />,
    color: 'from-green-500 to-emerald-500',
    faqs: [
      {
        q: 'What are the system requirements?',
        a: 'Minimum: 2 CPU cores, 4GB RAM, 10GB disk, Linux/macOS/Windows (WSL2). Recommended for production: 4+ CPU cores, 8GB+ RAM, 50GB+ disk, Linux (Ubuntu 20.04+, RHEL 8+).'
      },
      {
        q: 'How long does setup take?',
        a: 'Development environment: 10-15 minutes with Docker. Production deployment: 1-2 hours including infrastructure setup.'
      },
      {
        q: 'Do I need Docker?',
        a: 'For development, Docker Compose simplifies setup significantly. For production, you can deploy Docker containers, Kubernetes pods, or native binaries on VMs.'
      },
      {
        q: 'Can I run this on Windows?',
        a: 'Yes, using WSL2 (recommended), Docker Desktop for Windows, or native Go compilation (Windows binaries supported).'
      },
      {
        q: 'What databases are supported?',
        a: 'PostgreSQL 12+ (recommended: 15+). MySQL/MariaDB support is planned for future releases.'
      },
      {
        q: 'Can I use an existing PostgreSQL database?',
        a: 'Yes. Configure the database connection in config.yaml with your host, port, credentials, and SSL mode. Then run migrations using docker-compose up migrations.'
      }
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture & Design',
    icon: <Server className="h-5 w-5" />,
    color: 'from-purple-500 to-pink-500',
    faqs: [
      {
        q: 'How does the request flow work?',
        a: 'Client â†’ API Gateway â†’ [Middleware Chain] â†’ Upstream Service. The middleware chain includes: tenant extraction, authentication (JWT/OAuth2/mTLS/API Key), rate limiting, authorization (RBAC/ABAC), OpenAPI validation, circuit breaker, observability, and upstream routing.'
      },
      {
        q: 'Is the gateway stateless?',
        a: 'Yes. All state is stored in PostgreSQL (API definitions, users, organizations, audit logs) and Redis (rate limit counters, feature flags, caching). This enables horizontal scaling without sticky sessions.'
      },
      {
        q: 'How are API definitions stored?',
        a: 'API definitions are stored in PostgreSQL and cached in memory. They can be created via the Admin Console, imported from OpenAPI 3.0 specs, managed via REST API, and hot-reloaded without downtime.'
      },
      {
        q: 'Can I use this with GraphQL?',
        a: 'Yes. The gateway supports GraphQL proxying to GraphQL servers, GraphQL introspection, and GraphQL-specific rate limiting. GraphQL federation is planned for Q2 2025.'
      },
      {
        q: 'Does this support gRPC?',
        a: 'Yes. The gateway exposes a gRPC endpoint on port 50051 and can proxy gRPC requests to upstream services. HTTP/2 is required for gRPC support.'
      }
    ]
  },
  {
    id: 'multitenancy',
    title: 'Multi-Tenancy',
    icon: <BookOpen className="h-5 w-5" />,
    color: 'from-orange-500 to-red-500',
    faqs: [
      {
        q: 'How is tenant isolation achieved?',
        a: 'Through multiple layers: Database level (all records have organization_id foreign key), application level (middleware filters queries by tenant), subdomain routing (tenant1.example.com â†’ Organization "tenant1"), API key scoping (keys tied to specific organizations), and resource quotas (rate limits, storage limits per tenant).'
      },
      {
        q: 'How do I add a new organization/tenant?',
        a: 'Via the Admin Console: Navigate to Organizations â†’ Create New, fill in organization details (name, subdomain, plan), assign admin users, and configure API definitions. Or use the REST API to create organizations programmatically.'
      },
      {
        q: 'Can tenants have custom domains?',
        a: 'Yes. Configure custom domains in organization settings. You\'ll need to add a DNS CNAME record pointing to your gateway, upload an SSL certificate for the custom domain, and enable the custom domain in organization settings.'
      },
      {
        q: 'How do I migrate data between tenants?',
        a: 'Use the bulk export/import feature: Export organization data via Admin Console, modify the exported JSON/YAML, and import into the target organization. Note: User credentials are not exported for security reasons.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Authentication & Authorization',
    icon: <Shield className="h-5 w-5" />,
    color: 'from-red-500 to-pink-500',
    faqs: [
      {
        q: 'What authentication methods are supported?',
        a: 'Four methods: JWT Tokens (Bearer tokens with RS256/HS256 signing), OAuth 2.0/OIDC (integration with external identity providers), Mutual TLS (mTLS for certificate-based authentication), and API Keys (long-lived keys for programmatic access).'
      },
      {
        q: 'How do I configure OAuth2?',
        a: 'In config.yaml, enable OAuth2 and configure the issuer URL, JWKS URL, audience, and required scopes. The gateway will validate tokens against the JWKS endpoint.'
      },
      {
        q: 'How long do JWT tokens last?',
        a: 'Default expiration: Access tokens last 15 minutes, refresh tokens last 7 days. Both are configurable in config.yaml.'
      },
      {
        q: 'How do I implement RBAC policies?',
        a: 'Via the Admin Console: Define Roles (e.g., "API Developer", "Viewer"), assign Permissions to roles (e.g., api_definition:create), and assign Roles to users. You can also do this programmatically in Go code.'
      },
      {
        q: 'What is ABAC and when should I use it?',
        a: 'ABAC (Attribute-Based Access Control) evaluates policies based on user attributes (role, department), resource attributes (sensitivity, owner), and environment attributes (time, IP). Use ABAC when you need dynamic, context-aware policies, RBAC is too rigid, or you have complex access requirements.'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Scaling',
    icon: <Zap className="h-5 w-5" />,
    color: 'from-yellow-500 to-orange-500',
    faqs: [
      {
        q: 'What is the expected throughput?',
        a: 'Single instance (2vCPU, 8GB RAM): 10,000+ requests/sec with <10ms p50 latency and <50ms p99 latency (excluding upstream). Horizontal scaling: 100,000+ req/sec with 10 instances, tested with 1M+ requests in load tests.'
      },
      {
        q: 'How do I scale the gateway?',
        a: 'Horizontal scaling (recommended): Deploy multiple gateway instances behind a load balancer using shared PostgreSQL and Redis with replication. No coordination needed due to stateless design. Vertical scaling: Increase CPU/RAM for higher single-instance throughput.'
      },
      {
        q: 'What are the bottlenecks?',
        a: 'Main bottlenecks: PostgreSQL writes (mitigate with connection pooling, read replicas), Redis throughput (mitigate with Redis Cluster or sharding), and Network I/O (use CDN for static assets, optimize payload sizes).'
      },
      {
        q: 'How does caching work?',
        a: 'Multi-level caching: In-memory (API definitions cached after load), Redis (feature flags, rate limit counters), and Browser (Cache-Control headers for static content). Cache invalidation is automatic when definitions are updated.'
      },
      {
        q: 'Can I run this in Kubernetes?',
        a: 'Yes. The gateway is designed for Kubernetes with stateless pods (horizontal scaling), liveness and readiness probes, ConfigMaps for configuration, Secrets for credentials, and StatefulSets for PostgreSQL/Redis. Kubernetes manifests are planned for Q2 2025.'
      }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: <Server className="h-5 w-5" />,
    color: 'from-indigo-500 to-purple-500',
    faqs: [
      {
        q: 'What deployment options are available?',
        a: 'Docker Compose (development, small production), Kubernetes (production, high availability), VM-based (native Go binaries), and cloud platforms (AWS ECS, Azure Container Instances, GCP Cloud Run).'
      },
      {
        q: 'Do I need Consul in production?',
        a: 'Consul is optional. It\'s only required if you use dynamic service discovery. Alternatives include static endpoints in config.yaml, Kubernetes Service DNS, or external load balancers.'
      },
      {
        q: 'How do I handle SSL/TLS certificates?',
        a: 'Option 1 (recommended): Terminate at load balancer using AWS ALB, NGINX, or Traefik, with gateway communicating over HTTP internally. Option 2: Terminate at gateway by configuring TLS in config.yaml with cert and key files.'
      },
      {
        q: 'How do I backup the system?',
        a: 'Critical data: PostgreSQL database (automated daily snapshots + WAL archiving), configuration files (Git repository), and SSL certificates (secure encrypted storage). Redis data doesn\'t need backup (cache only). RTO: <15 minutes, RPO: <1 hour.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: <BarChart className="h-5 w-5" />,
    color: 'from-cyan-500 to-blue-500',
    faqs: [
      {
        q: 'The gateway won\'t start. What should I check?',
        a: 'Check: 1) Database connection (docker-compose logs postgres), 2) Configuration errors (go run main.go --validate-config), 3) Port conflicts (netstat -an | grep 8089), and 4) Environment variables (cat .env).'
      },
      {
        q: 'API requests are slow. How do I debug?',
        a: 'Check Prometheus metrics at :9090 (query: api_gateway_request_latency_seconds), use distributed tracing in Jaeger UI at :16686 to identify slow upstream services, enable debug logging, and check database query performance with slow query logs.'
      },
      {
        q: 'Rate limiting isn\'t working. What\'s wrong?',
        a: 'Common causes: Redis not running (check with docker-compose ps redis), rate limit not configured for the API (set rate_limit_enabled: true), or Redis connection errors (check logs with docker-compose logs api-gateway | grep redis).'
      },
      {
        q: 'How do I view audit logs?',
        a: 'Via Admin Console (navigate to Audit Logs section), directly via database (SELECT from audit_logs table), or via API (GET /admin/audit-logs endpoint with authentication).'
      },
      {
        q: 'Error: "Organization not found". What does this mean?',
        a: 'The tenant extraction middleware couldn\'t resolve the organization from subdomain, X-Organization-ID header, or API key\'s associated organization. Verify subdomain is correct and organization exists, or use correct header/API key.'
      }
    ]
  }
]

export default function FAQPage() {
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
            <Badge variant="glass" className="mb-6 backdrop-blur-xl">
              <HelpCircle className="h-3 w-3 mr-2" />
              Frequently Asked Questions
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Got <GradientText>questions?</GradientText> We have answers
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about DigiGate
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="container-default max-w-5xl">
          <Tabs defaultValue="general" className="w-full">
            <div className="mb-12">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 h-auto bg-transparent">
                {faqCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-brand data-[state=active]:text-white h-auto"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card variant="glass" className="backdrop-blur-xl p-6 md:p-8">
                    <Accordion type="single" defaultValue={category.faqs[0].q}>
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={faq.q}>
                          <AccordionTrigger>
                            <span className="text-left font-semibold text-gray-900 dark:text-white">
                              {faq.q}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {faq.a}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still have <GradientText>questions?</GradientText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our team is here to help you get started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-brand transition-all hover:shadow-brand-lg hover:scale-105"
              >
                <HelpCircle className="h-5 w-5" />
                Contact Support
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-8 py-4 text-base font-semibold transition-all hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20"
              >
                <BookOpen className="h-5 w-5" />
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


