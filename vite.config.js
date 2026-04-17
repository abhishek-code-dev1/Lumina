import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─────────────────────────────────────────────────────────
//  Plugin: serves /iiim/* in DEV  +  copies to dist/ in BUILD
// ─────────────────────────────────────────────────────────
function iiimStaticPlugin() {
  const srcDir  = path.resolve(__dirname, 'iiim')
  const destDir = path.resolve(__dirname, 'dist', 'iiim')

  function copyRecursive(from, to) {
    fs.mkdirSync(to, { recursive: true })
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const s = path.join(from, entry.name)
      const d = path.join(to,   entry.name)
      entry.isDirectory() ? copyRecursive(s, d) : fs.copyFileSync(s, d)
    }
  }

  const mimeTypes = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png',  '.webp': 'image/webp',
    '.gif': 'image/gif',  '.svg': 'image/svg+xml',
  }

  return {
    name: 'iiim-static',

    // ── DEV: middleware to serve iiim/ ──
    configureServer(server) {
      server.middlewares.use('/iiim', (req, res, next) => {
        const relPath  = req.url === '/' ? '' : req.url.replace(/^\//, '')
        const filePath = path.join(srcDir, relPath)
        try {
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        } catch {
          next()
        }
      })
    },

    // ── BUILD: copy iiim/ → dist/iiim/ after bundle is written ──
    closeBundle() {
      if (!fs.existsSync(srcDir)) {
        console.warn('[iiim-static] iiim/ folder not found — skipping copy.')
        return
      }
      console.log('[iiim-static] Copying iiim/ → dist/iiim/ ...')
      copyRecursive(srcDir, destDir)
      console.log('[iiim-static] ✅ Images copied to dist/iiim/')
    },
  }
}

// ─────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react(), iiimStaticPlugin()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
