type Point = {
  number: string;
  title: React.ReactNode;
  desc: string;
  highlight: string;
};

const points: Point[] = [
  {
    number: "01",
    title: (
      <>
        AI is the new <em className="display-script">electricity.</em>
      </>
    ),
    desc: "It will touch every job your child applies for: medicine, design, law, engineering, the arts. Fluency is no longer optional.",
    highlight: "Every career, every field",
  },
  {
    number: "02",
    title: (
      <>
        Building beats <em className="display-script">memorizing.</em>
      </>
    ),
    desc: "In an AI world, the answer is free. The skill that compounds is knowing what to build, and being able to build it.",
    highlight: "The skill that compounds",
  },
  {
    number: "03",
    title: (
      <>
        Early starts <em className="display-script">win.</em>
      </>
    ),
    desc: "The kids who began with the internet in 1995 led the next two decades. The kids who begin with AI now will lead the next.",
    highlight: "The window is open",
  },
];

export function Problem() {
  return (
    <section id="about" className="section-shell relative z-10">
      <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="section-copy lg:sticky lg:top-28">
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

        <div className="flex flex-col gap-5">
          {points.map((p) => (
            <div
              key={p.number}
              className="ui-card relative overflow-hidden rounded-[1.75rem] p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-2 select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "6.5rem",
                  fontWeight: 300,
                  letterSpacing: "-0.06em",
                  lineHeight: 1,
                  color: "rgba(19, 53, 184, 0.06)",
                }}
              >
                {p.number}
              </span>

              <div className="relative grid grid-cols-[56px_1fr] items-start gap-5">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(70, 121, 255, 0.95), #1335b8 70%)",
                    boxShadow:
                      "0 10px 20px rgba(19, 53, 184, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    color: "#ffffff",
                  }}
                >
                  {p.number}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 2.3vw, 1.8rem)",
                      fontWeight: 400,
                      lineHeight: 1.12,
                      letterSpacing: "-0.03em",
                      color: "#0a0a0a",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="ui-body-sm mt-3">{p.desc}</p>
                  <p
                    className="mt-5 flex items-center gap-2 border-t border-black/8 pt-4"
                    style={{
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
