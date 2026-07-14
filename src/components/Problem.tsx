import { Reveal } from "./Reveal";

type Statement = {
  number: string;
  label: string;
  title: React.ReactNode;
  desc: string;
};

const statements: Statement[] = [
  {
    number: "01",
    label: "The shift",
    title: (
      <>
        AI is the new <em className="display-script">necessity.</em>
      </>
    ),
    desc: "It will touch every job your child applies for: medicine, design, law, engineering, the arts. Fluency is no longer optional.",
  },
  {
    number: "02",
    label: "The skill",
    title: (
      <>
        Building beats <em className="display-script">memorizing.</em>
      </>
    ),
    desc: "In an AI world, the answer is free. The skill that compounds is knowing what to build, and being able to build it.",
  },
  {
    number: "03",
    label: "The window",
    title: (
      <>
        Early starts <em className="display-script">win.</em>
      </>
    ),
    desc: "In 1995, the kids who began with the internet led the next two decades. The kids who begin with AI now will lead the next — the window is open, and it starts with one free hour.",
  },
];

function OutlinedNumeral({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="select-none"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(5rem, 10vw, 8.5rem)",
        fontWeight: 300,
        lineHeight: 0.9,
        letterSpacing: "-0.05em",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(19, 53, 184, 0.4)",
      }}
    >
      {children}
    </span>
  );
}

export function Problem() {
  return (
    <section id="about" className="section-shell relative z-10">
      <div>
        <Reveal className="section-copy">
          <p className="section-kicker mb-4">Why now</p>
          <h2 className="section-heading mb-6">
            The world your child is preparing for{" "}
            <em>is being rewritten by AI.</em>
          </h2>
          <p className="section-body">
            The students who&apos;ll lead the next decade are the ones
            building with AI early, while it&apos;s still new ground for
            everyone. Wingschool is the program that gives your child that
            head start.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col">
        {statements.map((s) => (
          <Reveal
            key={s.number}
            className="grid items-center gap-x-10 gap-y-4 border-t border-black/8 py-12 md:grid-cols-[170px_1fr] md:py-14 lg:grid-cols-[170px_1.05fr_1fr] lg:gap-x-14"
          >
            <OutlinedNumeral>{s.number}</OutlinedNumeral>

            <div>
              <p className="ui-label mb-3" style={{ color: "#1335b8" }}>
                {s.label}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: "#0a0a0a",
                }}
              >
                {s.title}
              </h3>
            </div>

            <p className="ui-body lg:border-l lg:border-black/8 lg:pl-12">
              {s.desc}
            </p>
          </Reveal>
        ))}

      </div>
    </section>
  );
}
