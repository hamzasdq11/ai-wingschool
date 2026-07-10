/* temporarily hidden — uncomment to restore
const youDo = [
  { step: "01", text: "Watch for the WingsQuest notice at your school.", when: "Week 1" },
  { step: "02", text: "Get your consent form signed and show up on Challenge day.", when: "Week 2" },
  { step: "03", text: "Collect your certificate at the results assembly — scholarships announced there too.", when: "Week 3" },
];

const weDo = [
  "Consent forms and all the paperwork",
  "Question papers / tablets, for your grade",
  "Trained proctors on Challenge day",
  "Marking and moderation",
  "Certificates, printed and delivered",
  "Results and score bands",
  "Scholarship announcements",
  "The entire AI Builder Program",
  "Flagship Expo Day",
];
*/

const timeline = [
  { when: "Week 0", name: "Your school signs up", desc: "One email from your principal. Done." },
  { when: "Week 1", name: "The notice goes out", desc: "You get the details and a consent form." },
  { when: "Week 2", name: "Challenge day", desc: "1 hour at your school. Our team runs it." },
  { when: "Week 3", name: "Results + certificates", desc: "Score bands shared; certificates handed out at assembly." },
  { when: "Weeks 4–8", name: "Build → Expo Day", desc: "Qualifiers build online, then present at Flagship Expo Day." },
];

export function OperatingPlan() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">How to take part</p>
        {/* temporarily hidden — uncomment to restore
        <h2 className="section-heading mb-6">
          Your part takes one <em>hour.</em>
        </h2>
        <p className="section-body mb-14">
          No registration fee, no forms to chase, no prep. Show up and think —
          we carry everything else.
        </p>
        */}
      </div>

      {/* temporarily hidden — uncomment to restore
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="ui-card rounded-[1.75rem] p-7">
          <p className="ui-label mb-5" style={{ color: "#1335b8" }}>
            What you do
          </p>
          <ul className="flex flex-col gap-4">
            {youDo.map((item) => (
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
      */}

      <p className="ui-label mt-4 mb-6" style={{ color: "#1335b8" }}>
        The timeline
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {timeline.map((era) => (
          <div key={era.when} className="border-t-2 border-black/70 pt-4">
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
        School not signed up yet? Tell your principal about WingsQuest — or
        point them to hello@aiwingschool.com. One email is all it takes.
      </p>
    </section>
  );
}
