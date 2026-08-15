/**
 * Zips dist/ into proxymedia-site.zip for upload to SiteGround.
 * Uses PowerShell's Compress-Archive, which is present on every Windows box —
 * with an explicit pass for dotfiles, which it silently skips otherwise.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const zip = join(root, 'proxymedia-site.zip')

if (!existsSync(dist)) {
  console.error('No dist/ — run `npm run build` first.')
  process.exit(1)
}

if (existsSync(zip)) rmSync(zip)

execFileSync(
  'powershell',
  [
    '-NoProfile',
    '-Command',
    `Compress-Archive -Path (Join-Path '${dist}' '*') -DestinationPath '${zip}' -Force; ` +
      `Compress-Archive -Path (Join-Path '${dist}' '.htaccess') -DestinationPath '${zip}' -Update`,
  ],
  { stdio: 'inherit' },
)

console.log(`packaged → ${zip}`)
