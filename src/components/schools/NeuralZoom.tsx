import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ACT1_END = 1.6;
const ACT2_END = 5.2;
const OPS_PER_WORD = 350_000_000_000;
const SPACING = 170;
const NODE_GAP = 34;

const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

// six weight buckets: [strong+, med+, weak+, strong−, med−, weak−]
const BUCKETS = [
  { c: "rgba(96,235,170,1)", a: 0.3 },
  { c: "rgba(120,215,150,1)", a: 0.17 },
  { c: "rgba(135,205,165,1)", a: 0.08 },
  { c: "rgba(245,95,70,1)", a: 0.3 },
  { c: "rgba(250,150,85,1)", a: 0.17 },
  { c: "rgba(235,165,120,1)", a: 0.08 },
];

type GapBucket = { coords: Float32Array; a: Int16Array; b: Int16Array };
type DiagramEdge = {
  ax: number;
  ay: number;
  cx: number;
  cy: number;
  bx: number;
  by: number;
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(isSmall: boolean) {
  const rand = mulberry32(20260828);
  const LAYERS = isSmall ? 15 : 23;
  const MID = Math.floor(LAYERS / 2);
  const minN = isSmall ? 11 : 17;
  const varN = isSmall ? 8 : 14;

  const counts: number[] = [];
  for (let i = 0; i < LAYERS; i++) {
    counts.push((minN + Math.floor(rand() * varN)) | 1);
  }
  const layerX = (i: number) => (i - MID) * SPACING;
  const nodeY = (i: number, j: number) => (j - (counts[i] - 1) / 2) * NODE_GAP;

  const gaps: GapBucket[][] = [];
  const diagram: Record<string, DiagramEdge> = {};
  const heroIdx = (counts[MID] - 1) / 2;
  const in1Idx = (counts[MID - 1] - 1) / 2 - 3;
  const in2Idx = (counts[MID - 1] - 1) / 2 + 3;
  const outIdx = (counts[MID + 1] - 1) / 2;

  for (let g = 0; g < LAYERS - 1; g++) {
    const tmp: { arr: number[]; a: number[]; b: number[] }[] = BUCKETS.map(
      () => ({ arr: [], a: [], b: [] }),
    );
    for (let j = 0; j < counts[g]; j++) {
      for (let k = 0; k < counts[g + 1]; k++) {
        const w = rand() * 2 - 1;
        const m = Math.abs(w);
        const bi = (w > 0 ? 0 : 3) + (m > 0.66 ? 0 : m > 0.33 ? 1 : 2);
        const ax = layerX(g);
        const ay = nodeY(g, j);
        const bx = layerX(g + 1);
        const by = nodeY(g + 1, k);
        const sag = (18 + rand() * 42) * (rand() < 0.75 ? 1 : -1);
        const cx = (ax + bx) / 2 + (rand() - 0.5) * 40;
        const cy = (ay + by) / 2 + sag;
        tmp[bi].arr.push(ax, ay, cx, cy, bx, by);
        tmp[bi].a.push(j);
        tmp[bi].b.push(k);
        if (g === MID - 1 && k === heroIdx && (j === in1Idx || j === in2Idx))
          diagram[j === in1Idx ? "in1" : "in2"] = { ax, ay, cx, cy, bx, by };
        if (g === MID && j === heroIdx && k === outIdx)
          diagram.out = { ax, ay, cx, cy, bx, by };
      }
    }
    gaps.push(
      tmp.map((t) => ({
        coords: new Float32Array(t.arr),
        a: new Int16Array(t.a),
        b: new Int16Array(t.b),
      })),
    );
  }
  return {
    LAYERS,
    MID,
    counts,
    layerX,
    nodeY,
    gaps,
    diagram,
    heroIdx,
    in1Idx,
    in2Idx,
    outIdx,
  };
}

function makeSprite(core: string, halo: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, core);
  grad.addColorStop(0.3, halo);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeOutQuad = (p: number) => 1 - (1 - p) * (1 - p);
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const qBez = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;

function BigCount({ target, animate }: { target: number; animate: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!animate) {
      el.textContent = target.toLocaleString("en-US");
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const D = 2200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / D);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(target * e).toLocaleString("en-US");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, animate]);
  return <span ref={ref} />;
}

const captions = [
  "This is that single neuron, live.",
  "It's never alone.",
  "Every thread is a weight: green pulls toward yes, red pushes toward no.",
];

export function NeuralZoom() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [runId, setRunId] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [phase, setPhase] = useState<"anim" | "done">(
    reduced ? "done" : "anim",
  );
  const [capIdx, setCapIdx] = useState(reduced ? -1 : 0);

  useEffect(() => {
    // Only nudge on replay; on first mount the animation is scroll-triggered,
    // so auto-scrolling here would yank the page on load.
    if (runId !== 0) {
      wrapRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }, [runId, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;
    const resize = () => {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(cw * dpr));
      canvas.height = Math.max(1, Math.round(ch * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    const isSmall = cw < 640;
    const net = buildNetwork(isSmall);
    const { LAYERS, MID, counts, layerX, nodeY, gaps, diagram } = net;
    const worldW = (LAYERS - 1) * SPACING;
    const maxCount = Math.max(...counts);

    const nodeSprite = makeSprite(
      "rgba(255,255,255,0.98)",
      "rgba(190,215,255,0.5)",
    );
    const goldSprite = makeSprite(
      "rgba(255,244,214,1)",
      "rgba(255,180,80,0.65)",
    );
    const pulseSprite = makeSprite(
      "rgba(255,255,255,1)",
      "rgba(190,235,215,0.75)",
    );

    let t = reduced ? ACT2_END + 0.01 : 0;
    let last = performance.now();
    let visible = true;
    let raf = 0;
    let scaleNow = 1;
    let camXNow = 0;
    let capShown = reduced ? -1 : 0;
    let doneFired = reduced;
    let focusL = -1;
    let focusJ = -1;
    let needsFrame = true;

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);

    const setFocus = (ev: PointerEvent) => {
      if (t < ACT2_END) return;
      const rect = canvas.getBoundingClientRect();
      const wx = (ev.clientX - rect.left - cw / 2) / scaleNow + camXNow;
      const wy = (ev.clientY - rect.top - ch / 2) / scaleNow;
      const L = clamp(Math.round(wx / SPACING) + MID, 0, LAYERS - 1);
      const J = clamp(
        Math.round(wy / NODE_GAP + (counts[L] - 1) / 2),
        0,
        counts[L] - 1,
      );
      const dx = (layerX(L) - wx) * scaleNow;
      const dy = (nodeY(L, J) - wy) * scaleNow;
      if (dx * dx + dy * dy < 26 * 26) {
        focusL = L;
        focusJ = J;
      } else {
        focusL = -1;
        focusJ = -1;
      }
      needsFrame = true;
    };
    const clearFocus = () => {
      focusL = -1;
      focusJ = -1;
      needsFrame = true;
    };
    canvas.addEventListener("pointermove", setFocus);
    canvas.addEventListener("pointerdown", setFocus);
    canvas.addEventListener("pointerleave", clearFocus);

    const render = (_dt: number) => {
      const scale1 = Math.min(1.6, cw / 470);
      const fit = Math.min(
        cw / (worldW + 420),
        ch / (maxCount * NODE_GAP + 210),
      );
      let act: number;
      if (t < ACT1_END) {
        scaleNow = scale1;
        act = 1;
      } else if (t < ACT2_END) {
        scaleNow = lerp(
          scale1,
          fit,
          easeInOutCubic((t - ACT1_END) / (ACT2_END - ACT1_END)),
        );
        act = 2;
      } else {
        scaleNow = fit;
        act = 3;
      }
      camXNow =
        act === 3 && !reduced ? Math.sin((t - ACT2_END) * 0.1) * 90 : 0;
      const px = (wx: number) => (wx - camXNow) * scaleNow + cw / 2;
      const py = (wy: number) => wy * scaleNow + ch / 2;

      const revealLayers =
        act === 2
          ? (LAYERS / 2 + 2) * easeOutQuad((t - ACT1_END) / (ACT2_END - ACT1_END))
          : act === 3
            ? LAYERS
            : 0;
      const foreshadow =
        act === 1 ? 1 : Math.max(0, 1 - (t - ACT1_END) / 0.5);
      const wf =
        act === 3 && !reduced
          ? -worldW / 2 - 300 + (((t - ACT2_END) * 620) % (worldW + 600))
          : -99999;
      const dimmed = focusL >= 0 ? 0.2 : 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "lighter";
      // world-space transform: path coords below are world units
      ctx.setTransform(
        dpr * scaleNow,
        0,
        0,
        dpr * scaleNow,
        dpr * (cw / 2 - camXNow * scaleNow),
        dpr * (ch / 2),
      );

      // weight fabric, batched per gap x bucket
      const halfView = cw / (2 * scaleNow) + SPACING;
      ctx.lineWidth = 1.05 / scaleNow;
      for (let g = 0; g < LAYERS - 1; g++) {
        const gx = layerX(g) + SPACING / 2;
        if (Math.abs(gx - camXNow) > halfView) continue;
        const gapDist = Math.abs(g + 0.5 - MID);
        let mul =
          act === 1
            ? 0.12
            : Math.max(
                0.12 * foreshadow,
                clamp((revealLayers - gapDist) / 1.2, 0, 1),
              );
        if (act === 3) {
          const d = gx - wf;
          mul *= (1 + 1.1 * Math.exp((-d * d) / (2 * 210 * 210))) * dimmed;
        }
        if (mul < 0.02) continue;
        for (let bi = 0; bi < BUCKETS.length; bi++) {
          const gb = gaps[g][bi];
          const co = gb.coords;
          if (!co.length) continue;
          ctx.strokeStyle = BUCKETS[bi].c;
          ctx.globalAlpha = Math.min(0.85, BUCKETS[bi].a * mul);
          ctx.beginPath();
          for (let i = 0; i < co.length; i += 6) {
            ctx.moveTo(co[i], co[i + 1]);
            ctx.quadraticCurveTo(co[i + 2], co[i + 3], co[i + 4], co[i + 5]);
          }
          ctx.stroke();
        }
      }

      // focus trace: one neuron's wiring flares white
      if (focusL >= 0 && act === 3) {
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 1.7 / scaleNow;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        const trace = (g: number, side: "a" | "b") => {
          if (g < 0 || g >= LAYERS - 1) return;
          for (let bi = 0; bi < BUCKETS.length; bi++) {
            const gb = gaps[g][bi];
            const idx = side === "a" ? gb.a : gb.b;
            const co = gb.coords;
            for (let i = 0; i < idx.length; i++) {
              if (idx[i] !== focusJ) continue;
              const o = i * 6;
              ctx.moveTo(co[o], co[o + 1]);
              ctx.quadraticCurveTo(
                co[o + 2],
                co[o + 3],
                co[o + 4],
                co[o + 5],
              );
            }
          }
        };
        trace(focusL - 1, "b");
        trace(focusL, "a");
        ctx.stroke();
      }

      // neuron columns
      for (let L = 0; L < LAYERS; L++) {
        const lx = layerX(L);
        if (Math.abs(lx - camXNow) > halfView) continue;
        const layerDist = Math.abs(L - MID);
        let a =
          act === 1
            ? 0.3
            : Math.max(
                0.3 * foreshadow,
                clamp((revealLayers - layerDist) / 1.2, 0, 1),
              ) * 0.9;
        if (focusL >= 0 && act === 3) a *= L === focusL ? 1 : 0.45;
        if (a < 0.02) continue;
        const s = Math.max(2.5 / scaleNow, 7);
        for (let j = 0; j < counts[L]; j++) {
          const isHero = L === MID && j === net.heroIdx;
          const isFocus = L === focusL && j === focusJ;
          let ss = isHero ? Math.max(s * 2.2, 15 / scaleNow) : s;
          if (isFocus) ss = s * 2.4;
          ctx.globalAlpha = isHero || isFocus ? 1 : a;
          ctx.drawImage(
            isHero ? goldSprite : nodeSprite,
            lx - ss / 2,
            nodeY(L, j) - ss / 2,
            ss,
            ss,
          );
        }
      }

      // act 1 diagram: bold edges, values, weights, ReLU, output
      const labelA =
        t < ACT1_END ? 1 : clamp(1 - (t - ACT1_END) / 0.6, 0, 1);
      if (labelA > 0 && diagram.in1 && diagram.in2 && diagram.out) {
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 1.6 / scaleNow;
        ctx.globalAlpha = 0.7 * labelA;
        ctx.beginPath();
        for (const d of [diagram.in1, diagram.in2, diagram.out]) {
          ctx.moveTo(d.ax, d.ay);
          ctx.quadraticCurveTo(d.cx, d.cy, d.bx, d.by);
        }
        ctx.stroke();

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const fs = Math.round(15 * Math.min(scaleNow, 1.6));

        const travel = (d: DiagramEdge, label: string, delay: number) => {
          const p = clamp((t - delay) / 0.6, 0, 1);
          if (p > 0 && p < 1) {
            const ep = easeInOutCubic(p);
            const x = px(qBez(d.ax, d.cx, d.bx, ep));
            const y = py(qBez(d.ay, d.cy, d.by, ep));
            const s = 22 * scaleNow;
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = labelA;
            ctx.drawImage(pulseSprite, x - s / 2, y - s / 2, s, s);
            ctx.globalCompositeOperation = "source-over";
          }
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${fs + 2}px ${MONO}`;
          ctx.fillText(label, px(d.ax) - 30 * scaleNow, py(d.ay));
        };
        travel(diagram.in1, "2", 0.15);
        travel(diagram.in2, "−1", 0.15);

        ctx.globalAlpha = labelA * 0.95;
        ctx.fillStyle = "rgba(150,225,190,1)";
        ctx.font = `600 ${fs - 1}px ${MONO}`;
        ctx.fillText(
          "× 3",
          px(qBez(diagram.in1.ax, diagram.in1.cx, diagram.in1.bx, 0.5)) - 8,
          py(qBez(diagram.in1.ay, diagram.in1.cy, diagram.in1.by, 0.5)) - 13,
        );
        ctx.fillStyle = "rgba(250,150,85,1)";
        ctx.fillText(
          "× 4",
          px(qBez(diagram.in2.ax, diagram.in2.cx, diagram.in2.bx, 0.5)) - 8,
          py(qBez(diagram.in2.ay, diagram.in2.cy, diagram.in2.by, 0.5)) + 17,
        );

        const hx = px(0);
        const hy = py(nodeY(MID, net.heroIdx));
        const rp = clamp((t - 1.0) / 0.35, 0, 1);
        if (rp > 0 && rp < 1) {
          ctx.globalAlpha = labelA * (1 - rp);
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(hx, hy, 14 * scaleNow + rp * 46, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (t > 1.0) {
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#34d399";
          ctx.font = `600 ${fs - 2}px ${MONO}`;
          ctx.fillText("ReLU ✓", hx, hy + 32 * scaleNow);
        }

        const op = clamp((t - 1.15) / 0.45, 0, 1);
        if (op > 0) {
          const eo = easeInOutCubic(op);
          const x = px(qBez(diagram.out.ax, diagram.out.cx, diagram.out.bx, eo));
          const y = py(qBez(diagram.out.ay, diagram.out.cy, diagram.out.by, eo));
          if (op < 1) {
            const s = 26 * scaleNow;
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = labelA;
            ctx.drawImage(pulseSprite, x - s / 2, y - s / 2, s, s);
            ctx.globalCompositeOperation = "source-over";
          }
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#ffd166";
          ctx.font = `700 ${fs + 3}px ${MONO}`;
          ctx.fillText("2", x, y - 20 * scaleNow);
        }
      }

      // HUD layer boxes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      const hudA =
        act === 1
          ? 1
          : act === 2
            ? clamp((t - 3.9) / 0.9, 0, 1)
            : 1;
      if (hudA > 0.02) {
        const step =
          act === 1 ? 1 : Math.max(1, Math.ceil(150 / (SPACING * scaleNow)));
        const first = act === 1 ? MID : 1;
        for (let L = first; L < LAYERS; L += act === 1 ? LAYERS : step) {
          const sx = px(layerX(L)) - 52;
          if (sx < 4 || sx > cw - 116) continue;
          const sy = 10;
          ctx.globalAlpha = hudA * 0.9;
          ctx.fillStyle = "rgba(5,8,28,0.55)";
          ctx.strokeStyle = "rgba(140,170,255,0.35)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(sx, sy, 112, 46, 5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.font = `700 10px ${MONO}`;
          ctx.fillText(`HL ${L}`, sx + 8, sy + 6);
          ctx.fillStyle = "rgba(143,184,255,0.9)";
          ctx.font = `500 9px ${MONO}`;
          ctx.fillText(`Neurons: ${counts[L]}`, sx + 8, sy + 19);
          ctx.fillText("Activation:", sx + 8, sy + 31);
          ctx.fillStyle = "rgba(255,178,122,0.95)";
          ctx.fillText("ReLU", sx + 72, sy + 31);
        }
      }

      // focus tag
      if (focusL >= 0 && act === 3) {
        const fx = px(layerX(focusL));
        const fy = py(nodeY(focusL, focusJ));
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = `700 11px ${MONO}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`H${focusL}.${focusJ + 1}`, fx + 9, fy - 9);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || cw === 0) return;
      if (reduced && !needsFrame) return;
      needsFrame = false;
      if (!reduced) t += dt;
      render(dt);

      let cap: number;
      if (t < ACT1_END) cap = 0;
      else if (t < 3.4) cap = 1;
      else if (t < ACT2_END) cap = 2;
      else cap = -1;
      if (cap !== capShown) {
        capShown = cap;
        setCapIdx(cap);
      }
      if (t >= ACT2_END && !doneFired) {
        doneFired = true;
        setPhase("done");
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointermove", setFocus);
      canvas.removeEventListener("pointerdown", setFocus);
      canvas.removeEventListener("pointerleave", clearFocus);
      window.removeEventListener("resize", resize);
    };
  }, [runId, reduced]);

  const replay = () => {
    if (reduced) return;
    setPhase("anim");
    setCapIdx(0);
    setRunId((r) => r + 1);
  };

  return (
    <div ref={wrapRef} className="-mx-7 -mb-8 mt-8 sm:-mx-10 sm:-mb-10">
      <div className="relative h-[420px] sm:h-[500px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ touchAction: "pan-y" }}
        />

        {capIdx >= 0 && (
          <p
            key={capIdx}
            className="animate-fade-rise pointer-events-none absolute bottom-6 left-0 right-0 px-6 text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.8)",
              textShadow: "0 2px 12px rgba(5,8,28,0.9)",
            }}
          >
            {captions[capIdx]}
          </p>
        )}

        {phase === "done" && (
          <p
            className="pointer-events-none absolute bottom-3 left-0 right-0 px-6 text-center"
            style={{
              fontFamily: MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.55)",
              textShadow: "0 2px 10px rgba(5,8,28,0.9)",
            }}
          >
            touch any neuron to trace its wiring
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateRows: phase === "done" ? "1fr" : "0fr",
          transition: reduced
            ? undefined
            : "grid-template-rows 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ minHeight: 0, overflow: "hidden" }}>
          <div
            className="px-7 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-8"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              opacity: phase === "done" ? 1 : 0,
              transition: reduced ? undefined : "opacity 0.55s ease 0.15s",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.66rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#ffd166",
                  }}
                >
                  1 neuron · 2 multiplications
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: "#ffffff",
                  }}
                >
                  ~
                  <BigCount
                    target={OPS_PER_WORD}
                    animate={phase === "done" && !reduced}
                  />
                </p>
                <p
                  className="mt-3 max-w-xl"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  multiply-and-adds is what ChatGPT runs for{" "}
                  <b style={{ color: "#ffffff" }}>every single word</b> it
                  writes, all of them exactly the math you just did.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full px-7 py-4 no-underline transition-transform hover:-translate-y-px lg:self-end"
                  style={{
                    background: "#ffffff",
                    color: "#1335b8",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    boxShadow: "0 10px 24px rgba(5, 8, 28, 0.25)",
                  }}
                >
                  Register before 15 Aug →
                </Link>
                <p
                  className="lg:text-right"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  The real Challenge has 30 more where that came from.
                  {!reduced && (
                    <>
                      {" "}
                      <button
                        type="button"
                        onClick={replay}
                        className="cursor-pointer p-0 underline transition-colors hover:text-white"
                        style={{
                          background: "transparent",
                          border: "none",
                          font: "inherit",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Run it again ↻
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
