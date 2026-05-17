type Module = {
  number: string;
  title: string;
  summary: string;
  ships: string;
  techniques: string[];
};

const stats = [
  { value: "6", label: "Months" },
  { value: "6", label: "Projects shipped" },
  { value: "1", label: "Capstone defended" },
  { value: "10–16", label: "Ages welcomed" },
];

const modules: Module[] = [
  {
    number: "01",
    title: "How modern AI actually works",
    summary:
      "Training vs inference, the rules-based → machine learning → deep learning arc, and where the field actually sits in 2026. Vocabulary, mental models, and safe-use habits — built hands-on with the same frontier tools real engineers ship with.",
    ships: "A first working AI workflow, prompted and customized end-to-end.",
    techniques: ["Field literacy", "Foundation models", "Mental models"],
  },
  {
    number: "02",
    title: "Prompts as a programming language",
    summary:
      "System and user messages, few-shot examples, chain-of-thought reasoning, structured outputs, and evals. Prompts iterated and versioned like code, then used on real schoolwork and personal problems.",
    ships: "A multi-step AI assistant — iterated, evaluated, used daily.",
    techniques: ["System prompts", "Few-shot", "Chain-of-thought", "Evals"],
  },
  {
    number: "03",
    title: "AI that sees — vision and multimodal",
    summary:
      "How images become numbers, classification with pre-trained models, object detection, and vision-language models. At higher grades, CNNs and vision systems built and trained from scratch.",
    ships: "A working vision system on a real-world problem they chose.",
    techniques: ["Classification", "VLMs", "CNNs", "Detection"],
  },
  {
    number: "04",
    title: "AI that hears and speaks — voice",
    summary:
      "Speech-to-text, text-to-speech, multilingual voice models, and the latency budgets that make real-time conversation feel real. A voice agent designed, shipped, and tested in their preferred language.",
    ships: "A real-time multilingual voice agent that holds a conversation.",
    techniques: ["STT / TTS", "Voice agents", "Multilingual", "Realtime"],
  },
  {
    number: "05",
    title: "AI that acts — agents, ML, and deep learning",
    summary:
      "Function calling, the ReAct pattern, embeddings, vector databases, and multi-agent orchestration. Paired with real machine learning — supervised learning at younger grades, neural networks and transformers from scratch at older ones.",
    ships: "A trained model and an autonomous agent — both deployed live.",
    techniques: ["Tool use", "ReAct", "Vector DBs", "scikit-learn", "NumPy NN"],
  },
  {
    number: "06",
    title: "Capstone + Flagship Expo",
    summary:
      "One ambitious project that synthesizes the program, system design defending architecture choices, technical writing, and pitching to a panel of senior mentors. Shipped at a public URL. Defended on stage in front of parents, mentors, and a guest founder.",
    ships: "A defended capstone live at a public URL, presented on stage.",
    techniques: ["System design", "Demo", "Defense", "Polish"],
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

const stages = [
  { grade: "Class 5", stage: "Discover", ages: "ages 10–11" },
  { grade: "Class 6", stage: "Explore", ages: "ages 11–12" },
  { grade: "Class 7", stage: "Build", ages: "ages 12–13" },
  { grade: "Class 8", stage: "Engineer", ages: "ages 13–14" },
  { grade: "Class 9", stage: "Apply", ages: "ages 14–15" },
  { grade: "Class 10", stage: "Frontier", ages: "ages 15–16" },
];

const outcomes = [
  "Working understanding of the modern AI canon — prompts, vision, voice, agents, machine learning, and (at higher grades) neural networks and transformers, built in code.",
  "Six shipped projects plus one defended capstone live at a real URL — engineered end-to-end, not slides.",
  "Real fluency in the modern Python AI stack — the same one used at every Indian AI startup, calibrated to their age.",
];

export function Curriculum() {
  return (
    <section id="curriculum" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Curriculum</p>
        <h2 className="section-heading mb-6">
          A complete six-month AI program. <em>Basics to advanced.</em>
        </h2>
        <p className="section-body mb-4">
          Six monthly modules. Six shipped projects. One capstone defended
          at Flagship Expo Day. A complete, self-contained program — your
          child can join at any grade, with no prior year required, and
          leave fluent in modern AI.
        </p>
        <p className="ui-body-sm mb-14" style={{ color: "#1335b8" }}>
          Designed and taught by IIT and IIM grads.
        </p>
      </div>

      <div
        className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-black/8 sm:grid-cols-4"
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
          The program · month by month
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
          One module a month · six months end-to-end
        </p>
      </div>

      <div className="flex flex-col">
        {modules.map((m, idx) => (
          <article
            key={m.number}
            className={`grid items-start gap-y-6 py-10 md:grid-cols-[140px_1fr_minmax(0,1.1fr)] md:gap-x-12 md:py-12 lg:gap-x-16 ${
              idx === 0 ? "border-t border-black/8" : "border-t border-black/8"
            } ${idx === modules.length - 1 ? "border-b border-black/8" : ""}`}
          >
            <div className="flex flex-col gap-2">
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
                Month
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 5.4vw, 4.25rem)",
                  fontWeight: 300,
                  color: "#1335b8",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                }}
              >
                {m.number}
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

            <div className="flex flex-col gap-5">
              <div
                className="rounded-[1rem] border px-4 py-4"
                style={{
                  borderColor: "rgba(19, 53, 184, 0.18)",
                  background: "rgba(19, 53, 184, 0.04)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#1335b8",
                  }}
                >
                  Ships this month
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "#0a0a0a",
                    lineHeight: 1.4,
                  }}
                >
                  {m.ships}
                </p>
              </div>
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
              After six months
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
              A child who builds with AI — fluent in the modern stack, not memorizing it.
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
              A complete program in itself. Most students stay longer — but
              even one six-month program leaves them fluent.
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

      <div className="mt-12">
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          Calibrated to your child's grade
        </p>
        <p
          className="mb-6 max-w-2xl"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#5a5a5a",
          }}
        >
          Same six-month shape across Class 5 to Class 10 — the depth of each
          module is tuned to your child's age. A Class 5 program is real and
          complete on its own; a Class 10 program is frontier engineering.
        </p>
        <div className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <span
              key={s.grade}
              className="inline-flex items-baseline gap-2 rounded-full border px-3.5 py-1.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#0a0a0a",
                borderColor: "rgba(15,15,15,0.14)",
                background: "#ffffff",
              }}
            >
              <span style={{ color: "#1335b8" }}>{s.grade}</span>
              <span style={{ color: "rgba(15,15,15,0.55)" }}>·</span>
              <span>{s.stage}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
