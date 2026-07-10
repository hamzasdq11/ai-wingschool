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

const orbitChips = [
  { label: "Medicine", className: "left-1/2 top-0 -translate-x-1/2" },
  { label: "Design", className: "right-[-16px] top-[34%]" },
  { label: "Law", className: "left-[-20px] top-[42%]" },
  { label: "Engineering", className: "bottom-[44px] right-[10px]" },
  { label: "The arts", className: "bottom-[-2px] left-[22%]" },
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
          className="relative hidden h-[340px] w-[340px] lg:block"
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(19, 53, 184, 0.12)" }}
          />
          <span
            className="absolute inset-[56px] rounded-full"
            style={{ border: "1px solid rgba(19, 53, 184, 0.2)" }}
          />
          <span
            className="absolute inset-[112px] rounded-full"
            style={{ border: "1px solid rgba(19, 53, 184, 0.3)" }}
          />

          <span
            className="absolute h-2 w-2 rounded-full"
            style={{
              background: "#1335b8",
              top: "23%",
              right: "13%",
            }}
          />
          <span
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              background: "rgba(19, 53, 184, 0.45)",
              bottom: "20%",
              left: "13.5%",
            }}
          />

          <span
            className="hero-orb absolute inset-[138px] flex items-center justify-center"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              letterSpacing: "-0.02em",
            }}
          >
            AI
          </span>

          {orbitChips.map((chip) => (
            <span
              key={chip.label}
              className={`absolute rounded-full px-3.5 py-1.5 ${chip.className}`}
              style={{
                background: "#ffffff",
                border: "1px solid #e6e3da",
                boxShadow: "0 6px 16px rgba(15, 15, 15, 0.06)",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "#4a4a4a",
                whiteSpace: "nowrap",
              }}
            >
              {chip.label}
            </span>
          ))}
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
