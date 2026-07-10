const weeks = [
  {
    number: "01",
    title: "How AI actually works + prompts as a language",
    desc: "Mental models, safe-use habits, and prompting like an engineer — system prompts, examples, iteration.",
    ships: "A multi-step AI assistant they use daily.",
  },
  {
    number: "02",
    title: "AI that sees and speaks",
    desc: "Vision and voice — image understanding, and a talking, listening agent in their preferred language.",
    ships: "A working vision or voice demo.",
  },
  {
    number: "03",
    title: "AI that acts + project build",
    desc: "Agents that use tools and take action — then each student scopes and starts their own real project.",
    ships: "Project v1, live.",
  },
  {
    number: "04",
    title: "Polish + Expo prep",
    desc: "Engineering polish, storytelling, and demo rehearsal for Flagship Expo Day.",
    ships: "A finished project, presented on stage.",
  },
];

export function BuilderProgram() {
  return (
    <section id="builder-program" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Phase 3 · The AI Builder Program</p>
        <h2 className="section-heading mb-6">
          Four weeks. One real AI project. Taught by <em>IIT/IIM</em> grads.
        </h2>
        <p className="section-body mb-14">
          Qualifiers join a 4-week live online program — a compressed,
          project-first version of our flagship academy. They don&apos;t study
          AI. They build with it.
        </p>
      </div>

      <div className="flex flex-col">
        {weeks.map((week, idx) => (
          <div
            key={week.number}
            className={`grid items-start gap-y-5 border-t border-black/8 py-8 md:grid-cols-[110px_1fr_minmax(0,320px)] md:gap-x-12 md:py-10 lg:gap-x-16 ${
              idx === weeks.length - 1 ? "border-b border-black/8" : ""
            }`}
          >
            <div>
              <p className="ui-label">Week</p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)",
                  fontWeight: 300,
                  color: "#1335b8",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                {week.number}
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  color: "#0a0a0a",
                }}
              >
                {week.title}
              </h3>
              <p className="ui-body-sm mt-3 max-w-lg">{week.desc}</p>
            </div>

            <div className="ui-card-soft self-start rounded-[1.25rem] px-5 py-4">
              <p className="ui-label mb-2" style={{ color: "#1335b8" }}>
                Ships this week
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.925rem",
                  lineHeight: 1.5,
                  color: "#0a0a0a",
                }}
              >
                {week.ships}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
