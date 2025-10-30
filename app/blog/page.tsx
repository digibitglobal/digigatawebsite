import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import Link from 'next/link'

export const metadata = { title: 'Blog' }

type Post = { slug: string; title: string; date: string; summary?: string; tags: string[] }

function getPosts(): Post[] {
  const dir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title ?? file,
        date: data.date ?? '',
        summary: data.summary ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export default function BlogIndex() {
  const posts = getPosts()
  return (
    <section className="container-default py-14">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2 max-w-3xl text-gray-600 dark:text-gray-300">
        Product updates, deep dives, and operational guides for Modern API Gateway.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-lg border border-gray-200/60 p-6 dark:border-gray-800">
            <h2 className="text-xl font-semibold">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-1 text-sm text-gray-500">{post.date}</p>
            {post.summary && <p className="mt-3 text-gray-600 dark:text-gray-300">{post.summary}</p>}
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand/10 px-2 py-1 text-brand">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center text-brand">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

