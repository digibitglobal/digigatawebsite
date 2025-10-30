'use client'

import Link from 'next/link'
import {
  ShieldCheck,
  Network,
  Gauge,
  GitBranch,
  Activity,
  LockKeyhole,
  ArrowRight,
  Zap,
  Lock,
  TrendingUp,
  Webhook,
  Users2,
  Workflow,
  ServerCog,
  LayoutDashboard
} from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedBackground, GradientText } from '@/components/ui/animated-background'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/ui/code-block'

const features = [
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: 'Auth & Identity',
    desc: 'OAuth2, JWT, API keys, and optional mTLS with org/tenant context plus RBAC & ABAC.',
    color: 'from-purple-600 to-purple-800'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Policy & Rate Limits',
    desc: 'Per-API quotas, consumer-group limits, and burst controls backed by Redis.',
    color: 'from-blue-600 to-blue-800' // Replaced 'brand'
  },
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: 'Admin Console',
    desc: '144-page enterprise console for onboarding, definitions, deployments, and audits.',
    color: 'from-indigo-600 to-indigo-800'
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'GraphQL & APQ',
    desc: 'First-class GraphQL proxying with persisted queries, introspection guardrails, and caching.',
    color: 'from-red-700 to-red-900' // Using a deep, mature red
  },
  {
    icon: <ServerCog className="h-6 w-6" />,
    title: 'gRPC Gateway',
    desc: 'mTLS-secured gRPC proxy with per-method rate limits, reflection, and custom CA bundles.',
    color: 'from-orange-700 to-orange-900' // Deep orange
  },
  {
    icon: <Webhook className="h-6 w-6" />,
    title: 'Webhooks & Events',
    desc: 'Event subscriptions, delivery tracking, replay tooling, and alerting for downstream systems.',
    color: 'from-slate-600 to-slate-800'
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Transformations & Aggregation',
    desc: 'Request/response transforms, header & body templates, path rewrites, and concurrent aggregation.',
    color: 'from-teal-600 to-teal-800'
  },
  // ...and so on for the rest
]

const stats = [
  { icon: <Zap className="h-5 w-5" />, label: 'Lightning Fast', value: '<10ms overhead' },
  { icon: <Lock className="h-5 w-5" />, label: 'Enterprise Security', value: 'OAuth2 + mTLS' },
  { icon: <TrendingUp className="h-5 w-5" />, label: 'Scalable', value: '100k+ req/sec' },
]

const codeExample = `# config.yaml (excerpt)
RateLimit:
  RedisEnabled: true
  RequestsPerMinute: 1000
  BurstSize: 100
Auth:
  OAuth2: true
  JWTValidation: true
  MTLS: optional
Consul:
  Address: consul:8500
  HealthCheck: true
Observability:
  Prometheus: true
  CorrelationIDs: true`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b border-gray-200/40 py-24 md:py-32 dark:border-gray-800">
        <AnimatedBackground variant="gradient" />

        <div className="container-default relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex"
            >
              <Badge variant="glass" className="px-4 py-2 text-sm backdrop-blur-xl">
                <span className="mr-2">MAG</span>
                DigiGate - Enterprise API Management Solution for Cloud-Native Teams
              </Badge>
            </motion.div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Ship{' '}
              <GradientText>secure, scalable</GradientText>
              <br />
              APIs faster
            </h1>

            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
              A programmable gateway and admin console with{' '}
              <span className="font-semibold text-brand-600 dark:text-brand-400">OAuth2/JWT</span>,{' '}
              <span className="font-semibold text-brand-600 dark:text-brand-400">mTLS</span>, OpenAPI enforcement,
              GraphQL & gRPC proxying, webhook orchestration, dynamic routing, and first-class observability.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/docs"
                className="group relative overflow-hidden rounded-xl bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-brand transition-all duration-300 hover:shadow-brand-lg hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-full" />
              </Link>

              <Link
                href="/admin-console"
                className="group rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-8 py-4 text-base font-semibold transition-all duration-300 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20"
              >
                Explore the Admin Console
                <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="text-brand-500">{stat.icon}</div>
                  <span className="font-medium">{stat.value}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="container-default">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
              Everything you need to <GradientText>scale APIs</GradientText>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade features designed for modern cloud-native applications
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, index) => (
              <motion.div key={f.title} variants={itemVariants}>
                <Card
                  variant="glass"
                  className="group h-full backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <CardHeader>
                    <div className={`mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${f.color} p-3 text-white shadow-lg`}>
                      {f.icon}
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                    <CardDescription className="text-base">{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-default">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Why <GradientText>DigiGate - Enterprise API Management Solution?</GradientText>
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  'Secure by default with OAuth2/JWT, mTLS, RBAC/ABAC, and tenant context',
                  'Operate through a 144-page Admin Console with deployment workflows and audits',
                  'GraphQL, gRPC, and REST support with transforms, aggregation, and rollouts',
                  'Webhook orchestration, consumer groups, and automation hooks for downstream systems',
                  'Prometheus metrics, correlation IDs, circuit breaker analytics, and health dashboards'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/how-it-works"
                  className="group inline-flex items-center gap-2 text-lg font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all"
                >
                  See how it works
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CodeBlock
                code={codeExample}
                language="yaml"
                filename="config.yaml"
                showLineNumbers={false}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
