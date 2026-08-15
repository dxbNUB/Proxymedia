/**
 * Renders every raster icon from public/favicon.svg, so the mark is authored
 * once and the tab icon, the iOS home-screen icon and the search-result icon
 * can never drift apart.
 *
 *   node scripts/icons.mjs
 *
 * Run this after editing favicon.svg, then commit the output. It is not part
 * of `npm run build` — these files change roughly never, and a build should
 * not depend on sharp's platform binaries being present.
 */
import { Buffer } from 'node:buffer'
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'public/favicon.svg'

// density high enough that the 180px raster is downsampled from a larger
// render rather than upscaled from a 32px viewBox
const png = (svg, size) =>
  sharp(svg, { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

/**
 * ICO container holding PNG-encoded entries. Every browser since IE Vista
 * reads PNG-in-ICO, and it is far smaller than the equivalent BMP payloads.
 */
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // 1 = icon
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const dir = []

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // colour planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    dir.push(entry)
    offset += data.length
  }

  return Buffer.concat([header, ...dir, ...images.map((i) => i.data)])
}

const svg = await readFile(SRC)

// 48 is the size Google's favicon crawler prefers; 16 and 32 are what the
// browser tab and bookmark bar actually use.
const sizes = [16, 32, 48]
const entries = await Promise.all(
  sizes.map(async (size) => ({ size, data: await png(svg, size) })),
)

await writeFile('public/favicon.ico', ico(entries))
await writeFile('public/favicon-96.png', await png(svg, 96))
await writeFile('public/apple-touch-icon.png', await png(svg, 180))

console.log(`favicon.ico       ${sizes.join(', ')}px`)
console.log('favicon-96.png    96px')
console.log('apple-touch-icon  180px')
