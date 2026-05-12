import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/formi/.gemini/antigravity/brain/3d7f40b0-2d53-436d-8c1b-f46f7c3443ae';
const destDir = 'C:/web/public/images';

// Crea la cartella se non esiste
fs.mkdirSync(destDir, { recursive: true });

// Copia i file generati dall'AI
try {
  fs.copyFileSync(path.join(srcDir, 'castle_exterior_1778585838597.png'), path.join(destDir, 'castle_exterior.png'));
  fs.copyFileSync(path.join(srcDir, 'castle_hall_1778585853226.png'), path.join(destDir, 'castle_hall.png'));
  fs.copyFileSync(path.join(srcDir, 'castle_garden_1778585866898.png'), path.join(destDir, 'castle_garden.png'));
  console.log('✅ Successo! Le tre immagini AI sono state copiate nella cartella pubblica del sito.');
} catch (error) {
  console.error('Errore durante la copia delle immagini:', error.message);
}
