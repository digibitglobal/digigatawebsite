import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'

function getImportedDocs(): { href: string; label: string }[] {
  const dir = path.join(process.cwd(), 'content', 'docs-imported')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, '')
      const label = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      return { href: `/docs/imported/${slug}`, label }
    })
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { href: '/docs', label: 'Getting Started' },
    { href: '/docs/architecture', label: 'Architecture' },
    { href: '/docs/routes-and-middleware', label: 'Routes & Middleware' },
    { href: '/docs/observability', label: 'Observability' },
    ...getImportedDocs(),
  ]
  return (
    <div className="container-default grid gap-8 py-14 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:block">
        <nav className="sticky top-20 space-y-2" aria-label="Docs">
          {nav.map(i => (
            <Link key={i.href} href={i.href} className="block text-sm text-gray-600 hover:text-brand dark:text-gray-300">{i.label}</Link>
          ))}
        </nav>
      </aside>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        {children}
      </div>
    </div>
  )
}
