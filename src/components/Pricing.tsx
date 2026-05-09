const plans = [
  {
    name: "Trial Pass",
    price: "999",
    priceUnit: "one-time",
    commitment: "Orientation Day + Builder week 1 · no auto-renew",
    features: [
      "Orientation Day at The Landmark Towers, Kanpur",
      "Full week 1 of Builder — workshops, curriculum, AI playground",
      "Cohort community + intro call",
      "₹999 credited toward Builder if you continue",
    ],
    cta: "Start the Trial →",
    featured: false,
  },
  {
    name: "Builder",
    price: "3,799",
    originalPrice: "4,999",
    offerLabel: "Limited offer · Save ₹1,200/mo",
    priceUnit: "/month",
    totalLine: "₹22,794 over 6 months",
    upfrontLine: "Pay upfront: ₹18,995 (save ₹3,799)",
    features: [
      "Orientation Day at The Landmark Towers, Kanpur",
      "Self-paced weekly curriculum + AI playground",
      "Hands-on Live workshops",
      "Monthly 1-on-1 with an IIT/IIM mentor",
      "6 projects in 6 months",
      "Hardware kits shipped to your doorstep at no extra cost",
      "Portfolio page + certificate",
      "Parent progress reports / 2 weeks",
      "Cohort community",
      "Flagship Expo Day at The Landmark Towers, Kanpur",
    ],
    cta: "Start Building →",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Launchpad",
    price: "7,999",
    originalPrice: "9,999",
    offerLabel: "Limited offer · Save ₹2,000/mo",
    priceUnit: "/month",
    totalLine: "₹47,994 over 6 months",
    upfrontLine: "Pay upfront: ₹39,995 (save ₹7,999)",
    features: [
      "Everything in Builder",
      "1-on-1 live sessions with priority focus",
      "IIT/IIM mentor available 24/7 — guidance at every step",
      "Quarterly senior reviews — progress, gaps, and a roadmap forward",
      "Personalized curriculum — tuned to the child's pace and depth",
      "AI from first principles — training, fine-tuning, evals, the maths behind real models",
      "Specialization track — ML, robotics, or AI product (months 4–6)",
      "₹15,000 in API + cloud credits",
      "An embodied/robotics module of their choice",
      "Custom-domain portfolio (yourname.in)",
      "Priority cohort — max 15 students",
    ],
    cta: "Apply for Launchpad →",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-shell relative z-10">
      <div className="section-copy mx-auto max-w-3xl text-center">
        <p className="section-kicker mb-4">Pricing</p>
        <h2 className="section-heading mb-6">
          AI fluency, in six months. <em>Priced for Indian families.</em>
        </h2>
        <p className="section-body mb-4">
          AI fluency is the single most important skill your child can build
          for the next decade. Wingschool makes that real — at a price that
          fits Indian families.
        </p>
        <p
          className="ui-body-sm mb-2"
          style={{ color: "#1335b8" }}
        >
          ₹999 paid trial · 7-day money-back · No long-term lock-in
        </p>
        <p
          className="ui-body-sm mb-14"
          style={{ color: "#3a3a3a" }}
        >
          For most families,{" "}
          <strong style={{ color: "#0a0a0a", fontWeight: 600 }}>Builder</strong>
          {" "}is the answer. Launchpad is for students already deep in AI;
          Trial is for those testing the water.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`ui-card relative flex flex-col gap-5 rounded-[1.75rem] p-7 ${
              plan.featured
                ? "border-[1.5px] border-[#1335b8] shadow-[0_30px_60px_-30px_rgba(19,53,184,0.4)]"
                : ""
            }`}
            style={
              plan.featured
                ? {
                    background:
                      "radial-gradient(circle at top right, rgba(19,53,184,0.10), #ffffff 70%)",
                  }
                : undefined
            }
          >
            {plan.badge && (
              <span
                className="absolute -top-3 left-7 rounded-full bg-[#1335b8] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {plan.badge}
              </span>
            )}

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "#0a0a0a",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {plan.name}
            </h3>

            <div>
              {plan.offerLabel && (
                <div
                  className="mb-3 inline-flex items-center rounded-full border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.08)] px-2.5 py-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#1335b8",
                  }}
                >
                  {plan.offerLabel}
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.6rem",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  ₹{plan.price}
                </span>
                {plan.originalPrice && (
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      color: "#8a8a8a",
                      textDecoration: "line-through",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ₹{plan.originalPrice}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "#6a6a6a",
                  }}
                >
                  {plan.priceUnit === "/month" ? "/month" : " one-time"}
                </span>
              </div>
              {plan.commitment && (
                <p className="ui-caption mt-2">{plan.commitment}</p>
              )}
              {plan.totalLine && (
                <p className="ui-caption mt-2">{plan.totalLine}</p>
              )}
              {plan.upfrontLine && (
                <p
                  className="ui-caption mt-1.5"
                  style={{ color: "#1335b8", fontWeight: 500 }}
                >
                  {plan.upfrontLine}
                </p>
              )}
            </div>

            <div
              style={{
                borderBottom: "1px solid rgba(15,15,15,0.08)",
              }}
            />

            <ul className="flex flex-1 flex-col gap-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="ui-body-sm flex items-start gap-3"
                  style={{ color: "#3a3a3a" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-1 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12l4 4L19 6"
                      stroke="#1335b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#book"
              className={
                plan.featured ? "ui-button mt-2" : "ui-button-secondary mt-2"
              }
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="ui-card flex flex-col gap-3 rounded-[1.75rem] p-6">
          <span className="ui-label" style={{ color: "#1335b8" }}>
            Family pricing
          </span>
          <h3 className="ui-h3" style={{ fontSize: "1.3rem" }}>
            Built for families, not just students.
          </h3>
          <p className="ui-body-sm">
            10% off your second child. 20% off your third or more. Applies to
            Builder and Launchpad, confirmed at signup — no requirement to
            enrol in the same cohort.
          </p>
        </div>
        <div className="ui-card flex flex-col gap-3 rounded-[1.75rem] p-6">
          <span className="ui-label" style={{ color: "#1335b8" }}>
            Need-based seats
          </span>
          <h3 className="ui-h3" style={{ fontSize: "1.3rem" }}>
            Talent first. Cost second.
          </h3>
          <p className="ui-body-sm">
            Bursaries and full scholarships for students who can&apos;t pay
            full price but should be here. Reach out — we&apos;ll work it out
            on the demo call.
          </p>
        </div>
      </div>
    </section>
  );
}
