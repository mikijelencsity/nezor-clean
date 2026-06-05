// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUT_DIR = path.join(__dirname, '..', 'public_optimized');
const QUALITY = 82;

// Per-image max width based on actual display size (2x for retina)
const SIZE_MAP = {
  'HIRDETES1': 700,   // displayed at 562px → 2x = 700
  'HIRDETES2': 700,
  'HIRDETES3': 700,
  'HIRDETES4': 700,
  'modernweboldal': 800,     // displayed at ~665px
  'profilanding': 800,
  'premiumwebshop': 800,
  'visszaterovevo': 800,
  'a visszatérő vásárlo': 800,
  'chatgpttégegajánl': 900,
  'chatbot': 900,
  'google': 900,
  'miértmi': 900,
  'ajandek': 700,
  'nezor-logo-transparent': 400,  // displayed at 180px (preloader) + 315px (hero)
};

const DEFAULT_MAX = 1200;

async function optimizeWebp() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
  const files = fs.readdirSync(PUBLIC_DIR);
  // Only process source PNG/JPG — not existing webp
  const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log(`Processing ${images.length} images...`);

  for (const file of images) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(OUT_DIR, `${baseName}.webp`);

    const maxWidth = SIZE_MAP[baseName] ?? DEFAULT_MAX;

    try {
      const meta = await sharp(inputPath).metadata();
      const currentWidth = meta.width ?? 0;

      const pipeline = sharp(inputPath).resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });

      await pipeline.webp({ quality: QUALITY }).toFile(outputPath);

      const inSize = fs.statSync(inputPath).size;
      const outSize = fs.statSync(outputPath).size;
      const pct = Math.round((1 - outSize / inSize) * 100);
      console.log(`  ✓ ${file} → ${baseName}.webp  (${Math.round(inSize/1024)}KB → ${Math.round(outSize/1024)}KB, -${pct}%, max ${maxWidth}px)`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  console.log('\nDone!');
}

optimizeWebp();
