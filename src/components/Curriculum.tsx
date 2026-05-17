type Module = {
  number: string;
  domain: string;
  title: string;
  summary: string;
  techniques: string[];
  depths: number[];
};

const stages = [
  { grade: "Class 5", stage: "Discover", ages: "ages 10–11" },
  { grade: "Class 6", stage: "Explore", ages: "ages 11–12" },
  { grade: "Class 7", stage: "Build", ages: "ages 12–13" },
  { grade: "Class 8", stage: "Engineer", ages: "ages 13–14" },
  { grade: "Class 9", stage: "Apply", ages: "ages 14–15" },
  { grade: "Class 10", stage: "Frontier", ages: "ages 15–16" },
];

const stats = [
  { value: "9", label: "Canon modules" },
  { value: "6", label: "Years of depth" },
  { value: "10–16", label: "Age range" },
  { value: "30+", label: "Shipped projects" },
];

const modules: Module[] = [
  {
    number: "01",
    domain: "Foundations",
    title: "How modern AI actually works",
    summary:
      "Training vs inference, the rules-based → machine learning → deep learning arc, and where the field actually sits in 2026. The mental model every later module builds on.",
    techniques: ["Field literacy", "AI taxonomy", "Mental models"],
    depths: [2, 3, 4, 5, 5, 6],
  },
  {
    number: "02",
    domain: "Prompt Engineering",
    title: "LLMs as a programming language",
    summary:
      "System and user messages, few-shot examples, chain-of-thought reasoning, structured outputs, and evals. Prompts iterated and versioned like code, not guessed at.",
    techniques: ["System prompts", "Few-shot", "Chain-of-thought", "Evals"],
    depths: [2, 4, 5, 5, 6, 6],
  },
  {
    number: "03",
    domain: "Vision AI",
    title: "Models that see",
    summary:
      "From image classification with pre-trained models, to object detection and segmentation, to vision-language models — and CNNs built and trained from scratch.",
    techniques: ["Classification", "CNNs", "VLMs", "Detection"],
    depths: [1, 3, 4, 5, 6, 6],
  },
  {
    number: "04",
    domain: "Voice AI",
    title: "Models that hear and speak",
    summary:
      "Speech-to-text, text-to-speech, multilingual voice models, and the latency budgets that make real-time conversation feel real. Voice agents shipped in their preferred language.",
    techniques: ["STT / TTS", "Voice agents", "Multilingual", "Realtime"],
    depths: [1, 3, 3, 4, 5, 6],
  },
  {
    number: "05",
    domain: "Machine Learning",
    title: "Training their own models",
    summary:
      "Supervised learning — regression, classification, decision trees — with proper train / test / validation across the full scikit-learn workflow. Real datasets, deployed apps.",
    techniques: ["scikit-learn", "Regression", "Trees", "Evaluation"],
    depths: [0, 2, 4, 5, 6, 6],
  },
  {
    number: "06",
    domain: "Deep Learning",
    title: "Neural networks from scratch",
    summary:
      "Perceptrons to multi-layer networks, activation functions, loss surfaces, gradient descent, and backpropagation derived line by line. Implemented in pure NumPy, every step their own.",
    techniques: ["NumPy NN", "Backprop", "Optimizers", "Loss"],
    depths: [0, 0, 2, 6, 6, 6],
  },
  {
    number: "07",
    domain: "Transformers",
    title: "The architecture behind GPT and Claude",
    summary:
      "Sequence models, self-attention with Query / Key / Value, positional encoding, and the transformer architecture from Attention Is All You Need — implemented and trained on data that matters to them.",
    techniques: ["Self-attention", "Q / K / V", "Decoder-only", "Training"],
    depths: [0, 0, 2, 5, 6, 6],
  },
  {
    number: "08",
    domain: "Agents & RAG",
    title: "AI that takes action",
    summary:
      "Function calling, the ReAct pattern, embeddings and vector databases, chunking strategies, and multi-agent orchestration. Systems that research, decide, and act end-to-end.",
    techniques: ["Tool use", "ReAct", "Vector DBs", "Multi-agent"],
    depths: [1, 2, 4, 5, 6, 6],
  },
  {
    number: "09",
    domain: "Generative AI",
    title: "Frontier-grade creation",
    summary:
      "Generative architectures — diffusion, latent diffusion, U-Net, classifier-free guidance — and fine-tuning with LoRA across image, video, and music. Personal models, kept weights.",
    techniques: ["Diffusion", "Latent diffusion", "LoRA", "Fine-tuning"],
    depths: [1, 2, 3, 4, 6, 6],
  },
];

const engineeringStack = [
  "Python",
  "NumPy",
  "Pandas",
  "scikit-learn",
  "PyTorch",
  "Hugging Face",
  "Transformers",
  "LangChain",
  "Vector DBs",
  "Streamlit",
  "FastAPI",
  "Cursor",
  "Replit",
  "Vercel",
];

const outcomes = [
  "Working understanding of the modern AI canon — prompts, vision, voice, machine learning, deep learning, transformers, agents, generative — built in code, not slides.",
  "A portfolio of shipped projects deployed at real URLs, including neural networks built from scratch and frontier-model systems engineered end-to-end.",
  "Fluency in the same Python AI stack used at every Indian AI startup — calibrated to their year, compounded over six.",
];

function DepthBar({ depths }: { depths: number[] }) {
  const maxBar = 28;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-[6px]" style={{ height: maxBar }}>
        {depths.map((d, i) => {
          const height = d === 0 ? 3 : Math.max((d / 6) * maxBar, 6);
          const filled = d > 0;
          return (
            <div
              key={i}
              className="w-[10px] rounded-[2px] transition-all"
              style={{
                height: `${height}px`,
                background: filled
                  ? `rgba(19, 53, 184, ${0.32 + d * 0.11})`
                  : "rgba(15, 15, 15, 0.08)",
              }}
              aria-hidden
            />
          );
        })}
      </div>
      <div className="flex items-center gap-[6px]">
        {stages.map((s) => (
          <span
            key={s.grade}
            className="w-[10px] text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "8px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "rgba(15,15,15,0.42)",
            }}
            aria-hidden
          >
            {s.grade.replace("Class ", "C")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Curriculum() {
  return (
    <section id="curriculum" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Curriculum</p>
        <h2 className="section-heading mb-6">
          One canon. <em>Six years of compounding depth.</em>
        </h2>
        <p className="section-body mb-4">
          Every Wingschool student touches the same modern AI canon — nine
          technical modules covering everything from prompts to transformers
          to diffusion. The breadth is shared. The depth is calibrated to
          their year. The result, after six, is fluency.
        </p>
        <p className="ui-body-sm mb-14" style={{ color: "#1335b8" }}>
          Designed and taught by IIT and IIM grads.
        </p>
      </div>

      <div
        className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-black/8 sm:grid-cols-4"
        style={{ background: "rgba(15,15,15,0.06)" }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 px-5 py-6 sm:px-7 sm:py-7"
            style={{ background: "#ffffff" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.4vw, 2.85rem)",
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: "#1335b8",
                lineHeight: 1,
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6a6a6a",
                marginTop: "0.4rem",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-20">
        <p
          className="mb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          The six stages
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {stages.map((s, i) => (
            <div
              key={s.grade}
              className="flex flex-col gap-2 border-t pt-4"
              style={{ borderColor: "rgba(15,15,15,0.12)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1335b8",
                }}
              >
                {String(i + 1).padStart(2, "0")} · {s.grade}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  color: "#0a0a0a",
                  lineHeight: 1.1,
                }}
              >
                {s.stage}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontWeight: 200,
                  fontSize: "0.95rem",
                  color: "#6a6a6a",
                }}
              >
                {s.ages}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10 flex items-end justify-between gap-4">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          The canon · 9 modules
        </p>
        <p
          className="hidden sm:block"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            color: "#8a8a8a",
            letterSpacing: "0.02em",
          }}
        >
          Bars show depth by grade — Class 5 to Class 10
        </p>
      </div>

      <div className="flex flex-col">
        {modules.map((m, idx) => (
          <article
            key={m.number}
            className={`grid items-start gap-y-6 py-10 md:grid-cols-[120px_1fr_minmax(0,1.1fr)] md:gap-x-12 md:py-12 lg:gap-x-16 ${
              idx === 0 ? "border-t border-black/8" : "border-t border-black/8"
            } ${idx === modules.length - 1 ? "border-b border-black/8" : ""}`}
          >
            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  fontWeight: 300,
                  color: "#1335b8",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                }}
              >
                {m.number}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8a8a8a",
                }}
              >
                {m.domain}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.6vw, 2.05rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#0a0a0a",
                }}
              >
                {m.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "#4a4a4a",
                }}
              >
                {m.summary}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <DepthBar depths={m.depths} />
              <div className="flex flex-wrap gap-1.5">
                {m.techniques.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2.5 py-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#1335b8",
                      borderColor: "rgba(19, 53, 184, 0.22)",
                      background: "rgba(19, 53, 184, 0.05)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-20 overflow-hidden rounded-[1.5rem] border border-black/8"
        style={{ background: "#0a0a0a" }}
      >
        <div className="flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-11">
          <div className="lg:max-w-[200px] lg:shrink-0">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              The stack
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                lineHeight: 1.15,
              }}
            >
              The tools they actually use.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {engineeringStack.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="animate-fade-rise relative mt-10 overflow-hidden rounded-[2rem] border border-black/8 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        style={{
          background:
            "radial-gradient(circle at 88% 12%, rgba(19,53,184,0.16), transparent 42%), radial-gradient(circle at 8% 88%, rgba(19,53,184,0.08), transparent 38%), linear-gradient(180deg, #ffffff 0%, #faf9f4 100%)",
          boxShadow: "0 30px 60px -40px rgba(19,53,184,0.22)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="ui-label" style={{ color: "#1335b8" }}>
              What every student leaves with
            </p>
            <h3
              className="mt-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.85rem, 3.6vw, 2.65rem)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: "#0a0a0a",
              }}
            >
              Real fluency in the modern AI stack — built, not memorized.
            </h3>
            <p
              className="mt-4 max-w-md"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#5a5a5a",
              }}
            >
              Each grade is its own complete six-month program — no prior year
              required. Stay six years, and the depth compounds.
            </p>
            <a href="#book" className="ui-button mt-8">
              Book a 20-min Demo →
            </a>
          </div>

          <ul className="flex flex-col gap-4">
            {outcomes.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.98rem",
                  lineHeight: 1.55,
                  color: "#0a0a0a",
                }}
              >
                <span
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(19,53,184,0.10)",
                    border: "1px solid rgba(19,53,184,0.22)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4 4L19 6"
                      stroke="#1335b8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
