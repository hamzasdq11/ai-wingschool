import { Reveal } from "../Reveal";
import { registerMailto } from "./contact";

export function ChallengeCTA() {
  return (
    <section id="register" className="section-shell relative z-10">
      <Reveal
        className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-14 lg:py-28"
        style={{
          background:
            "radial-gradient(circle at 82% 8%, rgba(151, 178, 255, 0.35), transparent 42%), radial-gradient(circle at 4% 92%, rgba(5, 8, 28, 0.55), transparent 55%), linear-gradient(135deg, #1a3fd6 0%, #1335b8 46%, #0c2489 100%)",
          boxShadow:
            "0 32px 64px rgba(19, 53, 184, 0.28), inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 46% at 50% 28%, rgba(151,178,255,0.30), transparent 72%)",
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(9rem, 26vw, 24rem)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.09)",
          }}
        >
          2026
        </span>

        <div className="relative">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(6px)",
              fontFamily: "var(--font-body)",
              fontSize: "0.66rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "#ffffff" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "#ffffff" }}
              />
            </span>
            WingsQuest 2026 · Selective admission · Class 6–10
          </span>

          <h2
            className="mx-auto mt-8 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 4.3vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              color: "#ffffff",
              textShadow: "0 2px 24px rgba(5, 8, 28, 0.35)",
            }}
          >
            One hour. Four weeks.{" "}
            <em
              className="display-script"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              One stage.
            </em>
          </h2>

          <div className="mt-11">
            <a
              href={registerMailto}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full px-10 py-5 no-underline transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: "#ffffff",
                color: "#1335b8",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow:
                  "0 18px 40px rgba(5, 8, 28, 0.35), 0 0 0 8px rgba(255,255,255,0.10)",
              }}
            >
              Apply to WingsQuest 2026
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <p
            className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <span>Application takes two minutes</span>
            <span aria-hidden style={{ color: "rgba(255,255,255,0.4)" }}>
              ·
            </span>
            <span>Closes 15 August</span>
            <span aria-hidden style={{ color: "rgba(255,255,255,0.4)" }}>
              ·
            </span>
            <span>Selection by Challenge score alone</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
