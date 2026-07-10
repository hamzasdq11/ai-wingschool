export function AIEra() {
  const eras = [
    {
      year: "1956",
      label: "Rule-based",
      desc: "Computers told exactly what to do — if-this-then-that. No learning, no judgment.",
    },
    {
      year: "1990s",
      label: "Machine Learning",
      desc: "Machines start learning patterns from data instead of being hand-coded.",
    },
    {
      year: "2012",
      label: "Deep Learning",
      desc: "Neural networks unlock vision, speech, and translation at human levels.",
    },
    {
      year: "2022",
      label: "Generative AI",
      desc: "ChatGPT arrives. Machines write, design, and reason in language.",
    },
    {
      year: "2024+",
      label: "Agentic AI",
      desc: "AI doesn't just answer — it acts. Plans, decides, ships work across tools.",
    },
    {
      year: "2026",
      label: "Embodied AI",
      desc: "AI moves into the physical world — humanoid robots, smart homes, machines that see and act around your child.",
    },
  ];

  const kinds = [
    {
      tag: "Creates",
      name: "Generative AI",
      desc: "Writes essays, designs images, generates code from a single sentence. The kind your child already meets in ChatGPT, Gemini, and Midjourney.",
    },
    {
      tag: "Acts",
      name: "Agentic AI",
      desc: "Doesn't just answer — it does. Plans a trip, books the flights, drafts the code, ships the result. The shift defining 2025 onward.",
    },
    {
      tag: "Senses",
      name: "Multimodal AI",
      desc: "Sees, hears, speaks. Reads a maths problem from a photo and explains it aloud in Hindi. Tutors that finally feel human.",
    },
  ];

  // The Impact card is temporarily hidden — uncomment this array and the
  // matching block in the JSX below to restore.
  // const impact = [
  //   {
  //     value: "60 days",
  //     label: "ChatGPT to 100M users — the fastest-adopted product in history.",
  //   },
  //   {
  //     value: "Every",
  //     label: "major industry — finance, design, medicine, law — is rebuilding around AI.",
  //   },
  //   {
  //     value: "2030",
  //     label: "AI fluency will be what Excel was in 2010 — the baseline, not the edge.",
  //   },
  // ];

  return (
    <section id="ai-era" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">The AI era</p>
        <h2 className="section-heading mb-6">
          AI didn&apos;t arrive now. It&apos;s been arriving for{" "}
          <em>seventy years.</em>
        </h2>
        <p className="section-body mb-14">
          What changed is the speed. The last three years moved AI from research
          labs into your child&apos;s homework, your inbox, and every job
          they&apos;ll apply for. Here&apos;s the shape of what&apos;s coming —
          and why it can&apos;t be ignored.
        </p>
      </div>

      <div className="mb-20">
        <p className="ui-label mb-8" style={{ color: "#1335b8" }}>
          The evolution
        </p>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute hidden lg:block"
            style={{
              top: "0.85rem",
              left: "0.85rem",
              right: "calc((100% - 5rem) / 6 - 0.85rem)",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(19,53,184,0.12), rgba(19,53,184,0.45) 50%, rgba(19,53,184,0.12))",
            }}
          />

          <div className="grid gap-7 lg:grid-cols-6 lg:gap-4">
            {eras.map((era, i) => {
              const isModern = i >= 3;
              return (
                <div
                  key={era.year}
                  className="relative flex gap-4 lg:flex-col lg:gap-3"
                >
                  <div className="flex shrink-0 flex-col items-center lg:flex-row lg:items-start">
                    <span
                      className="relative flex h-[1.7rem] w-[1.7rem] shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isModern ? "#1335b8" : "#ffffff",
                        border: "1px solid #1335b8",
                        boxShadow: isModern
                          ? "0 0 0 6px rgba(19,53,184,0.08)"
                          : "none",
                      }}
                    >
                      <span
                        className="block h-2 w-2 rounded-full"
                        style={{ background: isModern ? "#ffffff" : "#1335b8" }}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1 lg:hidden"
                      style={{ background: "rgba(19,53,184,0.18)" }}
                    />
                  </div>

                  <div className="flex-1 pb-6 lg:pb-0 lg:pt-3">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "#1335b8",
                      }}
                    >
                      {era.year}
                    </p>
                    <h4
                      className="mt-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        letterSpacing: "-0.025em",
                        color: "#0a0a0a",
                        lineHeight: 1.15,
                      }}
                    >
                      {era.label}
                    </h4>
                    <p className="ui-body-sm mt-2">{era.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="mb-10 max-w-2xl">
          <p className="ui-label mb-4" style={{ color: "#1335b8" }}>
            What&apos;s here now
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.6vw, 2.7rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#0a0a0a",
            }}
          >
            Three kinds of AI your child <em>will use this year.</em>
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {kinds.map((k) => (
            <div
              key={k.name}
              className="ui-card flex flex-col gap-4 rounded-[1.75rem] p-7"
            >
              <span className="ui-label" style={{ color: "#1335b8" }}>
                {k.tag}
              </span>
              <h4 className="ui-h3">{k.name}</h4>
              <p className="ui-body-sm">{k.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Impact card temporarily hidden — uncomment to restore (also re-enable the `impact` array above)
      <div
        className="ui-card relative overflow-hidden rounded-[2rem] p-8 sm:p-12"
        style={{
          boxShadow:
            "0 1px 2px rgba(15,15,15,0.04), 0 30px 60px -28px rgba(19,53,184,0.18)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(19,53,184,0.14), transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        <div className="relative">
          <p className="ui-label mb-4" style={{ color: "#1335b8" }}>
            The impact
          </p>

          <div className="grid gap-6 border-b border-black/8 pb-10 sm:grid-cols-3">
            {impact.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.65rem",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    color: "#1335b8",
                    lineHeight: 1.05,
                  }}
                >
                  {s.value}
                </p>
                <p className="ui-body-sm mt-2 max-w-xs">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.85rem, 3.8vw, 2.85rem)",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                color: "#0a0a0a",
              }}
            >
              AI fluency in 2030 will be what literacy was in 2000 —{" "}
              <em>the baseline, not the edge.</em>
            </h3>

            <div>
              <p className="section-body">
                Your child needs a place that treats AI the way 1995 treated
                the internet — as the thing to{" "}
                <em className="display-script">build with,</em> not the thing
                to fear. That&apos;s the entire point of Wingschool.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#pricing" className="ui-button">
                  See the program →
                </a>
                <a href="#projects" className="ui-button-secondary">
                  See what kids build
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
    </section>
  );
}
