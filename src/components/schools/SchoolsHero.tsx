const journey = [
  {
    number: "01",
    title: "The Challenge",
    desc: "A free, one-hour online AI aptitude test. No prep, no coding needed.",
  },
  {
    number: "02",
    title: "The AI Builder Program",
    desc: "Clear the cutoff and build a real AI project over four weeks, mentored live by IIT/IIM graduates.",
  },
  {
    number: "03",
    title: "Flagship Expo Day",
    desc: "Present your project on stage to a panel of industry experts and IIT/IIM alumni.",
  },
];

export function SchoolsHero() {
  return (
    <section id="wingsquest" className="section-shell relative z-10">
      <div
        className="relative overflow-hidden rounded-[2.5rem]"
        style={{
          background:
            "radial-gradient(circle at 82% 8%, rgba(151, 178, 255, 0.35), transparent 42%), radial-gradient(circle at 4% 92%, rgba(5, 8, 28, 0.55), transparent 55%), linear-gradient(135deg, #1a3fd6 0%, #1335b8 46%, #0c2489 100%)",
          boxShadow: "0 32px 64px rgba(19, 53, 184, 0.28)",
        }}
      >
        <div className="grid items-center gap-12 px-8 py-14 sm:px-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16 lg:py-20">
          <div className="animate-fade-rise">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                border: "1px solid rgba(255,255,255,0.28)",
                background: "rgba(255,255,255,0.1)",
                fontFamily: "var(--font-body)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#ffffff" }}
              />
              The AI Aptitude Challenge · Open to all · Class 6–10
            </span>

            <h2
              className="mt-7"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                color: "#ffffff",
              }}
            >
              WingsQuest{" "}
              <em
                className="display-script"
                style={{ color: "rgba(255,255,255,0.95)" }}
              >
                2026.
              </em>
            </h2>

            <p
              className="mt-6 max-w-xl"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              You&apos;ve been using AI for years. Let&apos;s find out if
              you&apos;re ready to <b style={{ color: "#ffffff" }}>build</b>{" "}
              with it. It starts with one free hour online and ends on a
              public stage with a real AI project of your own.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 no-underline transition-transform hover:-translate-y-px"
                style={{
                  background: "#ffffff",
                  color: "#1335b8",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 24px rgba(5, 8, 28, 0.25)",
                }}
              >
                See how it works →
              </a>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Designed and run by IIT &amp; IIM graduates.
                <br />
                Every participant gets a certificate.
              </p>
            </div>
          </div>

          <div
            className="animate-fade-rise-delay rounded-[1.75rem] p-7 sm:p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(5, 8, 28, 0.28)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              The journey
            </p>

            <div className="relative flex flex-col gap-7">
              {journey.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative grid grid-cols-[44px_1fr] items-start gap-4"
                >
                  {idx < journey.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -bottom-7 left-[21px] top-11 w-px"
                      style={{ background: "rgba(255,255,255,0.22)" }}
                    />
                  )}
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      border: "1px solid rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.1)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      color: "#ffffff",
                    }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="mt-1.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
