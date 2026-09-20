import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = [];
log.push('Starting copy_logo_esm.js...');

const possiblePaths = [
  'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/2ce3462b-1cbf-47cc-bde3-097254070939/.user_uploaded/media_1789892023285.png',
  'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/2ce3462b-1cbf-47cc-bde3-097254070939/.user_uploaded/media_1789887949699.jpg'
];

let srcPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    srcPath = p;
    break;
  }
}

log.push(`Found srcPath: ${srcPath}`);

if (!srcPath) {
  // search .user_uploaded directory
  const userUploadedDir = 'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/2ce3462b-1cbf-47cc-bde3-097254070939/.user_uploaded';
  if (fs.existsSync(userUploadedDir)) {
    const files = fs.readdirSync(userUploadedDir);
    log.push(`Files in .user_uploaded: ${files.join(', ')}`);
    if (files.length > 0) {
      srcPath = path.join(userUploadedDir, files[0]);
    }
  } else {
    log.push(`.user_uploaded dir does not exist!`);
  }
}

if (srcPath && fs.existsSync(srcPath)) {
  const destDir = path.join(__dirname, 'src', 'assets', 'brand');
  const destPath = path.join(destDir, 'nexnam-logo.png');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(srcPath, destPath);
  log.push(`Successfully copied ${srcPath} to ${destPath}`);

  const buf = fs.readFileSync(destPath);
  log.push(`File size: ${buf.length} bytes`);
  log.push(`Header: ${buf.slice(0, 8).toString('hex')}`);

  if (buf.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    log.push(`PNG Dimensions: ${width}x${height}`);
  }
} else {
  log.push('ERROR: Could not find any uploaded logo source file!');
}

fs.writeFileSync(path.join(__dirname, 'inspect_output.txt'), log.join('\n'), 'utf8');
