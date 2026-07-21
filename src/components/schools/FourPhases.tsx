import { Reveal } from "../Reveal";

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
    desc: "A one-hour online aptitude challenge for Class 6–10. It can't be crammed and needs no coding. It measures how you think.",
    highlight: "Online · Challenge Day 28 Aug",
  },
  {
    number: "02",
    title: (
      <>
        The <em className="display-script">Selection.</em>
      </>
    ),
    desc: "Admission to the AI Builder Program is based purely on your Challenge score. Top performers qualify, and the top 10–20% also earn a merit scholarship.",
    highlight: "Scholarships up to 50%",
  },
  {
    number: "03",
    title: (
      <>
        The AI Builder <em className="display-script">Program.</em>
      </>
    ),
    desc: "Four weeks of live, hands-on classes. You learn how modern AI actually works, then prove it by building a real AI project of your own.",
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

const rewards = [
  {
    value: "Everyone",
    label: "An official scorecard with your All-India percentile.",
  },
  { value: "Top 20%", label: "25% scholarship on the Builder Program." },
  { value: "Top 10%", label: "50% scholarship on the Builder Program." },
  {
    value: "Qualifiers",
    label: "A Builder seat, a real AI project, and the Expo Day stage.",
  },
];

export function FourPhases() {
  return (
    <section id="how-it-works" className="section-shell relative z-10">
      <Reveal className="section-copy">
        <p className="section-kicker mb-4">WingsQuest 2026 · How it works</p>
        <h2 className="section-heading mb-6">
          One challenge. Four phases. <em>One stage.</em>
        </h2>
        <p className="section-body mb-14">
          From a one-hour online challenge to your project on a public stage,
          this is the whole arc.
        </p>
      </Reveal>

      <Reveal delay={80} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
      </Reveal>

      <Reveal
        delay={120}
        className="mt-8 rounded-[1.75rem] px-8 py-8"
        style={{ background: "#05081C" }}
      >
        <p
          className="mb-7"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.66rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          What your score earns · Ranked on merit
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {rewards.map((item) => (
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
      </Reveal>
    </section>
  );
}
