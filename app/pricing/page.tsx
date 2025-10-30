'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Building2, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedBackground, GradientText } from '@/components/ui/animated-background'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started and small projects',
    icon: <Sparkles className="h-5 w-5" />,
    features: [
      'Single gateway instance',
      'OpenAPI validation & request transforms (read-only)',
      'Prometheus metrics + correlation IDs',
      'Admin Console dashboards (read-only)',
      'Community support',
      'Up to 10k requests/month',
    ],
    cta: 'Get Started',
    href: '/docs',
    popular: false,
    color: 'from-gray-500 to-gray-700'
  },
  {
    name: 'Team',
    price: '$99',
    period: 'per month',
    description: 'For growing teams and production workloads',
    icon: <Zap className="h-5 w-5" />,
    features: [
      'Multiple gateways + sandbox environments',
      'Redis & consumer-group rate limits',
      'Consul discovery and weighted rollouts',
      'Admin Console CRUD (definitions, webhooks, deployments)',
      'Webhook orchestration + delivery replay',
      'Unlimited requests & email support',
      'Custom plugins and CLI automation',
    ],
    cta: 'Start Free Trial',
    href: '/contact',
    popular: true,
    color: 'from-brand-500 to-cyan-500'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large-scale deployments with custom needs',
    icon: <Building2 className="h-5 w-5" />,
    features: [
      'Everything in Team',
      'SAML/SSO + delegated administration',
      'Advanced Admin Console modules (billing, localization, approvals)',
      'SAST integrations and compliance reporting',
      'Dedicated support team & custom SLAs (99.99%)',
      'Hybrid / on-prem deployment assistance',
      'Priority roadmap influence',
      'Training, onboarding, and white-glove migration',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
    color: 'from-purple-500 to-pink-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-gray-200/40 dark:border-gray-800">
        <AnimatedBackground variant="gradient" />

        <div className="container-default relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="glass" className="mb-6 backdrop-blur-xl">
              <Star className="h-3 w-3 mr-2" />
              Simple, Transparent Pricing
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose the <GradientText>perfect plan</GradientText> for your needs
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="container-default">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-3"
          >
            {tiers.map((tier, index) => (
              <motion.div key={tier.name} variants={itemVariants}>
                <Card
                  variant={tier.popular ? 'gradient' : 'elevated'}
                  className={`relative h-full flex flex-col ${
                    tier.popular
                      ? 'border-2 border-brand-500 shadow-brand-lg scale-105 md:scale-110'
                      : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="gradient" className="shadow-brand-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className={`inline-flex mx-auto items-center justify-center rounded-2xl bg-gradient-to-br ${tier.color} p-3 text-white shadow-lg mb-4`}>
                      {tier.icon}
                    </div>

                    <CardTitle className="text-3xl mb-2">{tier.name}</CardTitle>
                    <CardDescription className="text-base mb-6">
                      {tier.description}
                    </CardDescription>

                    <div className="mb-2">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      {tier.period !== 'contact us' && (
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          / {tier.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white mt-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-8">
                    <Link href={tier.href} className="w-full">
                      <Button
                        variant={tier.popular ? 'gradient' : 'outline'}
                        size="lg"
                        className="w-full group"
                      >
                        {tier.cta}
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-default max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.'
              },
              {
                q: 'Is there a free trial for the Team plan?',
                a: 'Yes, we offer a 14-day free trial for the Team plan with no credit card required.'
              },
              {
                q: 'What kind of support is included?',
                a: 'Free tier includes community support, Team includes email support, and Enterprise gets dedicated support with custom SLAs.'
              },
            ].map((faq, i) => (
              <Card key={i} variant="glass" className="backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl">{faq.q}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {faq.a}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <Link href="/contact">
              <Button variant="gradient" size="lg">
                Contact Sales
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
