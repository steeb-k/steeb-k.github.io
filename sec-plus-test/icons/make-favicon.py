"""Favicon: the header pill as a squircle. [S|+]: S on white (left), + on black (right), white outline all round."""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

FONTS = '/home/steeb/steeb-k.github.io/fonts/ibm-plex/'
SANS = FONTS + 'IBMPlexSans-SemiBold.woff2'
MONO = FONTS + 'IBMPlexMono-Medium.woff2'
W = 512
RX = 133           # outer squircle radius (same as before)
OUT = int(sys.argv[1]) if len(sys.argv) > 1 else 30     # white outline width
DIV = int(sys.argv[2]) if len(sys.argv) > 2 else 296    # divider x (S side is wider)
S_H = int(sys.argv[3]) if len(sys.argv) > 3 else 280    # S cap height in px
P_H = int(sys.argv[4]) if len(sys.argv) > 4 else 200    # + height in px
INK, PAPER = '#080808', '#f0f0f0'

def glyph_path(font_path, ch, height, cx, cy):
    """SVG path for one glyph scaled so its bbox height == height, centred on (cx, cy)."""
    f = TTFont(font_path)
    gs = f.getGlyphSet(); name = f.getBestCmap()[ord(ch)]; g = gs[name]
    bp = BoundsPen(gs); g.draw(bp); x0, y0, x1, y1 = bp.bounds
    s = height / (y1 - y0)
    gx, gy = (x0 + x1) / 2, (y0 + y1) / 2
    # font units: y up. SVG: y down. x' = (x-gx)*s + cx ; y' = -(y-gy)*s + cy
    sp = SVGPathPen(gs)
    tp = TransformPen(sp, (s, 0, 0, -s, cx - gx * s, cy + gy * s))
    g.draw(tp)
    return sp.getCommands()

inner = OUT                       # inset of the black segment
irx = max(RX - OUT, 60)
s_cx = (0 + DIV) / 2              # S centred in the whole white area (outline merges with the segment, as in the pill)
p_cx = (DIV + (W - OUT)) / 2
cy = W / 2
s_path = glyph_path(SANS, 'S', S_H, s_cx, cy)
p_path = glyph_path(SANS, '+', P_H, p_cx, cy)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {W}" width="{W}" height="{W}">
<defs><clipPath id="c"><rect x="{inner}" y="{inner}" width="{W - 2 * inner}" height="{W - 2 * inner}" rx="{irx}" ry="{irx}"/></clipPath></defs>
<rect x="0" y="0" width="{W}" height="{W}" rx="{RX}" ry="{RX}" fill="{PAPER}"/>
<rect x="{DIV}" y="0" width="{W - DIV}" height="{W}" fill="{INK}" clip-path="url(#c)"/>
<path d="{s_path}" fill="{INK}"/>
<path d="{p_path}" fill="{PAPER}"/>
</svg>
'''
open('favicon.svg', 'w').write(svg)
print('wrote favicon.svg', OUT, DIV, S_H, P_H)
