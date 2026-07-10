const tiers = [
  {
    badge: "Top 10%",
    name: "WingsQuest Scholar",
    offer: "50% scholarship",
    features: [
      "50% scholarship on the Builder Program",
      "Medal + recognition at the school assembly",
    ],
    featured: true,
  },
  {
    badge: "Top 20%",
    name: "Merit Qualifier",
    offer: "25% scholarship",
    features: [
      "25% scholarship on the Builder Program",
      "Merit certificate",
    ],
    featured: false,
  },
  {
    badge: "All qualifiers",
    name: "Builder Seat",
    offer: "Standard fee",
    features: [
      "Every student who clears the cutoff may enrol at the standard program fee, shared directly with qualifying families",
      "Qualifying is the achievement; the door stays open to all of them",
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
          Top performers earn scholarships. Every qualifier earns a{" "}
          <em>seat.</em>
        </h2>
        <p className="section-body mb-14">
          Students who clear the WingsQuest cutoff qualify for the AI Builder
          Program. Scholarships are decided purely by WingsQuest rank —
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
        Fees payable by parents directly to AI Wingschool — never routed
        through the school. No payment is ever collected on school premises.
        The Builder Program is distinct from our 6-month AI Academy; finishers
        receive preferential admission to the Academy.
      </p>
    </section>
  );
}
