# Usage: python3 scripts/process-images.py <folder of numbered source jpgs> public/images
"""Opal image pipeline: editorial webp exports + transparent plate cutouts.

Cutout method: a pixel is "backdrop-like" if it is (close to) a scalar multiple of the
backdrop colour (so cast shadows count as backdrop). Only backdrop-like regions connected
to the image border are removed; the remaining shadow darkness is kept as a soft black
shadow so plates still sit naturally on new backgrounds.
"""
import os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(f"{OUT}/photos", exist_ok=True)
os.makedirs(f"{OUT}/cutouts", exist_ok=True)
os.makedirs(f"{OUT}/stage", exist_ok=True)

# ---- editorial (wood-table) photographs -------------------------------------------------
PHOTOS = {
    "001": "black-forest-cake", "003": "black-forest-cake-detail", "005": "black-forest-cake-macro",
    "002": "passion-cake-slice", "004": "caramel-layer-cake", "006": "caramel-layer-cake-2",
    "007": "puff-pastry", "009": "puff-pastry-2", "008": "pastry-turnover", "013": "pastry-turnover-macro",
    "010": "croissant", "015": "croissant-2", "011": "croissant-and-tea",
    "012": "pancake-stack", "014": "pancake-stack-2", "016": "pancake-stack-3",
    "017": "pancake-syrup", "018": "pancake-syrup-2",
    "019": "grilled-chicken-rice", "021": "grilled-chicken-rice-wide",
    "020": "chicken-mushroom", "022": "chicken-mushroom-2", "023": "chicken-mushroom-top",
    "024": "beef-fries-kachumbari", "025": "beef-fries-kachumbari-2", "026": "beef-fries-kachumbari-3", "027": "beef-fries-kachumbari-4",
    "028": "loaded-fries-wide", "029": "loaded-fries", "030": "loaded-fries-2", "032": "loaded-fries-3",
    "031": "quarter-chicken", "033": "quarter-chicken-wide", "035": "quarter-chicken-2",
    "034": "beef-stirfry-rice", "036": "beef-stirfry-rice-2", "090": "beef-stirfry-rice-wide", "093": "beef-stirfry-rice-3",
    "037": "sesame-wings", "040": "sesame-wings-wide", "041": "sesame-wings-macro", "042": "sesame-wings-2",
    "043": "sesame-wings-3", "046": "sesame-wings-4", "050": "sesame-wings-5",
    "038": "crumbed-chicken", "039": "crumbed-chicken-2",
    "044": "pizza-macro", "045": "pizza-macro-2", "047": "pizza-macro-3", "048": "pizza", "049": "pizza-wide",
    "051": "pizza-2", "052": "pizza-3",
    "091": "ugali-stew-wide", "092": "ugali-greens", "094": "ugali-stew", "095": "ugali-stew-2",
    "096": "beef-stew-macro", "097": "ugali-stew-wide-2", "100": "ugali-stew-3",
    "098": "stew-rice-greens", "099": "stew-rice", "101": "stew-rice-macro", "102": "stew-rice-greens-2", "104": "stew-rice-greens-3",
    "103": "spiced-chicken-rice", "105": "spiced-chicken-rice-2", "106": "spiced-chicken-rice-macro",
}

# ---- solid-backdrop branded plates -> cutouts -----------------------------------------------
CUTOUTS = {
    "053": "caramel-layer-cake", "054": "puff-pastry", "055": "latte", "056": "passion-cake",
    "057": "latte-croissant", "058": "full-breakfast", "059": "pancake", "060": "sausage-fries",
    "061": "breakfast-platter", "062": "masala-fries-sausage", "063": "wrap-potatoes",
    "064": "masala-fries", "065": "sausage-plate", "066": "potato-wedges", "067": "beef-fries",
    "070": "chicken-mushroom", "071": "spiced-chicken-rice", "072": "crumbed-chicken",
    "073": "ugali-stew", "074": "pizza", "075": "pancake-stack", "076": "crepes",
    "077": "puff-pastry-2", "078": "breakfast-platter-2", "079": "fries", "080": "saucy-potatoes",
    "081": "full-breakfast-toast", "082": "grilled-chicken", "083": "loaded-fries",
    "084": "stew-rice-greens", "085": "pilau", "087": "sesame-wings", "088": "black-forest-cake",
    "089": "croissant",
}


def save_photo(num, name):
    im = Image.open(f"{SRC}/{num}.jpg").convert("RGB")
    im.thumbnail((1600, 1600))
    im.save(f"{OUT}/photos/{name}.webp", "WEBP", quality=82, method=6)


def cutout(im, bg=None, tol=22.0):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    h, w, _ = a.shape
    if bg is None:
        bg = np.median(np.concatenate([a[:4].reshape(-1, 3), a[-4:].reshape(-1, 3),
                                       a[:, :4].reshape(-1, 3), a[:, -4:].reshape(-1, 3)]), axis=0)
    bg = np.asarray(bg, np.float32)
    s = (a @ bg) / float(bg @ bg)                       # projection onto backdrop colour
    resid = np.linalg.norm(a - s[..., None] * bg, axis=2)
    bgish = (resid < tol) & (s > 0.25) & (s < 1.12)
    # flood-fill from the border so only the connected backdrop is removed
    m = Image.fromarray(np.where(bgish, 255, 0).astype(np.uint8)).copy()
    for x in range(0, w, 8):
        for y in (0, h - 1):
            if m.getpixel((x, y)) == 255:
                ImageDraw.floodfill(m, (x, y), 128)
    for y in range(0, h, 8):
        for x in (0, w - 1):
            if m.getpixel((x, y)) == 255:
                ImageDraw.floodfill(m, (x, y), 128)
    backdrop = np.asarray(m) == 128
    fg = Image.fromarray(np.where(backdrop, 0, 255).astype(np.uint8))
    fg = fg.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.9))
    fga = np.asarray(fg).astype(np.float32) / 255.0
    shadow = np.clip((1.0 - s) * 1.25, 0, 0.6) * backdrop          # keep the cast shadow, as black
    alpha = np.clip(fga + shadow * (1 - fga), 0, 1)
    rgb = a * fga[..., None]                                         # shadow pixels -> black
    rgb = np.where(alpha[..., None] > 0, rgb / np.maximum(alpha[..., None], 1e-4), 0)
    out = np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    bbox = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    return img.crop(bbox) if bbox else img


for num, name in PHOTOS.items():
    save_photo(num, name)

for num, name in CUTOUTS.items():
    c = cutout(Image.open(f"{SRC}/{num}.jpg"))
    c.save(f"{OUT}/cutouts/{name}.webp", "WEBP", quality=88, method=6)

# Mojito line-up: keep the native brand-green "stage" (glass is transparent, so no keying),
# and cut each glass into its own portrait frame.
moj = Image.open(f"{SRC}/086.jpg").convert("RGB")
moj.save(f"{OUT}/stage/mojito-lineup.webp", "WEBP", quality=85)
W, H = moj.size
cols = np.asarray(moj).astype(np.int16)
green = np.array([0, 107, 55])
diff = np.abs(cols - green).sum(axis=2) > 60
colmask = diff[int(H * 0.35):].mean(axis=0) > 0.08
runs, start = [], None
for x, v in enumerate(colmask):
    if v and start is None: start = x
    if not v and start is not None:
        if x - start > 40: runs.append((start, x))
        start = None
print("mojito glass columns:", runs)
names = ["berry", "classic-mint", "blue-lagoon", "strawberry"]
mids = [0] + [(runs[i][1] + runs[i + 1][0]) // 2 for i in range(len(runs) - 1)] + [W]
for i, n in enumerate(names):
    moj.crop((mids[i], 170, mids[i + 1], H)).save(f"{OUT}/stage/mojito-{n}.webp", "WEBP", quality=88)

# Latte and latte+croissant on native stage colours (seamless on matching panels)
for num, n in (("055", "latte"), ("057", "latte-croissant"), ("088", "black-forest-cake"), ("089", "croissant")):
    Image.open(f"{SRC}/{num}.jpg").convert("RGB").save(f"{OUT}/stage/{n}.webp", "WEBP", quality=86)

# Social preview image source (OG) – built later from the latte cutout.
print("done")
