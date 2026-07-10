const tiers = [
  {
    badge: "Top 10%",
    name: "WingsQuest Scholar",
    offer: "50% scholarship",
    features: [
      "50% scholarship on the Builder Program",
      "A medal + recognition at your school assembly",
    ],
    featured: true,
  },
  {
    badge: "Top 20%",
    name: "Merit Qualifier",
    offer: "25% scholarship",
    features: [
      "25% scholarship on the Builder Program",
      "A merit certificate",
    ],
    featured: false,
  },
  {
    badge: "All qualifiers",
    name: "Builder Seat",
    offer: "Standard fee",
    features: [
      "Clear the cutoff and you can enrol at the standard program fee, shared directly with your parents",
      "Qualifying is the achievement; the door stays open for you",
    ],
    featured: false,
  },
];

export function ScholarshipSelection() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Phase 2 · The Selection</p>
        <h2 className="section-heading mb-6">
          Top scores earn scholarships. Every qualifier earns a <em>seat.</em>
        </h2>
        <p className="section-body mb-14">
          Clear the WingsQuest cutoff and you qualify for the AI Builder
          Program. Scholarships are decided purely by your WingsQuest rank —
          announced at your school assembly.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="ui-card flex flex-col rounded-[1.75rem] p-7"
            style={
              tier.featured
                ? { borderColor: "rgba(19, 53, 184, 0.35)" }
                : undefined
            }
          >
            <span
              className="blue-chip self-start px-3 py-1"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {tier.badge}
            </span>
            <h3 className="ui-h3 mt-5">{tier.name}</h3>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.45rem",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#1335b8",
              }}
            >
              {tier.offer}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="grid grid-cols-[1.25rem_1fr] gap-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.55,
                    color: "#3a3a3a",
                  }}
                >
                  <span style={{ color: "#1335b8", fontWeight: 700 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="ui-caption mt-6 max-w-2xl">
        The Builder Program fee is shared directly with your parents — no
        payment ever happens at school. Finishers receive preferential
        admission to our 6-month AI Academy.
      </p>
    </section>
  );
}
