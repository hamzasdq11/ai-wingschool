const rows = [
  {
    label: "What it teaches",
    coaching: "Memorise to score in an exam",
    wingschool: "Build to solve a real problem",
  },
  {
    label: "Output at the end",
    coaching: "A rank or percentage",
    wingschool: "Six shipped projects + portfolio",
  },
  {
    label: "Who teaches",
    coaching: "Mass-batched faculty",
    wingschool: "IIT &amp; IIM grads, ≤25 per cohort",
  },
  {
    label: "Where it leads",
    coaching: "Same path as everyone",
    wingschool: "A signal that stands out",
  },
  {
    label: "Time per week",
    coaching: "10–15 hrs after school",
    wingschool: "~5 hrs, school-friendly",
  },
  {
    label: "Cost / month",
    coaching: "₹8,000 – ₹25,000",
    wingschool: "₹4,999 – ₹12,999",
  },
];

export function Comparison() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Vs. coaching tuition</p>
        <h2 className="section-heading mb-6">
          You&apos;re already paying for the wrong thing.{" "}
          <em>Pay for what compounds.</em>
        </h2>
        <p className="section-body mb-14">
          The average urban Indian family spends ₹1.2L–₹3L a year on coaching.
          Wingschool is built so that money buys something AI cannot
          obsolete — taste, judgment, and a track record of building.
        </p>
      </div>

      <div className="ui-card overflow-hidden rounded-[1.75rem]">
        <div className="hidden grid-cols-[1.1fr_1fr_1.1fr] gap-px bg-[#ece9df] sm:grid">
          <div className="bg-white px-6 py-5">
            <span className="ui-label">Compare</span>
          </div>
          <div className="bg-white px-6 py-5">
            <span className="ui-label">Coaching tuition</span>
          </div>
          <div
            className="px-6 py-5"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(19,53,184,0.18), #ffffff 70%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1335b8]" />
              <span className="ui-label" style={{ color: "#1335b8" }}>
                AI Wingschool
              </span>
            </div>
          </div>

          {rows.map((r) => (
            <div key={r.label} className="contents">
              <div className="bg-white px-6 py-5">
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "#0a0a0a",
                  }}
                >
                  {r.label}
                </p>
              </div>
              <div className="bg-[#faf9f4] px-6 py-5">
                <p className="ui-body-sm" style={{ color: "#8a8a8a" }}>
                  {r.coaching}
                </p>
              </div>
              <div
                className="px-6 py-5"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(19,53,184,0.10), #ffffff 78%)",
                }}
              >
                <p
                  className="ui-body-sm"
                  style={{ color: "#0a0a0a", fontWeight: 500 }}
                  dangerouslySetInnerHTML={{ __html: r.wingschool }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col divide-y divide-[#ece9df] sm:hidden">
          {rows.map((r) => (
            <div key={r.label} className="px-6 py-5">
              <p className="ui-label mb-3">{r.label}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="ui-caption mb-1">Coaching</p>
                  <p className="ui-body-sm" style={{ color: "#8a8a8a" }}>
                    {r.coaching}
                  </p>
                </div>
                <div>
                  <p className="ui-caption mb-1" style={{ color: "#1335b8" }}>
                    Wingschool
                  </p>
                  <p
                    className="ui-body-sm"
                    style={{ color: "#0a0a0a", fontWeight: 500 }}
                    dangerouslySetInnerHTML={{ __html: r.wingschool }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
