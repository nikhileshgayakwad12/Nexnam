import sys
import os

try:
    from PIL import Image
    import numpy as np
    from collections import deque

    source_path = r"C:\Users\gagan gayakwad\.gemini\antigravity-ide\brain\66f45f8a-1d03-4407-8c0f-f066832dd86b\.user_uploaded\media_1789887949699.jpg"
    target_path = r"c:\Users\gagan gayakwad\OneDrive\Desktop\NexnamPort\nexnam portfolio antigravity\src\assets\logo\nexnam-logo.png"

    img = Image.open(source_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)

    h, w, _ = arr.shape
    visited = np.zeros((h, w), dtype=bool)
    alpha = np.ones((h, w), dtype=np.uint8) * 255

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
        if max_diff < 22 and brightness > 185:
            return True
        return False

    while queue:
        cy, cx = queue.popleft()
        if visited[cy, cx]:
            continue
        visited[cy, cx] = True
        
        r, g, b = arr[cy, cx, :3]
        if is_bg(r, g, b):
            alpha[cy, cx] = 0
            for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                    queue.append((ny, nx))

    result_arr = np.array(img)
    result_arr[:, :, 3] = alpha

    non_zero = np.where(alpha > 0)
    min_y, max_y = np.min(non_zero[0]), np.max(non_zero[0])
    min_x, max_x = np.min(non_zero[1]), np.max(non_zero[1])

    pad = 6
    min_y = max(0, min_y - pad)
    max_y = min(h - 1, max_y + pad)
    min_x = max(0, min_x - pad)
    max_x = min(w - 1, max_x + pad)

    cropped = Image.fromarray(result_arr).crop((min_x, min_y, max_x + 1, max_y + 1))
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    cropped.save(target_path, "PNG")
    with open("py_error.txt", "w") as f:
        f.write("SUCCESS")
except Exception as e:
    import traceback
    with open("py_error.txt", "w") as f:
        f.write(traceback.format_exc())
