import { useState } from "react";

import { NeuralZoom } from "./NeuralZoom";
import { Reveal } from "../Reveal";

const measures = [
  {
    tag: "Logic & patterns",
    name: "Reasoning",
    desc: "Structured thinking under time — sequences, deduction, and pattern-spotting. The stuff that predicts how fast you learn new tools.",
  },
  {
    tag: "Problem framing",
    name: "Curiosity",
    desc: "How you attack a problem you've never seen before — the single best early signal of builder potential.",
  },
  {
    tag: "The unknown",
    name: "Builder instinct",
    desc: "Given something unfamiliar, do you freeze or start taking it apart? We're looking for the second kind.",
  },
];

const options = [-2, 0, 2, 10];
const correctAnswer = 2;

export function InsideChallenge() {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const gotIt = picked === correctAnswer;

  return (
    <section id="challenge" className="section-shell relative z-10">
      <Reveal className="section-copy">
        <p className="section-kicker mb-4">Inside the Challenge · Phase 1</p>
        <h2 className="section-heading mb-6">
          One hour. Here&apos;s exactly <em>what&apos;s in it.</em>
        </h2>
        <p className="section-body mb-14">
          No prep, no coding, no textbooks. A one-hour online challenge you
          take from home, testing the three signals that predict a builder —
          calibrated for your grade, Class 6–10.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <p className="ui-label mb-5" style={{ color: "#1335b8" }}>
          What it measures
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {measures.map((m) => (
            <div key={m.name} className="ui-card rounded-[1.75rem] p-6">
              <p className="ui-label mb-4">{m.tag}</p>
              <h3 className="ui-h3">{m.name}</h3>
              <p className="ui-body-sm mt-3">{m.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal
        delay={120}
        className="mt-8 overflow-hidden rounded-[1.75rem] px-7 py-8 sm:px-10 sm:py-10"
        style={{ background: "#05081C" }}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Sample question · Run a real neuron
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              Don&apos;t take our word for it.{" "}
              <em className="display-script">Try one.</em>
            </h3>
            <p
              className="mt-4 max-w-md"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              This is an actual building block of ChatGPT — a single neuron.
              Researchers stack billions of them. You&apos;re about to run
              one.
            </p>
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-7"
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              inputs [2, −1]&ensp;·&ensp;weights [3, 4]
            </p>
            <p
              className="mt-1.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              A neuron multiplies each input by its weight and adds the
              results. If the total is negative, it outputs 0 — the ReLU
              rule. What does this neuron output?
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {options.map((opt) => {
                const isPicked = picked === opt;
                const isCorrect = opt === correctAnswer;
                const showCorrect = answered && isCorrect;
                const showWrong = answered && isPicked && !isCorrect;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={answered}
                    onClick={() => setPicked(opt)}
                    className="rounded-full px-6 py-2.5 transition-colors"
                    style={{
                      border: showCorrect
                        ? "1px solid #34d399"
                        : showWrong
                          ? "1px solid #f87171"
                          : "1px solid rgba(255,255,255,0.28)",
                      background: showCorrect
                        ? "rgba(52,211,153,0.14)"
                        : showWrong
                          ? "rgba(248,113,113,0.14)"
                          : "rgba(255,255,255,0.06)",
                      color: showCorrect
                        ? "#34d399"
                        : showWrong
                          ? "#f87171"
                          : "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: answered ? "default" : "pointer",
                      opacity: answered && !isPicked && !isCorrect ? 0.4 : 1,
                    }}
                  >
                    {opt < 0 ? `−${Math.abs(opt)}` : opt}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="animate-fade-rise mt-6">
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: gotIt ? "#34d399" : "#f87171",
                    fontWeight: 600,
                  }}
                >
                  {gotIt
                    ? "Correct — (2 × 3) + (−1 × 4) = 2. Positive, so ReLU passes it through: the neuron fires 2."
                    : "Not quite — (2 × 3) + (−1 × 4) = 6 − 4 = 2. Positive, so ReLU lets it through: the output is 2."}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {gotIt
                    ? "You just ran a forward pass through a real neuron — weights, ReLU activation, the works. Now watch what it's part of."
                    : "Scary words, simple math — a forward pass, weights, ReLU — and underneath, just multiply and add. Now watch what it's part of."}
                </p>
              </div>
            )}
          </div>
        </div>

        {answered && <NeuralZoom />}
      </Reveal>
    </section>
  );
}
