const schoolDoes = [
  { step: "01", text: "Reply confirming a date and a hall or classrooms.", when: "Week 0" },
  { step: "02", text: "Circulate our ready-made notice to students — we draft it, you forward it.", when: "Week 1" },
  { step: "03", text: "Optionally: host a 10-minute results assembly where we hand out certificates.", when: "Week 3" },
];

const weDo = [
  "Consent forms and the full comms kit",
  "Question papers / tablets, per grade",
  "Trained proctors on Challenge day",
  "Marking and moderation",
  "Certificates, printed and delivered",
  "The school analytics report",
  "Scholarship announcements",
  "The entire AI Builder Program",
  "Flagship Expo Day",
];

const timeline = [
  { when: "Week 0", name: "Handshake", desc: "You pick a date. One email, done." },
  { when: "Week 1", name: "Announcement", desc: "We handle comms — notices, consent, FAQs." },
  { when: "Week 2", name: "Challenge day", desc: "1 hour at your school. Our team runs it." },
  { when: "Week 3", name: "Report + results", desc: "Analytics report delivered; certificates handed out." },
  { when: "Weeks 4–8", name: "Build → Expo Day", desc: "Builder Program runs online, ends at Flagship Expo Day." },
];

export function OperatingPlan() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">The operating plan</p>
        <h2 className="section-heading mb-6">
          Your part takes one email and one <em>hall.</em>
        </h2>
        <p className="section-body mb-14">
          The division of labour is simple: you open the door, we carry
          everything through it.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="ui-card rounded-[1.75rem] p-7">
          <p className="ui-label mb-5" style={{ color: "#1335b8" }}>
            What your school does
          </p>
          <ul className="flex flex-col gap-4">
            {schoolDoes.map((item) => (
              <li
                key={item.step}
                className="grid grid-cols-[2rem_1fr] gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "#0a0a0a",
                }}
              >
                <span style={{ color: "#1335b8", fontWeight: 600 }}>
                  {item.step}
                </span>
                <span>
                  {item.text}{" "}
                  <i style={{ color: "#8a8a8a" }}>({item.when})</i>
                </span>
              </li>
            ))}
          </ul>
          <p className="ui-body mt-6" style={{ color: "#0a0a0a" }}>
            <b>That&apos;s the complete list.</b>
          </p>
        </div>

        <div className="ui-card rounded-[1.75rem] p-7">
          <p className="ui-label mb-5" style={{ color: "#1335b8" }}>
            What we do — everything else
          </p>
          <ul className="flex flex-col gap-2.5">
            {weDo.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.25rem_1fr] gap-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "#3a3a3a",
                }}
              >
                <span style={{ color: "#1335b8", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="ui-label mt-14 mb-6" style={{ color: "#1335b8" }}>
        The timeline
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {timeline.map((era) => (
          <div
            key={era.when}
            className="border-t-2 border-black/70 pt-4"
          >
            <p className="ui-label mb-2">{era.when}</p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
              }}
            >
              {era.name}
            </h3>
            <p className="ui-body-sm mt-2">{era.desc}</p>
          </div>
        ))}
      </div>

      <p className="ui-caption mt-8">
        No payment is ever collected on school premises. All enrolment happens
        directly between parents and AI Wingschool.
      </p>
    </section>
  );
}
