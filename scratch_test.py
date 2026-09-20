import os
from PIL import Image

src = r"C:\Users\gagan gayakwad\.gemini\antigravity-ide\brain\2ce3462b-1cbf-47cc-bde3-097254070939\.user_uploaded\media_1789892023285.png"

with open("scratch_result.txt", "w", encoding="utf-8") as f:
    f.write(f"Exists: {os.path.exists(src)}\n")
    if os.path.exists(src):
        img = Image.open(src)
        f.write(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}\n")
