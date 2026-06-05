// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_WIDTH = 1600;
const QUALITY = 80;

async function optimizeImages() {
  const files = fs.readdirSync(PUBLIC_DIR);
  const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log(`Found ${images.length} images to optimize...`);

  for (const file of images) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

    try {
      const image = sharp(inputPath);
      const meta = await image.metadata();
      const width = meta.width ?? 0;

      let pipeline = image;
      if (width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
        console.log(`  Resizing ${file}: ${width}px → ${MAX_WIDTH}px`);
      }

      await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

      const inSize = fs.statSync(inputPath).size;
      const outSize = fs.statSync(outputPath).size;
      const pct = Math.round((1 - outSize / inSize) * 100);
      console.log(`  ✓ ${file} → ${baseName}.webp  (${Math.round(inSize/1024)}KB → ${Math.round(outSize/1024)}KB, -${pct}%)`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  console.log('\nDone!');
}

optimizeImages();
