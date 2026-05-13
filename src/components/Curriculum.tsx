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
      "A self-contained first AI program — six months from 'what is AI?' to a child who has prompted, generated, classified, and built their own working AI agent. No prerequisites. Five shipped projects.",
    modules: [
      {
        number: "01",
        theme: "First contact with AI",
        learn:
          "What AI is. The three things AI does — predict, generate, decide. Where AI shows up in their day. Safe-use rules. The vocabulary of modern AI: model, prompt, training, hallucination.",
        build:
          "A 'show me the AI in my day' presentation — they document AI in YouTube, Alexa, Google Maps, autocorrect, and photo cleanup, with screenshots and explanations.",
        skills: ["AI literacy", "Vocabulary"],
      },
      {
        number: "02",
        theme: "Talking to AI well",
        learn:
          "What a prompt is. Why phrasing changes the answer. Asking follow-up questions. Spotting when AI is making things up. Designing personas with system prompts.",
        build:
          "A custom historical-figure chatbot — Akbar, Kalpana Chawla, or Tagore — crafted with a system prompt that makes them feel real to talk to.",
        skills: ["Prompting", "Personas"],
      },
      {
        number: "03",
        theme: "AI that creates",
        learn:
          "How generative AI makes images, music, and voice. Text-to-image, text-to-music, voice cloning. Ethics of AI-generated content.",
        build:
          "An illustrated short story — they write the words, AI illustrates each scene, and AI narrates it in their own cloned voice.",
        skills: ["Generative AI", "Multimodal"],
      },
      {
        number: "04",
        theme: "AI that recognizes",
        learn:
          "How a model 'knows' what's in a photo. Pre-trained vision models. Why some classifications fail. Bias in training data, with concrete examples.",
        build:
          "A bird identifier trained on photos taken in their colony — recognizes the actual birds at their feeder, not just generic species.",
        skills: ["Computer vision", "Datasets"],
      },
      {
        number: "05",
        theme: "AI that acts",
        learn:
          "What an AI agent is — and how it differs from a chatbot. Tools the AI can use to take actions. Safety boundaries for what an agent should and shouldn't do.",
        build:
          "A homework helper agent — reads a textbook chapter PDF, summarizes it, generates flashcards, and quizzes the student until they know it cold.",
        skills: ["Agents", "Tool use"],
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
        "A complete mental model of modern AI — what it is, how it works, what it can and can't do",
        "Five shipped projects: a custom chatbot persona, an AI-illustrated and narrated story, a bird identifier trained on local photos, a homework agent, and a polished capstone",
        "Real fluency to engage with AI seriously — not as a user, but as a builder",
      ],
    },
  },
  {
    grade: "Class 6",
    stage: "Explore",
    tagline: "Complete AI program for ages 11–12.",
    description:
      "A standalone six-month sweep across the modern AI field — prompts, vision, voice, agents, plus the first taste of machine learning. Six shipped projects across multiple modalities, ending in a defended capstone.",
    modules: [
      {
        number: "01",
        theme: "How AI actually works",
        learn:
          "Training vs inference at a beginner level. Data → patterns → predictions. The three families: rules-based AI, machine learning, deep learning. Where today's AI sits.",
        build:
          "A side-by-side documentation — try a 1960s-style rule-based bot, a simple ML demo, and ChatGPT on the same task. Write up what changed and why.",
        skills: ["AI taxonomy", "Field literacy"],
      },
      {
        number: "02",
        theme: "Prompts as a programming language",
        learn:
          "System vs user messages. Few-shot examples. Constraints, formatting, chain-of-thought reasoning. Tool use. Iterating prompts like code.",
        build:
          "A multi-step research assistant — searches sources on any topic, drafts a summary, critiques itself, and revises. Used for actual school assignments.",
        skills: ["Prompt engineering", "Multi-step prompting"],
      },
      {
        number: "03",
        theme: "Vision AI",
        learn:
          "How images become numbers. Image classification with pre-trained models. Object detection. Vision-language models (CLIP, GPT-4V) at intuition level.",
        build:
          "A waste-sorting helper — point a phone camera at any item and it labels it as recyclable, compost, or landfill, with confidence scores.",
        skills: ["Vision", "Classification"],
      },
      {
        number: "04",
        theme: "Voice AI",
        learn:
          "Speech-to-text and text-to-speech. Multilingual voice models. Voice agents and real-time conversation. Latency budgets for voice.",
        build:
          "A voice-controlled bedroom assistant — controls smart lights, plays study music, sets timers — in Hindi or English.",
        skills: ["Voice AI", "Multilingual"],
      },
      {
        number: "05",
        theme: "Agents + first ML",
        learn:
          "Function calling and the ReAct pattern. Plus: supervised vs unsupervised learning. Train/test split. Overfitting visualized. Reading a confusion matrix.",
        build:
          "An agent that books a movie ticket end-to-end (showtimes, seats, holds reservation), plus a tiny image classifier they train themselves.",
        skills: ["Agents", "ML basics"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Choosing a topic worth defending. Structuring a five-minute talk. Designing a single visual aid. Defending design choices to a panel.",
        build:
          "A Class 6 capstone — student's choice from the year — presented and defended on stage at Flagship Expo Day.",
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
      "A standalone six-month program in real AI engineering with Python — first principles to deployed app. Includes machine learning, foundation models, RAG, agents, and computer vision. Six projects, all live at real URLs.",
    modules: [
      {
        number: "01",
        theme: "AI from first principles",
        learn:
          "How neural networks work conceptually. The training loop. Why data quality matters. Reading benchmarks. Choosing models. Vocabulary at engineer level.",
        build:
          "A NumPy single-neuron classifier that learns AND, OR, and (failing on) XOR — they watch the weights update live and discover why one neuron isn't enough.",
        skills: ["Neural intuition", "NumPy"],
      },
      {
        number: "02",
        theme: "Real ML with Python",
        learn:
          "Supervised learning. Linear and logistic regression, decision trees. Train/test/validation. Cross-validation. The full scikit-learn workflow.",
        build:
          "A house-price predictor for their own city using real MagicBricks listings — deployed as a Streamlit app anyone can visit and try.",
        skills: ["scikit-learn", "Streamlit"],
      },
      {
        number: "03",
        theme: "Modern AI systems",
        learn:
          "Foundation models — GPT, Claude, Gemini, Llama. Prompting at scale. Fine-tuning intuition. Cost economics. Tokens, context, latency.",
        build:
          "A fine-tuned model that writes school assignment intros in their teacher's marking style — shipped publicly via Hugging Face.",
        skills: ["Foundation models", "Hugging Face"],
      },
      {
        number: "04",
        theme: "RAG and agents",
        learn:
          "Why models forget. Embeddings, vector databases, chunking strategies. Function calling and the ReAct pattern. Multi-step agent workflows.",
        build:
          "A school RAG bot — students ask 'when's the next exam?' on WhatsApp and it answers from every circular the school has sent.",
        skills: ["RAG", "Vector DBs", "Agents"],
      },
      {
        number: "05",
        theme: "Computer vision + multimodal",
        learn:
          "CNNs at intuition level. Vision-language models (CLIP, GPT-4V). Object detection (YOLO), segmentation, image generation.",
        build:
          "A wildlife counter for their colony — a phone-cam set on the balcony identifies and counts every bird that visits the feeder.",
        skills: ["CNNs", "VLMs"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "System design synthesizing the year. Defending architecture choices. Pitching to a panel of mentors and a guest founder.",
        build:
          "An end-to-end Class 7 capstone deployed live at a public URL, defended on stage at Flagship Expo Day.",
        skills: ["System design", "Demo"],
      },
    ],
    outcome: {
      headline: "A working AI engineer at age 13 who deploys real apps at real URLs.",
      deliverables: [
        "Working understanding of neural networks, foundation models, RAG, agents, and computer vision — written in code, not slides",
        "Six shipped projects deployed live, including a city-specific price predictor, a fine-tuned model on Hugging Face, a school WhatsApp RAG bot, and a wildlife counter",
        "Fluency in the modern Python AI stack — NumPy, scikit-learn, Hugging Face, Streamlit — the same one used at every Indian AI startup",
      ],
    },
  },
  {
    grade: "Class 8",
    stage: "Engineer",
    tagline: "Complete deep-learning program for ages 13–14.",
    description:
      "A standalone six-month program at the technical level of MIT 6.S191 and Karpathy's 'Zero to Hero' — perceptrons to transformers, built from scratch in NumPy and used in production. No prerequisites beyond willingness.",
    modules: [
      {
        number: "01",
        theme: "From perceptron to neural network",
        learn:
          "The perceptron (Rosenblatt 1958). Multi-layer perceptrons. Activation functions (ReLU, sigmoid, tanh, softmax). Forward propagation. Universal approximation theorem.",
        build:
          "A multi-layer perceptron from scratch in NumPy that classifies their own handwritten digits — every line of code their own.",
        skills: ["MLPs", "NumPy NN"],
      },
      {
        number: "02",
        theme: "Backprop and training",
        learn:
          "Loss functions (cross-entropy, MSE). Gradient descent visualized. Backpropagation derived step by step (Karpathy + 3Blue1Brown approach). SGD vs Adam.",
        build:
          "Training their MNIST classifier with proper backpropagation — they watch accuracy climb across epochs and tune learning rate by hand.",
        skills: ["Backpropagation", "Optimizers"],
      },
      {
        number: "03",
        theme: "CNNs and computer vision",
        learn:
          "The convolution operation. Pooling layers. Translation invariance. The historical arc — LeNet → AlexNet (2012, the ImageNet moment) → ResNet. Modern VLMs.",
        build:
          "A CNN that recognizes Indian street food from photos — students collect their own dataset around their neighborhood and train it from scratch.",
        skills: ["CNNs", "Vision"],
      },
      {
        number: "04",
        theme: "Sequence models + transformers",
        learn:
          "RNNs, LSTMs, and the vanishing gradient problem. Self-attention with Query, Key, Value. The transformer architecture (Vaswani 2017). BERT vs GPT.",
        build:
          "Their own miniature GPT trained on three years of their own essays — it writes new sentences in their style.",
        skills: ["Transformers", "Self-attention"],
      },
      {
        number: "05",
        theme: "Building with frontier models",
        learn:
          "Foundation models in practice. Fine-tuning with LoRA. RAG over vector databases. Agents and tool use. Multimodal prompting (CLIP, GPT-4V).",
        build:
          "A study assistant combining RAG (school notes) + agent tools (web search, calculator, drawing) + voice — used by friends in real exam prep.",
        skills: ["LoRA", "RAG", "Agents"],
      },
      {
        number: "06",
        theme: "Capstone + Showcase",
        learn:
          "Architecture synthesis across the year. System design defending choices. Pitching to a panel of senior mentors and a guest founder.",
        build:
          "A Class 8 capstone integrating multiple modalities (vision, language, voice, or RAG), defended at Flagship Expo Day.",
        skills: ["Architecture", "Defense"],
      },
    ],
    outcome: {
      headline: "A deep-learning practitioner who builds neural networks from scratch and ships frontier-model systems.",
      deliverables: [
        "Real understanding of how modern AI works — perceptrons, backpropagation, CNNs, RNNs, transformers — built from scratch in NumPy",
        "Six shipped projects, including a NumPy MLP, an MNIST classifier, an Indian street-food CNN, a miniature GPT trained on their own essays, and a multi-modal study assistant",
        "The ability to read 'Attention Is All You Need' and actually understand it — a skill most CS undergraduates struggle with",
      ],
    },
  },
  {
    grade: "Class 9",
    stage: "Ship",
    tagline: "Complete production-AI program for ages 14–15.",
    description:
      "A standalone six-month program in real AI engineering at production scale. Compressed foundations, then deployment, frontier specialization, generative AI, and an app shipped to real users with a public launch.",
    modules: [
      {
        number: "01",
        theme: "AI fundamentals at speed",
        learn:
          "A condensed sweep of the field — neural networks, transformers, foundation models, RAG, agents, multimodal, generative. The shape of AI in 2026.",
        build:
          "A working transformer in 200 lines of Python — they understand every line. Plus a written field map of where AI actually is today.",
        skills: ["Field literacy", "Transformers from scratch"],
      },
      {
        number: "02",
        theme: "Production engineering",
        learn:
          "Deploying AI properly. APIs, hosting (Vercel, Railway, Hugging Face Spaces). Latency, throughput, batching, caching. Cost optimization. Observability.",
        build:
          "A polished AI app deployed at a public URL with proper monitoring, error handling, structured logging, and documented APIs.",
        skills: ["Deployment", "Production AI"],
      },
      {
        number: "03",
        theme: "Frontier specialization",
        learn:
          "Pick one of three deep dives — multimodal AI (vision-language models in depth), voice AI (real-time agents with Whisper + OpenAI Realtime), or agentic systems (multi-agent orchestration with CrewAI / Anthropic Agents).",
        build:
          "A specialization-specific project — a real-time voice tutor, a vision-driven agent, or a multi-agent research-and-write team.",
        skills: ["Specialization", "Frontier AI"],
      },
      {
        number: "04",
        theme: "Generative AI in depth",
        learn:
          "Diffusion models — forward and reverse process, U-Net, latent diffusion. Stable Diffusion, FLUX. Video generation (Sora, Veo). Music generation (Suno, Udio).",
        build:
          "A custom image generator fine-tuned on a personal domain — their school's architecture, their city's signage, their family's photo style. They keep the model.",
        skills: ["Diffusion", "Latent diffusion"],
      },
      {
        number: "05",
        theme: "Building for real users",
        learn:
          "Recruiting first users without a budget. Setting up analytics. Reading dashboards. Running structured user interviews. Iterating on signal, not opinion.",
        build:
          "A polished AI app with at least 25 real users, two iteration cycles based on actual usage data, and measurable improvement between v1 and v3.",
        skills: ["User research", "Iteration"],
      },
      {
        number: "06",
        theme: "Public launch + Expo",
        learn:
          "Public launch craft. Custom-domain portfolios. Writing a launch post that lands. Pitching to a guest founder panel. College-application essay craft.",
        build:
          "A coordinated public launch (LinkedIn, X, Product Hunt) + custom-domain portfolio + five-minute pitch on stage at Flagship Expo Day.",
        skills: ["Launch craft", "Portfolio", "Pitching"],
      },
    ],
    outcome: {
      headline: "An AI engineer who ships polished apps that real people actually use.",
      deliverables: [
        "Working command of the modern AI engineering stack — foundation models, RAG, agents, vision, voice, generative architectures, deployment",
        "A polished app deployed at a public URL with twenty-five-plus real users, two iteration cycles, and a coordinated public launch",
        "An internship-ready public portfolio of working systems — not screenshots, not demos, real software running at real URLs",
      ],
    },
  },
  {
    grade: "Class 10",
    stage: "Frontier",
    tagline: "Complete frontier-AI program for ages 15–16.",
    description:
      "A standalone six-month program at the frontier of AI in 2026 — multimodal, voice, generative — synthesized into one ambitious capstone, publicly launched and ready for college applications.",
    modules: [
      {
        number: "01",
        theme: "AI from zero to today",
        learn:
          "A rigorous compressed sweep — what AI is, how neural networks work, what transformers do, what foundation models are, what frontier 2026 looks like. Foundations, fast.",
        build:
          "A working transformer in pure Python from scratch — they understand every line. Plus a written synthesis of where AI actually is today.",
        skills: ["Field foundations", "Transformers from scratch"],
      },
      {
        number: "02",
        theme: "Modern AI engineering",
        learn:
          "Building with foundation models. Fine-tuning with LoRA. RAG over vector databases. Agents and tool use. Production deployment, observability, cost optimization.",
        build:
          "A polished, production-grade AI app using foundation models, RAG, and at least one agent — deployed live with proper monitoring and error handling.",
        skills: ["Modern AI engineering", "Production"],
      },
      {
        number: "03",
        theme: "Multimodal + voice frontier",
        learn:
          "Vision-language models — CLIP, GPT-4V, Gemini, Llama 3.2 Vision. Voice agents — Whisper, OpenAI Realtime, ElevenLabs. Multimodal prompting and evaluation.",
        build:
          "A real-time multimodal assistant that sees and speaks — voice in, vision interpreted, voice answer out, all in their preferred language.",
        skills: ["VLMs", "Voice agents", "Multimodal"],
      },
      {
        number: "04",
        theme: "Generative architectures",
        learn:
          "Diffusion models in depth — latent diffusion, U-Net, classifier-free guidance. Stable Diffusion, FLUX. Video generation (Sora, Veo). Music generation (Suno, Udio).",
        build:
          "A custom fine-tuned image generator on a personal domain — their school, their city, their family's style. They keep the model and weights.",
        skills: ["Diffusion", "Latent diffusion", "Fine-tuning"],
      },
      {
        number: "05",
        theme: "Capstone — build and iterate",
        learn:
          "Synthesizing the year into one ambitious project. System design integrating multiple modalities. Production engineering at the right level. Iteration on real user feedback.",
        build:
          "Their capstone deployed live at a public URL with at least 25 real users — refined across two measurable iterations based on actual usage.",
        skills: ["System design", "Production AI", "User research"],
      },
      {
        number: "06",
        theme: "Launch + Portfolio + Flagship Expo",
        learn:
          "Writing a launch post that lands. Custom-domain portfolios. Pitching to a guest founder panel. College-application essay craft.",
        build:
          "Public launch + custom-domain portfolio (yourname.in) + five-minute pitch on stage at Flagship Expo Day — ready for college and internship applications.",
        skills: ["Launch craft", "Portfolio", "Pitching"],
      },
    ],
    outcome: {
      headline: "A frontier AI builder ready for college and what comes after.",
      deliverables: [
        "Mastery of the frontier AI techniques shipping in 2026 — multimodal vision-language models, real-time voice agents, diffusion-based generative models",
        "A real shipped capstone deployed live, instrumented with real users, publicly launched, defended on stage",
        "A custom-domain portfolio (yourname.in) and a five-minute pitch — built for college applications, internships, and every conversation that follows",
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

              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="ui-label mb-1.5"
                    style={{ color: "rgba(15,15,15,0.45)" }}
                  >
                    Concepts
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
