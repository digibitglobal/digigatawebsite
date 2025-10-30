import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => ({ slug: file.replace(/\.mdx$/, '') }))
}

export const dynamicParams = false

export default function BlogPostPage({ params }: Params) {
  const file = path.join(process.cwd(), 'content', 'blog', `${params.slug}.mdx`)
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content)

  return (
    <section className="container-default prose prose-gray py-14 dark:prose-invert">
      <h1>{String(data.title ?? params.slug)}</h1>
      {data.date && <p className="text-sm text-gray-500 dark:text-gray-400">{data.date}</p>}
      <article dangerouslySetInnerHTML={{ __html: html as string }} />
    </section>
  )
}

