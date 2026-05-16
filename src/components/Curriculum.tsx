import { useState } from "react";

type Module = {
  number: string;
  theme: string;
  summary: string;
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
      "A complete first AI program — six months from 'what is AI?' to a child who has prompted, generated, classified, and built their own working AI agent. Five shipped projects.",
    modules: [
      {
        number: "01",
        theme: "First contact with AI",
        summary:
          "What AI is, the three things it does — predict, generate, decide — and where it shows up in their day. They learn the vocabulary and safe-use habits to engage with modern AI deliberately, exploring real tools hands-on.",
        skills: ["AI literacy", "Vocabulary"],
      },
      {
        number: "02",
        theme: "Talking to AI well",
        summary:
          "What a prompt is, why phrasing changes the answer, and how to spot when AI is making things up. Hands-on, they design AI personas with system prompts and refine them until the conversations feel real.",
        skills: ["Prompting", "Personas"],
      },
      {
        number: "03",
        theme: "AI that creates",
        summary:
          "How generative AI makes images, music, and voice — and the ethics that come with these tools. Hands-on, they combine text-to-image, voice cloning, and narrative into a multi-modal creation only they could have made.",
        skills: ["Generative AI", "Multimodal"],
      },
      {
        number: "04",
        theme: "AI that recognizes",
        summary:
          "How a model 'sees' a photo, why some classifications fail, and how bias creeps into training data. Hands-on, they build and stress-test an image classifier on photos they collect themselves.",
        skills: ["Computer vision", "Datasets"],
      },
      {
        number: "05",
        theme: "AI that acts",
        summary:
          "What an AI agent is, how it differs from a chatbot, the tools it can use, and the safety boundaries that matter. Hands-on, they wire up an agent that takes real actions end-to-end on a meaningful task.",
        skills: ["Agents", "Tool use"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        summary:
          "Choosing one project worth polishing, structuring a three-minute talk, stage skills, and handling audience questions. Hands-on, they present at Flagship Expo Day to parents, mentors, and a guest founder.",
        skills: ["Polish", "Presentation"],
      },
    ],
    outcome: {
      headline: "An AI-literate ten-year-old who's built five real AI things themselves.",
      deliverables: [
        "A complete mental model of modern AI — what it is, how it works, what it can and can't do",
        "Five shipped projects spanning prompting, generative AI, vision, agents, and a polished capstone — built and presented by the child themselves",
        "Real fluency to engage with AI seriously — not as a user, but as a builder",
      ],
    },
  },
  {
    grade: "Class 6",
    stage: "Explore",
    tagline: "Complete AI program for ages 11–12.",
    description:
      "A complete six-month program covering modern AI — careful prompting, AI that sees, AI that hears and speaks, AI agents that take actions, and training your own first machine-learning models. Six shipped projects, ending in a defended capstone.",
    modules: [
      {
        number: "01",
        theme: "How AI actually works",
        summary:
          "Training vs inference, and the three families — rules-based AI, machine learning, deep learning — and where today's AI sits. Hands-on, they compare older and modern approaches on the same problem and articulate what changed.",
        skills: ["AI taxonomy", "Field literacy"],
      },
      {
        number: "02",
        theme: "Prompts as a programming language",
        summary:
          "System vs user messages, few-shot examples, constraints, chain-of-thought reasoning, and tool use. Hands-on, they iterate multi-step AI workflows like code and use them for real schoolwork.",
        skills: ["Prompt engineering", "Multi-step prompting"],
      },
      {
        number: "03",
        theme: "Vision AI",
        summary:
          "How images become numbers, image classification with pre-trained models, object detection, and vision-language models at intuition level. Hands-on, they apply vision AI to a real-world problem and stress-test it.",
        skills: ["Vision", "Classification"],
      },
      {
        number: "04",
        theme: "Voice AI",
        summary:
          "Speech-to-text and text-to-speech, multilingual voice models, voice agents, and the latency budgets that make real-time conversation feel real. Hands-on, they design and ship a multilingual voice assistant.",
        skills: ["Voice AI", "Multilingual"],
      },
      {
        number: "05",
        theme: "Agents + first ML",
        summary:
          "Function calling and the ReAct pattern, plus supervised vs unsupervised learning, train/test splits, overfitting, and reading a confusion matrix. Hands-on, they build a working agent and train their first machine-learning model end-to-end.",
        skills: ["Agents", "ML basics"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        summary:
          "Choosing a topic worth defending, structuring a five-minute talk, designing a single visual aid, and defending design choices to a panel. Hands-on, they present and defend their Class 6 capstone at Flagship Expo Day.",
        skills: ["Demo", "Defense"],
      },
    ],
    outcome: {
      headline: "A confident AI builder who knows the modern field and ships working systems.",
      deliverables: [
        "A clear mental model of how modern AI actually works — training, inference, prompts, agents, vision, voice, machine learning",
        "Six shipped projects spanning prompts, vision, voice, agents, and ML — multiple modalities, all working",
        "Working competence with foundation models, agents, and the modern AI stack at age twelve",
      ],
    },
  },
  {
    grade: "Class 7",
    stage: "Build",
    tagline: "Complete AI engineering program for ages 12–13.",
    description:
      "A complete six-month program in real AI engineering with Python — first principles to deployed app. Covers machine learning, foundation models, RAG, agents, and computer vision. Six projects, all live at real URLs.",
    modules: [
      {
        number: "01",
        theme: "AI from first principles",
        summary:
          "How neural networks work conceptually, the training loop, why data quality matters, reading benchmarks, and choosing models. Hands-on, they write their first neural network from scratch and watch it learn live.",
        skills: ["Neural intuition", "NumPy"],
      },
      {
        number: "02",
        theme: "Real ML with Python",
        summary:
          "Supervised learning — linear and logistic regression, decision trees — with proper train/test/validation across the full scikit-learn workflow. Hands-on, they take a real-world dataset and ship a deployed prediction app anyone can visit.",
        skills: ["scikit-learn", "Streamlit"],
      },
      {
        number: "03",
        theme: "Modern AI systems",
        summary:
          "Foundation models — GPT, Claude, Gemini, Llama — and the economics around them: prompting at scale, fine-tuning intuition, tokens, context, latency, cost. Hands-on, they customize and publicly ship a fine-tuned model of their own.",
        skills: ["Foundation models", "Hugging Face"],
      },
      {
        number: "04",
        theme: "RAG and agents",
        summary:
          "Why models forget, embeddings and vector databases, chunking strategies, function calling, the ReAct pattern, and multi-step agent workflows. Hands-on, they build an AI system that grounds answers in real documents and takes actions on the user's behalf.",
        skills: ["RAG", "Vector DBs", "Agents"],
      },
      {
        number: "05",
        theme: "Computer vision + multimodal",
        summary:
          "CNNs at intuition level, vision-language models, object detection, segmentation, and image generation. Hands-on, they build a working vision system on a problem from their own life.",
        skills: ["CNNs", "VLMs"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        summary:
          "System design synthesizing the year, defending architecture choices, and pitching to a panel. Hands-on, they ship a Class 7 capstone live at a public URL and defend it on stage at Flagship Expo Day.",
        skills: ["System design", "Demo"],
      },
    ],
    outcome: {
      headline: "A working AI engineer at age 13 who deploys real apps at real URLs.",
      deliverables: [
        "Working understanding of neural networks, foundation models, RAG, agents, and computer vision — written in code, not slides",
        "Six shipped projects deployed live, spanning classical ML, foundation models, RAG, agents, and computer vision — each engineered end-to-end",
        "Fluency in the modern Python AI stack — NumPy, scikit-learn, Hugging Face, Streamlit — the same one used at every Indian AI startup",
      ],
    },
  },
  {
    grade: "Class 8",
    stage: "Engineer",
    tagline: "Complete deep-learning program for ages 13–14.",
    description:
      "A complete six-month program at the technical level of MIT 6.S191 and Karpathy's 'Zero to Hero' — perceptrons to transformers, built from scratch in NumPy and used in production.",
    modules: [
      {
        number: "01",
        theme: "From perceptron to neural network",
        summary:
          "The perceptron, multi-layer perceptrons, activation functions, forward propagation, and the universal approximation theorem. Hands-on, they implement a neural network from scratch — every line of code their own.",
        skills: ["MLPs", "NumPy NN"],
      },
      {
        number: "02",
        theme: "Backprop and training",
        summary:
          "Loss functions, gradient descent visualized, backpropagation derived step by step, and the difference between SGD and Adam. Hands-on, they train their network with their own backprop and tune it by hand until it works.",
        skills: ["Backpropagation", "Optimizers"],
      },
      {
        number: "03",
        theme: "CNNs and computer vision",
        summary:
          "The convolution operation, pooling layers, translation invariance, and the historical arc from LeNet through AlexNet to ResNet and modern vision-language models. Hands-on, they collect their own dataset and train a vision model from scratch.",
        skills: ["CNNs", "Vision"],
      },
      {
        number: "04",
        theme: "Sequence models + transformers",
        summary:
          "RNNs, LSTMs, the vanishing gradient problem, self-attention with Query/Key/Value, and the transformer architecture from Attention Is All You Need. Hands-on, they implement and train a working transformer on data that matters to them.",
        skills: ["Transformers", "Self-attention"],
      },
      {
        number: "05",
        theme: "Building with frontier models",
        summary:
          "Foundation models in practice, fine-tuning with LoRA, RAG over vector databases, agents and tool use, and multimodal prompting. Hands-on, they engineer a real frontier-model system that integrates multiple modalities.",
        skills: ["LoRA", "RAG", "Agents"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        summary:
          "Architecture synthesis across the year, system design defending choices, and pitching to a panel of senior mentors. Hands-on, they ship and defend a multimodal Class 8 capstone at Flagship Expo Day.",
        skills: ["Architecture", "Defense"],
      },
    ],
    outcome: {
      headline: "A deep-learning practitioner who builds neural networks from scratch and ships frontier-model systems.",
      deliverables: [
        "Real understanding of how modern AI works — perceptrons, backpropagation, CNNs, RNNs, transformers — built from scratch in NumPy",
        "Six shipped projects covering neural networks from scratch, computer vision, transformers, and a multi-modal frontier-model system — each built and trained themselves",
        "The ability to read 'Attention Is All You Need' and actually understand it — a skill most CS undergraduates struggle with",
      ],
    },
  },
  {
    grade: "Class 9",
    stage: "Apply",
    tagline: "Complete applied-AI program for ages 14–15.",
    description:
      "A complete six-month program in serious applied AI engineering. Compressed foundations, then production-quality engineering, agentic systems, generative AI, and an integrated capstone defended at Flagship Expo Day.",
    modules: [
      {
        number: "01",
        theme: "AI fundamentals at speed",
        summary:
          "A condensed sweep of the field — neural networks, transformers, foundation models, RAG, agents, multimodal, generative — and the shape of AI in 2026. Hands-on, they build a working transformer from scratch and articulate where the field actually is.",
        skills: ["Field literacy", "Transformers from scratch"],
      },
      {
        number: "02",
        theme: "Production-quality engineering",
        summary:
          "APIs, hosting, latency, throughput, batching, caching, cost optimization, observability, and structured logging. Hands-on, they deploy an AI app to production with the monitoring and engineering rigor that separates a school project from real software.",
        skills: ["Deployment", "Production engineering"],
      },
      {
        number: "03",
        theme: "Agentic systems",
        summary:
          "Multi-agent orchestration, agent memory and communication, ReAct and Plan-and-Execute patterns, tool design, and evaluating agentic behavior at frontier depth. Hands-on, they build a multi-agent system that researches, decides, and acts end-to-end on a real workflow.",
        skills: ["Agents", "Multi-agent", "Frontier AI"],
      },
      {
        number: "04",
        theme: "Generative AI in depth",
        summary:
          "Diffusion models — forward and reverse process, U-Net, latent diffusion — plus image, video, and music generation in 2026. Hands-on, they fine-tune a generative model on a real-world domain and keep the weights.",
        skills: ["Diffusion", "Latent diffusion"],
      },
      {
        number: "05",
        theme: "Integrated systems",
        summary:
          "How serious AI systems combine multiple modalities and models, architecture decisions and trade-offs, and reading and writing technical specifications. Hands-on, they integrate vision, voice, RAG, and an agent into one engineered system.",
        skills: ["System integration", "Architecture"],
      },
      {
        number: "06",
        theme: "Capstone + Flagship Expo",
        summary:
          "Synthesizing the year into one defended capstone, defending architecture choices, technical writing, and pitching to a panel of senior mentors. Hands-on, they ship and defend a polished Class 9 capstone at a public URL.",
        skills: ["Capstone", "Defense", "Documentation"],
      },
    ],
    outcome: {
      headline: "An applied AI engineer who builds polished, production-quality systems.",
      deliverables: [
        "Working command of the modern AI engineering stack — foundation models, RAG, agents, vision, voice, generative architectures, deployment",
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
      "A complete six-month program at the frontier of AI in 2026 — multimodal, voice, generative — synthesized into one ambitious capstone, defended at Flagship Expo Day.",
    modules: [
      {
        number: "01",
        theme: "AI from zero to today",
        summary:
          "A rigorous compressed sweep — what AI is, how neural networks work, what transformers do, what foundation models are, and what the frontier looks like in 2026. Hands-on, they build a working transformer in pure Python from scratch and synthesize where AI actually is today.",
        skills: ["Field foundations", "Transformers from scratch"],
      },
      {
        number: "02",
        theme: "Modern AI engineering",
        summary:
          "Building with foundation models, fine-tuning with LoRA, RAG over vector databases, agents and tool use, and production deployment with observability and cost optimization. Hands-on, they ship a production-grade AI app to a public URL with proper monitoring.",
        skills: ["Modern AI engineering", "Production"],
      },
      {
        number: "03",
        theme: "Multimodal + voice frontier",
        summary:
          "Vision-language models, voice agents, real-time multimodal prompting, and evaluation. Hands-on, they build a real-time AI that sees, hears, and speaks in their preferred language.",
        skills: ["VLMs", "Voice agents", "Multimodal"],
      },
      {
        number: "04",
        theme: "Generative architectures",
        summary:
          "Diffusion models in depth — latent diffusion, U-Net, classifier-free guidance — and image, video, and music generation in 2026. Hands-on, they fine-tune a generative model on a personal domain and keep the weights.",
        skills: ["Diffusion", "Latent diffusion", "Fine-tuning"],
      },
      {
        number: "05",
        theme: "Capstone — design and build",
        summary:
          "Synthesizing the year into one ambitious project, system design integrating multiple modalities, and iteration on technical and architectural clarity. Hands-on, they build a multimodal capstone deployed at a public URL across two engineering iterations.",
        skills: ["System design", "Production engineering"],
      },
      {
        number: "06",
        theme: "Capstone defense + Flagship Expo",
        summary:
          "Defending architecture and trade-off decisions to a panel, custom-domain portfolios, technical writing, and pitching the work. Hands-on, they ship a custom-domain portfolio and defend their capstone at Flagship Expo Day.",
        skills: ["Defense", "Portfolio", "Pitching"],
      },
    ],
    outcome: {
      headline: "A frontier AI builder shipping the techniques that define 2026.",
      deliverables: [
        "Mastery of the frontier AI techniques shipping in 2026 — multimodal vision-language models, real-time voice agents, diffusion-based generative models",
        "A technically substantial capstone deployed at a public URL — multimodal, polished, fully documented, defended on stage at Flagship Expo Day",
        "A custom-domain portfolio (yourname.in) and a defended five-minute pitch — built on real engineered work, not slides",
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
          Every grade is its own self-contained six-month program — basics to
          advanced, no prior year required. A child who joins in Class 8 gets a
          complete Class 8 program. A child who stays from Class 5 through 10
          gets six years of compounding depth on the same field.
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

              <p className="ui-body-sm">{m.summary}</p>

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
