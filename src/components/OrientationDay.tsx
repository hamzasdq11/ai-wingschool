export function OrientationDay() {
  return (
    <section id="orientation" className="section-shell relative z-10">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-black/8 px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(19,53,184,0.14), transparent 38%), linear-gradient(180deg, #ffffff 0%, #faf9f4 100%)",
          boxShadow: "0 40px 80px -40px rgba(19,53,184,0.18)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.08)] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1335b8]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1335b8] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1335b8]" />
              </span>
              Orientation Day · Now in Kanpur
            </div>

            <h2 className="section-heading mt-6 mb-5">
              Meet us in person. <em>25 May, Kanpur.</em>
            </h2>

            <p className="section-body mb-6 max-w-xl">
              Walk through the curriculum, meet the IIT/IIM mentors, and see
              the embodied AI kits up close. Bring your child. We&apos;ll cover
              everything the Kanpur cohort will build over the next six months.
            </p>

            <p
              className="mb-8 max-w-xl"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: "#5a5a5a",
              }}
            >
              Already taught in{" "}
              <strong style={{ color: "#0a0a0a", fontWeight: 500 }}>
                Delhi · Bengaluru · Hyderabad · Mumbai · Kolkata
              </strong>
              .{" "}
              <span style={{ color: "#1335b8", fontWeight: 500 }}>
                Kanpur joins this season — our first cohort here.
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#book" className="ui-button">
                Apply by 22 May →
              </a>
              <a
                href="https://maps.google.com/?q=The+Landmark+Towers+Civil+Lines+Kanpur+Uttar+Pradesh+208001"
                target="_blank"
                rel="noreferrer"
                className="ui-button-secondary"
              >
                Get directions
              </a>
            </div>
          </div>

          <div className="ui-card overflow-hidden rounded-[1.75rem] p-6 sm:p-7">
            <div className="-mx-6 -mt-6 mb-6 sm:-mx-7 sm:-mt-7 sm:mb-7">
              <img
                src="/images/landmark-towers.jpg"
                alt="The Landmark Towers, Civil Lines, Kanpur — orientation venue"
                width={533}
                height={711}
                loading="lazy"
                className="block h-auto w-full"
                style={{ aspectRatio: "3 / 4", objectFit: "cover" }}
              />
            </div>
            <p className="ui-label" style={{ color: "#1335b8" }}>
              Venue
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "#0a0a0a",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              The Landmark Towers
            </p>
            <p className="ui-body-sm mt-2">
              Civil Lines, Kanpur
              <br />
              Uttar Pradesh 208001
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-black/8 pt-5">
              <div>
                <p className="ui-caption">Date</p>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    letterSpacing: "-0.01em",
                  }}
                >
                  25 May 2026
                </p>
              </div>
              <div>
                <p className="ui-caption">Apply by</p>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "#1335b8",
                    letterSpacing: "-0.01em",
                  }}
                >
                  22 May 2026
                </p>
              </div>
            </div>

            <p className="ui-caption mt-5 border-t border-black/8 pt-4">
              Kanpur cohort begins 2 June 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
