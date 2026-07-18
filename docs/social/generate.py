import base64
import pathlib
import re
import subprocess

REPO = pathlib.Path("/Users/hamza/wingschool vscode/ai-wingschool")
SCRATCH = pathlib.Path(__file__).parent
BUILD = pathlib.Path("/tmp") / "wingschool-social-build"
OUT = REPO / "docs" / "social"
BUILD.mkdir(exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

logo_src = (REPO / "src/components/Logo.tsx").read_text()
WM = re.search(r'WORDMARK_PATH =\s*"([^"]+)"', logo_src).group(1)
TG = re.search(r'TAGLINE_PATH =\s*"([^"]+)"', logo_src).group(1)
AI = re.search(r'<path d="([^"]+)"', (REPO / "public/favicon.svg").read_text()).group(1)
HANKEN = base64.b64encode((REPO / "public/fonts/HankenGrotesk-Regular.ttf").read_bytes()).decode()
SKY = base64.b64encode((REPO / "src/assets/BannerBottom.webp").read_bytes()).decode()

PAGE = """<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: 'HK'; src: url(data:font/ttf;base64,__FONT__) format('truetype'); font-weight: 400; }
html, body { margin: 0; padding: 0; }
body { width: __W__px; height: __H__px; overflow: hidden; font-family: 'HK', sans-serif;
       -webkit-font-smoothing: antialiased; }
.stage { position: relative; width: 100%; height: 100%; display: flex;
         align-items: center; justify-content: center; }
.stack { position: relative; display: flex; flex-direction: column; align-items: center;
         gap: __GAP__px; text-align: center; }
.kicker { font-size: __KS__px; letter-spacing: __KLS__px; text-transform: uppercase; font-weight: 500; }
.chip { display: inline-flex; align-items: center; gap: 10px; border-radius: 999px;
        padding: __CPV__px __CPH__px; font-size: __CS__px; letter-spacing: __CLS__px;
        text-transform: uppercase; font-weight: 500; border: 1px solid; }
.dot { width: __DOT__px; height: __DOT__px; border-radius: 999px; }
.ghost { position: absolute; letter-spacing: -0.04em; color: transparent; line-height: 1;
         -webkit-text-stroke: __GSW__px rgba(255,255,255,0.09); user-select: none; }
.cover { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
</style></head><body>__CONTENT__</body></html>"""

def wordmark(width, main, tag):
    return (f'<svg viewBox="0 0 141 40" style="width:{width}px;height:auto;display:block">'
            f'<path fill="{main}" d="{WM}"/><path fill="{tag}" d="{TG}"/></svg>')

CHIP_TEXT = "WingsQuest 2026 · Challenge Day 28 August"
KICKER_TEXT = "Teenagers learning to think and build with AI"

# Per-platform metrics: canvas, wordmark width, kicker size/ls, chip size/ls/pad, gap, ghost size+offset
PLATFORMS = {
    "x":        dict(w=1500, h=500,  wm=430, ks=15,   kls=5.5, cs=13, cls=2.2, cpv=10, cph=24, gap=27, dot=7, gs=300, gr=55,  gsw=2),
    "linkedin": dict(w=1584, h=396,  wm=350, ks=13.5, kls=5,   cs=12, cls=2,   cpv=9,  cph=21, gap=21, dot=6, gs=230, gr=60,  gsw=2),
    "youtube":  dict(w=2560, h=1440, wm=430, ks=15,   kls=5.5, cs=13, cls=2.2, cpv=10, cph=24, gap=27, dot=7, gs=330, gr=560, gsw=2),
}

def content_cream(p):
    return f'''<div class="stage" style="background:#f4f3ee">
  <div class="stack">
    <div class="kicker" style="color:#8a8a8a">{KICKER_TEXT}</div>
    {wordmark(p["wm"], "#0a0a0a", "#858585")}
    <div class="chip" style="color:#1335b8;border-color:rgba(19,53,184,0.22);background:rgba(19,53,184,0.08)">
      <span class="dot" style="background:#1335b8"></span>{CHIP_TEXT}</div>
  </div>
</div>'''

def content_midnight(p):
    return f'''<div class="stage" style="background:#05081C">
  <div style="position:absolute;inset:0;background:
    radial-gradient(circle at 78% 18%, rgba(151,178,255,0.14), transparent 45%),
    radial-gradient(circle at 12% 88%, rgba(19,53,184,0.3), transparent 52%)"></div>
  <div class="ghost" style="font-size:{p["gs"]}px;right:{p["gr"]}px;top:50%;transform:translateY(-50%)">2026</div>
  <div class="stack">
    <div class="kicker" style="color:rgba(255,255,255,0.55)">{KICKER_TEXT}</div>
    {wordmark(p["wm"], "rgba(255,255,255,0.98)", "rgba(255,255,255,0.62)")}
    <div class="chip" style="color:rgba(255,255,255,0.92);border-color:rgba(255,255,255,0.28);background:rgba(255,255,255,0.1)">
      <span class="dot" style="background:#ffffff"></span>{CHIP_TEXT}</div>
  </div>
</div>'''

def content_royal(p):
    return f'''<div class="stage" style="background:
    radial-gradient(circle at 82% 8%, rgba(151,178,255,0.35), transparent 42%),
    radial-gradient(circle at 4% 92%, rgba(5,8,28,0.55), transparent 55%),
    linear-gradient(135deg, #1a3fd6 0%, #1335b8 46%, #0c2489 100%)">
  <div class="ghost" style="font-size:{p["gs"]}px;right:{p["gr"]}px;top:50%;transform:translateY(-50%)">2026</div>
  <div class="stack">
    <div class="kicker" style="color:rgba(255,255,255,0.75)">{KICKER_TEXT}</div>
    {wordmark(p["wm"], "#ffffff", "rgba(255,255,255,0.62)")}
    <div class="chip" style="color:rgba(255,255,255,0.92);border-color:rgba(255,255,255,0.28);background:rgba(255,255,255,0.1)">
      <span class="dot" style="background:#ffffff"></span>{CHIP_TEXT}</div>
  </div>
</div>'''

def content_sky(p):
    return f'''<div class="stage">
  <img class="cover" src="data:image/webp;base64,{SKY}" alt="">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(8,12,40,0.30) 0%, rgba(8,12,40,0.55) 55%, rgba(8,12,40,0.82) 100%)"></div>
  <div class="stack">
    {wordmark(p["wm"], "rgba(255,255,255,0.98)", "rgba(255,255,255,0.68)")}
    <div class="chip" style="color:rgba(255,255,255,0.92);border-color:rgba(255,255,255,0.32);background:rgba(8,12,40,0.35)">
      <span class="dot" style="background:#ffffff"></span>{CHIP_TEXT}</div>
  </div>
</div>'''

DIRECTIONS = {"cream": content_cream, "midnight": content_midnight,
              "royal": content_royal, "sky": content_sky}

AVATARS = {
    "cream": ("#f4f3ee", "#0a0a0a"),
    "ink":   ("#0b0b0a", "#f4f3ee"),
    "royal": ("#1335b8", "#ffffff"),
    "white": ("#ffffff", "#1335b8"),
}

def content_avatar(bg, fg):
    return f'''<div class="stage" style="background:{bg}">
  <svg viewBox="0 0 64 64" style="width:1000px;height:1000px;display:block">
    <g fill="{fg}"><g transform="translate(4.047 -7.746) scale(2.3687)"><path d="{AI}"/></g></g>
  </svg>
</div>'''

def render(name, w, h, content, metrics=None):
    m = metrics or dict(gap=0, ks=10, kls=0, cs=10, cls=0, cpv=0, cph=0, dot=0, gsw=2)
    html = (PAGE.replace("__FONT__", HANKEN)
                .replace("__W__", str(w)).replace("__H__", str(h))
                .replace("__GAP__", str(m["gap"]))
                .replace("__KS__", str(m["ks"])).replace("__KLS__", str(m["kls"]))
                .replace("__CS__", str(m["cs"])).replace("__CLS__", str(m["cls"]))
                .replace("__CPV__", str(m["cpv"])).replace("__CPH__", str(m["cph"]))
                .replace("__DOT__", str(m["dot"])).replace("__GSW__", str(m["gsw"]))
                .replace("__CONTENT__", content))
    src = BUILD / f"{name}.html"
    src.write_text(html)
    png = OUT / f"{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--force-device-scale-factor=1", f"--window-size={w},{h}",
                    f"--screenshot={png}", "--virtual-time-budget=2000",
                    f"file://{src}"], check=True, capture_output=True)
    return png

made = []
for av, (bg, fg) in AVATARS.items():
    made.append(render(f"avatar-{av}-1000", 1000, 1000, content_avatar(bg, fg)))

for plat, p in PLATFORMS.items():
    for d, fn in DIRECTIONS.items():
        made.append(render(f"{plat}-banner-{d}-{p['w']}x{p['h']}", p["w"], p["h"], fn(p), p))

for f in made:
    size = f.stat().st_size
    print(f"{f.name:44} {size/1024:7.0f} KB")
