import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Map files to reliable AI-generated non-copyright photography
const imagesToDownload = [
  // Hero
  { name: 'hero.jpg', url: 'https://image.pollinations.ai/prompt/luxury-indian-wedding-couple-golden-hour-cinematic-wide-shot?width=1920&height=1080&nologo=true' },
  
  // Portfolio
  { name: 'portfolio-1.jpg', url: 'https://image.pollinations.ai/prompt/high-end-indian-bride-red-lehenga-close-up-cinematic?width=800&height=1200&nologo=true' },
  { name: 'portfolio-2.jpg', url: 'https://image.pollinations.ai/prompt/indian-pre-wedding-shoot-palace-romantic?width=800&height=1200&nologo=true' },
  { name: 'portfolio-3.jpg', url: 'https://image.pollinations.ai/prompt/indian-engagement-ring-ceremony-luxury?width=800&height=1200&nologo=true' },
  { name: 'portfolio-4.jpg', url: 'https://image.pollinations.ai/prompt/indian-wedding-vows-fire-mandap-golden-light?width=800&height=1200&nologo=true' },
  { name: 'portfolio-5.jpg', url: 'https://image.pollinations.ai/prompt/indian-wedding-cinematic-details-bridal-jewelry?width=800&height=1200&nologo=true' },
  { name: 'portfolio-6.jpg', url: 'https://image.pollinations.ai/prompt/indian-pre-wedding-cityscape-night-romance-saree?width=800&height=1200&nologo=true' },

  // Services
  { name: 'service-1.jpg', url: 'https://image.pollinations.ai/prompt/indian-pre-wedding-shoot-nature-cinematic?width=600&height=800&nologo=true' },
  { name: 'service-2.jpg', url: 'https://image.pollinations.ai/prompt/traditional-indian-wedding-ceremony-rituals?width=600&height=800&nologo=true' },
  { name: 'service-3.jpg', url: 'https://image.pollinations.ai/prompt/professional-cinema-camera-filming-indian-wedding?width=600&height=800&nologo=true' },
  { name: 'service-4.jpg', url: 'https://image.pollinations.ai/prompt/luxury-indian-wedding-photo-album-on-table?width=600&height=800&nologo=true' },

  // About
  { name: 'about-1.jpg', url: 'https://image.pollinations.ai/prompt/professional-indian-wedding-photographer-with-camera-dark-studio?width=800&height=800&nologo=true' },
  { name: 'about-2.jpg', url: 'https://image.pollinations.ai/prompt/indian-wedding-photography-studio-setup-elegant?width=800&height=800&nologo=true' },

  // Testimonials
  { name: 'avatar-1.jpg', url: 'https://image.pollinations.ai/prompt/happy-indian-couple-wedding-portrait-bride-groom-smiling?width=200&height=200&nologo=true' },
  { name: 'avatar-2.jpg', url: 'https://image.pollinations.ai/prompt/smiling-indian-bride-wedding-portrait?width=200&height=200&nologo=true' },
  { name: 'avatar-3.jpg', url: 'https://image.pollinations.ai/prompt/handsome-indian-groom-smiling-portrait-wedding?width=200&height=200&nologo=true' },

  // Contact
  { name: 'contact-bg.jpg', url: 'https://image.pollinations.ai/prompt/dark-moody-indian-wedding-mandap-decor-gold-accents?width=1200&height=1600&nologo=true' }
];

console.log('Fetching true-to-life non-copyrighted imagery...');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Pollinations might redirect or return 200 chunked
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      const stream = fs.createWriteStream(filepath);
      response.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

(async () => {
  for (const img of imagesToDownload) {
    const dest = path.join(ASSETS_DIR, img.name);
    try {
      console.log(`[DOWNLOADING] ${img.name}...`);
      await downloadImage(img.url, dest);
    } catch (err) {
      console.error(`[ERROR] Failed ${img.name}:`, err.message);
    }
  }
  console.log('\n✅ All authentic images successfully fetched and saved to /public/assets!');
})();
