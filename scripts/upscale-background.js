import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bgPath = join(__dirname, '../src/assets/bg/akz/1.png');
const outputPath = join(__dirname, '../src/assets/bg/akz/1-4k.png');

async function upscaleBackground() {
  console.log('Upscaling background to 4K...');

  await sharp(bgPath)
    .resize(2160, 3840, {
      kernel: 'lanczos3',
      fit: 'fill',
    })
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(outputPath);

  console.log(`✓ Created 4K background at ${outputPath}`);
}

upscaleBackground().catch(console.error);
