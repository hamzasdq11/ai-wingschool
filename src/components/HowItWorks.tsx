export function HowItWorks() {
  const layers = [
    {
      label: "Self-paced",
      time: "~30 min/day",
      title: "Bite-sized daily lessons",
      details: [
        "Short, interactive modules — works around school and tuitions.",
        "AI playgrounds that make abstract ideas tactile and immediate.",
        "Weekly project briefs students can pick up the moment they have time.",
      ],
    },
    {
      label: "Live cohort",
      time: "2 hrs/week",
      title: "Saturday + Sunday workshops",
      details: [
        "Live mentor-led sessions on Zoom — small enough that every student is seen.",
        "Real Indian case studies, not generic Western examples.",
        "Cohort accountability replaces the YouTube black hole.",
      ],
    },
    {
      label: "Portfolio",
      time: "6 projects · 6 months",
      title: "A body of work, not a certificate",
      details: [
        "Every project is shareable — to schools, future colleges, anyone.",
        "Flagship Expo Day at the end means real public stakes.",
        "The portfolio compounds: each cohort builds on the last.",
      ],
    },
  ];

  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">How it works</p>
        <h2 className="section-heading mb-6">
          Designed to work alongside school, <em>not against it.</em>
        </h2>
        <p className="section-body mb-14">
          70% self-paced, 30% live, 100% hands-on. About 30 minutes a day plus a
          2-hour weekend workshop. Built around board exams, tuitions, and the
          rest of your child&apos;s actual life.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="ui-card flex flex-col gap-5 rounded-[1.75rem] p-7"
          >
            <div className="flex items-center justify-between">
              <span className="ui-label" style={{ color: "#1335b8" }}>
                Layer {i + 1}
              </span>
              <span
                className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-body)", color: "#5a5a5a" }}
              >
                {layer.time}
              </span>
            </div>
            <p className="ui-caption uppercase tracking-[0.18em]">
              {layer.label}
            </p>
            <h3 className="ui-h3">{layer.title}</h3>
            <ul className="mt-auto flex flex-col gap-3">
              {layer.details.map((detail) => (
                <li
                  key={detail}
                  className="ui-body-sm flex items-start gap-3"
                >
                  <span
                    className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "#1335b8" }}
                  />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
