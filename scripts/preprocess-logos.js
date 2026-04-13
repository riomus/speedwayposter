import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logosDir = join(__dirname, '../src/assets/logos/akż');

// Logo processing rules based on filename
const processingRules = {
  'mcs.png': {
    // mcs has white corners - invert to black, then grayscale
    type: 'invert-grayscale',
    brightness: 1.3,
    contrast: 1.5,
  },
  'format.jpeg': {
    // format has full white background - invert to black
    type: 'invert-grayscale',
    brightness: 1.3,
    contrast: 1.5,
  },
  'Haj.png': {
    // grayscale with brightness boost
    type: 'grayscale',
    brightness: 1.5,
    contrast: 1.5,
  },
  'wts.png': {
    type: 'grayscale',
    brightness: 1.5,
    contrast: 1.5,
  },
  'rrspeedway.png': {
    type: 'grayscale',
    brightness: 1.5,
    contrast: 1.5,
  },
};

async function processLogo(filename) {
  const inputPath = join(logosDir, filename);
  const outputPath = join(logosDir, `processed-${filename.replace('.jpeg', '.png')}`);

  console.log(`Processing ${filename}...`);

  const rule = processingRules[filename];

  try {
    let pipeline = sharp(inputPath);

    if (rule) {
      if (rule.type === 'invert-grayscale') {
        // Invert colors then convert to grayscale with brightness boost
        pipeline = pipeline
          .negate({ alpha: false })
          .greyscale()
          .linear(rule.contrast, -(128 * rule.contrast - 128))
          .modulate({
            brightness: rule.brightness,
          });
      } else if (rule.type === 'grayscale') {
        // Just grayscale with brightness/contrast
        pipeline = pipeline
          .greyscale()
          .linear(rule.contrast, -(128 * rule.contrast - 128))
          .modulate({
            brightness: rule.brightness,
          });
      }
    } else {
      // Default: make it white (black then invert)
      pipeline = pipeline
        .greyscale()
        .threshold(128) // Binary threshold
        .negate({ alpha: false }); // Invert to white
    }

    await pipeline.png().toFile(outputPath);
    console.log(`  ✓ Created ${outputPath}`);
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('Starting logo preprocessing...\n');

  const files = await readdir(logosDir);
  const logoFiles = files.filter(f =>
    !f.startsWith('processed-') &&
    (f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg'))
  );

  for (const file of logoFiles) {
    await processLogo(file);
  }

  console.log('\n✓ Logo preprocessing complete!');
  console.log('Processed logos are prefixed with "processed-"');
}

main().catch(console.error);
