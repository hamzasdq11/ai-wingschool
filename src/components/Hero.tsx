import { useState } from "react";
import heroImage from "../assets/hero.png";

const proofChips = [
  { value: "200+", label: "Indian families" },
  { value: "4.9", label: "Parent rating" },
  { value: "IIT/IIM", label: "Mentors" },
];

export function Hero() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative z-10 overflow-hidden border-b border-black/8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_18%,rgba(19,53,184,0.10),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(19,53,184,0.05),transparent_28%),linear-gradient(180deg,#fbfaf6_0%,#f4f3ee_100%)]" />

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
            Cohort 12 starts 2 June · 9 seats left
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
            Your child won&apos;t just{" "}
            <span style={{ color: "#1335b8" }}>use</span> AI.
            <br />
            They&apos;ll{" "}
            <span className="display-script" style={{ fontSize: "1.12em" }}>
              build
            </span>{" "}
            with it.
          </h1>

          <p className="section-body animate-fade-rise-delay-2 mt-7 max-w-xl">
            A 6-month live program for students in Classes 6–10. They ship 6
            real AI projects, present a public Demo Day, and walk out with a
            portfolio that future colleges and recruiters can actually see.
          </p>

          <p className="ui-body-sm animate-fade-rise-delay-2 mt-3 max-w-xl">
            Designed and taught by IIT &amp; IIM grads. Built for India.
          </p>

          <form
            onSubmit={handleSubmit}
            className="ui-card animate-fade-rise-delay-3 mt-9 flex flex-col gap-3 rounded-[1.5rem] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p
                className="ui-label"
                style={{ color: "#0a0a0a", letterSpacing: "0.16em" }}
              >
                Book a Free Demo
              </p>
              <span className="ui-caption">20 min · 1-on-1 · No commitment</span>
            </div>

            {submitted ? (
              <div className="rounded-[1rem] border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.06)] p-5">
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "#0a0a0a",
                  }}
                >
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We&apos;ll
                  WhatsApp you within 2 hours to confirm a slot.
                </p>
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
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Parent name"
                    className="ui-input"
                  />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp number"
                    className="ui-input"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    required
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="ui-input flex-1"
                  >
                    <option value="">Child&apos;s class</option>
                    {[6, 7, 8, 9, 10].map((g) => (
                      <option key={g} value={g}>
                        Class {g}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="ui-button shrink-0">
                    Book Free Demo →
                  </button>
                </div>
              </>
            )}
          </form>

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
          <div className="relative w-full max-w-[34rem]">
            <div className="ui-card relative overflow-hidden rounded-[2rem] p-3">
              <img
                src={heroImage}
                alt="Student standing in front of colorful wings artwork"
                className="h-[30rem] w-full rounded-[1.5rem] object-cover object-center sm:h-[34rem]"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.35rem] border border-white/16 bg-black/72 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7CFF9B]" />
                  <p
                    className="ui-label"
                    style={{ color: "#cdd9ff" }}
                  >
                    Cohort 11 · Demo Day, last month
                  </p>
                </div>
                <p
                  className="mt-3 max-w-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  Aarav, Class 8, built an AI tutor in Hindi for his
                  grandfather.
                </p>
                <p
                  className="mt-2 max-w-md"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  Six months ago he&apos;d never written a prompt. He just
                  demoed it to 80 parents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
