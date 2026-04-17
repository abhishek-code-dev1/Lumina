import { copyFileSync } from 'fs';
import { join } from 'path';

const src = 'd:\\page\\iiim';
const dst = 'd:\\page\\public\\assets';

const mappings = [
  ['pexels-fotographiya-wedding-photography-823737813-30215313.jpg', 'portfolio-1.jpg'],
  ['pexels-framesbygaurav-36252789.jpg', 'portfolio-2.jpg'],
  ['pexels-supriyo-raii-1011612-19613666.jpg', 'portfolio-3.jpg'],
  ['pexels-aalap-creation-2158557916-35457634.jpg', 'portfolio-4.jpg'],
  ['pexels-khaas-photographer-3700378-24334710.jpg', 'portfolio-5.jpg'],
  ['pexels-legacy-shots-by-sharan-sathya-692552845-29497170.jpg', 'portfolio-6.jpg'],
  ['pexels-khaas-photographer-3700378-24334706.jpg', 'service-1.jpg'],
  ['pexels-fotographiya-wedding-photography-823737813-30184703.jpg', 'service-2.jpg'],
  ['pexels-darshandave-16846853.jpg', 'service-3.jpg'],
  ['pexels-darkmodecinema-30394998.jpg', 'service-4.jpg'],
  ['pexels-ids-fotowale-1416063-17000468.jpg', 'about-1.jpg'],
  ['pexels-wedding-photography-2152349351-32153629.jpg', 'about-2.jpg'],
  // avatars - reusing portrait-friendly images
  ['pexels-khaas-photographer-3700378-24334706.jpg', 'avatar-1.jpg'],
  ['pexels-ids-fotowale-1416063-17000468.jpg', 'avatar-2.jpg'],
  ['pexels-wedding-photography-2152349351-32153629.jpg', 'avatar-3.jpg'],
  // contact background - wide atmospheric shot
  ['pexels-legacy-shots-by-sharan-sathya-692552845-29497170.jpg', 'contact-bg.jpg'],
];

for (const [from, to] of mappings) {
  try {
    copyFileSync(join(src, from), join(dst, to));
    console.log(`✓ Copied ${from} → ${to}`);
  } catch (e) {
    console.error(`✗ Error copying ${from}: ${e.message}`);
  }
}

console.log('\nAll done!');
