import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from '@/components/navigation/MobileNav'
import ThemeToggle from '@/components/theme/ThemeToggle'
import { Shield, Zap, Globe, Code, BookOpen, MessageSquare, Star, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  metadataBase: new URL('https://modern-api-gateway.com'),
  title: {
    default: 'DigiGate - Enterprise API Management Solution - Secure, Scalable API Management',
    template: '%s | DigiGate - Enterprise API Management Solution',
  },
  description: 'Enterprise-grade API gateway with OAuth2/JWT, mTLS, OpenAPI validation, GraphQL proxy, and real-time observability. Built for cloud-native applications.',
  keywords: [
    'API Gateway', 'OAuth2', 'JWT', 'mTLS', 'OpenAPI', 'GraphQL', 'Consul', 'Redis', 
    'Prometheus', 'Microservices', 'Cloud Native', 'Kubernetes', 'DevOps', 'API Management'
  ],
  authors: [{ name: 'DigiGate - Enterprise API Management Solution Team' }],
  creator: 'DigiGate - Enterprise API Management Solution',
  publisher: 'DigiGate - Enterprise API Management Solution',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modern-api-gateway.com',
    title: 'DigiGate - Enterprise API Management Solution - Secure, Scalable API Management',
    description: 'Enterprise-grade API gateway with OAuth2/JWT, mTLS, OpenAPI validation, and real-time observability.',
    siteName: 'DigiGate - Enterprise API Management Solution',
    images: [
      {
        url: '/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DigiGate - Enterprise API Management Solution - Secure, Scalable API Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiGate - Enterprise API Management Solution - Secure, Scalable API Management',
    description: 'Enterprise-grade API gateway with OAuth2/JWT, mTLS, OpenAPI validation, and real-time observability.',
    images: ['/og/og-image.png'],
    creator: '@modernapigateway',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://modern-api-gateway.com',
    types: {
      'application/rss+xml': 'https://modern-api-gateway.com/blog/rss',
    },
  },
}

type NavigationItem = {
  href: string
  label: string
  icon?: ReactNode
}

type NavigationSection = {
  name: string
  items: NavigationItem[]
}

const navigationItems: NavigationSection[] = [
  {
    name: 'Product',
    items: [
      { href: '/features', label: 'Features', icon: <Zap className="h-4 w-4" /> },
      { href: '/admin-console', label: 'Admin Console', icon: <Globe className="h-4 w-4" /> },
      { href: '/how-it-works', label: 'How it Works', icon: <Code className="h-4 w-4" /> },
      { href: '/plugins', label: 'Plugins', icon: <Rocket className="h-4 w-4" /> },
    ]
  },
  {
    name: 'Developers',
    items: [
      { href: '/docs', label: 'Documentation', icon: <BookOpen className="h-4 w-4" /> },
      { href: '/integrations', label: 'Integrations', icon: <Shield className="h-4 w-4" /> },
      { href: '/changelog', label: 'Changelog', icon: <MessageSquare className="h-4 w-4" /> },
      { href: '/roadmap', label: 'Roadmap', icon: <Star className="h-4 w-4" /> },
    ]
  },
  {
    name: 'Company',
    items: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/blog', label: 'Blog' },
      { href: '/security', label: 'Security' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ]
  }
]

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/40 bg-white/90 backdrop-blur-xl shadow-sm dark:bg-gray-900/90 dark:border-gray-800/60 supports-backdrop-blur:bg-white/60">
      <div className="container-default">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 font-bold text-lg transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/25 group-hover:shadow-xl group-hover:shadow-brand-500/40 transition-all duration-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              DigiGate - Enterprise API Management Solution
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navigationItems.map((section) => (
              <div key={section.name} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20">
                  {section.name}
                  <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-4">
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 transition-all group/item"
                        >
                          {item.icon && (
                            <div className="text-brand-500 group-hover/item:scale-110 transition-transform">
                              {item.icon}
                            </div>
                          )}
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Get Started */}
            <Link
              href="/docs"
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105 active:scale-95"
            >
              <Rocket className="h-4 w-4" />
              Get Started
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-gray-200/40 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950 py-16 text-sm dark:border-gray-800/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-default relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg" />
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  DigiGate - Enterprise API Management Solution
                </span>
                <p className="text-xs text-gray-500 mt-1">Enterprise API Management</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              Secure, scalable API management platform built for modern cloud-native applications. 
              Enterprise-grade security with developer-friendly tooling.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { name: 'GitHub', href: 'https://github.com', icon: '🐙' },
                { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
                { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
                { name: 'Discord', href: 'https://discord.com', icon: '💬' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-10 w-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg hover:scale-110 hover:shadow-lg transition-all duration-300 hover:border-brand-500/50"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationItems.map((section) => (
            <div key={section.name}>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-base">
                {section.name}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300 hover:translate-x-1 group"
                    >
                      {item.icon && (
                        <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                          {item.icon}
                        </div>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DigiGate - Enterprise API Management Solution. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
          
          <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Terms
            </Link>
            <Link href="/security" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Security
            </Link>
            <Link href="/compliance" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import CookieConsent from '@/components/consent/CookieConsent'
import AnalyticsLoader from '@/components/consent/AnalyticsLoader'
import SEOJsonLd from '@/components/SEOJsonLd'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:shadow-2xl focus:text-brand-600 dark:focus:bg-gray-900 focus:font-semibold transition-all"
        >
          Skip to main content
        </a>
        
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          storageKey="modern-api-gateway-theme"
        >
          <Nav />
          <SEOJsonLd />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <AnalyticsLoader />
          <CookieConsent />
          <Footer />
        </ThemeProvider>
        
        {/* Progress Bar */}
        <div className="progress-bar fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-cyan-500 origin-left scale-x-0 z-50 transition-transform duration-200" />
      </body>
    </html>
  )
}
