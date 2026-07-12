import { useEffect, useRef, useState } from "react";

const ACT1_END = 1.6;
const ACT2_END = 5.2;
const OPS_PER_WORD = 350_000_000_000;

type NNode = { x: number; y: number; z: number; r: number };
type NEdge = { a: number; b: number };
type Pulse = { e: number; t: number; s: number };

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(budget: number) {
  const rand = mulberry32(20260828);
  const LAYERS = 26;
  const MID = 13;
  const SPACING = 150;
  const nodes: NNode[] = [];
  const layers: number[][] = [];
  for (let i = 0; i < LAYERS; i++) {
    const env = 0.5 + 0.5 * Math.sin((Math.PI * i) / (LAYERS - 1));
    const count = Math.max(
      8,
      Math.round((budget / LAYERS) * (0.55 + 0.9 * env)),
    );
    const ids: number[] = [];
    const H = 320 + 340 * env;
    for (let j = 0; j < count; j++) {
      nodes.push({
        x: (i - MID) * SPACING + (rand() - 0.5) * 46,
        y: ((rand() + rand() + rand()) / 1.5 - 1) * H,
        z: 0.35 + 0.65 * Math.pow(rand(), 1.4),
        r: 2.6 + 3.2 * rand(),
      });
      ids.push(nodes.length - 1);
    }
    layers.push(ids);
  }

  const hero = layers[MID][0];
  nodes[hero] = { x: 0, y: 0, z: 1, r: 6.5 };
  const in1 = layers[MID - 1][0];
  const in2 = layers[MID - 1][1];
  nodes[in1] = { x: -SPACING, y: -108, z: 1, r: 5 };
  nodes[in2] = { x: -SPACING, y: 108, z: 1, r: 5 };
  const out = layers[MID + 1][0];
  nodes[out] = { x: SPACING, y: 0, z: 1, r: 5 };

  const edges: NEdge[] = [
    { a: in1, b: hero },
    { a: in2, b: hero },
    { a: hero, b: out },
  ];
  for (let i = 0; i < LAYERS - 1; i++) {
    const next = layers[i + 1];
    for (const a of layers[i]) {
      if (a === in1 || a === in2) continue;
      const k = 2 + (rand() < 0.35 ? 1 : 0);
      const cands = [...next]
        .sort(
          (p, q) =>
            Math.abs(nodes[p].y - nodes[a].y) -
            Math.abs(nodes[q].y - nodes[a].y),
        )
        .slice(0, 8);
      for (let c = 0; c < k && cands.length; c++) {
        const idx = Math.floor(rand() * Math.min(cands.length, 5));
        edges.push({ a, b: cands.splice(idx, 1)[0] });
      }
    }
  }
  return { nodes, edges, hero, in1, in2, out };
}

function makeSprite(core: string, halo: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, core);
  grad.addColorStop(0.28, halo);
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
  "This is the neuron you just ran — live.",
  "It's never alone.",
  "Every glowing dot: the same multiply-and-add you just did.",
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
    if (runId === 0) {
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
    const net = buildNetwork(isSmall ? 950 : 2400);
    const { nodes, edges, hero, in1, in2, out } = net;
    const dist = nodes.map((n) => Math.hypot(n.x, n.y));
    const maxDist = Math.max(...dist);
    const outEdges: number[][] = nodes.map(() => []);
    edges.forEach((e, i) => outEdges[e.a].push(i));
    const diagram = new Set([hero, in1, in2, out]);

    const blueSprite = makeSprite(
      "rgba(235,242,255,0.95)",
      "rgba(90,130,255,0.55)",
    );
    const pulseSprite = makeSprite(
      "rgba(255,255,255,1)",
      "rgba(160,190,255,0.8)",
    );
    const goldSprite = makeSprite(
      "rgba(255,244,214,1)",
      "rgba(255,180,80,0.6)",
    );
    const hazeSprite = makeSprite(
      "rgba(60,95,220,0.16)",
      "rgba(40,70,190,0.08)",
    );

    const bodyFont =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-body")
        .trim() || '"Hanken Grotesk", sans-serif';

    const nodeAlpha = new Float32Array(nodes.length);
    const boost = new Float32Array(nodes.length);
    let pulses: Pulse[] = [];
    const maxPulses = isSmall ? 160 : 420;

    let t = reduced ? ACT2_END + 0.01 : 0;
    let last = performance.now();
    let visible = true;
    let raf = 0;
    let scaleNow = 1;
    let camXNow = 0;
    let lastSpawn = 0;
    let capShown = reduced ? -1 : 0;
    let doneFired = reduced;

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);

    const spawnPulse = (e: number, speed = 0.55 + Math.random() * 0.5) => {
      if (pulses.length < maxPulses) pulses.push({ e, t: 0, s: speed });
    };

    const onMove = (ev: PointerEvent) => {
      if (t < ACT2_END) return;
      const now = performance.now();
      if (now - lastSpawn < 40) return;
      lastSpawn = now;
      const rect = canvas.getBoundingClientRect();
      const wx = (ev.clientX - rect.left - cw / 2) / scaleNow + camXNow;
      const wy = (ev.clientY - rect.top - ch / 2) / scaleNow;
      const reach = 130 / Math.max(scaleNow, 0.05);
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - wx;
        const dy = nodes[i].y - wy;
        if (dx * dx + dy * dy < reach * reach * 0.04) {
          boost[i] = Math.min(1, boost[i] + 0.7);
          const outs = outEdges[i];
          if (outs.length) spawnPulse(outs[(Math.random() * outs.length) | 0]);
        }
      }
    };
    canvas.addEventListener("pointermove", onMove);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || cw === 0) return;
      t += dt;

      const scale1 = Math.min(1.9, cw / 460);
      const fit = Math.min(cw / 4150, ch / 1500);
      let act: number;
      if (t < ACT1_END) {
        scaleNow = scale1;
        act = 1;
      } else if (t < ACT2_END) {
        const p = (t - ACT1_END) / (ACT2_END - ACT1_END);
        scaleNow = lerp(scale1, fit, easeInOutCubic(p));
        act = 2;
      } else {
        scaleNow = fit * (1 + 0.02 * Math.sin((t - ACT2_END) * 0.6));
        act = 3;
      }
      camXNow = act === 3 ? Math.sin((t - ACT2_END) * 0.13) * 120 : 0;
      const px = (wx: number) => (wx - camXNow) * scaleNow + cw / 2;
      const py = (wy: number) => wy * scaleNow + ch / 2;

      let revealR = 0;
      if (act === 2) {
        revealR =
          (maxDist + 400) *
          easeOutQuad((t - ACT1_END) / (ACT2_END - ACT1_END));
      } else if (act === 3) {
        revealR = maxDist + 400;
      }

      const wf =
        act === 3 ? -2075 + (((t - ACT2_END) * 700) % 4300) : -99999;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "lighter";

      // haze blobs suggesting depth beyond the rendered nodes
      if (act >= 2) {
        const hazeA = act === 3 ? 1 : easeOutQuad((t - ACT1_END) / 3);
        for (let i = -2; i <= 2; i++) {
          const hx = px(i * 900);
          const hy = py(Math.sin(i * 2.1) * 180);
          const s = 1500 * scaleNow;
          ctx.globalAlpha = hazeA;
          ctx.drawImage(hazeSprite, hx - s / 2, hy - s / 2, s, s);
        }
      }

      // node alphas
      const fadeBg =
        t < ACT1_END
          ? 0.09
          : Math.max(0, 0.09 * (1 - (t - ACT1_END) / 0.5));
      for (let i = 0; i < nodes.length; i++) {
        let a: number;
        if (diagram.has(i)) {
          a = 1;
        } else if (act === 1) {
          a = 0.09;
        } else {
          a = clamp((revealR - dist[i]) / 260, 0, 1);
          a = Math.max(a, fadeBg);
        }
        if (act === 3 && !diagram.has(i)) {
          const d = nodes[i].x - wf;
          a = Math.min(1, a + 0.5 * Math.exp((-d * d) / 180000));
        }
        a *= 0.4 + 0.6 * nodes[i].z;
        nodeAlpha[i] = Math.min(1, a + boost[i]);
        boost[i] *= Math.exp(-dt * 4);
      }

      // edges
      const edgeStep = scaleNow < 0.35 && !isSmall ? 2 : 1;
      ctx.strokeStyle = "rgba(110,150,255,1)";
      ctx.lineWidth = Math.max(0.5, 1.2 * scaleNow);
      for (let i = 0; i < edges.length; i += edgeStep) {
        const e = edges[i];
        const isDiag = i < 3;
        const ea = isDiag
          ? act === 1
            ? 0.75
            : Math.max(
                0.28,
                Math.min(nodeAlpha[e.a], nodeAlpha[e.b]) * 0.34,
              )
          : Math.min(nodeAlpha[e.a], nodeAlpha[e.b]) * 0.17;
        if (ea < 0.02) continue;
        const x1 = px(nodes[e.a].x);
        const y1 = py(nodes[e.a].y);
        const x2 = px(nodes[e.b].x);
        const y2 = py(nodes[e.b].y);
        if (
          (x1 < 0 && x2 < 0) ||
          (x1 > cw && x2 > cw) ||
          (y1 < 0 && y2 < 0) ||
          (y1 > ch && y2 > ch)
        )
          continue;
        ctx.globalAlpha = ea;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // pulses
      if (act === 2 && pulses.length < maxPulses) {
        const rate = 90 * ((t - ACT1_END) / (ACT2_END - ACT1_END));
        let n = Math.ceil(dt * rate);
        while (n-- > 0) {
          const ei = 3 + ((Math.random() * (edges.length - 3)) | 0);
          const e = edges[ei];
          if (nodeAlpha[e.a] > 0.35 && nodeAlpha[e.b] > 0.2) spawnPulse(ei);
        }
      } else if (act === 3) {
        let n = Math.ceil(dt * 30);
        while (n-- > 0) {
          const ei = 3 + ((Math.random() * (edges.length - 3)) | 0);
          const e = edges[ei];
          const mx = (nodes[e.a].x + nodes[e.b].x) / 2;
          if (Math.abs(mx - wf) < 300 || Math.random() < 0.25) spawnPulse(ei);
        }
      }
      const keep: Pulse[] = [];
      const ps = clamp(30 * scaleNow, 7, 22);
      for (const p of pulses) {
        p.t += p.s * dt * 1.6;
        if (p.t >= 1) {
          const e = edges[p.e];
          const outs = outEdges[e.b];
          if (outs.length && Math.random() < 0.5 && keep.length < maxPulses)
            keep.push({
              e: outs[(Math.random() * outs.length) | 0],
              t: 0,
              s: p.s,
            });
          continue;
        }
        keep.push(p);
        const e = edges[p.e];
        const x = px(lerp(nodes[e.a].x, nodes[e.b].x, p.t));
        const y = py(lerp(nodes[e.a].y, nodes[e.b].y, p.t));
        if (x < -20 || x > cw + 20 || y < -20 || y > ch + 20) continue;
        ctx.globalAlpha = 0.85 * Math.sin(Math.PI * p.t);
        ctx.drawImage(pulseSprite, x - ps / 2, y - ps / 2, ps, ps);
      }
      pulses = keep;

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodeAlpha[i];
        if (a < 0.015) continue;
        const n = nodes[i];
        const x = px(n.x);
        const y = py(n.y);
        let s = n.r * 3 * scaleNow + 2.5;
        if (x < -s || x > cw + s || y < -s || y > ch + s) continue;
        let sprite = blueSprite;
        if (i === hero) {
          sprite = goldSprite;
          s *= 1.25 + 0.12 * Math.sin(t * 3.2);
          if (t < ACT1_END) {
            const g = Math.exp(-Math.pow((t - 0.95) / 0.15, 2));
            s *= 1 + 0.8 * g;
          }
        }
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }

      // Act 1 diagram overlay: labels, ReLU flash, travelling values
      const labelA = t < ACT1_END ? 1 : clamp(1 - (t - ACT1_END) / 0.6, 0, 1);
      if (labelA > 0) {
        ctx.globalCompositeOperation = "source-over";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const hx = px(nodes[hero].x);
        const hy = py(nodes[hero].y);

        const inputTravel = (
          from: NNode,
          label: string,
          delay: number,
        ) => {
          const p = clamp((t - delay) / 0.6, 0, 1);
          const ep = easeInOutCubic(p);
          if (p > 0 && p < 1) {
            const x = px(lerp(from.x, nodes[hero].x, ep));
            const y = py(lerp(from.y, nodes[hero].y, ep));
            const s = 26 * scaleNow;
            ctx.globalAlpha = labelA;
            ctx.globalCompositeOperation = "lighter";
            ctx.drawImage(pulseSprite, x - s / 2, y - s / 2, s, s);
            ctx.globalCompositeOperation = "source-over";
          }
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${Math.round(16 * Math.min(scaleNow, 1.9))}px ${bodyFont}`;
          ctx.fillText(label, px(from.x) - 34 * scaleNow, py(from.y));
        };
        inputTravel(nodes[in1], "2", 0.15);
        inputTravel(nodes[in2], "−1", 0.15);

        ctx.globalAlpha = labelA * 0.9;
        ctx.fillStyle = "rgba(160,190,255,1)";
        ctx.font = `600 ${Math.round(13 * Math.min(scaleNow, 1.9))}px ${bodyFont}`;
        ctx.fillText(
          "× 3",
          px((nodes[in1].x + nodes[hero].x) / 2) - 10,
          py((nodes[in1].y + nodes[hero].y) / 2) - 14,
        );
        ctx.fillText(
          "× 4",
          px((nodes[in2].x + nodes[hero].x) / 2) - 10,
          py((nodes[in2].y + nodes[hero].y) / 2) + 16,
        );

        const rp = clamp((t - 1.0) / 0.35, 0, 1);
        if (rp > 0 && rp < 1) {
          ctx.globalAlpha = labelA * (1 - rp);
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(hx, hy, 16 * scaleNow + rp * 46, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (t > 1.0) {
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#34d399";
          ctx.font = `600 ${Math.round(12 * Math.min(scaleNow, 1.9))}px ${bodyFont}`;
          ctx.fillText("ReLU ✓", hx, hy - 34 * scaleNow);
        }

        const op = clamp((t - 1.15) / 0.45, 0, 1);
        if (op > 0) {
          const eo = easeInOutCubic(op);
          const x = px(lerp(nodes[hero].x, nodes[out].x, eo));
          const y = py(lerp(nodes[hero].y, nodes[out].y, eo));
          if (op < 1) {
            const s = 30 * scaleNow;
            ctx.globalAlpha = labelA;
            ctx.globalCompositeOperation = "lighter";
            ctx.drawImage(pulseSprite, x - s / 2, y - s / 2, s, s);
            ctx.globalCompositeOperation = "source-over";
          }
          ctx.globalAlpha = labelA;
          ctx.fillStyle = "#ffd166";
          ctx.font = `700 ${Math.round(17 * Math.min(scaleNow, 1.9))}px ${bodyFont}`;
          ctx.fillText("2", x, y - 22 * scaleNow);
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // caption + phase state (guarded so React renders stay rare)
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
      canvas.removeEventListener("pointermove", onMove);
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
    <div
      ref={wrapRef}
      className="relative -mx-7 -mb-8 mt-8 h-[420px] sm:-mx-10 sm:-mb-10 sm:h-[480px]"
    >
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5">
          <div
            className="animate-fade-rise pointer-events-auto max-w-md rounded-[1.5rem] px-7 py-7 text-center sm:px-9"
            style={{
              background: "rgba(5, 8, 28, 0.72)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffd166",
              }}
            >
              You ran 1 neuron · 2 multiplications
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              ~<BigCount target={OPS_PER_WORD} animate={!reduced} />
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              multiply-and-adds is what ChatGPT runs for{" "}
              <b style={{ color: "#ffffff" }}>every single word</b> it writes —
              all of them exactly the math you just did.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 no-underline transition-transform hover:-translate-y-px"
                style={{
                  background: "#ffffff",
                  color: "#1335b8",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                The real one has 30 more. Register free before 15 Aug →
              </a>
              {!reduced && (
                <button
                  type="button"
                  onClick={replay}
                  className="cursor-pointer rounded-full px-5 py-3 transition-colors"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Run it again ↻
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
