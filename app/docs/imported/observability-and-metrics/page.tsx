import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function ObservabilityImported() {
  const file = path.join(process.cwd(), 'content', 'docs-imported', 'observability-and-metrics.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { content } = matter(raw)
  const html = marked.parse(content)
  return (
    <article className="prose prose-gray max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html as string }} />
  )
}
