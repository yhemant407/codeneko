from PIL import Image, ImageDraw
from pathlib import Path

INPUT = Path("src/assets/cat/idle.png")
OUTPUT = Path("src/assets/cat/idle_eye_base.png")

image = Image.open(INPUT).convert("RGBA")
draw = ImageDraw.Draw(image)

print("Image size:", image.size)

LEFT_EYE = (300, 380, 375, 475)
RIGHT_EYE = (490, 380, 570, 475)

FACE_COLOR = (254, 251, 240, 255)

draw.rectangle(LEFT_EYE, fill=FACE_COLOR)
draw.rectangle(RIGHT_EYE, fill=FACE_COLOR)

image.save(OUTPUT, "PNG")

print(f"Created: {OUTPUT}")