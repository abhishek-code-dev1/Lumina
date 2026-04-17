import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin to serve iiim folder as /iiim/* static files (including subdirectories)
function serveIiimFolder() {
  return {
    name: 'serve-iiim-folder',
    configureServer(server) {
      server.middlewares.use('/iiim', (req, res, next) => {
        const filename = req.url === '/' ? '' : req.url;
        const filePath = path.resolve(__dirname, 'iiim', filename.replace(/^\//, ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'image/jpeg');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveIiimFolder()],
  publicDir: 'public',
})
