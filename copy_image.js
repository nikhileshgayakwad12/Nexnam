import fs from 'fs';
import path from 'path';

const src = 'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/2ce3462b-1cbf-47cc-bde3-097254070939/.user_uploaded/media_1789892023285.png';

console.log('Source file exists:', fs.existsSync(src));

if (fs.existsSync(src)) {
  const brandDir = path.resolve('src/assets/brand');
  const logoDir = path.resolve('src/assets/logo');

  if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });
  if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

  const brandDest = path.join(brandDir, 'nexnam-logo.png');
  const logoDest = path.join(logoDir, 'nexnam-logo.png');

  fs.copyFileSync(src, brandDest);
  fs.copyFileSync(src, logoDest);

  console.log('Copied to:', brandDest);
  console.log('Copied to:', logoDest);
} else {
  console.error('SRC FILE NOT FOUND:', src);
}
