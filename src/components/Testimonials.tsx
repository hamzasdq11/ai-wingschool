const featured = {
  quote:
    "My son built an AI tool that helps his grandmother find recipes by describing what she wants in Hindi. I had no idea he could make something that thoughtful in six months.",
  parent: "Priya M.",
  role: "Mother of Aarav, Class 8",
  location: "Pune",
  initials: "PM",
};

const supporting = [
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
      "Three months in, my son had two working apps on his phone — and the confidence to walk us through how he built them. We were stunned.",
    parent: "Anita S.",
    role: "Mother of Vivaan, Class 7",
    location: "Delhi NCR",
    initials: "AS",
  },
];

export function Testimonials() {
  return (
    <section className="relative z-10 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, rgba(70,121,255,0.18), transparent 42%), radial-gradient(circle at 12% 82%, rgba(19,53,184,0.22), transparent 38%), linear-gradient(180deg, #0a1230 0%, #060a22 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <p
            className="ui-label mb-4"
            style={{ color: "rgba(151,178,255,0.85)" }}
          >
            From other parents
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.35rem, 5vw, 4rem)",
              lineHeight: 1.04,
              fontWeight: 400,
              letterSpacing: "-0.045em",
              color: "#ffffff",
            }}
          >
            Don&apos;t believe us.{" "}
            <em
              className="display-script"
              style={{ color: "#dce5ff", fontSize: "1.05em" }}
            >
              Believe their kids.
            </em>
          </h2>
          <p
            className="mt-6 max-w-xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(220,229,255,0.72)",
            }}
          >
            The most persuasive moment isn&apos;t a brochure. It&apos;s watching
            a 12-year-old explain something they built — with clarity, pride,
            and ownership.
          </p>
        </div>

        <blockquote className="mt-16 max-w-5xl lg:mt-20">
          <div className="mb-8 flex gap-1" aria-label="5 star rating">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#97b2ff"
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
              fontSize: "clamp(1.65rem, 3.4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-10 flex items-center gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(151,178,255,0.95), rgba(19,53,184,1))",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "0.04em",
                boxShadow: "0 8px 24px rgba(19,53,184,0.4)",
              }}
            >
              {featured.initials}
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "#ffffff",
                }}
              >
                {featured.parent}
              </p>
              <p
                className="mt-0.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "rgba(220,229,255,0.6)",
                }}
              >
                {featured.role} · {featured.location}
              </p>
            </div>
          </footer>
        </blockquote>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-12 md:grid-cols-2 lg:mt-20 lg:pt-14">
          {supporting.map((story) => (
            <blockquote
              key={story.quote}
              className="flex flex-col gap-6 rounded-[1.5rem] p-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex gap-0.5" aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="#97b2ff"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                &ldquo;{story.quote}&rdquo;
              </p>
              <footer className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(151,178,255,0.85), rgba(19,53,184,1))",
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
                      color: "#ffffff",
                    }}
                  >
                    {story.parent}
                  </p>
                  <p
                    className="mt-0.5"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "rgba(220,229,255,0.55)",
                    }}
                  >
                    {story.role} · {story.location}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
