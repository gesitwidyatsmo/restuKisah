from PIL import Image

for name in ["mobile_360", "mobile_375", "desktop_480"]:
    img = Image.open(f"screenshot_{name}.png")
    w, h = img.size
    print(f"{name} full size:", w, h)
    # The page has Section 01, Section 02, Section 03.
    # Let's find Section 03 or crop the middle to bottom half:
    # Section 03 is usually around y = 1100 to 2000
    sec3_crop = img.crop((0, int(h * 0.45), w, int(h * 0.85)))
    sec3_crop.save(f"crop_sec3_{name}.png")
    print(f"Saved crop_sec3_{name}.png with size:", sec3_crop.size)
