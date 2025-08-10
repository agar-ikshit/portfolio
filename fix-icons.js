// fix-icons.js
import fs from 'fs';
import path from 'path';

const iconsDir = './public/icons'; // Change to your icons folder
const newColor = '#4ade80'; // Emerald green

function processSVG(filePath) {
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // Replace black fills (#000000 or #000)
  svgContent = svgContent.replace(/fill="#000000"/gi, `fill="${newColor}"`);
  svgContent = svgContent.replace(/fill="#000"/gi, `fill="${newColor}"`);

  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`✅ Updated: ${path.basename(filePath)}`);
}

fs.readdirSync(iconsDir).forEach(file => {
  if (file.endsWith('.svg')) {
    processSVG(path.join(iconsDir, file));
  }
});

console.log('🎨 All black SVG icons updated!');
