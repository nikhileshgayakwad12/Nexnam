import fs from 'fs';
import path from 'path';

const src = 'C:/Users/gagan gayakwad/.gemini/antigravity-ide/brain/66f45f8a-1d03-4407-8c0f-f066832dd86b/.user_uploaded/media_1789887949699.jpg';
const destDir = 'C:/Users/gagan gayakwad/OneDrive/Desktop/NexnamPort/nexnam portfolio antigravity/src/assets/logo';
const destFile = path.join(destDir, 'nexnam-logo.png');

console.log('SRC exists:', fs.existsSync(src));
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, destFile);
console.log('Copied to:', destFile);
console.log('Dest exists:', fs.existsSync(destFile));
