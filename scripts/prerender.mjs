/**
 * Turns the SPA into static HTML, one file per route.
 *
 *   dist/index.html            /
 *   dist/what-we-do/index.html /what-we-do
 *   dist/about/index.html      /about
 *   dist/clients/index.html    /clients
 *
 * Crawlers then get fully-formed markup with the right <title>, description
 * and canonical without executing a line of JavaScript. React hydrates on top.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { render, routes, SITE } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

for (const [path, meta] of Object.entries(routes)) {
  const url = `${SITE}${path}`
  const title = escape(meta.title)
  const description = escape(meta.description)

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )

  // FAQPage markup may only appear on the page that shows the FAQ.
  if (!meta.faq) {
    html = html.replace(
      /\s*\{\s*"@type": "FAQPage"[\s\S]*?\n {10}\}(,?)\n/,
      '\n',
    )
    html = html.replace(/,(\s*\]\s*\}\s*<\/script>)/, '$1')
  }

  const appHtml = render(path)
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  const outDir = path === '/' ? dist : join(dist, path)
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  console.log(`prerendered ${path} → ${join(outDir, 'index.html').replace(root, '.')}`)
}
