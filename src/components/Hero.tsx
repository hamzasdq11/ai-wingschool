import { useEffect, useState } from "react";
import heroImage from "../assets/hero.png";
import heroLoop from "../assets/hero-loop.mp4";
import heroLoopPoster from "../assets/hero-loop-poster.jpg";
import { DemoForm } from "./DemoForm";

const proofChips = [
  { value: "200+", label: "Indian families" },
  { value: "4.9", label: "Parent rating" },
  { value: "IIT/IIM", label: "Mentors" },
];

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative z-10 overflow-hidden border-b border-black/8">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_18%,rgba(19,53,184,0.10),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(19,53,184,0.05),transparent_28%),linear-gradient(180deg,#fbfaf6_0%,#f4f3ee_100%)]" />
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
        style={{ opacity: 0.3 }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/40 via-transparent to-white/60" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="flex max-w-2xl flex-col">
          <a
            href="#pricing"
            className="animate-fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.08)] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1335b8] no-underline transition-colors hover:bg-[rgba(19,53,184,0.14)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1335b8] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1335b8]" />
            </span>
            Now in Kanpur · Apply by 22 May · 9 seats left
          </a>

          <h1
            className="animate-fade-rise-delay mt-7"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.65rem, 5.6vw, 4.85rem)",
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: "-0.045em",
              color: "#0a0a0a",
            }}
          >
            Every kid will{" "}
            <span style={{ color: "#1335b8" }}>use</span> AI.
            <br />
            Yours will{" "}
            <span className="display-script" style={{ fontSize: "1.12em" }}>
              build
            </span>{" "}
            with it.
          </h1>

          <p className="section-body animate-fade-rise-delay-2 mt-7 max-w-xl">
            A 6-month live program for students in Classes 5–10. They ship 6
            real AI projects, take the stage at Flagship Expo Day, and walk out
            with a portfolio that future colleges and recruiters can actually
            see.
          </p>

          <p className="ui-body-sm animate-fade-rise-delay-2 mt-3 max-w-xl">
            Designed and taught by IIT &amp; IIM grads. Built for India.
          </p>

          <p
            className="ui-body-sm animate-fade-rise-delay-2 mt-1.5 max-w-xl"
            style={{ color: "#1335b8", fontWeight: 500 }}
          >
            Hardware included — Arduino, sensors, robotics — shipped to your
            door at no extra cost.
          </p>

          <DemoForm
            variant="compact"
            className="ui-card animate-fade-rise-delay-3 mt-9 flex flex-col gap-3 rounded-[1.5rem] p-5 sm:p-6"
            header={
              <div className="flex items-center justify-between">
                <p
                  className="ui-label"
                  style={{ color: "#0a0a0a", letterSpacing: "0.16em" }}
                >
                  Book a Free Demo
                </p>
                <span className="ui-caption">
                  20 min · 1-on-1 · No commitment
                </span>
              </div>
            }
            successFootnote={
              <p className="ui-caption mt-2">
                Need it sooner?{" "}
                <a
                  href="https://wa.me/"
                  className="underline"
                  style={{ color: "#1335b8" }}
                >
                  WhatsApp us
                </a>
                .
              </p>
            }
          />

          <div className="animate-fade-rise-delay-3 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {proofChips.map((c) => (
              <div key={c.label} className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.value}
                </span>
                <span className="ui-caption">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-rise-delay-2 relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[30rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 -rotate-3 rounded-[2rem] border border-black/8 bg-white/70 backdrop-blur-sm"
              style={{ boxShadow: "0 24px 48px -28px rgba(15,15,15,0.18)" }}
            />

            <div
              className="ui-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6"
              style={{
                boxShadow:
                  "0 1px 2px rgba(15,15,15,0.04), 0 30px 60px -28px rgba(19,53,184,0.18)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(19,53,184,0.18), transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1335b8] opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1335b8]" />
                  </span>
                  <p className="ui-label" style={{ color: "#1335b8" }}>
                    Flagship Expo Day
                  </p>
                </div>
                <span className="ui-caption">Last cohort</span>
              </div>

              <div
                className="relative mt-4 overflow-hidden rounded-[1.25rem]"
                style={{ aspectRatio: "16 / 9", background: "#0a0a0a" }}
              >
                {prefersReducedMotion ? (
                  <img
                    src={heroLoopPoster}
                    alt="Wingschool students presenting at Flagship Expo Day"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={heroLoop}
                    poster={heroLoopPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label="Wingschool Flagship Expo Day montage"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-black/8 pt-4">
                {[
                  { value: "12 projects", label: "Live demos" },
                  { value: "80+", label: "Audience" },
                  { value: "Flagship Expo Day", label: "Public stakes" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "#0a0a0a",
                        lineHeight: 1.1,
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="ui-caption mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-full border border-black/8 bg-white/95 px-3.5 py-2 backdrop-blur-sm sm:inline-flex"
              style={{
                boxShadow: "0 10px 24px -10px rgba(15,15,15,0.15)",
              }}
            >
              <div className="flex gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="#1335b8"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "#0a0a0a",
                }}
              >
                4.9 from 200+ Indian families
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
