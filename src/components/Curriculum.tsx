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
    stage: "Foundations",
    tagline: "Computational thinking + AI literacy.",
    description:
      "Where MIT 6.0001 and Harvard CS50 begin — the four pillars of computational thinking, the history of AI, and how today's chatbots actually generate text.",
    modules: [
      {
        number: "01",
        theme: "Computational thinking",
        learn:
          "Decomposition, pattern recognition, abstraction, and algorithms — the four pillars CS50 opens with. Pseudocode, flowcharts, sorting and searching by hand. Binary representation of text, images, and sound.",
        skills: ["Computational thinking", "Algorithms", "Binary"],
      },
      {
        number: "02",
        theme: "What AI is, where it came from",
        learn:
          "Turing test (1950), Dartmouth Workshop (1956), the two AI winters and why they happened. Symbolic AI vs Machine Learning vs Deep Learning vs Generative AI. Reading a timeline of the field.",
        skills: ["AI history", "AI taxonomy"],
      },
      {
        number: "03",
        theme: "Pattern recognition and rules",
        learn:
          "Rules-based (symbolic) AI — if-then-else logic, decision trees by hand, expert systems. Why hand-coded rules don't scale, and why machines need to learn patterns from data instead.",
        skills: ["Symbolic AI", "Decision trees", "Boolean logic"],
      },
      {
        number: "04",
        theme: "Data — the food of AI",
        learn:
          "Structured vs unstructured data. What makes a dataset good or bad. Sampling bias illustrated with concrete examples. Data privacy, consent, and the right to be forgotten at a beginner level.",
        skills: ["Data literacy", "Sampling bias", "Privacy"],
      },
      {
        number: "05",
        theme: "How chatbots actually work",
        learn:
          "Tokenization (text → numbers). Next-token prediction as the core idea behind every LLM. Why LLMs hallucinate. Hands-on prompt experimentation with measurable changes in output.",
        skills: ["Tokenization", "Next-token prediction", "Hallucinations"],
      },
      {
        number: "06",
        theme: "AI ethics and the future",
        learn:
          "Algorithmic bias and fairness. Job displacement framed against historical parallels (the loom, the ATM). Identifying deepfakes. Reading and discussing a real AI ethics case study.",
        skills: ["AI ethics", "Bias and fairness", "Deepfake literacy"],
      },
    ],
  },
  {
    grade: "Class 6",
    stage: "Classical AI",
    tagline: "The algorithms behind every AI engineer.",
    description:
      "The classical AI of MIT 6.034 (Patrick Winston) and Harvard CS50 AI — search, logic, probability, optimization. Foundations every modern AI engineer still needs.",
    modules: [
      {
        number: "01",
        theme: "Search algorithms",
        learn:
          "State spaces, nodes, edges. Depth-first and breadth-first search by hand on mazes. Heuristics (Manhattan, Euclidean). A* search. The trade-off between optimality and speed.",
        skills: ["BFS / DFS", "Heuristics", "A* search"],
      },
      {
        number: "02",
        theme: "Adversarial search and games",
        learn:
          "Game trees on tic-tac-toe (drawn by hand, every node). Minimax algorithm. Alpha-beta pruning. Why Stockfish beats humans, and how AlphaZero is fundamentally different.",
        skills: ["Game trees", "Minimax", "Alpha-beta pruning"],
      },
      {
        number: "03",
        theme: "Logic and knowledge",
        learn:
          "Propositional logic (AND, OR, NOT, IMPLIES). Truth tables. Modus ponens and inference rules. Knowledge bases. Solving the Wumpus World — the classic CS50 AI exercise — by formal inference.",
        skills: ["Propositional logic", "Inference", "Knowledge bases"],
      },
      {
        number: "04",
        theme: "Probability and uncertainty",
        learn:
          "Sample spaces, events, conditional probability. Bayes' theorem with concrete medical-test and spam-filter examples. Bayesian networks with three- and four-node graphs. Why uncertainty is unavoidable.",
        skills: ["Probability", "Bayes' theorem", "Bayesian networks"],
      },
      {
        number: "05",
        theme: "Optimization",
        learn:
          "Hill climbing and why local search gets stuck in local maxima. Simulated annealing. Genetic algorithms — population, fitness, crossover, mutation. Constraint satisfaction problems (CSPs).",
        skills: ["Local search", "Simulated annealing", "Genetic algorithms"],
      },
      {
        number: "06",
        theme: "First taste of machine learning",
        learn:
          "Supervised vs unsupervised vs reinforcement learning. Train/validation/test split. Overfitting visualized. The bias-variance trade-off. Reading a confusion matrix; precision vs recall.",
        skills: ["Train/test split", "Overfitting", "Confusion matrix"],
      },
    ],
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
          "Functions, slopes, intercepts. Fitting a line to data. Mean squared error as a loss function. Why we minimize loss. Multivariable linear regression. Reading R² and residuals.",
        skills: ["Linear regression", "Loss functions", "MSE"],
      },
      {
        number: "02",
        theme: "Classification — the perceptron",
        learn:
          "Binary classification. The perceptron (Rosenblatt, 1958) — the first artificial neuron. Decision boundaries. Logistic regression and the sigmoid. Why a single neuron can't solve XOR.",
        skills: ["Perceptron", "Logistic regression", "Decision boundaries"],
      },
      {
        number: "03",
        theme: "Decision trees and ensembles",
        learn:
          "Decision tree learning, entropy, and information gain. Pruning to fight overfitting. Random forests as an ensemble. Gradient-boosted trees (XGBoost) at intuition level. Feature importance.",
        skills: ["Decision trees", "Information gain", "Random forests"],
      },
      {
        number: "04",
        theme: "Unsupervised learning",
        learn:
          "K-means clustering visualized. Choosing k via the elbow method. Hierarchical clustering. Dimensionality reduction with PCA at intuition level. Anomaly detection.",
        skills: ["K-means", "PCA", "Anomaly detection"],
      },
      {
        number: "05",
        theme: "Working with data in Python",
        learn:
          "NumPy arrays, Pandas DataFrames, Matplotlib for visualization. The scikit-learn fit/predict/score workflow. Cross-validation. Building a complete ML project end-to-end on a real dataset.",
        skills: ["NumPy", "Pandas", "scikit-learn"],
      },
      {
        number: "06",
        theme: "Reinforcement learning intro",
        learn:
          "Agents, environments, states, actions, rewards. Markov decision processes. Q-learning on a grid world. Why reinforcement learning is fundamentally different from supervised learning.",
        skills: ["MDPs", "Q-learning", "Reward design"],
      },
    ],
  },
  {
    grade: "Class 8",
    stage: "Deep Learning",
    tagline: "Karpathy's 'Zero to Hero'.",
    description:
      "MIT 6.S191 and Andrej Karpathy's 'Neural Networks: Zero to Hero' — neural nets, backpropagation, embeddings, attention, transformers. The building blocks of modern AI.",
    modules: [
      {
        number: "01",
        theme: "Neural network anatomy",
        learn:
          "The biological neuron analogy and where it breaks. Multi-layer perceptrons. Activation functions (ReLU, sigmoid, tanh, softmax). Forward propagation. The universal approximation theorem.",
        skills: ["MLPs", "Activations", "Forward pass"],
      },
      {
        number: "02",
        theme: "Training neural networks",
        learn:
          "Loss functions (cross-entropy, MSE). Gradient descent visualized as a ball on a surface. Backpropagation derived step-by-step (3Blue1Brown's approach). Learning rate, batch size, epochs. SGD vs Adam.",
        skills: ["Backpropagation", "Gradient descent", "Optimizers"],
      },
      {
        number: "03",
        theme: "Convolutional Neural Networks",
        learn:
          "The convolution operation. Pooling layers. Translation invariance. The historical arc — LeNet → AlexNet (2012, the ImageNet moment) → ResNet. Image classification end-to-end on CIFAR-10.",
        skills: ["CNNs", "Convolutions", "ImageNet"],
      },
      {
        number: "04",
        theme: "Sequence models",
        learn:
          "Recurrent Neural Networks and the loop concept. The vanishing gradient problem. LSTMs and GRUs as gated memory. Sequence-to-sequence problems (translation). Why RNNs were replaced.",
        skills: ["RNNs", "LSTMs", "Seq2seq"],
      },
      {
        number: "05",
        theme: "Embeddings and word vectors",
        learn:
          "Word2Vec — CBOW and Skip-gram. Words as vectors in high-dimensional space. Vector arithmetic (king − man + woman ≈ queen). Cosine similarity. Modern sentence embeddings.",
        skills: ["Word2Vec", "Embeddings", "Cosine similarity"],
      },
      {
        number: "06",
        theme: "The Transformer architecture",
        learn:
          "Reading 'Attention Is All You Need' (Vaswani 2017). Self-attention with Query, Key, Value. Multi-head attention. Positional encoding. Encoder vs decoder (BERT vs GPT). Building a tiny GPT from scratch.",
        skills: ["Transformers", "Self-attention", "GPT architecture"],
      },
    ],
  },
  {
    grade: "Class 9",
    stage: "Applied Modern AI",
    tagline: "Stanford CS224N + CS231N.",
    description:
      "What Stanford's CS224N (NLP), CS231N (computer vision), and CS285 (deep RL) teach — RAG, fine-tuning, agents, vision pipelines, RLHF. Production-grade material.",
    modules: [
      {
        number: "01",
        theme: "Foundation models",
        learn:
          "Pretraining vs fine-tuning vs prompting. LoRA and parameter-efficient fine-tuning. Open-weight (Llama, Mistral, DeepSeek) vs closed (GPT, Claude, Gemini). Cost economics. The Hugging Face ecosystem.",
        skills: ["Foundation models", "LoRA", "Hugging Face"],
      },
      {
        number: "02",
        theme: "Retrieval-Augmented Generation",
        learn:
          "Why pretraining is frozen knowledge. Embedding stores and vector databases (Chroma, Pinecone, pgvector). Chunking strategies. Hybrid search (semantic + BM25). Reranking. Building a real RAG pipeline.",
        skills: ["RAG", "Vector DBs", "Hybrid search"],
      },
      {
        number: "03",
        theme: "Agents and tool use",
        learn:
          "Function calling and structured output. The ReAct pattern (Reasoning + Acting). Tool ecosystems (search, code execution, browsers). Multi-agent orchestration. The limits of today's agents.",
        skills: ["Agents", "ReAct", "Tool use"],
      },
      {
        number: "04",
        theme: "Computer vision pipelines",
        learn:
          "Object detection (YOLO, DETR). Segmentation (Segment Anything). Vision-language models (CLIP, GPT-4V). Diffusion models for image generation at intuition level. Vision pipelines in robotics.",
        skills: ["Object detection", "SAM", "Diffusion models"],
      },
      {
        number: "05",
        theme: "Reinforcement learning at scale",
        learn:
          "Policy gradients (REINFORCE intuitively). Actor-critic methods (A2C, PPO). Reward shaping. RLHF (Reinforcement Learning from Human Feedback). AlphaGo, AlphaZero, and OpenAI Five as case studies.",
        skills: ["Policy gradients", "PPO", "RLHF"],
      },
      {
        number: "06",
        theme: "Embodied AI and robotics",
        learn:
          "ROS (Robot Operating System) basics. SLAM (Simultaneous Localization and Mapping). Imitation learning and behavior cloning. The reality gap and sim-to-real. Modern humanoids (Tesla Optimus, Boston Dynamics).",
        skills: ["ROS", "SLAM", "Imitation learning"],
      },
    ],
  },
  {
    grade: "Class 10",
    stage: "Research-Grade",
    tagline: "Where the papers live.",
    description:
      "Where Anthropic, OpenAI, and DeepMind research live — scaling laws, alignment, mechanistic interpretability, eval harnesses. Read the papers, replicate the results, ship a thesis project.",
    modules: [
      {
        number: "01",
        theme: "Scaling laws and evaluation",
        learn:
          "Kaplan and Chinchilla scaling laws. Compute-optimal training. Benchmark suites (HELM, MMLU, GPQA, SWE-bench, ARC-AGI). Test contamination and the leaderboard problem. Writing an honest eval report.",
        skills: ["Scaling laws", "Benchmarks", "Eval harnesses"],
      },
      {
        number: "02",
        theme: "Alignment and safety",
        learn:
          "The alignment problem from first principles. RLHF in depth. Constitutional AI (Anthropic). Reward hacking and specification gaming. Reading a model card and a published safety policy.",
        skills: ["Alignment", "Constitutional AI", "Reward hacking"],
      },
      {
        number: "03",
        theme: "Mechanistic interpretability",
        learn:
          "What is a circuit? Probing and activation patching. Sparse autoencoders and feature discovery (Anthropic's recent work). Reading interpretability papers from Distill.pub and the Transformer Circuits thread.",
        skills: ["Interpretability", "Probing", "SAEs"],
      },
      {
        number: "04",
        theme: "Research methodology",
        learn:
          "Reading a paper using the three-pass method (Keshav). Replicating a published result. Designing experimental protocols. Statistical significance and reporting. Maintaining a real research notebook.",
        skills: ["Paper reading", "Replication", "Methodology"],
      },
      {
        number: "05",
        theme: "Production AI engineering",
        learn:
          "Latency, throughput, batching. Quantization and distillation. Deployment with vLLM, llama.cpp, ONNX. Observability for AI systems. Cost optimization. A/B testing and feature-flagging AI features.",
        skills: ["Deployment", "Quantization", "Observability"],
      },
      {
        number: "06",
        theme: "Frontier and portfolio",
        learn:
          "Frontier agentic systems (Devin, OpenAI Operator, Claude Code). Multi-modal frontier (Sora, Veo, Suno). The open-source frontier (Llama, DeepSeek, Mistral). Final pitch and portfolio handover for college applications.",
        skills: ["Frontier awareness", "Portfolio", "Pitching"],
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
          University-grade AI, <em>age-adjusted for every class.</em>
        </h2>
        <p className="section-body mb-4">
          Drawn from open courseware at MIT, Harvard, and Stanford, and from
          the people who built modern AI — Karpathy, 3Blue1Brown, the Anthropic
          and OpenAI research blogs. Adapted to how students at each grade can
          actually absorb it.
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
