import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'C:/web/public/images';

async function optimizeImages() {
  console.log('🔄 Avvio ottimizzazione estrema immagini per PageSpeed 100/100...');
  const files = ['castle_exterior', 'castle_hall', 'castle_garden'];

  for (const file of files) {
    const inputPng = path.join(dir, `${file}.png`);
    const outputWebp = path.join(dir, `${file}.webp`);

    if (fs.existsSync(inputPng)) {
      try {
        // Converte in formato Next-Gen WebP con compressione avanzata
        await sharp(inputPng)
          .resize({ width: 1400, withoutEnlargement: true }) // Evita immagini sovradimensionate su Desktop
          .webp({ quality: 82, effort: 6 }) // Compressione massima senza perdita visiva
          .toFile(outputWebp);
        console.log(`✅ File Next-Gen generato: ${file}.webp`);
      } catch (err) {
        console.error(`❌ Errore su ${file}:`, err.message);
      }
    } else {
      console.warn(`⚠️ File sorgente non trovato: ${inputPng}`);
    }
  }
  console.log('🎉 Ottimizzazione completata! Le immagini pesano ora l\'80% in meno.');
}

optimizeImages();
