import { useState } from "react";

type Month = {
  number: string;
  theme: string;
  project: string;
  skills: string[];
};

type ClassTrack = {
  grade: string;
  stage: string;
  tagline: string;
  description: string;
  months: Month[];
};

const tracks: ClassTrack[] = [
  {
    grade: "Class 5",
    stage: "Discover",
    tagline: "Play, not theory.",
    description:
      "First contact with AI through voice, image, and conversation. The goal isn't code — it's confidence and curiosity.",
    months: [
      {
        number: "01",
        theme: "First friend in the machine",
        project: "A personal AI buddy that knows their interests and answers in their voice.",
        skills: ["Conversational AI", "Prompts", "Voice"],
      },
      {
        number: "02",
        theme: "Stories the machine draws",
        project: "An illustrated picture-book — text by your child, art by AI.",
        skills: ["Image generation", "Storytelling"],
      },
      {
        number: "03",
        theme: "Speaking back to the screen",
        project: "A Hindi ↔ English voice translator they can use with grandparents.",
        skills: ["Speech recognition", "Multilingual AI"],
      },
      {
        number: "04",
        theme: "Helper for the younger sibling",
        project: "A homework buddy that explains Class 3–4 questions patiently.",
        skills: ["Workflows", "Conversational design"],
      },
      {
        number: "05",
        theme: "Eyes for the machine",
        project: "A 'guess the animal' photo identifier built from a pre-trained model.",
        skills: ["Image classification", "Pre-trained models"],
      },
      {
        number: "06",
        theme: "First public showing",
        project: "Polish one project. Present it on stage at Flagship Expo Day.",
        skills: ["Polish", "Stage presence"],
      },
    ],
  },
  {
    grade: "Class 6",
    stage: "Explore",
    tagline: "Curiosity first.",
    description:
      "Students learn what AI is, where it shows up, and how to ask better questions before they rush toward answers.",
    months: [
      {
        number: "01",
        theme: "Prompting as a craft",
        project: "A recipe generator that adapts to whatever's in your fridge.",
        skills: ["Prompt design", "Iteration"],
      },
      {
        number: "02",
        theme: "Three AIs walk into a room",
        project: "A 'compare models' tool — same question, ChatGPT vs Claude vs Gemini.",
        skills: ["Model evaluation", "Critical thinking"],
      },
      {
        number: "03",
        theme: "AI for the textbook",
        project: "An NCERT chapter summariser with auto-generated flashcards.",
        skills: ["Summarisation", "Study tools"],
      },
      {
        number: "04",
        theme: "Eyes through the camera",
        project: "A homework-page reader that takes a photo and explains the question.",
        skills: ["OCR", "Vision models"],
      },
      {
        number: "05",
        theme: "Chains, not single shots",
        project: "A story-writing assistant that drafts, critiques, and revises itself.",
        skills: ["Multi-step prompting", "Self-critique"],
      },
      {
        number: "06",
        theme: "Refine + Demo",
        project: "Polish one project. Pitch it at Flagship Expo Day.",
        skills: ["Refinement", "Public demo"],
      },
    ],
  },
  {
    grade: "Class 7",
    stage: "Build",
    tagline: "First real things.",
    description:
      "Tools come out. Hardware ships home. Students stop using AI and start making with it — apps, gadgets, prototypes that work.",
    months: [
      {
        number: "01",
        theme: "First working web app",
        project: "A live, shareable AI app built with no-code tools (Lovable / Bolt).",
        skills: ["No-code AI", "Deployment"],
      },
      {
        number: "02",
        theme: "Out of the screen",
        project: "A smart light controller using Arduino, sensors, and a breadboard.",
        skills: ["Hardware", "Microcontrollers"],
      },
      {
        number: "03",
        theme: "Voice meets hardware",
        project: "A voice-controlled fan or LED rig — say it, the room responds.",
        skills: ["Speech recognition", "IoT"],
      },
      {
        number: "04",
        theme: "AI for your block",
        project: "Something useful for the school or society — your child picks the problem.",
        skills: ["Problem framing", "MVP shipping"],
      },
      {
        number: "05",
        theme: "First API call",
        project: "A daily news brief from RSS feeds, summarised by AI, sent on WhatsApp.",
        skills: ["APIs", "Automation"],
      },
      {
        number: "06",
        theme: "Capstone + Expo",
        project: "One build, polished and pitched at Flagship Expo Day.",
        skills: ["Refinement", "Live demo"],
      },
    ],
  },
  {
    grade: "Class 8",
    stage: "Engineer",
    tagline: "Systems thinking.",
    description:
      "Students stop treating AI as a black box. They learn the levers — prompts, retrieval, agents, vision — and how to compose them into real systems.",
    months: [
      {
        number: "01",
        theme: "Prompts as code",
        project: "A customer-support bot for a fictional product, with system prompts and guardrails.",
        skills: ["System prompts", "Tokens", "Temperature"],
      },
      {
        number: "02",
        theme: "AI that knows your stuff",
        project: "A chatbot trained on your child's own school notes (RAG from scratch).",
        skills: ["Retrieval", "Embeddings", "Vector search"],
      },
      {
        number: "03",
        theme: "Things that move",
        project: "An obstacle-avoiding rover — sensors in, motor commands out.",
        skills: ["Robotics", "Sensors", "Decisioning"],
      },
      {
        number: "04",
        theme: "Agents working together",
        project: "A research-and-write pipeline: one agent searches, one drafts, one edits.",
        skills: ["Agents", "Tool use", "Orchestration"],
      },
      {
        number: "05",
        theme: "Eyes that recognise",
        project: "A doorbell that knows family from strangers using face detection.",
        skills: ["Computer vision", "Face recognition"],
      },
      {
        number: "06",
        theme: "Capstone + Expo",
        project: "One engineered system, end to end, presented to a guest panel.",
        skills: ["Architecture", "Pitch"],
      },
    ],
  },
  {
    grade: "Class 9",
    stage: "Innovate",
    tagline: "Product thinking.",
    description:
      "Students stop building because the syllabus said so. They scope real problems, ship MVPs, find users, and learn what 'good' looks like in market.",
    months: [
      {
        number: "01",
        theme: "Finding the right problem",
        project: "User interviews, scoping, a written problem brief — like a real founder.",
        skills: ["Interviews", "Scoping", "Prioritisation"],
      },
      {
        number: "02",
        theme: "First product MVP",
        project: "Build the smallest version that proves the idea is worth building.",
        skills: ["MVP", "Feedback loops"],
      },
      {
        number: "03",
        theme: "Train your own model",
        project: "Fine-tune a small model on your child's chosen domain — poetry, cricket stats, regional cuisine, anything.",
        skills: ["Fine-tuning", "Datasets", "Evaluation"],
      },
      {
        number: "04",
        theme: "Embodied AI",
        project: "A self-driving toy car or smart-bin sorter — vision + robotics + decisions.",
        skills: ["Vision + robotics", "Real-time decisioning"],
      },
      {
        number: "05",
        theme: "First 10 real users",
        project: "Get the product into actual hands. Watch it break. Fix it.",
        skills: ["Distribution", "Analytics", "Iteration"],
      },
      {
        number: "06",
        theme: "Final MVP + Expo pitch",
        project: "A polished product with a real user story to tell on stage.",
        skills: ["Pitching", "Storytelling"],
      },
    ],
  },
  {
    grade: "Class 10",
    stage: "Launch",
    tagline: "Public stakes.",
    description:
      "A thesis project, built in public, shipped with engineering rigor and a launch post. Walks out with a portfolio recruiters and admissions can see.",
    months: [
      {
        number: "01",
        theme: "Thesis project",
        project: "Pick what your child wants to be known for by year-end. Scope with a senior mentor.",
        skills: ["Vision", "Senior mentorship"],
      },
      {
        number: "02",
        theme: "Engineering rigor",
        project: "Train, fine-tune, evaluate — with benchmarks, not vibes.",
        skills: ["Evaluation", "Benchmarks", "Reproducibility"],
      },
      {
        number: "03",
        theme: "Build in public",
        project: "An open repo, weekly devlog updates, a real audience watching.",
        skills: ["Public building", "Documentation"],
      },
      {
        number: "04",
        theme: "Real users, real research",
        project: "50 users. Real interviews. Real iteration based on what you hear.",
        skills: ["User research", "Iteration"],
      },
      {
        number: "05",
        theme: "Launch + write-up",
        project: "A public launch post and a polished portfolio page on a custom domain.",
        skills: ["Writing", "Launch", "Polish"],
      },
      {
        number: "06",
        theme: "Expo + portfolio handover",
        project: "Final pitch on stage. Portfolio handover ready for college applications.",
        skills: ["Pitching", "Portfolio"],
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
          A different 6-month build for <em>every class.</em>
        </h2>
        <p className="section-body mb-4">
          Each grade gets its own progression — six months, six themes, six
          projects your child will actually ship. Pick a class to see what the
          year looks like.
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
            {active.grade} · 6-month track
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
              Want the full {active.grade} curriculum, walked through 1-on-1 by
              a mentor? Book a 20-minute demo.
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
          {active.months.map((m, i) => (
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
                <p className="ui-body-sm mt-2.5">{m.project}</p>
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
