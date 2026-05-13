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
    stage: "Foundations",
    tagline: "Computational thinking + AI literacy.",
    description:
      "Where MIT 6.0001 and Harvard CS50 begin — the four pillars of computational thinking, the history of AI, and how today's chatbots actually generate text.",
    modules: [
      {
        number: "01",
        theme: "Computational thinking",
        learn:
          "Decomposition, pattern recognition, abstraction, algorithms. Pseudocode, flowcharts, sorting and searching by hand. Binary representation of text and images.",
        build:
          "A secret-message decoder: encode and decode their name in binary, then scale up to short messages friends can send each other.",
        skills: ["Computational thinking", "Algorithms", "Binary"],
      },
      {
        number: "02",
        theme: "What AI is, where it came from",
        learn:
          "Turing test (1950), Dartmouth Workshop (1956), the two AI winters. Symbolic AI vs ML vs Deep Learning vs Generative AI. The shape of today's AI landscape.",
        build:
          "An interactive AI history timeline — try a 1960s rule-based bot, a simple ML demo, and ChatGPT side by side. Write up what changed.",
        skills: ["AI history", "AI taxonomy"],
      },
      {
        number: "03",
        theme: "Pattern recognition and rules",
        learn:
          "Rules-based (symbolic) AI. If-then-else logic. Decision trees by hand. Expert systems and why hand-coded rules don't scale.",
        build:
          "A 'what pet should I get?' expert system — students design the decision tree and ship it as a working chatbot family can actually use.",
        skills: ["Symbolic AI", "Decision trees"],
      },
      {
        number: "04",
        theme: "Data — the food of AI",
        learn:
          "Structured vs unstructured data. What makes a dataset good or bad. Sampling bias with concrete examples. Privacy and consent at a beginner level.",
        build:
          "A class-survey dataset they collect, clean, and visualize — and then deliberately re-do once they spot the biases in the first version.",
        skills: ["Data literacy", "Sampling bias"],
      },
      {
        number: "05",
        theme: "How chatbots actually work",
        learn:
          "Tokenization (text → numbers). Next-token prediction as the core idea behind every LLM. Why models hallucinate. Hands-on prompt experimentation.",
        build:
          "A custom chatbot persona — a Hindi-speaking historical figure (Akbar, Kalpana Chawla, anyone) — built with carefully designed system prompts.",
        skills: ["Tokenization", "Prompt design"],
      },
      {
        number: "06",
        theme: "Ethics + first showcase",
        learn:
          "Algorithmic bias and fairness. Deepfake literacy. Job displacement framed against historical parallels. Reading and discussing a real ethics case.",
        build:
          "A short documentary explaining what they learned this year — written, voiced, and edited with AI assistance. Premieres at Flagship Expo Day.",
        skills: ["AI ethics", "Storytelling"],
      },
    ],
    outcome: {
      headline: "An AI-literate child — not just an AI user.",
      deliverables: [
        "Fluency in the vocabulary of modern AI — tokens, hallucinations, training, bias — they can hold their own in any AI conversation",
        "Five shipped projects: a binary message decoder, an AI history walkthrough, a working expert-system chatbot, a custom AI persona, and an AI-edited documentary",
        "The conceptual foundation every later year compounds on — they will never look at ChatGPT the same way again",
      ],
    },
  },
  {
    grade: "Class 6",
    stage: "Classical AI",
    tagline: "The algorithms behind every AI engineer.",
    description:
      "The classical AI of MIT 6.034 and Harvard CS50 AI — search, logic, probability, optimization. Foundations every modern AI engineer still uses.",
    modules: [
      {
        number: "01",
        theme: "Search algorithms",
        learn:
          "State spaces, nodes, edges. Breadth-first and depth-first search by hand on mazes. Heuristics (Manhattan, Euclidean). A* search. Optimality vs speed.",
        build:
          "A maze-solving visualizer where students implement BFS and A* themselves and watch the algorithms 'think' as they explore the grid.",
        skills: ["BFS / DFS", "Heuristics", "A* search"],
      },
      {
        number: "02",
        theme: "Adversarial search and games",
        learn:
          "Game trees on tic-tac-toe drawn out by hand. Minimax algorithm. Alpha-beta pruning. Why Stockfish beats humans, and how AlphaZero is fundamentally different.",
        build:
          "A tic-tac-toe AI that plays optimally — students code the minimax algorithm themselves and discover their bot can never lose.",
        skills: ["Minimax", "Alpha-beta pruning"],
      },
      {
        number: "03",
        theme: "Logic and knowledge",
        learn:
          "Propositional logic (AND, OR, NOT, IMPLIES). Truth tables. Modus ponens. Knowledge bases and the Wumpus World — the classic CS50 AI exercise.",
        build:
          "A 'who stole the cookie' mystery solver — students model suspects and clues as logic statements and have the AI deduce the culprit.",
        skills: ["Propositional logic", "Inference"],
      },
      {
        number: "04",
        theme: "Probability and uncertainty",
        learn:
          "Sample spaces, conditional probability. Bayes' theorem on medical-test and spam-filter examples. Bayesian networks. Why uncertainty is unavoidable.",
        build:
          "A Naive Bayes spam classifier students train on their own message data — they watch precision and recall change as they add training examples.",
        skills: ["Bayes' theorem", "Naive Bayes"],
      },
      {
        number: "05",
        theme: "Optimization",
        learn:
          "Hill climbing and the local-maxima problem. Simulated annealing. Genetic algorithms — population, fitness, crossover, mutation. Constraint satisfaction.",
        build:
          "A genetic algorithm that evolves a Mario-style character to clear a level — students watch hundreds of generations get smarter on screen.",
        skills: ["Local search", "Genetic algorithms"],
      },
      {
        number: "06",
        theme: "First ML + showcase",
        learn:
          "Supervised vs unsupervised vs reinforcement learning. Train/validation/test split. Overfitting visualized. Bias-variance trade-off. Confusion matrices.",
        build:
          "A polished version of one project from the year — presented on stage at Flagship Expo Day to parents, mentors, and a founder panel.",
        skills: ["Train/test split", "Public demo"],
      },
    ],
    outcome: {
      headline: "A student fluent in the classical AI every engineer still uses.",
      deliverables: [
        "The algorithms behind every modern AI system — search (BFS, DFS, A*), game trees with minimax, propositional logic, Bayesian inference, optimization",
        "Five shipped projects, including a tic-tac-toe AI that never loses, a Naive Bayes spam classifier trained on real data, and a genetic algorithm that evolves a Mario-style level",
        "A computer-science foundation that compounds — every AI year after this sits on top of these algorithms",
      ],
    },
  },
  {
    grade: "Class 7",
    stage: "Machine Learning",
    tagline: "Andrew Ng's foundations, age-adjusted.",
    description:
      "The supervised, unsupervised, and reinforcement learning of Andrew Ng's CS229 classic — written for thirteen-year-olds, without dilution.",
    modules: [
      {
        number: "01",
        theme: "Linear regression",
        learn:
          "Functions, slopes, intercepts. Fitting a line to data. Mean squared error as a loss function. Multivariable linear regression. Reading R² and residuals.",
        build:
          "A house-price predictor for their own city — using real listings scraped from MagicBricks. Visualize the line of best fit live.",
        skills: ["Regression", "MSE", "Visualization"],
      },
      {
        number: "02",
        theme: "Classification — the perceptron",
        learn:
          "Binary classification. The perceptron (Rosenblatt, 1958). Decision boundaries. Logistic regression and the sigmoid. Why a single neuron can't solve XOR.",
        build:
          "A handwritten-digit recognizer — students scan their own notebook digits, label them, and train a perceptron from scratch in NumPy.",
        skills: ["Perceptron", "Logistic regression"],
      },
      {
        number: "03",
        theme: "Decision trees and ensembles",
        learn:
          "Decision tree learning. Entropy and information gain. Pruning. Random forests as ensembles. Gradient-boosted trees (XGBoost) at intuition level.",
        build:
          "A 'will my favorite IPL team win?' predictor — trained on years of match data — that explains exactly why it made each prediction.",
        skills: ["Decision trees", "Random forests"],
      },
      {
        number: "04",
        theme: "Unsupervised learning",
        learn:
          "K-means clustering visualized. Choosing k via the elbow method. Hierarchical clustering. PCA at intuition level. Anomaly detection.",
        build:
          "A music-mood clusterer that takes their own Spotify history and groups songs into 'study', 'workout', 'sad', and 'party' — automatically.",
        skills: ["K-means", "PCA", "Clustering"],
      },
      {
        number: "05",
        theme: "Working with data in Python",
        learn:
          "NumPy arrays. Pandas DataFrames. Matplotlib for visualization. The scikit-learn fit/predict/score workflow. Cross-validation. Building real ML projects end-to-end.",
        build:
          "A complete ML project shipped as a Streamlit web app — topic of their choice — from CSV to deployed URL anyone can visit.",
        skills: ["Pandas", "scikit-learn", "Streamlit"],
      },
      {
        number: "06",
        theme: "Reinforcement learning + showcase",
        learn:
          "Agents, environments, states, actions, rewards. Markov decision processes. Q-learning on grid worlds. Why RL is fundamentally different from supervised learning.",
        build:
          "An RL agent that learns to play Snake — students watch it die a thousand times before getting good. Pitched at Flagship Expo Day.",
        skills: ["Q-learning", "MDPs", "RL demo"],
      },
    ],
    outcome: {
      headline: "A working machine-learning engineer at age 13.",
      deliverables: [
        "The full ML toolkit from first principles — regression, classification, decision trees, clustering, PCA, and reinforcement learning",
        "Six shipped projects deployed live, including a city-specific house-price predictor, a music-mood clusterer of their own Spotify history, an end-to-end Streamlit app, and an RL agent that plays Snake",
        "Working fluency in the same Python ML stack used at every Indian AI startup — NumPy, Pandas, scikit-learn, Streamlit",
      ],
    },
  },
  {
    grade: "Class 8",
    stage: "Deep Learning",
    tagline: "Karpathy's 'Zero to Hero'.",
    description:
      "MIT 6.S191 and Andrej Karpathy's 'Neural Networks: Zero to Hero' — neural nets, backprop, embeddings, attention, transformers. The building blocks of modern AI.",
    modules: [
      {
        number: "01",
        theme: "Neural network anatomy",
        learn:
          "The biological neuron analogy and where it breaks. Multi-layer perceptrons. ReLU, sigmoid, tanh, softmax. Forward propagation. The universal approximation theorem.",
        build:
          "A neural network from scratch in NumPy that classifies students' own pencil drawings of fruit — apple, banana, mango, none of the above.",
        skills: ["MLPs", "Activations", "Forward pass"],
      },
      {
        number: "02",
        theme: "Training neural networks",
        learn:
          "Cross-entropy and MSE. Gradient descent visualized. Backpropagation derived step by step. Learning rate, batch size, epochs. SGD vs Adam.",
        build:
          "Train a digit recognizer on MNIST — the canonical 'hello world' of deep learning. Watch accuracy climb live across epochs.",
        skills: ["Backpropagation", "Gradient descent"],
      },
      {
        number: "03",
        theme: "Convolutional Neural Networks",
        learn:
          "The convolution operation. Pooling layers. Translation invariance. The historical arc — LeNet → AlexNet (2012, the ImageNet moment) → ResNet.",
        build:
          "A CNN that recognizes Indian street food from photos — students collect their own dataset around their neighborhood and train it from scratch.",
        skills: ["CNNs", "Convolutions"],
      },
      {
        number: "04",
        theme: "Sequence models",
        learn:
          "Recurrent Neural Networks and the loop concept. The vanishing gradient problem. LSTMs and GRUs as gated memory. Sequence-to-sequence problems.",
        build:
          "A poetry generator trained on classical Hindi or Urdu verse — they hear the model dream up its own ghazals after every training run.",
        skills: ["RNNs", "LSTMs"],
      },
      {
        number: "05",
        theme: "Embeddings and word vectors",
        learn:
          "Word2Vec — CBOW and Skip-gram. Words as vectors in high-dimensional space. Vector arithmetic (king − man + woman ≈ queen). Cosine similarity.",
        build:
          "A semantic search engine over their own school notes — 'find me everything about photosynthesis' works even when those exact words aren't there.",
        skills: ["Word2Vec", "Semantic search"],
      },
      {
        number: "06",
        theme: "Transformers + showcase",
        learn:
          "Reading 'Attention Is All You Need' (Vaswani 2017). Self-attention with Query, Key, Value. Multi-head attention. Positional encoding. Encoder vs decoder (BERT vs GPT).",
        build:
          "Their own miniature GPT that writes in their style, trained on three years of their own essays. Pitched at Flagship Expo Day.",
        skills: ["Transformers", "GPT", "Self-attention"],
      },
    ],
    outcome: {
      headline: "A deep-learning practitioner who can read papers and build from scratch.",
      deliverables: [
        "Real understanding of how modern AI works — neural nets, backpropagation, CNNs, RNNs, embeddings, and the transformer architecture",
        "Six shipped deep-learning projects, including a NumPy-only neural net, an MNIST classifier, an Indian street-food CNN, and a miniature GPT trained on their own writing",
        "The ability to open 'Attention Is All You Need' and actually understand what it says — a skill most CS undergraduates struggle with",
      ],
    },
  },
  {
    grade: "Class 9",
    stage: "Applied Modern AI",
    tagline: "Real systems, shipped to real users.",
    description:
      "What Stanford's CS224N and CS231N teach in practice — RAG, fine-tuning, agents, vision pipelines, RLHF. Built and shipped to actual users, not just on a notebook.",
    modules: [
      {
        number: "01",
        theme: "Foundation models",
        learn:
          "Pretraining vs fine-tuning vs prompting. LoRA and parameter-efficient fine-tuning. Open-weight (Llama, Mistral, DeepSeek) vs closed (GPT, Claude, Gemini). Cost economics.",
        build:
          "A fine-tuned model that writes in their teacher's marking style — so they can pre-grade essays before submission. Shipped via Hugging Face.",
        skills: ["Fine-tuning", "LoRA", "Hugging Face"],
      },
      {
        number: "02",
        theme: "Retrieval-Augmented Generation",
        learn:
          "Why pretraining is frozen knowledge. Embedding stores and vector databases (Chroma, Pinecone, pgvector). Chunking strategies. Hybrid search. Reranking.",
        build:
          "A WhatsApp chatbot for their school that answers 'when is the next exam?' using every circular and notice the school has ever sent.",
        skills: ["RAG", "Vector DBs"],
      },
      {
        number: "03",
        theme: "Agents and tool use",
        learn:
          "Function calling and structured output. The ReAct pattern (Reasoning + Acting). Tool ecosystems — search, code execution, browser. Multi-agent orchestration.",
        build:
          "An agent that books a movie ticket end-to-end — checks showtimes, picks seats by your preference, and holds a reservation under your name.",
        skills: ["Agents", "ReAct", "Function calling"],
      },
      {
        number: "04",
        theme: "Computer vision pipelines",
        learn:
          "Object detection (YOLO, DETR). Segmentation (Segment Anything). Vision-language models (CLIP, GPT-4V). Diffusion models for image generation.",
        build:
          "A wildlife counter for their colony — uploads from a phone-cam set on the balcony, identifies and counts every bird that visits the feeder.",
        skills: ["YOLO", "CLIP", "Vision pipelines"],
      },
      {
        number: "05",
        theme: "Learning from feedback",
        learn:
          "Policy gradients (REINFORCE). Actor-critic methods (PPO). Reward shaping. RLHF (Reinforcement Learning from Human Feedback). AlphaGo as a case study.",
        build:
          "A small chatbot that students train with thumbs-up / thumbs-down feedback over a week — and visibly watch get better at their preferences.",
        skills: ["PPO", "RLHF"],
      },
      {
        number: "06",
        theme: "Embodied AI + showcase",
        learn:
          "ROS (Robot Operating System) basics. SLAM (Simultaneous Localization and Mapping). Imitation learning. The reality gap and sim-to-real. Modern humanoids.",
        build:
          "A self-driving cardboard car — Raspberry Pi, vision-guided, navigates a hand-drawn track on stage at Flagship Expo Day.",
        skills: ["ROS", "SLAM", "Robotics"],
      },
    ],
    outcome: {
      headline: "A production AI engineer with a portfolio that competes with college students.",
      deliverables: [
        "The skills modern AI engineers actually ship with — fine-tuning with LoRA, RAG over vector databases, agents with tool use, vision pipelines, RLHF, and robotics",
        "Six shipped production-grade projects, including a fine-tuned Hugging Face model, a school WhatsApp RAG bot, a movie-booking agent, and a self-driving cardboard car",
        "An internship-ready public portfolio of working systems — not screenshots, not demos, real software running at real URLs",
      ],
    },
  },
  {
    grade: "Class 10",
    stage: "Capstone & Launch",
    tagline: "Build something real. Ship it to real users.",
    description:
      "A year-long thesis project, built like a real product team would — designed, engineered, deployed, optimized, launched, and handed off as a portfolio recruiters and college admissions can see.",
    modules: [
      {
        number: "01",
        theme: "Choose a thesis",
        learn:
          "Scoping a real product. Defining success criteria. Identifying real users. Risk assessment. Working with a senior mentor to size the project realistically.",
        build:
          "A written project brief — what they'll build, who it's for, what 'done' looks like — reviewed and signed off by an IIT/IIM mentor.",
        skills: ["Scoping", "Product brief"],
      },
      {
        number: "02",
        theme: "Build the v1",
        learn:
          "System design. Choosing the right model for the task. Cost-aware engineering. Deploying via Vercel, Railway, or Hugging Face Spaces. Domains and HTTPS.",
        build:
          "First fully working version of their thesis project, deployed live at a public URL their family and friends can actually visit and use.",
        skills: ["System design", "Deployment"],
      },
      {
        number: "03",
        theme: "Production engineering",
        learn:
          "Latency, throughput, batching. Quantization and distillation. Deployment with vLLM and llama.cpp. Observability for AI systems. Cost optimization.",
        build:
          "Optimize their v1 — cut token costs by 50%, halve P95 latency, add proper monitoring. Real measurements before and after.",
        skills: ["Production AI", "Optimization"],
      },
      {
        number: "04",
        theme: "Real users, real iteration",
        learn:
          "Recruiting first users without a budget. Setting up analytics. Reading dashboards. Running structured interviews. Iterating on signal, not opinion.",
        build:
          "Get 50 real users on their thesis project. Run interviews. Ship three measurable iterations based on what they hear.",
        skills: ["User research", "Analytics"],
      },
      {
        number: "05",
        theme: "Public launch",
        learn:
          "Writing a launch post that lands. Story structure. Choosing channels (Twitter, LinkedIn, Product Hunt). Anticipating questions. Handling momentum.",
        build:
          "Public launch — a written launch post and a coordinated push across LinkedIn, X, and Product Hunt. Track real engagement and traffic.",
        skills: ["Launch craft", "Writing"],
      },
      {
        number: "06",
        theme: "Portfolio + Flagship Expo",
        learn:
          "Building a custom-domain portfolio. Selecting which projects to feature. Crafting a self-introduction. Pitching to a guest panel of founders.",
        build:
          "A custom-domain portfolio (yourname.in) and a final five-minute pitch on stage — ready to attach to college and internship applications.",
        skills: ["Portfolio", "Pitching"],
      },
    ],
    outcome: {
      headline: "A founder-track student with a launched product and a college-ready portfolio.",
      deliverables: [
        "A real launched thesis project with fifty-plus actual users, a public launch post, and measurable engagement",
        "The full product-engineering arc walked end-to-end — scope, v1, production optimization, user research, public launch, portfolio handover",
        "A custom-domain portfolio (yourname.in) that admissions committees and recruiters can actually open — proof of initiative no marksheet captures",
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
          Each year, a complete program. <em>Six years, a head start nothing else can match.</em>
        </h2>
        <p className="section-body mb-4">
          Every grade is a self-contained six-month program with its own
          outcome — your child walks away with real skills and shipped projects
          even if they only do one year. Stay six, and the years compound into
          something rare in any country, let alone India.
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
