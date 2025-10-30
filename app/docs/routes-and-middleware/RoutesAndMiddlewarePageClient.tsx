'use client';

import { motion } from 'framer-motion';
import {
  LockKeyhole,
  Users,
  Gauge,
  FileSearch,
  Code,
  GitBranch,
  ArrowRight,
  CheckCircle,
  Shield,
  Network,
  Cpu,
  Zap,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/animated-background';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Use a typed easing tuple to satisfy Framer Motion's Easing type (no plain strings).
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const middlewareStack = [
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: 'Authentication',
    description: 'OAuth2/JWT verification with optional mTLS support',
    features: [
      'OAuth2 token validation',
      'JWT signature verification',
      'Optional mutual TLS (mTLS)',
      'Token introspection',
      'Key rotation support',
    ],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    position: 'First',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Authorization & Context',
    description: 'Organization/tenant context with correlation IDs',
    features: [
      'Multi-tenant isolation',
      'Organization context propagation',
      'Request correlation IDs',
      'RBAC/ABAC policies',
      'Custom claim validation',
    ],
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    position: 'Second',
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    title: 'Rate Limiting',
    description: 'Redis-backed or in-memory rate limiting with burst support',
    features: [
      'Redis cluster support',
      'In-memory fallback',
      'Burst capacity management',
      'Per-IP/Per-User limits',
      'Dynamic limit configuration',
    ],
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    position: 'Third',
  },
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: 'OpenAPI Validation',
    description: 'Request/response validation against OpenAPI specifications',
    features: [
      'Request schema validation',
      'Response validation',
      'Parameter validation',
      'Payload size limits',
      'Content-type enforcement',
    ],
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    position: 'Fourth',
  },
];

const routingExamples = {
  basic: `# routes/config.yaml
routes:
  - path: /api/v1/users
    upstream: user-service
    methods: [GET, POST, PUT]
    middleware:
      - auth
      - rate_limit
      - validation
    
  - path: /api/v1/orders
    upstream: order-service
    methods: [GET, POST, PUT, DELETE]
    middleware:
      - auth
      - rate_limit
      - validation
      - audit`,
  advanced: `# advanced-routing.yaml
routes:
  - path: /api/v1/products/*
    upstream: product-service
    methods: [GET]
    rate_limit:
      requests_per_minute: 1000
      burst_size: 100
    cors:
      allowed_origins: ["https://app.example.com"]
    
  - path: /api/v1/admin/*
    upstream: admin-service
    methods: [GET, POST, PUT, DELETE]
    middleware:
      - auth
      - admin_only
      - strict_rate_limit
    mTLS: required`,
  middleware: `# middleware/config.yaml
middleware:
  auth:
    type: oauth2
    jwks_url: https://auth.example.com/.well-known/jwks.json
    required_scopes: ["api:read", "api:write"]
    
  rate_limit:
    type: redis
    requests_per_minute: 100
    burst_size: 20
    redis_url: redis://localhost:6379
    
  validation:
    type: openapi
    schema_url: ./schemas/api-spec.yaml
    validate_request: true
    validate_response: true`,
};

const fullStackFeatures = [
  {
    category: 'Security',
    items: [
      'OAuth2/OIDC compliance',
      'JWT validation with multiple algorithms',
      'mTLS with certificate pinning',
      'CORS configuration',
      'CSRF protection',
    ],
  },
  {
    category: 'Routing',
    items: [
      'Path-based routing',
      'Header-based routing',
      'Weight-based traffic splitting',
      'Circuit breaker patterns',
      'Retry policies with backoff',
    ],
  },
  {
    category: 'Performance',
    items: [
      'Redis cluster rate limiting',
      'In-memory caching layer',
      'Connection pooling',
      'Response compression',
      'Request deduplication',
    ],
  },
  {
    category: 'Observability',
    items: [
      'Structured JSON logging',
      'Prometheus metrics endpoint',
      'Request correlation IDs',
      'Distributed tracing support',
      'Health check endpoints',
    ],
  },
];

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

export default function RoutesAndMiddlewarePageClient() {
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
                <GitBranch className="h-4 w-4 mr-2" />
                Routes & Middleware
              </Badge>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Advanced <GradientText>Request Processing</GradientText>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Powerful routing capabilities and comprehensive middleware stack for enterprise-grade API
              security, validation, and observability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Middleware Stack */}
      <section className="py-16 md:py-20">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Middleware <GradientText>Execution Stack</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Request processing pipeline with ordered middleware execution
            </motion.p>
          </motion.div>

          {/* Middleware Pipeline Visualization */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative mb-20"
          >
            {/* Connection Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-green-500 via-purple-500 transform -translate-x-1/2 z-0" />

            <div className="relative z-10 space-y-8">
              {middlewareStack.map((middleware, index) => (
                <motion.div
                  key={middleware.title}
                  variants={itemVariants}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block max-w-md">
                      <Badge variant="brand" className="mb-2">
                        {middleware.position} in Pipeline
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{middleware.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{middleware.description}</p>
                      <ul className="space-y-1">
                        {middleware.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Middleware Node */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${middleware.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      {middleware.icon}
                    </div>
                  </div>

                  <div className="flex-1">{/* spacer for alternating layout */}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Middleware Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {middlewareStack.map((middleware) => (
              <motion.div key={middleware.title} variants={itemVariants}>
                <Card className="h-full backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`rounded-2xl bg-gradient-to-br ${middleware.color} p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {middleware.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {middleware.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {middleware.position}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{middleware.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {middleware.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Configuration Examples */}
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
              Configuration <GradientText>Examples</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Flexible configuration for routes and middleware with YAML-based syntax
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Tabs defaultValue="basic" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Basic Routes
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Advanced Security
                </TabsTrigger>
                <TabsTrigger value="middleware" className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Middleware Config
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <CodeBlock
                  code={routingExamples.basic}
                  language="yaml"
                  filename="routes/config.yaml"
                  showLineNumbers={true}
                />
              </TabsContent>

              <TabsContent value="advanced">
                <CodeBlock
                  code={routingExamples.advanced}
                  language="yaml"
                  filename="advanced-routing.yaml"
                  showLineNumbers={true}
                />
              </TabsContent>

              <TabsContent value="middleware">
                <CodeBlock
                  code={routingExamples.middleware}
                  language="yaml"
                  filename="middleware/config.yaml"
                  showLineNumbers={true}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Full Feature Stack */}
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
              Complete <GradientText>Feature Stack</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade capabilities for every aspect of API management
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {fullStackFeatures.map((category) => (
              <motion.div key={category.category} variants={itemVariants}>
                <Card className="h-full backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Documentation CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-900/20 dark:to-cyan-900/20">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <Badge variant="brand" className="px-4 py-2">
                <BookOpen className="h-4 w-4 mr-2" />
                Complete Documentation
              </Badge>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Explore <GradientText>Full Documentation</GradientText>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Dive deeper into our comprehensive middleware stack and routing capabilities with complete
              examples and advanced configurations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/your-org/modern-api-gateway/blob/main/docs/03-Routes-and-Middleware.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
              >
                <BookOpen className="h-5 w-5" />
                View Full Documentation
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/your-org/modern-api-gateway"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm px-8 py-4 text-base font-semibold transition-all hover:border-brand-500 hover:scale-105"
              >
                <Code className="h-5 w-5" />
                Explore Codebase
              </a>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              See <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">docs/03-Routes-and-Middleware.md</code> in the repository for a full stack list.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
