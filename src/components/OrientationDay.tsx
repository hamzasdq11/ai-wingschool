const cities = [
  { code: "DEL", name: "Delhi", active: false },
  { code: "BLR", name: "Bengaluru", active: false },
  { code: "HYD", name: "Hyderabad", active: false },
  { code: "BOM", name: "Mumbai", active: false },
  { code: "CCU", name: "Kolkata", active: false },
  { code: "KNU", name: "Kanpur", active: true },
];

export function OrientationDay() {
  return (
    <section
      id="orientation"
      className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-black/8"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(19,53,184,0.12), transparent 42%), linear-gradient(180deg, #ffffff 0%, #faf9f4 100%)",
          boxShadow: "0 30px 60px -40px rgba(19,53,184,0.18)",
        }}
      >
        <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
          <div className="relative h-40 md:h-auto">
            <img
              src="/images/landmark-towers.jpg"
              alt="The Landmark Towers, Civil Lines, Kanpur — orientation venue"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.08)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1335b8]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1335b8] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1335b8]" />
              </span>
              Orientation Day · Now in Kanpur
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              Meet us in person.{" "}
              <em className="display-script">25 May, Kanpur.</em>
            </h2>

            <p
              className="ui-body-sm max-w-xl"
              style={{ color: "#4a4a4a" }}
            >
              One-day walkthrough — curriculum, mentors, hardware kits. Bring
              your child.
            </p>

            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "#3a3a3a",
              }}
            >
              <span>
                <strong style={{ color: "#0a0a0a", fontWeight: 600 }}>
                  25 May 2026
                </strong>
              </span>
              <span style={{ color: "rgba(15,15,15,0.25)" }}>·</span>
              <span>The Landmark Towers, Civil Lines</span>
              <span style={{ color: "rgba(15,15,15,0.25)" }}>·</span>
              <span style={{ color: "#1335b8", fontWeight: 500 }}>
                
              </span>
            </div>

            <div className="mt-1">
              <p
                className="mb-2.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#8a8a8a",
                }}
              >
                Now in
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {cities.map((city) => (
                  <div
                    key={city.code}
                    className="flex flex-col items-center justify-center rounded-md px-3 py-1.5"
                    style={{
                      minWidth: "78px",
                      border: city.active
                        ? "1.5px solid #1335b8"
                        : "1.5px dashed rgba(15,15,15,0.22)",
                      background: city.active
                        ? "rgba(19,53,184,0.06)"
                        : "transparent",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.22em",
                        color: city.active ? "#1335b8" : "#888888",
                      }}
                    >
                      {city.code}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        lineHeight: 1.15,
                        color: city.active ? "#1335b8" : "#3a3a3a",
                      }}
                    >
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <a
                href="#book"
                className="ui-button"
                style={{ padding: "0.7rem 1.2rem" }}
              >
                Apply by 22 May →
              </a>
              <a
                href="https://maps.google.com/?q=The+Landmark+Towers+Civil+Lines+Kanpur+Uttar+Pradesh+208001"
                target="_blank"
                rel="noreferrer"
                className="ui-button-secondary"
                style={{ padding: "0.7rem 1.2rem" }}
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
