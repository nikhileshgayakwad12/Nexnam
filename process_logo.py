import os
import sys
from PIL import Image
import numpy as np
from collections import deque

log = []

src_path = r"C:\Users\gagan gayakwad\.gemini\antigravity-ide\brain\2ce3462b-1cbf-47cc-bde3-097254070939\.user_uploaded\media_1789892023285.png"
brand_dir = r"c:\Users\gagan gayakwad\OneDrive\Desktop\NexnamPort\nexnam portfolio antigravity\src\assets\brand"
target_path = os.path.join(brand_dir, "nexnam-logo.png")

os.makedirs(brand_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
w, h = img.size
log.append(f"Original size: {w}x{h}")

arr = np.array(img)
# Check corner pixels to see if background is white or transparent
corners = [arr[0, 0], arr[0, w-1], arr[h-1, 0], arr[h-1, w-1]]
is_white_bg = all(c[0] > 220 and c[1] > 220 and c[2] > 220 for c in corners)
log.append(f"Is white background: {is_white_bg}")

if is_white_bg:
    # Flood-fill from borders to turn outer white background transparent
    visited = np.zeros((h, w), dtype=bool)
    alpha = arr[:, :, 3].copy()
    rgb = arr[:, :, :3].astype(np.float32)
    
    queue = deque()
    for x in range(w):
        queue.append((0, x))
        queue.append((h - 1, x))
    for y in range(h):
        queue.append((y, 0))
        queue.append((y, w - 1))
        
    def is_bg(r, g, b):
        max_diff = max(abs(r - g), abs(g - b), abs(r - b))
        brightness = (r + g + b) / 3.0
        return max_diff < 30 and brightness > 190

    while queue:
        cy, cx = queue.popleft()
        if visited[cy, cx]:
            continue
        visited[cy, cx] = True
        
        r, g, b = rgb[cy, cx]
        if is_bg(r, g, b):
            alpha[cy, cx] = 0
            for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                    queue.append((ny, nx))

    arr[:, :, 3] = alpha
    img_processed = Image.fromarray(arr)
else:
    img_processed = img

# Auto crop bounding box of non-transparent pixels
alpha_channel = np.array(img_processed)[:, :, 3]
non_zero = np.where(alpha_channel > 10)

if len(non_zero[0]) > 0:
    min_y, max_y = np.min(non_zero[0]), np.max(non_zero[0])
    min_x, max_x = np.min(non_zero[1]), np.max(non_zero[1])
    
    pad = 8
    min_y = max(0, min_y - pad)
    max_y = min(h - 1, max_y + pad)
    min_x = max(0, min_x - pad)
    max_x = min(w - 1, max_x + pad)
    
    final_img = img_processed.crop((min_x, min_y, max_x + 1, max_y + 1))
    log.append(f"Cropped size: {final_img.size}")
else:
    final_img = img_processed

final_img.save(target_path, "PNG")
log.append(f"Saved to {target_path}")

with open(r"c:\Users\gagan gayakwad\OneDrive\Desktop\NexnamPort\nexnam portfolio antigravity\process_log.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(log))
