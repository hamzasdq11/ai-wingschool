const stories = [
  {
    quote:
      "My son built an AI tool that helps his grandmother find recipes by describing what she wants in Hindi. I had no idea he could make something that thoughtful in six months.",
    parent: "Priya M.",
    role: "Mother of Aarav, Class 8",
    location: "Pune",
    initials: "PM",
  },
  {
    quote:
      "She went from being unsure around technology to confidently presenting her own project to a hall full of parents. The confidence shift was as valuable as the AI skills.",
    parent: "Rahul K.",
    role: "Father of Saanvi, Class 9",
    location: "Bengaluru",
    initials: "RK",
  },
  {
    quote:
      "We were spending ₹18K a month on coaching and saw nothing. Three months into Wingschool we had two working apps on his phone. Different feeling entirely.",
    parent: "Anita S.",
    role: "Mother of Vivaan, Class 7",
    location: "Delhi NCR",
    initials: "AS",
  },
];

export function Testimonials() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">From other parents</p>
        <h2 className="section-heading mb-6">
          Don&apos;t believe us. <em>Believe their kids.</em>
        </h2>
        <p className="section-body mb-14">
          The most persuasive moment isn&apos;t a brochure. It&apos;s watching a
          12-year-old explain something they built — with clarity, pride, and
          ownership.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((story) => (
          <blockquote
            key={story.quote}
            className="ui-card flex flex-col gap-7 rounded-[1.75rem] p-7"
          >
            <div className="flex gap-0.5" aria-label="5 star rating">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#1335b8"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontWeight: 200,
                fontSize: "1.2rem",
                lineHeight: 1.5,
                color: "#1f1f1f",
              }}
            >
              &quot;{story.quote}&quot;
            </p>
            <footer className="mt-auto flex items-center gap-3 border-t border-black/8 pt-5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(70,121,255,0.85), rgba(19,53,184,1))",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                }}
              >
                {story.initials}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    color: "#0a0a0a",
                  }}
                >
                  {story.parent}
                </p>
                <p className="ui-caption mt-0.5">
                  {story.role} · {story.location}
                </p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
