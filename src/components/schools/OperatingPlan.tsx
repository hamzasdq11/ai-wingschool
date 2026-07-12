const timeline = [
  {
    when: "Phase 1",
    name: "The Challenge",
    desc: "WingsQuest 2026 — a free online AI aptitude challenge, open to all students of Class 6–10. One hour, no prep, no coding.",
    highlighted: true,
  },
  {
    when: "Phase 2",
    name: "The Selection",
    desc: "Everyone gets a scorecard and certificate. Top performers qualify for the AI Builder Program.",
    highlighted: false,
  },
  {
    when: "Phase 3",
    name: "AI Builder Program",
    desc: "Four weeks of live, hands-on classes with IIT/IIM mentors — you build a real AI project of your own.",
    highlighted: false,
  },
  {
    when: "Phase 4",
    name: "Flagship Expo Day",
    desc: "You present your project to a panel of industry experts and IIT/IIM alumni, and collect your certificate on stage.",
    highlighted: true,
  },
];

export function OperatingPlan() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">
          The timeline · Four phases, start to stage
        </p>
        <h2 className="section-heading mb-6">
          From sign-up to <em>Expo Day.</em>
        </h2>
        <p className="section-body mb-16">
          One free hour to enter. We carry everything else: the challenge,
          results, certificates, the program, the stage.
        </p>
      </div>

      <div className="relative">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[13px] hidden h-px lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(19,53,184,0.35), rgba(19,53,184,0.12))",
          }}
        />

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((era) => (
            <div key={era.when} className="relative">
              <span
                className="relative z-10 inline-flex items-center rounded-full px-3.5 py-1"
                style={
                  era.highlighted
                    ? {
                        background: "#1335b8",
                        border: "1px solid #1335b8",
                        color: "#ffffff",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.66rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        boxShadow: "0 6px 14px rgba(19, 53, 184, 0.3)",
                      }
                    : {
                        background: "#ffffff",
                        border: "1px solid rgba(19, 53, 184, 0.28)",
                        color: "#1335b8",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.66rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }
                }
              >
                {era.when}
              </span>

              <h3
                className="mt-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "#0a0a0a",
                }}
              >
                {era.name}
              </h3>
              <p className="ui-body-sm mt-2 max-w-[15rem]">{era.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="ui-caption mt-14">
        No school tie-up needed — WingsQuest is open to every student in
        Class 6–10. Questions? Write to hello@aiwingschool.com.
      </p>
    </section>
  );
}
