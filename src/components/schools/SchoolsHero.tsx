import { challengeDateMailto } from "./contact";

const stats = [
  { value: "₹0", label: "Cost to your school" },
  { value: "1 hour", label: "Of school time" },
  { value: "100%", label: "Students certified" },
  { value: "IIT / IIM", label: "Mentor bench" },
];

export function SchoolsHero() {
  return (
    <section className="section-shell relative z-10">
      <div className="max-w-3xl animate-fade-rise">
        <p className="section-kicker mb-5">
          WingsQuest 2026 · The School AI Aptitude Challenge · Classes 5–10
        </p>
        <h1 className="section-heading">
          Your students are ready for the AI era. Let&apos;s find out which
          ones are ready to <em>lead</em> it.
        </h1>
        <p className="section-body mt-7 max-w-2xl">
          A free, school-hosted AI aptitude challenge — followed by a
          scholarship-backed builder program and a public Flagship Expo Day.
          Zero cost to your school. Zero effort. Every student walks away with
          something.
        </p>
        <p className="ui-caption mt-4">
          Designed and run by IIT &amp; IIM graduates. Built for Indian
          schools.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={challengeDateMailto} className="ui-button">
            Confirm a Challenge Date →
          </a>
          <a
            href="/school-proposal.html"
            target="_blank"
            rel="noreferrer"
            className="ui-button-secondary"
          >
            Read the full proposal
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
