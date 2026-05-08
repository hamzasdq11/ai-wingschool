export function Problem() {
  const points = [
    {
      number: "01",
      title: "AI is the new electricity.",
      desc: "It will touch every job your child applies for — medicine, design, law, engineering, the arts. Fluency is no longer optional.",
    },
    {
      number: "02",
      title: "Building beats memorizing.",
      desc: "In an AI world, the answer is free. The skill that compounds is knowing what to build, and being able to build it.",
    },
    {
      number: "03",
      title: "Early starts win.",
      desc: "The kids who began with the internet in 1995 led the next two decades. The kids who begin with AI now will lead the next. The window is open.",
    },
  ];

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

      <div className="grid gap-6 md:grid-cols-3">
        {points.map((p) => (
          <div
            key={p.number}
            className="ui-card flex flex-col gap-4 rounded-[1.75rem] p-7"
          >
            <span className="ui-label" style={{ color: "#1335b8" }}>
              {p.number}
            </span>
            <h3 className="ui-h3">{p.title}</h3>
            <p className="ui-body-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
