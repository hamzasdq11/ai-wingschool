const projects = [
  {
    student: "Aarav S.",
    grade: "Class 8 · Pune",
    title: "Dadu — a Hindi-speaking AI tutor",
    description:
      "Aarav built a voice tutor that explains math problems to his grandfather in Marathi. Used Whisper, GPT, and a custom prompt scaffold.",
    tags: ["Voice AI", "Prompt design", "Hindi"],
    accent: "from-[#1335b8] via-[#1335b8]/60 to-transparent",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <rect x="8" y="14" width="48" height="36" rx="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="32" r="3" fill="currentColor" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
        <circle cx="42" cy="32" r="3" fill="currentColor" />
        <path d="M28 50l4 6 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    student: "Saanvi K.",
    grade: "Class 9 · Bengaluru",
    title: "StudyBuddy — chapter summariser for boards",
    description:
      "An AI app that turns NCERT chapters into flashcards, mind-maps, and quizzes. She shipped it to her whole class and tracked retention.",
    tags: ["Education", "RAG", "Web app"],
    accent: "from-[#5a7df0] via-[#1335b8]/50 to-transparent",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <rect x="12" y="10" width="32" height="42" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 22h16M20 30h16M20 38h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="48" cy="44" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M53 49l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    student: "Vivaan R.",
    grade: "Class 7 · Delhi",
    title: "PetPal — diagnose your dog from photos",
    description:
      "Trained a vision model on his own dataset to flag common skin conditions in stray dogs. Local NGO is now piloting it.",
    tags: ["Computer vision", "Dataset", "NGO pilot"],
    accent: "from-[#97b2ff] via-[#5a7df0]/50 to-transparent",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 26l4 4M42 26l-4 4M22 42c4-4 16-4 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="44" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    student: "Ira M.",
    grade: "Class 10 · Mumbai",
    title: "Verse — a poetry generator in 4 Indian languages",
    description:
      "Fine-tuned a small model on classical Hindi, Urdu, Tamil, and Bengali verse. Her Flagship Expo Day talk was picked up by the Litfest blog.",
    tags: ["Fine-tuning", "Multi-language", "Creative AI"],
    accent: "from-[#dce5ff] via-[#97b2ff]/40 to-transparent",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
        <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 50h36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ProjectShowcase() {
  return (
    <section id="projects" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Real student work</p>
        <h2 className="section-heading mb-6">
          Don&apos;t take our word for it. <em>Look at what they built.</em>
        </h2>
        <p className="section-body mb-14">
          Every Wingschool student ships six real AI projects in six months —
          designed, built, and demoed by them. Here&apos;s a snapshot from our
          last Flagship Expo Day.
        </p>
      </div>

      {(() => {
        const [featured, ...rest] = projects;
        return (
          <>
            <article
              className="ui-card group relative mb-6 overflow-hidden rounded-[2rem] p-7 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(19,53,184,0.35)] sm:p-9 lg:p-10"
              style={{
                background:
                  "radial-gradient(circle at 88% 8%, rgba(19,53,184,0.10), transparent 38%), linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%)",
              }}
            >
              <div
                className={`pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${featured.accent} opacity-30 blur-3xl transition-opacity group-hover:opacity-45`}
              />

              <div className="relative grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] border border-black/8"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, rgba(70,121,255,0.18), transparent 60%), linear-gradient(160deg, #f4f3ee 0%, #ffffff 100%)",
                  }}
                >
                  <div className="scale-[2.4] text-[#1335b8] opacity-90 sm:scale-[2.8]">
                    {featured.icon}
                  </div>
                  <span
                    className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      border: "1px solid rgba(15,15,15,0.08)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1335b8]" />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#1335b8",
                      }}
                    >
                      Featured build
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="ui-label" style={{ color: "#1335b8" }}>
                    {featured.student} · {featured.grade}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: "-0.035em",
                      color: "#0a0a0a",
                    }}
                  >
                    {featured.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      color: "#3a3a3a",
                    }}
                  >
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em]"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "#3a3a3a",
                          background: "rgba(19,53,184,0.04)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-6 md:grid-cols-3">
              {rest.map((p) => (
                <article
                  key={p.title}
                  className="ui-card group relative overflow-hidden rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-35`}
                  />
                  <div className="relative flex h-full flex-col gap-4">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-xl border border-black/8 text-[#1335b8]"
                      style={{ background: "rgba(19,53,184,0.06)" }}
                    >
                      <div className="scale-75">{p.icon}</div>
                    </div>
                    <div>
                      <p className="ui-label" style={{ color: "#1335b8" }}>
                        {p.student} · {p.grade}
                      </p>
                      <h3
                        className="mt-2.5"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          color: "#0a0a0a",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p className="ui-body-sm mt-2.5">{p.description}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/8 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "#5a5a5a",
                            background: "rgba(15,15,15,0.02)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        );
      })()}

      <div className="ui-card mt-12 flex flex-wrap items-center justify-between gap-6 rounded-[1.5rem] px-6 py-5 sm:px-8">
        <div>
          <p className="ui-label" style={{ color: "#1335b8" }}>
            Flagship Expo Day
          </p>
          <p
            className="mt-2 max-w-xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#0a0a0a",
              lineHeight: 1.5,
            }}
          >
            Every cohort ends with a public Flagship Expo Day. Your child presents what
            they built — to parents, mentors, and a guest panel of founders.
          </p>
        </div>
        <a href="#book" className="ui-button shrink-0">
          See last cohort&apos;s recap →
        </a>
      </div>
    </section>
  );
}
