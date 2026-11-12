"""Favicon: the header pill as a squircle, turned on its side. "AZ" on the paper half (top), "900" on the ink half (bottom),
paper outline all round. Usage: python3 make-favicon.py [outline] [divider-y] [AZ-height] [900-height], then rasterize:
  rsvg-convert -w 32 favicon.svg -o favicon-32.png   (also 192, 512, and 180 as apple-touch-icon.png)
  magick favicon-16.png favicon-32.png favicon-48.png favicon.ico
"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
SANS = os.path.normpath(os.path.join(HERE, '..', '..', '..', 'fonts', 'ibm-plex', 'IBMPlexSans-SemiBold.woff2'))
W = 512
RX = 133           # outer squircle radius
OUT = int(sys.argv[1]) if len(sys.argv) > 1 else 30     # paper outline width
DIV = int(sys.argv[2]) if len(sys.argv) > 2 else 262    # divider y (the top half carries the outline, so it is a little taller)
A_H = int(sys.argv[3]) if len(sys.argv) > 3 else 150    # "AZ" cap height in px
N_H = int(sys.argv[4]) if len(sys.argv) > 4 else 130    # "900" digit height in px
INK, PAPER = '#060b14', '#eaf1fb'   # --bg-0 and --ink of the site's dark theme
TRACK = 0.02       # extra letter spacing, in em


def text_path(text, height, cx, cy):
    """One SVG path for a string, scaled so the glyphs' bbox height == height, centered on (cx, cy)."""
    f = TTFont(SANS)
    gs, cmap, upm = f.getGlyphSet(), f.getBestCmap(), f['head'].unitsPerEm
    x, runs, lo, hi, left, right = 0, [], 1e9, -1e9, None, None
    for ch in text:
        name = cmap[ord(ch)]
        bp = BoundsPen(gs); gs[name].draw(bp); x0, y0, x1, y1 = bp.bounds
        runs.append((name, x))
        lo, hi = min(lo, y0), max(hi, y1)
        left = x + x0 if left is None else left
        right = x + x1
        x += gs[name].width + TRACK * upm
    s = height / (hi - lo)
    gx, gy = (left + right) / 2, (lo + hi) / 2
    sp = SVGPathPen(gs)
    for name, off in runs:   # font units are y-up, SVG is y-down
        gs[name].draw(TransformPen(sp, (s, 0, 0, -s, cx + (off - gx) * s, cy + gy * s)))
    return sp.getCommands()


irx = max(RX - OUT, 60)
top_cy = (OUT / 2 + DIV) / 2          # "AZ" optically centered in the paper area (outline merges with the segment, as in the pill)
bot_cy = (DIV + (W - OUT)) / 2
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {W}" width="{W}" height="{W}">
<defs><clipPath id="c"><rect x="{OUT}" y="{OUT}" width="{W - 2 * OUT}" height="{W - 2 * OUT}" rx="{irx}" ry="{irx}"/></clipPath></defs>
<rect x="0" y="0" width="{W}" height="{W}" rx="{RX}" ry="{RX}" fill="{PAPER}"/>
<rect x="0" y="{DIV}" width="{W}" height="{W - DIV}" fill="{INK}" clip-path="url(#c)"/>
<path d="{text_path('AZ', A_H, W / 2, top_cy)}" fill="{INK}"/>
<path d="{text_path('900', N_H, W / 2, bot_cy)}" fill="{PAPER}"/>
</svg>
'''
open(os.path.join(HERE, 'favicon.svg'), 'w').write(svg)
print('wrote favicon.svg', OUT, DIV, A_H, N_H)
