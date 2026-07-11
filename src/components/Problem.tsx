import whyNowImage from "../assets/img1.webp";

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
        AI is the new <em className="display-script">electricity.</em>
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
      <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
        <div className="section-copy">
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
        </div>

        <div
          aria-hidden
          className="relative hidden h-[520px] w-[470px] lg:block"
        >
          <img
            src={whyNowImage}
            alt=""
            className="h-full w-full object-cover"
            style={{
              mixBlendMode: "multiply",
              opacity: 0.85,
              filter: "grayscale(0.15) contrast(1.02)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(180deg, transparent 0%, black 22%, black 78%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(180deg, transparent 0%, black 22%, black 78%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col">
        {statements.map((s) => (
          <div
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
          </div>
        ))}

        <div className="grid items-center gap-x-10 gap-y-4 border-t border-black/8 py-12 md:grid-cols-[170px_1fr] md:py-14 lg:gap-x-14">
          <OutlinedNumeral>03</OutlinedNumeral>

          <div>
            <p className="ui-label mb-3" style={{ color: "#1335b8" }}>
              The window
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
              Early starts <em className="display-script">win.</em>
            </h3>
          </div>
        </div>

        <div className="relative mt-2 grid overflow-hidden rounded-[1.75rem] md:grid-cols-2">
          <div
            className="px-8 py-10 sm:px-10"
            style={{ background: "#eceae2" }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "rgba(10, 10, 10, 0.45)",
              }}
            >
              1995
            </p>
            <p
              className="mt-4 max-w-sm"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                color: "#5a5a5a",
              }}
            >
              The kids who began with the internet led the next two decades.
            </p>
          </div>

          <div
            className="px-8 py-10 sm:px-10"
            style={{
              background:
                "radial-gradient(circle at 80% 10%, rgba(151, 178, 255, 0.35), transparent 45%), linear-gradient(135deg, #1a3fd6 0%, #1335b8 55%, #0c2489 100%)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#ffffff",
              }}
            >
              2026
            </p>
            <p
              className="mt-4 max-w-sm"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              The kids who begin with AI now will lead the next. The window is
              open, and it starts at school.
            </p>
          </div>

          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex"
            style={{
              background: "#ffffff",
              color: "#1335b8",
              boxShadow: "0 10px 24px rgba(5, 8, 28, 0.22)",
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            →
          </span>
        </div>
      </div>
    </section>
  );
}
