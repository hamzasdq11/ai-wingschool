const pillars = [
  {
    label: "The panel",
    desc: "Industry experts and IIT/IIM alumni — people who evaluate real products for a living, judging your students' work seriously.",
  },
  {
    label: "The certificate",
    desc: "Project-completion certificates for every finisher — presented at Flagship Expo Day, in front of the panel and the parents.",
  },
  {
    label: "The credit",
    desc: "Your school is named as talent partner in all Expo Day materials — the stage, the certificates, the coverage.",
  },
];

export function FlagshipExpoDay() {
  return (
    <section
      id="expo-day"
      className="relative overflow-hidden"
      style={{ background: "#05081C" }}
    >
      <div className="relative mx-auto max-w-[84rem] px-6 py-28 sm:py-32">
        <div className="max-w-3xl">
          <p
            className="section-kicker"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Phase 4 · Where it all lands
          </p>
          <h2 className="section-heading mt-5" style={{ color: "#ffffff" }}>
            It ends on a{" "}
            <em className="display-script" style={{ color: "#ffffff" }}>
              stage,
            </em>{" "}
            not a scoresheet.
          </h2>
          <p
            className="mt-7"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Every Builder Program student presents their project — live — to a
            panel of industry experts and IIT/IIM alumni. Parents watch. The
            school is credited from the stage.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="pt-5"
              style={{ borderTop: "2px solid rgba(255,255,255,0.35)" }}
            >
              <p
                className="ui-label mb-3"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {pillar.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-16 max-w-2xl rounded-[1.5rem] px-7 py-6"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "#ffffff",
            }}
          >
            Flagship Expo Day is planned to be hosted at <b>IIM Ranchi</b>.
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Venue under confirmation; details shared with partner schools in
            writing before Phase 1.
          </p>
        </div>
      </div>
    </section>
  );
}
