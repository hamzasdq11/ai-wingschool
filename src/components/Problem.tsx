export function Problem() {
  const points = [
    {
      number: "01",
      title: "Coaching teaches answers.",
      desc: "AI gives answers for free now. The skill that matters is knowing which questions to ask — and what to build with the answers.",
    },
    {
      number: "02",
      title: "Boards test memory.",
      desc: "The next decade tests judgment: scoping problems, choosing tools, shipping work. None of which appears on a marksheet.",
    },
    {
      number: "03",
      title: "Degrees open doors.",
      desc: "Portfolios keep them open. Top colleges and recruiters in 2030 won't ask for ranks. They'll ask: \"What have you built?\"",
    },
  ];

  return (
    <section id="about" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Why now</p>
        <h2 className="section-heading mb-6">
          The system your child is preparing for{" "}
          <em>is being rewritten — by AI.</em>
        </h2>
        <p className="section-body mb-14">
          The students who&apos;ll lead the next decade aren&apos;t the ones with
          the best ranks. They&apos;re the ones who started building early —
          while everyone else was still memorising. Wingschool is the program
          that makes that head start possible.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {points.map((p) => (
          <div
            key={p.number}
            className="ui-card flex flex-col gap-4 rounded-[1.75rem] p-7"
          >
            <span className="ui-label" style={{ color: "#1335b8" }}>
              {p.number}
            </span>
            <h3 className="ui-h3">{p.title}</h3>
            <p className="ui-body-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
