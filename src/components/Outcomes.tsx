export function Outcomes() {
  const outcomes = [
    {
      stat: "6",
      label: "Real shipped projects",
      desc: "Not coursework. Actual tools your child can demo to family, friends, school, and future colleges.",
    },
    {
      stat: "1",
      label: "Flagship Expo Day",
      desc: "Every cohort ends with a live presentation. Real audience. Real stakes. Confidence that doesn't come from a worksheet.",
    },
    {
      stat: "≤25",
      label: "Students per cohort",
      desc: "Small enough that every student is challenged personally. Nobody disappears. Nobody coasts.",
    },
    {
      stat: "1:1",
      label: "Mentorship calls",
      desc: "A monthly 30-min call with an IIT/IIM mentor — to unblock, push, and review your child's portfolio.",
    },
  ];

  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">What your child walks away with</p>
        <h2 className="section-heading mb-6">
          Not a certificate. <em>A portfolio.</em>
        </h2>
        <p className="section-body mb-14">
          Six months in, the difference is visible — to you, to their school,
          and to anyone who&apos;ll ever ask &quot;what have you actually done?&quot;
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {outcomes.map((outcome) => (
          <div
            key={outcome.label}
            className="ui-card rounded-[1.75rem] p-7"
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.25rem, 8vw, 4.75rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.06em",
                color: "#0a0a0a",
              }}
            >
              {outcome.stat}
            </p>
            <h3 className="ui-h3 mt-6">{outcome.label}</h3>
            <p className="ui-body-sm mt-4 max-w-md">{outcome.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
