const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/2ce3462b-1cbf-47cc-bde3-097254070939/.user_uploaded/media_1789892023285.png';
const destDir = path.join(__dirname, 'src', 'assets', 'brand');
const destPath = path.join(destDir, 'nexnam-logo.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(srcPath, destPath);

const log = [];
log.push(`Copied from ${srcPath} to ${destPath}`);

const buf = fs.readFileSync(destPath);
log.push(`File size: ${buf.length} bytes`);
log.push(`Header: ${buf.slice(0, 8).toString('hex')}`);

if (buf.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  log.push(`PNG Dimensions: ${width}x${height}, Bit depth: ${bitDepth}, Color type: ${colorType}`);
}

fs.writeFileSync(path.join(__dirname, 'inspect_output.txt'), log.join('\n'), 'utf8');
