type Phase = {
  number: string;
  title: React.ReactNode;
  desc: string;
  highlight: string;
};

const phases: Phase[] = [
  {
    number: "01",
    title: (
      <>
        The <em className="display-script">Challenge.</em>
      </>
    ),
    desc: "WingsQuest 2026: a free AI aptitude test at your school — one hour, no prep, no coding needed. Every participant walks away with a WingsQuest certificate.",
    highlight: "Free · Hosted at your school",
  },
  {
    number: "02",
    title: (
      <>
        The <em className="display-script">Selection.</em>
      </>
    ),
    desc: "Clear the cutoff and you qualify for the AI Builder Program. Score in the top 10–20% and you earn a scholarship — announced at your school assembly.",
    highlight: "Scholarships up to 50%",
  },
  {
    number: "03",
    title: (
      <>
        The AI Builder <em className="display-script">Program.</em>
      </>
    ),
    desc: "Four weeks, live and online. You learn how modern AI actually works and build a real project of your own.",
    highlight: "Taught by IIT/IIM grads",
  },
  {
    number: "04",
    title: (
      <>
        Flagship <em className="display-script">Expo Day.</em>
      </>
    ),
    desc: "You present your project to a panel of industry experts and IIT/IIM alumni. Finish, and you collect your project-completion certificate on stage.",
    highlight: "Industry + IIT/IIM panel",
  },
];

const impact = [
  { value: "1 hour", label: "Of your time, start to finish." },
  { value: "100% free", label: "The Challenge costs nothing to enter." },
  { value: "2 certificates", label: "Participation + project completion." },
  { value: "IIT / IIM", label: "The mentor bench behind it all." },
];

export function FourPhases() {
  return (
    <section id="how-it-works" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">WingsQuest 2026 · How it works</p>
        <h2 className="section-heading mb-6">
          One challenge. Four phases. <em>Zero</em> cost to enter.
        </h2>
        <p className="section-body mb-14">
          From a one-hour challenge in your school hall to your project on a
          public stage — here is the whole arc.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((p) => (
          <div
            key={p.number}
            className="ui-card relative flex flex-col overflow-hidden rounded-[1.75rem] p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-7 right-1 select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "7.5rem",
                fontWeight: 300,
                letterSpacing: "-0.06em",
                lineHeight: 1,
                color: "rgba(19, 53, 184, 0.07)",
              }}
            >
              {p.number}
            </span>

            <span
              className="blue-chip relative self-start px-3 py-1"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.64rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Phase {p.number}
            </span>

            <h3 className="ui-h3 relative mt-5">{p.title}</h3>
            <p className="ui-body-sm relative mt-3">{p.desc}</p>

            <p
              className="relative mt-auto flex items-center gap-2 border-t border-black/8 pt-4"
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#1335b8",
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "#1335b8" }}
              />
              {p.highlight}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-8 grid gap-8 rounded-[1.75rem] px-8 py-8 sm:grid-cols-2 lg:grid-cols-4"
        style={{ background: "#05081C" }}
      >
        {impact.map((item) => (
          <div key={item.value}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              {item.value}
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
