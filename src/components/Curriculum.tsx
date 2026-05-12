import { useState } from "react";

type Module = {
  number: string;
  theme: string;
  learn: string;
  skills: string[];
};

type ClassTrack = {
  grade: string;
  stage: string;
  tagline: string;
  description: string;
  modules: Module[];
};

const tracks: ClassTrack[] = [
  {
    grade: "Class 5",
    stage: "Discover",
    tagline: "Foundations of AI literacy.",
    description:
      "First conceptual contact with AI. The goal is comfort, vocabulary, and confidence — not code.",
    modules: [
      {
        number: "01",
        theme: "What AI actually is",
        learn:
          "The difference between programmed software and AI. How everyday tools (YouTube recommendations, Alexa, autocorrect) use AI. Safe-use rules and digital citizenship.",
        skills: ["AI literacy", "Digital citizenship"],
      },
      {
        number: "02",
        theme: "Talking to AI well",
        learn:
          "What a prompt is and why phrasing changes the answer. Asking follow-up questions. Recognising when AI is wrong or making things up.",
        skills: ["Prompting basics", "Critical thinking"],
      },
      {
        number: "03",
        theme: "AI that creates",
        learn:
          "Generative AI for text, image, and sound. How a model 'imagines' something from a description. Difference between human and machine creativity. Age-appropriate ethics of AI-made work.",
        skills: ["Generative AI", "Ethics"],
      },
      {
        number: "04",
        theme: "AI that listens and speaks",
        learn:
          "Speech-to-text and text-to-speech at a concept level. How multilingual models handle Hindi and regional languages. Voice AI as an accessibility tool.",
        skills: ["Voice AI", "Multilingual AI"],
      },
      {
        number: "05",
        theme: "AI that sees",
        learn:
          "How a model recognises a picture as a cat. Pre-trained models in plain language. Introduction to bias in image datasets. Responsible photo use.",
        skills: ["Computer vision basics", "Bias awareness"],
      },
      {
        number: "06",
        theme: "Reflection and showcase",
        learn:
          "Choosing what to present. Structuring a three-minute talk. Stage basics, audience questions, year-end reflection.",
        skills: ["Presentation", "Communication"],
      },
    ],
  },
  {
    grade: "Class 6",
    stage: "Explore",
    tagline: "How modern AI actually works.",
    description:
      "Students learn the moving parts of today's AI — how it learns, where it lives, and how to use it well — before jumping into building.",
    modules: [
      {
        number: "01",
        theme: "How AI learns",
        learn:
          "Training vs inference at a beginner level. What data means and why more (and better) data matters. Supervised learning explained intuitively.",
        skills: ["ML intuition", "Data thinking"],
      },
      {
        number: "02",
        theme: "The prompt as a program",
        learn:
          "System vs user messages. Few-shot prompting. Constraints, formatting, and step-by-step reasoning. Evaluating outputs against intent.",
        skills: ["Prompt engineering", "Output evaluation"],
      },
      {
        number: "03",
        theme: "A tour of today's AI",
        learn:
          "ChatGPT, Claude, Gemini, Midjourney, ElevenLabs — what each is built for. General vs specialised models. Picking the right tool for the job.",
        skills: ["Model literacy", "Tool selection"],
      },
      {
        number: "04",
        theme: "AI for learning",
        learn:
          "Using AI for studying without outsourcing thinking. Summarisation, flashcards, Socratic explanation. Catching hallucinations in school content.",
        skills: ["Study workflows", "Hallucination awareness"],
      },
      {
        number: "05",
        theme: "Multi-step thinking",
        learn:
          "Breaking a problem into steps. Chaining prompts. Self-critique loops. Introduction to 'thinking' modes in modern models.",
        skills: ["Decomposition", "Workflow design"],
      },
      {
        number: "06",
        theme: "Showcase",
        learn:
          "Picking a topic, scripting a short talk, designing a single visual aid, rehearsing, and presenting at Flagship Expo Day.",
        skills: ["Storytelling", "Public speaking"],
      },
    ],
  },
  {
    grade: "Class 7",
    stage: "Build",
    tagline: "From user to maker.",
    description:
      "Students cross from using AI to making with it. Hardware enters the room. Concepts of software, circuits, and APIs are introduced.",
    modules: [
      {
        number: "01",
        theme: "The maker mindset",
        learn:
          "Moving from 'AI helps me' to 'I build with AI'. The shape of a software product. Introduction to no-code AI builders and what deployment means.",
        skills: ["No-code AI", "Product mindset"],
      },
      {
        number: "02",
        theme: "Hardware fundamentals",
        learn:
          "Microcontrollers (Arduino), sensors, actuators, basic circuits. How software controls physical objects. Reading a wiring diagram.",
        skills: ["Hardware", "Microcontrollers"],
      },
      {
        number: "03",
        theme: "Software meets hardware",
        learn:
          "Reading sensor data. Event loops at a beginner level. Combining AI inference (voice, vision) with physical actuation. Introduction to IoT.",
        skills: ["IoT basics", "Event-driven design"],
      },
      {
        number: "04",
        theme: "Problem framing",
        learn:
          "Identifying real problems in your child's environment. Scoring by impact and feasibility. Defining solution boundaries. Writing a one-paragraph project brief.",
        skills: ["Problem framing", "Scoping"],
      },
      {
        number: "05",
        theme: "APIs and automation",
        learn:
          "What an API is. How AI services are accessed programmatically. Webhooks, scheduled jobs, and automation tools at a beginner level.",
        skills: ["APIs", "Automation"],
      },
      {
        number: "06",
        theme: "Showcase",
        learn:
          "Polishing a single build. Writing a one-page summary. Demoing live and answering panel questions.",
        skills: ["Live demo", "Q&A"],
      },
    ],
  },
  {
    grade: "Class 8",
    stage: "Engineer",
    tagline: "Inside the systems.",
    description:
      "Students stop treating AI as a black box. They learn the levers — prompts, retrieval, agents, vision — and how to compose them into real systems.",
    modules: [
      {
        number: "01",
        theme: "Inside an LLM",
        learn:
          "Tokens, context windows, temperature, top-p, stop sequences. System prompts. Cost and latency trade-offs. Reading API documentation.",
        skills: ["LLM internals", "API literacy"],
      },
      {
        number: "02",
        theme: "Retrieval-augmented generation",
        learn:
          "Why models forget. Embeddings as a concept. Vector databases at a beginner level. Chunking, retrieval, and generation. When RAG is the right tool.",
        skills: ["RAG", "Embeddings"],
      },
      {
        number: "03",
        theme: "Robotics and decisioning",
        learn:
          "From sensor reading to decision to motor command. State machines. Control logic. Real-time vs batch processing.",
        skills: ["Robotics", "State machines"],
      },
      {
        number: "04",
        theme: "Agents and tool use",
        learn:
          "What an agent is vs a chatbot. Function calling. Planning, looping, and multi-agent collaboration. The limits of today's agents.",
        skills: ["Agents", "Tool use"],
      },
      {
        number: "05",
        theme: "Computer vision",
        learn:
          "How vision models work conceptually. Classification vs detection vs segmentation. Working with pre-trained vision models. Privacy considerations.",
        skills: ["Computer vision", "Privacy ethics"],
      },
      {
        number: "06",
        theme: "Systems showcase",
        learn:
          "Whiteboarding the system architecture. Walking through trade-offs. Presenting the build to a guest panel.",
        skills: ["Architecture", "Technical communication"],
      },
    ],
  },
  {
    grade: "Class 9",
    stage: "Innovate",
    tagline: "Product and research thinking.",
    description:
      "Students stop building because the syllabus said so. They learn to scope real problems, ship MVPs, find users, and judge their own work like a real founder.",
    modules: [
      {
        number: "01",
        theme: "Problem discovery",
        learn:
          "User interviewing techniques. Identifying genuine pain. Telling nice-to-have from must-have. Writing problem statements that survive scrutiny.",
        skills: ["User research", "Problem statements"],
      },
      {
        number: "02",
        theme: "MVPs and feedback loops",
        learn:
          "Defining minimum viability. Build-measure-learn cycles. Designing the smallest meaningful test. Reading qualitative feedback honestly.",
        skills: ["MVP", "Feedback loops"],
      },
      {
        number: "03",
        theme: "Training and fine-tuning",
        learn:
          "When fine-tuning beats prompting. Datasets, labelling, train/val/test splits. Fine-tuning small open models. Evaluation as engineering, not opinion.",
        skills: ["Fine-tuning", "Evaluation"],
      },
      {
        number: "04",
        theme: "Embodied AI",
        learn:
          "Combining vision, motion, and decisioning in one system. Latency, safety, and failure modes. Edge inference vs cloud inference.",
        skills: ["Embodied systems", "Edge inference"],
      },
      {
        number: "05",
        theme: "Distribution and analytics",
        learn:
          "Getting first users with no budget. Setting up basic analytics. Reading dashboards. Iterating on signal rather than opinion.",
        skills: ["Distribution", "Analytics"],
      },
      {
        number: "06",
        theme: "Pitch day",
        learn:
          "Crafting a five-minute pitch. Leading with the user story, not the feature list. Handling tough questions. Visualising data simply.",
        skills: ["Pitching", "Storytelling"],
      },
    ],
  },
  {
    grade: "Class 10",
    stage: "Launch",
    tagline: "Rigor, public stakes, portfolio.",
    description:
      "A year-long thesis project, built in public, shipped with engineering rigor and a launch post. Walks out with a portfolio that recruiters and admissions can see.",
    modules: [
      {
        number: "01",
        theme: "Thesis and scope",
        learn:
          "Picking a year-long thesis. Defining success criteria. Risk assessment. Working with a senior mentor to scope realistically.",
        skills: ["Vision", "Scoping"],
      },
      {
        number: "02",
        theme: "Engineering rigor",
        learn:
          "Version control fundamentals. Evaluation harnesses. A/B comparisons. Reproducibility. Benchmarks vs vibes-based evaluation.",
        skills: ["Evaluation", "Reproducibility"],
      },
      {
        number: "03",
        theme: "Building in public",
        learn:
          "Writing devlogs that compound. GitHub etiquette. Documentation and README writing. Building an audience from zero.",
        skills: ["Public building", "Documentation"],
      },
      {
        number: "04",
        theme: "User research at scale",
        learn:
          "Running structured interviews with fifty-plus users. Synthesising patterns. Avoiding confirmation bias. Iterating without churn.",
        skills: ["User research", "Synthesis"],
      },
      {
        number: "05",
        theme: "Launch craft",
        learn:
          "Writing a launch post that lands. Story structure. Choosing channels. Anticipating questions. Handling launch-day momentum.",
        skills: ["Writing", "Launch craft"],
      },
      {
        number: "06",
        theme: "Portfolio and pitch",
        learn:
          "Building a portfolio site on a custom domain. Selecting which projects to feature. Crafting a self-introduction. Final pitch on stage.",
        skills: ["Portfolio", "Self-introduction"],
      },
    ],
  },
];

export function Curriculum() {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = tracks[activeIndex];

  return (
    <section id="curriculum" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Curriculum</p>
        <h2 className="section-heading mb-6">
          A different 6-month syllabus for <em>every class.</em>
        </h2>
        <p className="section-body mb-4">
          Each grade gets its own progression of concepts, methods, and skills —
          built around how students at that age actually learn. Pick a class to
          see the full year.
        </p>
        <p className="ui-body-sm mb-14" style={{ color: "#1335b8" }}>
          Designed and taught by IIT and IIM grads.
        </p>
      </div>

      <div
        className="-mx-6 mb-12 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0"
        role="tablist"
        aria-label="Curriculum by class"
      >
        {tracks.map((track, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={track.grade}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(i)}
              className="shrink-0 rounded-full border px-5 py-2.5 transition-all duration-200"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                background: isActive ? "#1335b8" : "transparent",
                color: isActive ? "#ffffff" : "#0a0a0a",
                borderColor: isActive ? "#1335b8" : "rgba(15,15,15,0.18)",
                boxShadow: isActive
                  ? "0 8px 18px rgba(19, 53, 184, 0.22)"
                  : "none",
              }}
            >
              {track.grade}
            </button>
          );
        })}
      </div>

      <div className="grid gap-12 lg:grid-cols-[0.9fr_2.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#1335b8",
              border: "1px solid rgba(19, 53, 184, 0.22)",
              background: "rgba(19, 53, 184, 0.08)",
            }}
          >
            {active.grade} · 6-month syllabus
          </span>
          <h3
            className="mt-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 4.5vw, 3.6rem)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              color: "#0a0a0a",
            }}
          >
            {active.stage}
          </h3>
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-accent)",
              fontStyle: "italic",
              fontWeight: 200,
              fontSize: "1.5rem",
              color: "#1335b8",
              lineHeight: 1.2,
            }}
          >
            {active.tagline}
          </p>
          <p className="ui-body mt-6 max-w-md">{active.description}</p>

          <div
            className="mt-8 rounded-[1.5rem] p-6"
            style={{
              background: "rgba(19, 53, 184, 0.04)",
              border: "1px solid rgba(19, 53, 184, 0.14)",
            }}
          >
            <p className="ui-label mb-2" style={{ color: "#1335b8" }}>
              See it for your child
            </p>
            <p className="ui-body-sm mb-5">
              Want the full {active.grade} syllabus, walked through 1-on-1 by a
              mentor? Book a 20-minute demo.
            </p>
            <a href="#book" className="ui-button">
              Book Free Demo →
            </a>
          </div>
        </div>

        <div
          className="grid gap-5 md:grid-cols-2"
          key={active.grade}
          role="tabpanel"
        >
          {active.modules.map((m, i) => (
            <article
              key={m.number}
              className="ui-card animate-fade-rise relative flex flex-col gap-4 overflow-hidden rounded-[1.5rem] p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#1335b8",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {m.number}
                </span>
                <span
                  className="ui-label"
                  style={{ color: "rgba(15,15,15,0.4)" }}
                >
                  Month
                </span>
              </div>

              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "#0a0a0a",
                  }}
                >
                  {m.theme}
                </h4>
                <p className="ui-body-sm mt-2.5">{m.learn}</p>
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/8 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#5a5a5a",
                      background: "rgba(19,53,184,0.04)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
