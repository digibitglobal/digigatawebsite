import fs from 'node:fs'
import path from 'node:path'

// Placeholder script. In CI or locally, you can install puppeteer and render
// http://localhost:3001/overview to a PDF. We avoid adding heavy deps by default.

const OUT = path.join(process.cwd(), 'public', 'overview.pdf')
if (!fs.existsSync(path.dirname(OUT))) fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(
  OUT,
  Buffer.from('%PDF-1.4\n% Minimal placeholder PDF. Use browser Print→Save as PDF for high‑fidelity export.\n')
)
console.log('Wrote placeholder PDF to', OUT)

