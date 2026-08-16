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
import { createHash } from 'node:crypto'
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

/**
 * dist/404.html — Vercel serves this for any unknown path on a static build,
 * which is how the site keeps its own branding and navigation on a bad URL
 * instead of falling back to the platform's plain-text NOT_FOUND page.
 *
 * Deliberately not a catch-all rewrite to index.html: that would hand the
 * homepage's markup to every route and undo the per-page HTML above.
 */
const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Proxymedia</title>')
  .replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
    '$1That page does not exist. Find what you were looking for on the Proxymedia site.$2',
  )
  // No canonical and no indexing: this markup is served under many URLs.
  .replace(/<link rel="canonical"[^>]*>/, '')
  .replace(
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="noindex, follow" />',
  )
  .replace('<div id="root"></div>', `<div id="root">${render('/404')}</div>`)

await writeFile(join(dist, '404.html'), notFound, 'utf8')
console.log(`prerendered 404 → ${join(dist, '404.html').replace(root, '.')}`)

/**
 * The CSP in vercel.json allows inline scripts by hash. Editing the bootstrap
 * script in index.html without updating that hash would get it blocked in the
 * browser — and the failure is silent: reveals never arm, so the page looks
 * fine locally (no CSP there) and subtly wrong in production. Fail the build
 * instead.
 */
const csp = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'))
  .headers.flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value

if (csp) {
  const inline = template.matchAll(
    /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g,
  )

  for (const [, body] of inline) {
    const hash = `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`
    if (!csp.includes(hash)) {
      console.error(
        `\nInline script is not allowed by the CSP in vercel.json.\n` +
          `Add this to script-src:\n\n  '${hash}'\n`,
      )
      process.exit(1)
    }
  }
  console.log('csp inline script hashes ok')
}
