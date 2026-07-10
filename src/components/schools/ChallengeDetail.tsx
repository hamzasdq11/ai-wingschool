const measures = [
  {
    tag: "Logic & patterns",
    name: "Reasoning",
    desc: "Structured thinking under time — sequences, deduction, and the pattern-spotting that predicts how fast a student learns new tools.",
  },
  {
    tag: "Problem framing",
    name: "Curiosity",
    desc: "How a student frames an unfamiliar problem — the single best early signal of builder potential.",
  },
  {
    tag: "The unknown",
    name: "Builder instinct",
    desc: "Given something they've never seen, do they freeze or start taking it apart? We test for the second kind.",
  },
];

const participantGets = [
  "A WingsQuest 2026 participation certificate — no child goes home empty-handed.",
  "Their individual score band, shared privately.",
  "An invitation to the results assembly at your school.",
];

export function ChallengeDetail() {
  return (
    <section id="challenge" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Phase 1 · Free for everyone</p>
        <h2 className="section-heading mb-6">
          A free AI aptitude challenge, hosted <em>at your school.</em>
        </h2>
        <p className="section-body mb-14">
          One hour. Our proctors, our materials, our marking. A
          paper-or-tablet challenge testing logical reasoning, pattern
          recognition, and AI-readiness — calibrated by grade, Classes 5–10.
        </p>
      </div>

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

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="ui-card-soft rounded-[1.75rem] p-7">
          <p className="ui-label mb-4" style={{ color: "#1335b8" }}>
            Every participant gets
          </p>
          <ul className="flex flex-col gap-3">
            {participantGets.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.25rem_1fr] gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.925rem",
                  lineHeight: 1.6,
                  color: "#3a3a3a",
                }}
              >
                <span style={{ color: "#1335b8", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="ui-card rounded-[1.75rem] p-7"
          style={{ borderColor: "rgba(19, 53, 184, 0.35)" }}
        >
          <p className="ui-label mb-4" style={{ color: "#1335b8" }}>
            Your school gets — the report
          </p>
          <p className="ui-body">
            Within 10 days of the Challenge: a school-level analytics report —
            participation, grade-wise performance distribution, strongest
            cohorts, and your school&apos;s standout students. The kind of
            data that goes straight into your annual report and your next
            parent-teacher meeting.
          </p>
        </div>
      </div>
    </section>
  );
}
