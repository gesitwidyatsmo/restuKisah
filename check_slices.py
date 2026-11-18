from PIL import Image

img = Image.open("fresh_mobile_360.png")
w, h = img.size
print("Width:", w, "Height:", h)

# Save 4 vertical slices
h_slice = h // 4
for i in range(4):
    y_start = i * h_slice
    y_end = (i + 1) * h_slice
    slice_img = img.crop((0, y_start, w, y_end))
    slice_img.save(f"slice_{i}.png")
    print(f"Slice {i}: y={y_start} to {y_end}")
