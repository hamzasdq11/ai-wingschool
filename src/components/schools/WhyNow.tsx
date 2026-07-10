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
    desc: "It will touch every career your students choose — medicine, design, law, engineering, the arts. The schools that moved early on computers in the 2000s are the ones parents still talk about. This is that moment, again.",
  },
  {
    number: "02",
    title: (
      <>
        Talent shows up when it&apos;s{" "}
        <em className="display-script">tested.</em>
      </>
    ),
    desc: "Somewhere in your classrooms is a student who will build something remarkable with AI this year. A one-hour aptitude challenge is how we find them — and how you get the data.",
  },
  {
    number: "03",
    title: (
      <>
        Schools win on <em className="display-script">stories.</em>
      </>
    ),
    desc: "“Our students presented AI projects to a panel of IIT/IIM alumni” is a newsletter line, an admissions line, and a school-assembly moment. We manufacture those stories. You publish them.",
  },
];

export function WhyNow() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Why we&apos;re writing to you</p>
        <h2 className="section-heading mb-6">
          Every school will teach AI eventually. Yours can be <em>first</em> —
          for free.
        </h2>
        <p className="section-body mb-14">
          This is not a vendor pitch. It&apos;s an invitation to run a
          talent-development initiative at your school — funded and operated
          entirely by us. Your students get discovered. Your school gets the
          credit.
        </p>
      </div>

      <div className="flex flex-col">
        {points.map((p, idx) => (
          <div
            key={p.number}
            className={`grid items-start gap-y-5 border-t border-black/8 py-10 md:grid-cols-[140px_1fr_minmax(0,1.4fr)] md:items-baseline md:gap-x-12 md:py-12 lg:gap-x-16 ${
              idx === points.length - 1 ? "border-b border-black/8" : ""
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
    </section>
  );
}
