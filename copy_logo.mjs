import fs from 'fs';
import path from 'path';

const src = "C:\\Users\\gagan gayakwad\\.gemini\\antigravity-ide\\brain\\66f45f8a-1d03-4407-8c0f-f066832dd86b\\.user_uploaded\\media_1789887949699.jpg";
const targetDir = "C:\\Users\\gagan gayakwad\\OneDrive\\Desktop\\NexnamPort\\nexnam portfolio antigravity\\src\\assets\\logo";
const targetFile = path.join(targetDir, "nexnam-logo.png");

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(src, targetFile);
  fs.writeFileSync("copy_result.txt", "SUCCESS: " + targetFile);
} catch (err) {
  fs.writeFileSync("copy_result.txt", "ERROR: " + err.stack);
}
