import type { MetadataRoute } from 'next'

import fs from 'node:fs'
import path from 'node:path'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://modern-api-gateway.example.com'
  const routes = [
    '',
    '/features',
    '/admin-console',
    '/how-it-works',
    '/plugins',
    '/docs',
    '/integrations',
    '/pricing',
    '/blog',
    '/changelog',
    '/roadmap',
    '/faq',
    '/security',
    '/contact'
  ]
  // Add imported docs
  const importedDir = path.join(process.cwd(), 'content', 'docs-imported')
  const imported = fs.existsSync(importedDir)
    ? fs.readdirSync(importedDir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => `/docs/imported/${f.replace(/\.mdx$/, '')}`)
    : []
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const blogPosts = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => `/blog/${f.replace(/\.mdx$/, '')}`)
    : []
  const now = new Date()
  return [...routes, ...imported, ...blogPosts].map((r) => ({ url: `${base}${r}`, lastModified: now }))
}
