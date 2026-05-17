type Point = {
  number: string;
  title: React.ReactNode;
  desc: string;
};

const points: Point[] = [
  {
    number: "01",
    title: (
      <>
        AI is the new <em className="display-script">electricity.</em>
      </>
    ),
    desc: "It will touch every job your child applies for — medicine, design, law, engineering, the arts. Fluency is no longer optional.",
  },
  {
    number: "02",
    title: (
      <>
        Building beats <em className="display-script">memorizing.</em>
      </>
    ),
    desc: "In an AI world, the answer is free. The skill that compounds is knowing what to build, and being able to build it.",
  },
  {
    number: "03",
    title: (
      <>
        Early starts <em className="display-script">win.</em>
      </>
    ),
    desc: "The kids who began with the internet in 1995 led the next two decades. The kids who begin with AI now will lead the next. The window is open.",
  },
];

export function Problem() {
  return (
    <section id="about" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Why now</p>
        <h2 className="section-heading mb-6">
          The world your child is preparing for{" "}
          <em>is being rewritten — by AI.</em>
        </h2>
        <p className="section-body mb-14">
          The students who&apos;ll lead the next decade are the ones building
          with AI early — while it&apos;s still new ground for everyone.
          Wingschool is the program that gives your child that head start.
        </p>
      </div>

      <div className="flex flex-col">
        {points.map((p, idx) => (
          <div
            key={p.number}
            className={`grid items-start gap-y-5 py-10 md:grid-cols-[140px_1fr_minmax(0,1.4fr)] md:items-baseline md:gap-x-12 md:py-12 lg:gap-x-16 ${
              idx > 0 ? "border-t border-black/8" : "border-t border-black/8"
            } ${idx === points.length - 1 ? "border-b border-black/8" : ""}`}
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
    </section>
  );
}
