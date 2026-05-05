const logos = [
  { src: "/LOGOS/IIT Madras.png", alt: "IIT Madras" },
  { src: "/LOGOS/IIT Ropar.png", alt: "IIT Ropar" },
  { src: "/LOGOS/IIM bangalore.png", alt: "IIM Bangalore" },
  { src: "/LOGOS/IIM Ranchi.png", alt: "IIM Ranchi" },
  { src: "/LOGOS/Harvard.png", alt: "Harvard" },
  { src: "/LOGOS/HPAIR.png", alt: "Harvard HPAIR" },
  { src: "/LOGOS/AConf.png", alt: "AConf" },
  { src: "/LOGOS/HConf.png", alt: "HConf" },
];

const stats = [
  { value: "200+", label: "Families enrolled" },
  { value: "11", label: "Cohorts shipped" },
  { value: "4.9/5", label: "Parent rating" },
  { value: "94%", label: "Renewal rate" },
];

export function LogoStrip() {
  return (
    <section className="relative z-10 border-b border-black/8">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="ui-card overflow-hidden rounded-[1.75rem]">
          <div className="px-6 pt-8 pb-6 sm:px-10">
            <p className="section-kicker text-center">
              Designed and taught by IIT &amp; IIM grads
            </p>
            <div className="mt-7 flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {logos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: "44px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-black/8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-6 ${
                  i < stats.length - 1 ? "sm:border-r" : ""
                } ${i % 2 === 0 ? "border-r" : ""} ${
                  i < 2 ? "border-b sm:border-b-0" : ""
                } border-black/8`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
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
