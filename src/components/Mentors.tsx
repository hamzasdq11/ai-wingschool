const stats = [
  { value: "200+", label: "Families enrolled" },
  { value: "5", label: "Indian cities" },
  { value: "4.9/5", label: "Parent rating" },
  { value: "94%", label: "Renewal rate" },
];

export function Mentors() {
  return (
    <section id="mentors" className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="ui-card overflow-hidden rounded-[1.75rem]">
          <div className="px-6 py-14 sm:px-10 sm:py-16">
            <p
              className="ui-label mb-6 text-center"
              style={{ color: "#1335b8" }}
            >
              The team
            </p>
            <h2
              className="mx-auto max-w-3xl text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.55rem, 3vw, 2.4rem)",
                fontWeight: 400,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              <em
                className="display-script"
                style={{ fontSize: "1.08em", marginRight: "0.15em" }}
              >
                Every lesson, every project.
              </em>
              <br />
              Designed by IIT and IIM grads.
            </h2>
          </div>

          <div className="grid grid-cols-2 border-t border-black/8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center gap-1.5 px-4 py-7 ${
                  i < stats.length - 1 ? "sm:border-r" : ""
                } ${i % 2 === 0 ? "border-r" : ""} ${
                  i < 2 ? "border-b sm:border-b-0" : ""
                } border-black/8`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.7rem",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.value}
                </span>
                <span className="ui-caption">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
