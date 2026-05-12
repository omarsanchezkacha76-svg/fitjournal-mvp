from PIL import Image, ImageDraw, ImageFont
import os

# Colors
PRIMARY = (99, 102, 241)  # #6366F1
WHITE = (255, 255, 255)

# Create directories
os.makedirs('.', exist_ok=True)

def create_icon(size):
    img = Image.new('RGBA', (size, size), PRIMARY)
    draw = ImageDraw.Draw(img)
    # Draw a simple "FJ" text or dumbbell shape
    margin = size // 8
    # Draw rounded rect background (already filled)
    # Draw a simple barbell shape
    bar_y = size // 2
    bar_width = size // 2
    weight_w = size // 8
    weight_h = size // 3
    center_x = size // 2
    
    # Bar
    draw.rounded_rectangle(
        [center_x - bar_width//2, bar_y - size//32, center_x + bar_width//2, bar_y + size//32],
        radius=size//64, fill=WHITE
    )
    # Left weight
    draw.rounded_rectangle(
        [center_x - bar_width//2 - weight_w//2, bar_y - weight_h//2, center_x - bar_width//2 + weight_w//2, bar_y + weight_h//2],
        radius=size//32, fill=WHITE
    )
    # Right weight
    draw.rounded_rectangle(
        [center_x + bar_width//2 - weight_w//2, bar_y - weight_h//2, center_x + bar_width//2 + weight_w//2, bar_y + weight_h//2],
        radius=size//32, fill=WHITE
    )
    return img

def create_splash(size):
    img = Image.new('RGB', size, PRIMARY)
    draw = ImageDraw.Draw(img)
    # Same barbell but larger
    w, h = size
    bar_y = h // 2
    bar_width = w // 3
    weight_w = w // 12
    weight_h = h // 6
    center_x = w // 2
    
    draw.rounded_rectangle(
        [center_x - bar_width//2, bar_y - h//64, center_x + bar_width//2, bar_y + h//64],
        radius=h//128, fill=WHITE
    )
    draw.rounded_rectangle(
        [center_x - bar_width//2 - weight_w//2, bar_y - weight_h//2, center_x - bar_width//2 + weight_w//2, bar_y + weight_h//2],
        radius=h//64, fill=WHITE
    )
    draw.rounded_rectangle(
        [center_x + bar_width//2 - weight_w//2, bar_y - weight_h//2, center_x + bar_width//2 + weight_w//2, bar_y + weight_h//2],
        radius=h//64, fill=WHITE
    )
    return img

# Generate
icon = create_icon(1024)
icon.save('icon.png')

splash = create_splash((1242, 2436))
splash.save('splash.png')

adaptive_fg = create_icon(1024)
adaptive_fg.save('adaptive-icon.png')

print("Assets generated: icon.png, splash.png, adaptive-icon.png")
