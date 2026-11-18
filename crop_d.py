from PIL import Image

img = Image.open("screenshot_desktop_480.png")
w, h = img.size
print("Desktop 480 size:", w, h)
# Save strips
for i in range(1200, 2400, 300):
    strip = img.crop((0, i, w, min(h, i + 300)))
    strip.save(f"strip_d_{i}.png")
    print(f"Saved strip_d_{i}.png")
