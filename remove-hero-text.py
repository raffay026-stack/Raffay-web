import cv2
import os

files = [
    "hero-desktop1.jpg",
    "hero-desktop2.jpg",
    "hero-desktop3.jpg",
    "hero-desktop4.jpg",
    "hero-mobile1.jpg",
    "hero-mobile2.jpg",
    "hero-mobile3.jpg",
    "hero-mobile4.jpg",
]

public = os.path.join(os.getcwd(), "public")

for filename in files:
    path = os.path.join(public, filename)

    img = cv2.imread(path)

    if img is None:
        print(f"SKIPPED: {filename} not found")
        continue

    h, w = img.shape[:2]

    # Bottom-left area containing "I am Sorry!!!!"
    mask = 255 * __import__("numpy").zeros((h, w), dtype="uint8")

    x1 = 0
    x2 = int(w * 0.19)
    y1 = int(h * 0.87)
    y2 = h

    mask[y1:y2, x1:x2] = 255

    # Smooth inpainting
    cleaned = cv2.inpaint(
        img,
        mask,
        9,
        cv2.INPAINT_TELEA
    )

    cv2.imwrite(path, cleaned, [cv2.IMWRITE_JPEG_QUALITY, 95])

    print(f"CLEANED: {filename}")

print("")
print("ALL HERO IMAGES CLEANED")
