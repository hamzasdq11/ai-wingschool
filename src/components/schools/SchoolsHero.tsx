const stats = [
  { value: "₹0", label: "To take the Challenge" },
  { value: "1 hour", label: "Is all it takes" },
  { value: "100%", label: "Participants certified" },
  { value: "IIT / IIM", label: "Your mentors" },
];

export function SchoolsHero() {
  return (
    <section id="wingsquest" className="section-shell relative z-10">
      <div className="max-w-3xl animate-fade-rise">
        <p className="section-kicker mb-5">
          WingsQuest 2026 · The School AI Aptitude Challenge · Classes 5–10
        </p>
        <h2 className="section-heading">
          You&apos;ve been using AI for years. Let&apos;s find out if
          you&apos;re ready to <em>build</em> with it.
        </h2>
        <p className="section-body mt-7 max-w-2xl">
          A free, one-hour AI aptitude challenge at your school. Clear the
          cutoff and you qualify for the AI Builder Program — four weeks of
          building a real AI project, ending on stage at Flagship Expo Day.
        </p>
        <p className="ui-caption mt-4">
          Designed and run by IIT &amp; IIM graduates. Every participant gets
          a certificate.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#how-it-works" className="ui-button">
            See how it works →
          </a>
          <a
            href="/school-proposal.html"
            target="_blank"
            rel="noreferrer"
            className="ui-button-secondary"
          >
            For schools: the proposal
          </a>
        </div>
      </div>

      <div className="animate-fade-rise-delay mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="ui-card-soft px-6 py-5">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </p>
            <p className="ui-label mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
