import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export const metadata = { title: 'Changelog' }

function getEntries() {
  const dir = path.join(process.cwd(), 'website', 'content', 'changelog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { content, data } = matter(raw)
      return { slug: f, content, data }
    })
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)))
}

export default function ChangelogPage() {
  const entries = getEntries()
  return (
    <section className="container-default py-14">
      <h1 className="text-3xl font-semibold">Changelog</h1>
      <div className="prose prose-gray mt-6 dark:prose-invert">
        {entries.map((e) => (
          <article key={e.slug} className="border-b border-gray-200/60 pb-6 last:border-b-0 dark:border-gray-800">
            <h2>{String(e.data.title || e.slug)}</h2>
            <MDXRemote source={e.content} />
          </article>
        ))}
      </div>
    </section>
  )
}

