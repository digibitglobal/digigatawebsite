import fs from 'node:fs'
import path from 'node:path'

const base = 'https://modern-api-gateway.example.com'
const staticRoutes = [
  '',
  '/features',
  '/how-it-works',
  '/plugins',
  '/docs',
  '/pricing',
  '/blog',
  '/changelog',
  '/faq',
  '/security',
  '/contact'
]

const now = new Date().toISOString()
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticRoutes
  .map((r) => `  <url><loc>${base}${r}</loc><lastmod>${now}</lastmod></url>`) 
  .join('\n')}
</urlset>\n`

const out = path.join(process.cwd(), 'public')
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true })
fs.writeFileSync(path.join(out, 'sitemap.xml'), xml)
console.log('sitemap.xml written to', out)

