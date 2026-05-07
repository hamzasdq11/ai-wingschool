const plans = [
  {
    name: "Trial Pass",
    price: "999",
    priceUnit: "one-time",
    commitment: "2 weeks · 1 project · no auto-renew",
    description:
      "A taste of the cohort, paid. One real project, one live mentor session, fee credited toward Builder if you continue.",
    features: [
      "1 guided project",
      "1 live mentor session",
      "AI playground access",
      "Cohort community + intro call",
      "Fee fully credited toward Builder",
    ],
    cta: "Start the Trial →",
    featured: false,
  },
  {
    name: "Builder",
    price: "7,999",
    priceUnit: "/month",
    totalLine: "₹47,994 over 6 months",
    upfrontLine: "Pay upfront: ₹39,995 (save ₹7,999)",
    description:
      "The full cohort experience. Six projects, weekly live sessions, hardware kits shipped home, Showcase Night.",
    features: [
      "In-person Orientation Day · 25 May, Kanpur",
      "Full self-paced curriculum + AI playground",
      "2 live mentor sessions / week",
      "Monthly 1-on-1 with a mentor",
      "6 projects + Showcase Night",
      "Hardware kits shipped home, free",
      "Portfolio page + certificate",
      "Parent progress reports / 2 weeks",
      "Cohort community",
    ],
    cta: "Start Building →",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Launchpad",
    price: "19,999",
    priceUnit: "/month",
    totalLine: "₹1,19,994 over 6 months",
    upfrontLine: "Pay upfront: ₹99,995 (save ₹19,999)",
    description:
      "An apprenticeship, not a course. A senior in your child's corner, a curriculum tuned to their pace, AI taught from first principles.",
    features: [
      "Everything in Builder",
      "Dedicated IIT/IIM senior — weekly 1-on-1 + async office hours, all 6 months",
      "Personalized curriculum — pace, depth, and difficulty tuned per child each fortnight",
      "AI from first principles — training, fine-tuning, evals, the maths behind real models",
      "Specialization track — ML, robotics, or AI product (months 4–6)",
      "Quarterly reviews from your senior",
      "₹15,000 in API + hosting credits + an embodied/robotics module of their choice",
      "Custom-domain portfolio site (yourname.in)",
      "Priority cohort (≤15 students)",
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
          Less than coaching. <em>More than a degree.</em>
        </h2>
        <p className="section-body mb-4">
          You&apos;re likely already spending ₹8K–₹25K a month on coaching that
          teaches answers AI gives away for free. Wingschool teaches your child
          to build the things that make those answers obsolete.
        </p>
        <p
          className="ui-body-sm mb-14"
          style={{ color: "#1335b8" }}
        >
          ₹999 paid trial · 7-day money-back · No long-term lock-in
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
              <div className="flex items-baseline gap-1">
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

            <p className="ui-body-sm">{plan.description}</p>

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
