const timeline = [
  {
    when: "Week 0",
    name: "Your school signs up",
    desc: "One email from your principal. Done.",
    highlighted: false,
  },
  {
    when: "Week 1",
    name: "The notice goes out",
    desc: "You get the details and a consent form.",
    highlighted: false,
  },
  {
    when: "Week 2",
    name: "Challenge day",
    desc: "1 hour at your school. Our team runs it.",
    highlighted: true,
  },
  {
    when: "Week 3",
    name: "Results + certificates",
    desc: "Score bands shared; certificates handed out at assembly.",
    highlighted: false,
  },
  {
    when: "Weeks 4–8",
    name: "Build → Expo Day",
    desc: "Qualifiers build a real AI project with IIT/IIM mentors, then present at Flagship Expo Day.",
    highlighted: true,
  },
];

export function OperatingPlan() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">
          The timeline · Eight weeks, start to stage
        </p>
        <h2 className="section-heading mb-6">
          From the notice board to <em>Expo Day.</em>
        </h2>
        <p className="section-body mb-16">
          One hour of your time in week two. Everything else — papers,
          proctors, marking, certificates, the program, the stage — is
          carried by us.
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

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
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
        School not signed up yet? Tell your principal about WingsQuest — or
        point them to hello@aiwingschool.com. One email is all it takes.
      </p>
    </section>
  );
}
