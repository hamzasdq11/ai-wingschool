import { Reveal } from "../Reveal";
import { registerMailto } from "./contact";

export function ChallengeCTA() {
  return (
    <section id="register" className="section-shell relative z-10">
      <Reveal
        className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-14 lg:py-20"
        style={{
          background:
            "radial-gradient(circle at 82% 8%, rgba(151, 178, 255, 0.35), transparent 42%), radial-gradient(circle at 4% 92%, rgba(5, 8, 28, 0.55), transparent 55%), linear-gradient(135deg, #1a3fd6 0%, #1335b8 46%, #0c2489 100%)",
          boxShadow: "0 32px 64px rgba(19, 53, 184, 0.28)",
        }}
      >
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
          WingsQuest 2026 · Selective admission · Class 6–10
        </span>

        <h2
          className="mx-auto mt-7 max-w-3xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            color: "#ffffff",
          }}
        >
          <span className="whitespace-nowrap">One hour.</span>{" "}
          <span className="whitespace-nowrap">Four weeks.</span>{" "}
          <em
            className="display-script whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            One stage.
          </em>
        </h2>

        <p
          className="mx-auto mt-6 max-w-xl"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.02rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          The whole arc of WingsQuest 2026, from a one-hour Challenge to your
          own AI project on a public stage.{" "}
          <b style={{ color: "#ffffff" }}>Every seat is earned, not bought.</b>
        </p>

        <div className="mt-10">
          <a
            href={registerMailto}
            className="inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 no-underline transition-transform hover:-translate-y-px"
            style={{
              background: "#ffffff",
              color: "#1335b8",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 600,
              boxShadow: "0 10px 24px rgba(5, 8, 28, 0.25)",
            }}
          >
            Apply to WingsQuest 2026 →
          </a>
        </div>

        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Application takes two minutes · Closes 15 August · Selection by
          Challenge score alone
        </p>
      </Reveal>
    </section>
  );
}
