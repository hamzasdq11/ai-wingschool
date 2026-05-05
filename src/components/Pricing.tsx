const plans = [
  {
    name: "Explorer",
    price: "4,999",
    commitment: "3-month commitment",
    description:
      "Start here. See your child build something real in the first month.",
    features: [
      "Full self-paced curriculum",
      "1 live workshop / week",
      "AI playground access",
      "Cohort community",
      "3 guided projects",
    ],
    cta: "Start with Explorer",
    featured: false,
  },
  {
    name: "Builder",
    price: "7,999",
    commitment: "6-month commitment",
    description:
      "The full experience. Portfolio, live mentorship, and Demo Day included.",
    features: [
      "Everything in Explorer",
      "2 live sessions / week",
      "Monthly 1-on-1 mentor call",
      "Portfolio page + certificate",
      "6 projects + Demo Day",
      "Parent progress reports / 2 weeks",
    ],
    cta: "Start Building",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Launchpad",
    price: "12,999",
    commitment: "6-month commitment",
    description:
      "For students serious about standing out — college prep, internships, founder access.",
    features: [
      "Everything in Builder",
      "Weekly 1-on-1 mentorship",
      "College portfolio guidance",
      "Internship placement support",
      "Guest sessions with AI founders",
      "Priority cohort (≤15 students)",
    ],
    cta: "Apply for Launchpad",
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
          7-day money-back guarantee · Free trial class · No long-term lock-in
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
                  /month
                </span>
              </div>
              <p className="ui-caption mt-2">{plan.commitment}</p>
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

      <p className="ui-caption mt-10 text-center">
        Bursaries and scholarships available for high-need students. Ask us on
        the demo call.
      </p>
    </section>
  );
}
