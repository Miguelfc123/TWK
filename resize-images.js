const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgDir = path.join(__dirname, 'Frontend-App/public/imagens/camisa');
const images = ['blusaPreta.png', 'buda_carrosel.png', 'twk_azul_carrosel.png', 'twk_vermelha_carrosel.png'];

// Tamanho padrão para todas as imagens
const WIDTH = 400;
const HEIGHT = 400;
const BACKGROUND = { r: 255, g: 255, b: 255, alpha: 0 };

async function resizeImages() {
  try {
    for (const img of images) {
      const inputPath = path.join(imgDir, img);
      const outputPath = path.join(imgDir, `${img.split('.')[0]}_resized.png`);
      
      await sharp(inputPath)
        .resize(WIDTH, HEIGHT, {
          fit: 'contain',
          background: BACKGROUND,
          withoutEnlargement: false
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Redimensionado: ${img}`);
      
      // Substitui o original
      fs.renameSync(outputPath, inputPath);
    }
    console.log('\n✅ Todas as imagens foram redimensionadas!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

resizeImages();
