const sharp = require('sharp');
const path = require('path');

const sizes = [128, 64, 48, 32, 24, 16];
let imgFilePath = '';
let imgDirOutPath = '';

if (process.argv.length > 5) {
  imgFilePath = process.argv[3];
  imgDirOutPath = process.argv[5];
} else if (process.argv.length > 3) {
  imgFilePath = process.argv[3];
} else {
  throw new Error('No Image file path provided.');
}

sizes.forEach(size => {
  const outDir = path.join(path.dirname(imgFilePath), imgDirOutPath);
  const outFile = path.join(outDir, `img_${size}.png`);

  sharp(imgFilePath)
    .resize(size)
    .toFile(outFile)
    .then(() => {
      console.log(`File created: ${outFile}`);
    })
    .catch(err => {
      console.error(`Failed creating the file: ${outFile}`);
      console.error(err.message);
    });
});
