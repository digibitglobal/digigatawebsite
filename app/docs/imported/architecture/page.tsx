'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  FileText, 
  Code, 
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  Cpu
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GradientText } from '@/components/ui/animated-background'

interface MdxContent {
  title: string
  description?: string
  content: string
  html?: string
}

type ArchitectureSection = {
  title: string
  content: string
  items?: string[]
}

type ArchitectureContent = {
  title: string
  description: string
  sections: ArchitectureSection[]
}

interface ArchitectureImportedProps {
  fallbackContent?: ArchitectureContent
}

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
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

// Fallback content in case the file doesn't exist
const fallbackArchitectureContent: ArchitectureContent = {
  title: "System Architecture",
  description: "Explore the technical architecture of our modern API gateway with dynamic routing, security layers, and observability features.",
  sections: [
    {
      title: "Core Components",
      content: "Our gateway is built on a modular architecture that separates concerns while maintaining high performance.",
      items: [
        "Dynamic routing with Consul service discovery",
        "OAuth2/JWT verification with optional mTLS",
        "Redis-backed rate limiting and circuit breaking",
        "OpenAPI request/response validation",
        "Prometheus metrics and correlation IDs"
      ]
    },
    {
      title: "Request Flow",
      content: "Understanding how requests flow through our system architecture:",
      items: [
        "Request enters through load balancer",
        "Authentication middleware validates credentials",
        "Rate limiting checks current usage",
        "Routing layer directs to appropriate service",
        "Response validation and transformation",
        "Metrics collection and logging"
      ]
    },
    {
      title: "Deployment Options",
      content: "Flexible deployment options to fit your infrastructure:",
      items: [
        "Kubernetes-native deployment with Helm",
        "Docker containers for any environment",
        "Bare metal for high-performance requirements",
        "Hybrid cloud and multi-cloud support",
        "Auto-scaling with custom metrics"
      ]
    }
  ]
}

function ArchitectureImportedContent({ fallbackContent = fallbackArchitectureContent }: ArchitectureImportedProps) {
  const [content, setContent] = useState<MdxContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate loading MDX content - in a real app, this would be an API call
        // since we can't use fs in client components
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // For demonstration, we'll use the fallback content
        // In a real implementation, you would fetch the MDX content from an API route
        const mockMdxContent: MdxContent = {
          title: fallbackContent.title,
          description: fallbackContent.description,
          content: `# ${fallbackContent.title}\n\n${fallbackContent.description}\n\n${fallbackContent.sections.map(section => `## ${section.title}\n\n${section.content}\n\n${section.items ? section.items.map(item => `- ${item}`).join('\n') : ''}`).join('\n\n')}`,
          html: `<h1>${fallbackContent.title}</h1><p>${fallbackContent.description}</p>${fallbackContent.sections.map(section => `<h2>${section.title}</h2><p>${section.content}</p>${section.items ? `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}`).join('')}`
        }
        
        setContent(mockMdxContent)
      } catch (err) {
        console.error('Failed to load MDX content:', err)
        setError('Failed to load documentation content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [fallbackContent])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 md:py-24">
          <div className="container-default">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Loader2 className="h-12 w-12 text-brand-500 animate-spin mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Loading Documentation
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Preparing your architecture overview...
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 md:py-24">
          <div className="container-default">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Documentation Unavailable
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {error}
                </p>
              </motion.div>

              {/* Fallback content display */}
              <motion.div variants={itemVariants}>
                <ArchitectureFallback content={fallbackContent} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

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
                Technical Documentation
              </Badge>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {content?.title || 'Architecture'}
            </motion.h1>
            
            {content?.description && (
              <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {content.description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* MDX Content */}
      <section className="py-16 md:py-20">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {fallbackContent.sections.map((section, index) => (
                      <a
                        key={section.title}
                        href={`#section-${index}`}
                        className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {section.title}
                      </a>
                    ))}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href="https://github.com/your-org/modern-api-gateway"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Code className="h-4 w-4" />
                        View Source Code
                        <ArrowRight className="h-4 w-4 ml-auto" />
                      </a>
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {content?.html ? (
                <article 
                  className="prose prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:pb-4 prose-h1:border-gray-200 dark:prose-h1:border-gray-700
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-brand-600 dark:prose-h2:text-brand-400
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-ul:my-6 prose-li:my-2 prose-li:text-gray-600 dark:prose-li:text-gray-300
                    prose-code:px-2 prose-code:py-1 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded-md prose-code:text-sm
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                    prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50 dark:prose-blockquote:bg-brand-900/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: content.html }}
                />
              ) : (
                <ArchitectureFallback content={fallbackContent} />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ArchitectureImportedPage() {
  return <ArchitectureImportedContent />
}

// Fallback component for when MDX content isn't available
function ArchitectureFallback({ content }: { content: ArchitectureContent }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      {content.sections.map((section, index) => (
        <motion.section
          key={section.title}
          id={`section-${index}`}
          variants={itemVariants}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-white">
              <Shield className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {section.content}
          </p>
          
          {section.items && (
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-brand-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      ))}
      
      {/* Additional Resources */}
      <motion.section variants={itemVariants} className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <Card className="backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/docs/architecture-deep-dive"
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Architecture Deep Dive
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Detailed technical documentation and implementation guides
                </p>
              </a>
              <a
                href="https://github.com/your-org/modern-api-gateway"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Source Code
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Explore the complete codebase on GitHub
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  )
}
