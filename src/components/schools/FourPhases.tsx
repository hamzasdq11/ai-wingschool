type Phase = {
  number: string;
  title: React.ReactNode;
  desc: string;
};

const phases: Phase[] = [
  {
    number: "01",
    title: (
      <>
        The <em className="display-script">Challenge.</em>
      </>
    ),
    desc: "WingsQuest 2026: a free AI aptitude test, hosted at your school, run entirely by our team. Free for the school. Free for every student. Every participant receives a certificate; your school receives a full performance report.",
  },
  {
    number: "02",
    title: (
      <>
        The <em className="display-script">Selection.</em>
      </>
    ),
    desc: "Students who clear the cutoff qualify for the AI Builder Program. The top 10–20% earn scholarships and school-assembly recognition. Every qualifier is eligible to enrol.",
  },
  {
    number: "03",
    title: (
      <>
        The AI Builder <em className="display-script">Program.</em>
      </>
    ),
    desc: "A 4-week live online program. Students learn how modern AI works and build a real project of their own — taught by IIT/IIM graduates.",
  },
  {
    number: "04",
    title: (
      <>
        Flagship <em className="display-script">Expo Day.</em>
      </>
    ),
    desc: "Students present their projects to a panel of industry experts and IIT/IIM alumni. Finishers receive project-completion certificates, presented at Expo Day.",
  },
];

const impact = [
  { value: "1 hour", label: "Total school time required, start to finish." },
  { value: "0", label: "Rupees your school spends, at any phase." },
  {
    value: "2 certificates",
    label:
      "Participation for every test-taker; project completion for every finisher.",
  },
];

export function FourPhases() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">WingsQuest 2026 · How it works</p>
        <h2 className="section-heading mb-6">
          One initiative. Four phases. <em>Zero</em> cost to your school.
        </h2>
        <p className="section-body mb-14">
          From a one-hour challenge in your school hall to your students on a
          public stage — here is the whole arc.
        </p>
      </div>

      <div className="flex flex-col">
        {phases.map((p, idx) => (
          <div
            key={p.number}
            className={`grid items-start gap-y-5 border-t border-black/8 py-8 md:grid-cols-[140px_1fr_minmax(0,1.4fr)] md:items-baseline md:gap-x-12 md:py-10 lg:gap-x-16 ${
              idx === phases.length - 1 ? "border-b border-black/8" : ""
            }`}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 300,
                color: "#1335b8",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
              }}
            >
              {p.number}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.6vw, 2.05rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "#4a4a4a",
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="ui-card mt-10 grid gap-8 rounded-[1.75rem] px-8 py-7 md:grid-cols-3">
        {impact.map((item) => (
          <div key={item.value}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#1335b8",
                lineHeight: 1.1,
              }}
            >
              {item.value}
            </p>
            <p className="ui-body-sm mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
