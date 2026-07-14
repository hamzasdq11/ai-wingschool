import { useEffect, useState } from "react";

import { Reveal } from "../Reveal";
import { registerMailto } from "./contact";

const deadline = new Date("2026-08-15T23:59:59+05:30").getTime();

function getTimeLeft() {
  const diff = Math.max(0, deadline - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    expired: diff === 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ChallengeCTA() {
  const [left, setLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: left.days, label: "Days" },
    { value: left.hours, label: "Hours" },
    { value: left.minutes, label: "Min" },
    { value: left.seconds, label: "Sec" },
  ];

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
          Sixty minutes.{" "}
          <em
            className="display-script"
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
          One hour of the Challenge measures how you think. Score in the top
          band and you earn a seat in the AI Builder Program, a merit
          scholarship of up to 50%, and your project on the Expo Day stage in
          front of an industry and IIT/IIM panel.{" "}
          <b style={{ color: "#ffffff" }}>The seat is earned, not bought.</b>
        </p>

        {left.expired ? (
          <p
            className="mt-10"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Applications for 2026 have closed · Challenge Day is 28 August
          </p>
        ) : (
          <>
            <p
              className="mt-10"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Applications close 15 August — that&apos;s
            </p>
            <div className="mt-4 flex items-start justify-center gap-3 sm:gap-4">
              {units.map((u) => (
                <div key={u.label} className="w-16 sm:w-20">
                  <div
                    className="rounded-2xl py-3 sm:py-4"
                    style={{
                      border: "1px solid rgba(255,255,255,0.22)",
                      background: "rgba(5, 8, 28, 0.28)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        color: "#ffffff",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {pad(u.value)}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {u.label}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

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
            Apply for the Challenge →
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
          Application takes two minutes · Challenge Day 28 August · Results
          with a private scorecard
        </p>
      </Reveal>
    </section>
  );
}
