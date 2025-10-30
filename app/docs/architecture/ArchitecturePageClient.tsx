'use client';

import { motion } from 'framer-motion';
import {
  GitBranch,
  LockKeyhole,
  Activity,
  ShieldCheck,
  Gauge,
  Server,
  Network,
  Database,
  Code,
  ArrowRight,
  CheckCircle,
  Cpu,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/animated-background';
import { CodeBlock } from '@/components/ui/code-block';

// --- Typed easing to satisfy Framer Motion's Easing type ---
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const architectureFeatures = [
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'Dynamic Routing',
    description: 'Round-robin, version, and weight-based routing with Consul service discovery',
    details: [
      'Consul-based service discovery',
      'Round-robin load balancing',
      'Version-based routing',
      'Weight-based traffic splitting',
      'Health check integration',
    ],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: 'Security & Identity',
    description: 'OAuth2/JWT verification, optional mTLS with tenant/organization context',
    details: [
      'OAuth2 and JWT verification',
      'Optional mutual TLS (mTLS)',
      'Tenant and organization context',
      'RBAC/ABAC authorization',
      'Certificate management',
    ],
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: 'Rate Limiting & Resilience',
    description: 'Redis-backed rate limits, circuit breaker patterns, and health checks',
    details: [
      'Redis-backed rate limiting',
      'Circuit breaker patterns',
      'Health check endpoints',
      'Burst capacity management',
      'Distributed coordination',
    ],
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'OpenAPI Validation',
    description: 'Request/response validation against OpenAPI specifications',
    details: [
      'Request validation',
      'Response validation',
      'Schema enforcement',
      'Error transformation',
      'Beta: Import/normalization',
    ],
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    title: 'Observability',
    description: 'Prometheus metrics, correlation IDs, and tracing hooks',
    details: [
      'Prometheus metrics endpoint',
      'Request correlation IDs',
      'Structured logging',
      'Performance metrics',
      'Tracing hooks (Roadmap)',
    ],
    color: 'from-violet-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-violet-500/10 to-purple-500/10',
  },
];

const codeExamples = {
  routing: `// internal/routing/dynamic_router.go
type DynamicRouter struct {
    consulClient  *consul.Client
    rateLimiter   redis.RateLimiter
    healthChecker *health.Checker
}

func (r *DynamicRouter) Route(req *http.Request) (*http.Response, error) {
    service := r.consulClient.Discover(req)
    if !r.healthChecker.IsHealthy(service) {
        return nil, ErrServiceUnavailable
    }
    return r.rateLimiter.Wrap(service).Execute(req)
}`,
  middleware: `// middleware/auth/jwt_validator.go
type JWTValidator struct {
    verifier    *oidc.IDTokenVerifier
    tenantStore TenantStore
}

func (v *JWTValidator) Validate(token string) (*Claims, error) {
    claims, err := v.verifier.Verify(token)
    if err != nil {
        return nil, ErrInvalidToken
    }

    return v.tenantStore.EnrichClaims(claims)
}`,
  config: `// config/config.go
type Config struct {
    RateLimit struct {
        RedisEnabled      bool
        RequestsPerMinute int
        BurstSize         int
    }

    Auth struct {
        OAuth2        bool
        JWTValidation bool
        MTLS          string // "required", "optional", "disabled"
    }

    Consul struct {
        Address     string
        HealthCheck bool
    }

    Observability struct {
        Prometheus     bool
        CorrelationIDs bool
    }
}`,
};

const systemComponents = [
  {
    name: 'API Gateway Core',
    description: 'Request processing and routing engine',
    technologies: ['Go', 'HTTP/2', 'TLS 1.3'],
    icon: <Server className="h-5 w-5" />,
  },
  {
    name: 'Service Discovery',
    description: 'Dynamic service registration and discovery',
    technologies: ['Consul', 'Kubernetes', 'DNS'],
    icon: <Network className="h-5 w-5" />,
  },
  {
    name: 'Data Layer',
    description: 'Rate limiting and state management',
    technologies: ['Redis', 'In-Memory', 'Cluster Mode'],
    icon: <Database className="h-5 w-5" />,
  },
  {
    name: 'Observability',
    description: 'Metrics, logging, and tracing',
    technologies: ['Prometheus', 'OpenTelemetry', 'Structured Logs'],
    icon: <Activity className="h-5 w-5" />,
  },
];

// Variants with typed easing (no plain strings)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export default function ArchitecturePageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative border-b border-gray-200/40 py-16 md:py-24 dark:border-gray-800/50">
        <div className="container-default">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <Badge variant="glass" className="px-4 py-2 backdrop-blur-xl">
                <Cpu className="h-4 w-4 mr-2" />
                System Architecture
              </Badge>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Built for <GradientText>Scale & Security</GradientText>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Explore the technical foundation of our modern API gateway - designed for enterprise-grade
              security, high availability, and cloud-native scalability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 md:py-20">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          >
            <div>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
                Architecture <GradientText>Overview</GradientText>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Our gateway is built on a modular architecture that separates concerns while maintaining high
                performance. Each component is designed to be independently scalable and fault-tolerant.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                {systemComponents.map((component) => (
                  <div
                    key={component.name}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-brand-500/10 text-brand-500">{component.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{component.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{component.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {component.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="relative"
            >
              {/* Architecture Diagram Placeholder */}
              <div className="relative h-full min-h-[400px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white mb-4">
                      <Zap className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      System Architecture Diagram
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Interactive architecture visualization</p>
                    <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-brand-500 transition-colors">
                      View Detailed Diagram
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Simple node visualization */}
                <div className="absolute top-8 left-8 w-24 h-24 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center">
                  <Server className="h-8 w-8 text-blue-500" />
                </div>
                <div className="absolute top-8 right-8 w-24 h-24 rounded-xl bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                  <Database className="h-8 w-8 text-green-500" />
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-xl bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center">
                  <Network className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Core Features Grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-4">
              Core <GradientText>Features</GradientText>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
            >
              Enterprise-grade capabilities built for modern API management
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {architectureFeatures.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="h-full backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div
                        className={`mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Implementation <GradientText>Examples</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore key implementation details from our codebase
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <CodeBlock
                code={codeExamples.routing}
                language="go"
                filename="internal/routing/dynamic_router.go"
                showLineNumbers={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <CodeBlock
                code={codeExamples.middleware}
                language="go"
                filename="middleware/auth/jwt_validator.go"
                showLineNumbers={true}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <CodeBlock code={codeExamples.config} language="go" filename="config/config.go" showLineNumbers={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/your-org/modern-api-gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 text-base font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              <Code className="h-5 w-5" />
              Explore Full Codebase on GitHub
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 md:py-20">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Performance <GradientText>Metrics</GradientText>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '<10ms', label: 'P99 Latency' },
              { value: '100k+', label: 'Req/Sec' },
              { value: '99.99%', label: 'Uptime' },
              { value: '0ms', label: 'Downtime' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ease: EASE_OUT }}
                className="text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
