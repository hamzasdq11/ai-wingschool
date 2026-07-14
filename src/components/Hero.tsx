import { useEffect, useState } from "react";
import heroImage from "../assets/Hero2.jpg";
import heroLoop from "../assets/hero-loop.mp4";
import heroLoopPoster from "../assets/hero-loop-poster.jpg";
import { DemoForm } from "./DemoForm";

const proofChips = [
  { value: "IIT/IIM", label: "Mentors" },
  { value: "Live", label: "Not recorded" },
  { value: "Small cohorts", label: "By design" },
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
    <section className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_72%_18%,rgba(19,53,184,0.10),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(19,53,184,0.05),transparent_28%)]" />
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        style={{
          opacity: 0.3,
          objectPosition: "center 40%",
          maskImage:
            "linear-gradient(180deg, black 0%, black 58%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 58%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 45%, rgba(244,243,238,0.85) 100%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="flex max-w-2xl flex-col">
          <h1
            className="animate-fade-rise mt-7"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.65rem, 5.6vw, 4.85rem)",
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: "-0.045em",
              color: "#0a0a0a",
            }}
          >
            Teenagers learning to{" "}
            <span style={{ color: "#1335b8" }}>think</span> and{" "}
            <span className="display-script" style={{ fontSize: "1.12em" }}>
              build
            </span>{" "}
            in the AI era.
          </h1>

          <p className="section-body animate-fade-rise-delay-2 mt-7 max-w-xl">
            A live program for teenagers where they build real AI projects,
            take the stage at Flagship Expo Day, and walk out with skills that
            stay irreplaceable as AI replaces everything else.
          </p>

          <p className="ui-body-sm animate-fade-rise-delay-2 mt-3 max-w-xl">
            Designed and taught by IIT &amp; IIM grads. Built for India.
          </p>

          <p
            className="ui-body-sm animate-fade-rise-delay-2 mt-1.5 max-w-xl"
            style={{ color: "#1335b8", fontWeight: 500 }}
          >
            Hardware included: Arduino, sensors, robotics, shipped to your
            door at no extra cost.
          </p>

          <DemoForm
            variant="compact"
            buttonLabel="Book now →"
            className="ui-card animate-fade-rise-delay-3 mt-9 flex flex-col gap-3 rounded-[1.5rem] p-5 sm:p-6"
            header={
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Talk to an IIT/IIM mentor
                </p>
                <p className="ui-caption mt-1">
                  A 20-minute conversation, 1-on-1
                </p>
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
                  { value: "Parents & panel", label: "Audience" },
                  { value: "Every student", label: "On stage" },
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
                Rated 4.9 by Wingschool parents
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
