import { useState } from "react";

type Module = {
  number: string;
  theme: string;
  learn: string;
  build: string;
  skills: string[];
};

type Outcome = {
  headline: string;
  deliverables: string[];
};

type ClassTrack = {
  grade: string;
  stage: string;
  tagline: string;
  description: string;
  modules: Module[];
  outcome: Outcome;
};

const tracks: ClassTrack[] = [
  {
    grade: "Class 5",
    stage: "Discover",
    tagline: "Complete AI program for ages 10–11.",
    description:
      "A self-contained first AI program — six months that take a child from 'what is AI?' to confidently prompting, creating images, building chatbots, and using their own AI helper. No prior knowledge needed.",
    modules: [
      {
        number: "01",
        theme: "What AI actually is",
        learn:
          "What AI actually is, and how it shows up everywhere — from autocorrect and YouTube recommendations to ChatGPT. The three things AI does: predict, create, and act. The handful of words your child needs to talk about AI confidently.",
        build:
          "A 'show me the AI in my day' presentation — they document AI in YouTube, Alexa, Google Maps, autocorrect, and photo cleanup, with screenshots and explanations.",
        skills: ["AI literacy", "Vocabulary"],
      },
      {
        number: "02",
        theme: "Talking to AI well",
        learn:
          "How asking AI questions well makes it dramatically more useful. Why two slightly different questions get wildly different answers. How to spot when AI is making things up. How to design an AI character with its own personality.",
        build:
          "A custom historical-figure chatbot — Akbar, Kalpana Chawla, or Tagore — crafted with carefully written instructions that make them feel real to talk to.",
        skills: ["Asking AI well", "AI characters"],
      },
      {
        number: "03",
        theme: "AI that creates",
        learn:
          "How AI makes pictures, music, and even voices that sound just like you. How voice cloning works. Why all of this matters — and the rules around using it responsibly.",
        build:
          "An illustrated short story — they write the words, AI illustrates each scene, and AI narrates it in their own cloned voice.",
        skills: ["Image generation", "Voice cloning"],
      },
      {
        number: "04",
        theme: "AI that recognises photos",
        learn:
          "How AI looks at a photo and figures out what's in it. Why AI sometimes gets it embarrassingly wrong. How the photos used to teach AI shape what it can and can't see.",
        build:
          "A bird identifier trained on photos taken in their own colony — recognises the actual birds at their feeder, not just generic species.",
        skills: ["Photo recognition", "AI bias"],
      },
      {
        number: "05",
        theme: "AI that takes actions",
        learn:
          "The difference between AI that just chats back and AI that actually does things — like reading a PDF, making flashcards, or quizzing your child. How to give it the right tools and keep it safe.",
        build:
          "A homework helper — reads a textbook chapter PDF, summarises it, generates flashcards, and quizzes your child until they know the chapter cold.",
        skills: ["AI helpers", "AI safety"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Choosing one project to polish. Structuring a three-minute talk. Stage skills. Answering audience questions clearly.",
        build:
          "A polished version of one project from the year, presented on stage at Flagship Expo Day to parents, mentors, and a guest founder panel.",
        skills: ["Polish", "Presentation"],
      },
    ],
    outcome: {
      headline: "An AI-literate ten-year-old who's built five real AI things themselves.",
      deliverables: [
        "A clear understanding of what modern AI is, how it works, and what it can and can't do",
        "Five shipped projects: a custom chatbot character, an AI-illustrated and narrated story, a bird identifier trained on local photos, a homework helper, and a polished capstone",
        "Real fluency to engage with AI seriously — not as a user, but as a builder",
      ],
    },
  },
  {
    grade: "Class 6",
    stage: "Explore",
    tagline: "Complete AI program for ages 11–12.",
    description:
      "A standalone six-month sweep across modern AI — careful prompting, AI that sees, AI that hears and speaks, AI helpers that take actions, and the first taste of training their own AI. Six shipped projects, ending in a defended capstone.",
    modules: [
      {
        number: "01",
        theme: "How AI actually works",
        learn:
          "How AI gets 'taught' from examples, then how it answers once trained. The three big families of AI — old-fashioned rules, machine learning, and the deep-learning behind ChatGPT — and where everything fits.",
        build:
          "A side-by-side documentation — try a 1960s-style rule-based bot, a simple machine-learning demo, and ChatGPT on the same task. Write up what changed and why.",
        skills: ["How AI works", "Field map"],
      },
      {
        number: "02",
        theme: "Instructing AI carefully",
        learn:
          "How to instruct AI as carefully as you'd write a recipe. How giving examples first makes it dramatically better. How to make it think out loud before answering. How to chain multiple AI steps together.",
        build:
          "A multi-step research assistant — searches sources on any topic, drafts a summary, critiques itself, and revises. Used for actual school assignments.",
        skills: ["Prompt design", "Multi-step AI"],
      },
      {
        number: "03",
        theme: "AI that sees",
        learn:
          "How AI 'sees' a photo and finds objects in it. How the newest AI can both see and talk about what it sees in a single conversation.",
        build:
          "A waste-sorting helper — point a phone camera at any item and it labels it as recyclable, compost, or landfill, with confidence scores.",
        skills: ["Vision AI", "Smart photos"],
      },
      {
        number: "04",
        theme: "AI that hears and speaks",
        learn:
          "How AI listens and speaks. How voice AI works in Hindi, English, and dozens of other languages. How to make a voice assistant that feels like a real conversation.",
        build:
          "A voice-controlled bedroom assistant — controls smart lights, plays study music, sets timers — in Hindi or English.",
        skills: ["Voice AI", "Multilingual"],
      },
      {
        number: "05",
        theme: "AI helpers + first training",
        learn:
          "How AI helpers take actions in the world — searching, booking, calculating. Plus the first taste of actually training an AI yourself, and how to tell whether it's any good.",
        build:
          "A helper that books a movie ticket end-to-end (showtimes, seats, holds reservation), plus a tiny image classifier they train themselves.",
        skills: ["AI helpers", "Training basics"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Choosing a topic worth defending. Structuring a five-minute talk. Designing a single visual aid. Defending design choices to a panel.",
        build:
          "A Class 6 capstone — the student's choice from the year — presented and defended on stage at Flagship Expo Day.",
        skills: ["Demo", "Defense"],
      },
    ],
    outcome: {
      headline: "A confident AI builder who knows the modern field and ships working systems.",
      deliverables: [
        "A clear mental model of how modern AI actually works — training, instructing it, seeing, hearing, speaking, taking actions",
        "Six shipped projects spanning instructions, vision, voice, helpers, and training — multiple kinds of AI, all working",
        "Working competence with today's AI tools at age twelve",
      ],
    },
  },
  {
    grade: "Class 7",
    stage: "Build",
    tagline: "Complete AI engineering program for ages 12–13.",
    description:
      "A standalone six-month program in real AI engineering with Python — first principles to deployed app. Includes training your own AI, building with the big models, AI that knows your documents, AI helpers, and computer vision. Six projects, all live at real URLs.",
    modules: [
      {
        number: "01",
        theme: "What a neural network actually is",
        learn:
          "What a neural network actually is, in plain language. How AI gets better through repetition and feedback. Why the same AI can succeed or fail depending on the quality of its training data.",
        build:
          "A tiny single-neuron AI written in Python that learns simple patterns — students watch it improve live and discover why one neuron isn't enough.",
        skills: ["Neural networks", "Python"],
      },
      {
        number: "02",
        theme: "Train your own AI",
        learn:
          "How to actually train your own AI to predict things — like house prices or whether someone passed an exam. The same Python tools used at every Indian AI startup.",
        build:
          "A house-price predictor for their own city using real MagicBricks listings — deployed as a web app anyone can visit and try.",
        skills: ["Training AI", "Web apps"],
      },
      {
        number: "03",
        theme: "Building with the big AI models",
        learn:
          "How to build using the big AI models — ChatGPT, Claude, Gemini. How to teach them to write in a particular style. What it costs and how fast it runs.",
        build:
          "A custom AI that writes school assignment intros in their teacher's marking style — shipped publicly so anyone can use it.",
        skills: ["AI models", "Customising AI"],
      },
      {
        number: "04",
        theme: "AI that knows your documents",
        learn:
          "How to give AI access to your own documents so it can answer from them — the technique behind every modern AI assistant. How to build helpers that take multiple steps to solve a problem.",
        build:
          "A school chatbot — students ask 'when's the next exam?' on WhatsApp and it answers from every circular the school has sent.",
        skills: ["AI from your docs", "AI helpers"],
      },
      {
        number: "05",
        theme: "AI that sees and creates",
        learn:
          "How AI 'looks' at images and identifies what's in them. How the newest AI can see, understand, and even generate images — all in one conversation.",
        build:
          "A wildlife counter for their colony — a phone-cam set on the balcony identifies and counts every bird that visits the feeder.",
        skills: ["Vision AI", "Multimodal"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Designing a complete system that pulls together the year's skills. Defending architecture choices. Pitching to a panel of mentors and a guest founder.",
        build:
          "An end-to-end Class 7 capstone deployed live at a public URL, defended on stage at Flagship Expo Day.",
        skills: ["System design", "Demo"],
      },
    ],
    outcome: {
      headline: "A working AI engineer at age 13 who deploys real apps at real URLs.",
      deliverables: [
        "Solid hands-on experience with neural networks, the big AI models (ChatGPT/Claude/Gemini), AI that searches your documents, AI helpers, and computer vision — written in code, not slides",
        "Six shipped projects deployed live, including a city-specific price predictor, a custom AI shipped publicly, a school WhatsApp chatbot, and a wildlife counter",
        "Fluency in the same Python AI tools used at every Indian AI startup",
      ],
    },
  },
  {
    grade: "Class 8",
    stage: "Engineer",
    tagline: "Complete deep-learning program for ages 13–14.",
    description:
      "A standalone six-month program at university-level depth — building neural networks from scratch and using today's most powerful AI in real systems. The same material taught at MIT and Stanford, written for ages 13–14.",
    modules: [
      {
        number: "01",
        theme: "The simplest possible AI, built from scratch",
        learn:
          "The simplest possible AI — a single 'neuron' invented in 1958 — and how stacking them creates the systems behind ChatGPT. Built and understood from scratch, not as magic.",
        build:
          "A small neural network written in Python from scratch that classifies the student's own handwritten digits — every line of code their own.",
        skills: ["Neural networks", "From scratch"],
      },
      {
        number: "02",
        theme: "How AI actually learns",
        learn:
          "The actual mechanism that lets AI learn from its mistakes. Visualised first as a ball rolling down a hill, then derived properly. The single most important idea in modern AI.",
        build:
          "Training their digit classifier properly — they watch accuracy climb across each round of training and tune the settings by hand.",
        skills: ["How AI learns", "Training"],
      },
      {
        number: "03",
        theme: "AI that sees images",
        learn:
          "How AI sees images — the architecture behind every face recognition, photo tag, and visual search. The 2012 breakthrough that started the modern AI era.",
        build:
          "An AI that recognises Indian street food from photos — students collect their own dataset around their neighbourhood and train it from scratch.",
        skills: ["Vision AI", "Image recognition"],
      },
      {
        number: "04",
        theme: "How ChatGPT actually works",
        learn:
          "How AI handles language — the journey from older approaches to the 'transformer' design behind ChatGPT, Claude, and Gemini. Read the original 2017 research paper. Understand it.",
        build:
          "Their own miniature ChatGPT-style AI trained on three years of their own essays — it writes new sentences in their style.",
        skills: ["Transformers", "Modern AI"],
      },
      {
        number: "05",
        theme: "Building with today's most powerful AI",
        learn:
          "How to take today's most powerful AI models and bend them to a specific task. Connect them to documents, give them tools, let them see images. The full modern AI engineering toolkit.",
        build:
          "A study assistant combining school-notes search, helpful tools (web search, calculator, drawing), and voice — used by their friends in real exam prep.",
        skills: ["Modern AI stack", "Frontier AI"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Designing a system that pulls the whole year together. Defending architecture choices. Pitching to a panel of senior mentors and a guest founder.",
        build:
          "A Class 8 capstone integrating multiple kinds of AI (vision, language, voice, document search), defended at Flagship Expo Day.",
        skills: ["Architecture", "Defense"],
      },
    ],
    outcome: {
      headline: "A deep-learning practitioner who builds neural networks from scratch and ships real systems.",
      deliverables: [
        "Real understanding of how modern AI works — the 1958 neuron, how AI learns from mistakes, image recognition, and the architecture behind ChatGPT — built from scratch in Python",
        "Six shipped projects, including a from-scratch neural network, a digit classifier, an Indian street-food recogniser, a miniature ChatGPT-style AI trained on their own essays, and a multi-modal study assistant",
        "The ability to read modern AI research papers and actually understand them — a skill most computer-science undergraduates struggle with",
      ],
    },
  },
  {
    grade: "Class 9",
    stage: "Apply",
    tagline: "Complete applied-AI program for ages 14–15.",
    description:
      "A standalone six-month program in serious applied AI engineering. Compressed foundations, then production-quality engineering, a frontier specialisation, generative AI, and an integrated capstone defended at Flagship Expo Day.",
    modules: [
      {
        number: "01",
        theme: "Modern AI, end to end",
        learn:
          "A fast, serious tour of every important idea in modern AI — neural networks, the architecture behind ChatGPT, the big AI models, AI helpers, image and voice AI. Where the field actually is in 2026.",
        build:
          "A working ChatGPT-style AI in 200 lines of Python — they understand every line. Plus a written field map of where AI is today.",
        skills: ["Field literacy", "Modern AI"],
      },
      {
        number: "02",
        theme: "Production-quality engineering",
        learn:
          "How real engineers ship AI properly — making it fast, reliable, affordable, and observable when something goes wrong. The actual difference between a school project and software people use.",
        build:
          "A polished AI app deployed at a public URL with proper monitoring, error handling, and documented APIs — engineered to production quality.",
        skills: ["Production engineering", "Deployment"],
      },
      {
        number: "03",
        theme: "Pick a frontier specialisation",
        learn:
          "Pick one specialisation to go deep on: AI that sees and discusses images, AI that holds real-time voice conversations, or AI helpers that work together as a team.",
        build:
          "A specialisation-specific project — a real-time voice tutor, a vision-driven helper, or a team of AI agents that research and write together.",
        skills: ["Specialisation", "Frontier AI"],
      },
      {
        number: "04",
        theme: "AI that creates images, video, music",
        learn:
          "How AI creates images, video, and music from a sentence. The math behind tools like Stable Diffusion, Sora, and Suno. How to fine-tune them for your own style.",
        build:
          "A custom image generator fine-tuned on a personal domain — their school's architecture, their city's signage, their family's photo style. They keep the model.",
        skills: ["Generative AI", "Image generation"],
      },
      {
        number: "05",
        theme: "Putting the pieces together",
        learn:
          "How real AI systems combine vision, voice, language, and document search into one polished product. The trade-offs engineers face when designing these systems. Writing clear technical specifications.",
        build:
          "A capstone-prep build — combining vision, voice, document search, and an AI helper into one cohesive system. Engineered, not just functional.",
        skills: ["System integration", "Architecture"],
      },
      {
        number: "06",
        theme: "Capstone + Flagship Expo",
        learn:
          "Pulling the year together into one defended capstone. Architecture defense. Technical writing. Pitching the work to a panel of senior mentors and a guest founder.",
        build:
          "A polished Class 9 capstone deployed at a public URL, fully documented, defended on stage at Flagship Expo Day.",
        skills: ["Capstone", "Defense", "Documentation"],
      },
    ],
    outcome: {
      headline: "An applied AI engineer who builds polished, production-quality systems.",
      deliverables: [
        "Working command of the modern AI engineering toolkit — the big AI models, document search, AI helpers, vision, voice, image generation, deployment",
        "A polished integrated capstone deployed at a public URL — monitoring, error handling, full technical documentation, defended on stage",
        "A portfolio of working systems engineered to production quality — running software at real URLs, not screenshots",
      ],
    },
  },
  {
    grade: "Class 10",
    stage: "Frontier",
    tagline: "Complete frontier-AI program for ages 15–16.",
    description:
      "A standalone six-month program at the frontier of AI in 2026 — AI that sees, hears, speaks, and creates — pulled together into one ambitious capstone, defended at Flagship Expo Day and ready for college applications.",
    modules: [
      {
        number: "01",
        theme: "AI from zero to today",
        learn:
          "A serious crash course in modern AI — what it is, how it works under the hood, the architecture behind ChatGPT, where the frontier sits in 2026. Foundations, properly built, fast.",
        build:
          "A working ChatGPT-style AI in pure Python from scratch — they understand every line. Plus a written synthesis of where AI actually is today.",
        skills: ["Foundations, fast", "Modern AI"],
      },
      {
        number: "02",
        theme: "How professionals build with AI",
        learn:
          "How professional AI engineers actually build with the latest models — fine-tuning them for specific tasks, connecting them to documents, giving them helpful tools, deploying them with proper engineering.",
        build:
          "A polished, production-grade AI app using the big AI models, document search, and at least one AI helper — deployed live with proper monitoring and error handling.",
        skills: ["Modern AI engineering", "Production"],
      },
      {
        number: "03",
        theme: "AI that sees, hears, and speaks",
        learn:
          "The newest AI that can see, hear, and speak. The models behind real-time voice assistants and image-aware AI. How to build with them properly.",
        build:
          "A real-time multimodal assistant that sees and speaks — voice in, vision interpreted, voice answer out, all in their preferred language.",
        skills: ["Multimodal AI", "Voice AI"],
      },
      {
        number: "04",
        theme: "AI that creates images, video, music",
        learn:
          "The math behind AI image, video, and music generation — the same techniques powering Stable Diffusion, Sora, and Suno. How to fine-tune your own.",
        build:
          "A custom fine-tuned image generator on a personal domain — their school, their city, their family's style. They keep the model.",
        skills: ["Generative AI", "Fine-tuning"],
      },
      {
        number: "05",
        theme: "Capstone — design and build",
        learn:
          "Pulling the year into one ambitious project. System design that combines multiple kinds of AI. Engineering trade-offs at the right level. Iteration on technical quality and architectural clarity.",
        build:
          "A capstone deployed at a public URL — multimodal, technically substantial, polished across two engineering iterations.",
        skills: ["System design", "Engineering"],
      },
      {
        number: "06",
        theme: "Capstone defense + Flagship Expo",
        learn:
          "Defending architecture and trade-off decisions to a panel. Custom-domain portfolios. Technical writing. Pitching the work. College-application essay craft.",
        build:
          "A custom-domain portfolio (yourname.in) showcasing the capstone and prior work + a five-minute defense at Flagship Expo Day — ready for college and internship applications.",
        skills: ["Defense", "Portfolio", "Pitching"],
      },
    ],
    outcome: {
      headline: "A frontier AI builder ready for college and what comes after.",
      deliverables: [
        "Mastery of the frontier AI shipping in 2026 — AI that sees, hears, and speaks; AI that creates images, video, and music",
        "A technically substantial capstone deployed at a public URL — combining multiple kinds of AI, polished, fully documented, defended on stage at Flagship Expo Day",
        "A custom-domain portfolio (yourname.in) and a five-minute pitch — ready for college applications, internships, and every conversation that follows",
      ],
    },
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
          Each class, a complete AI program. <em>Stay six years, and the depth compounds.</em>
        </h2>
        <p className="section-body mb-4">
          Every grade is its own self-contained six-month program — from the
          basics to the most advanced AI of 2026, no prior year required. A
          child who joins in Class 8 gets a complete Class 8 program. A child
          who stays from Class 5 through 10 gets six years of compounding depth
          on the same field.
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
            {active.grade} · 6-month program
          </span>
          <h3
            className="mt-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              lineHeight: 1.04,
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
              fontSize: "1.4rem",
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
              Want the full {active.grade} program, walked through 1-on-1 by a
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
              className="ui-card animate-fade-rise relative flex flex-col gap-5 overflow-hidden rounded-[1.5rem] p-6"
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

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#0a0a0a",
                }}
              >
                {m.theme}
              </h4>

              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="ui-label mb-1.5"
                    style={{ color: "rgba(15,15,15,0.45)" }}
                  >
                    What they learn
                  </p>
                  <p className="ui-body-sm">{m.learn}</p>
                </div>

                <div
                  className="rounded-[1rem] p-4"
                  style={{
                    background: "rgba(19,53,184,0.05)",
                    border: "1px solid rgba(19,53,184,0.14)",
                  }}
                >
                  <p
                    className="ui-label mb-1.5"
                    style={{ color: "#1335b8" }}
                  >
                    They build
                  </p>
                  <p
                    className="ui-body-sm"
                    style={{ color: "#0a0a0a" }}
                  >
                    {m.build}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/8 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#5a5a5a",
                      background: "rgba(255,255,255,0.5)",
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

      <div
        key={`${active.grade}-outcome`}
        className="animate-fade-rise relative mt-12 overflow-hidden rounded-[2rem] border border-black/8 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        style={{
          background:
            "radial-gradient(circle at 88% 12%, rgba(19,53,184,0.16), transparent 42%), radial-gradient(circle at 8% 88%, rgba(19,53,184,0.08), transparent 38%), linear-gradient(180deg, #ffffff 0%, #faf9f4 100%)",
          boxShadow: "0 30px 60px -40px rgba(19,53,184,0.22)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="ui-label" style={{ color: "#1335b8" }}>
              After 6 months in {active.grade}
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
              {active.outcome.headline}
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
              A complete program in itself — your child can leave fluent after
              one year. They almost never want to.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {active.outcome.deliverables.map((d) => (
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
