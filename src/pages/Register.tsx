import { useId, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import {
  applicationWhatsappUrl,
  CONTACT_EMAIL,
  WHATSAPP_URL,
  type WingsQuestApplication,
} from "../lib/contact";

const facts = [
  { value: "Free", label: "to sit the Challenge" },
  { value: "1 hour", label: "online, from home" },
  { value: "28 Aug", label: "Challenge Day" },
];

const nextSteps = [
  {
    number: "01",
    title: "Submit the form",
    desc: "Your application reaches our team the moment you hit submit — nothing else to do.",
  },
  {
    number: "02",
    title: "We confirm your slot",
    desc: "Our team messages the parent's WhatsApp with your Challenge Day slot and everything you need to be ready.",
  },
  {
    number: "03",
    title: "Challenge Day · 28 August",
    desc: "One hour, from home. Score high and earn your seat in the AI Builder Program — top 10–20% add a merit scholarship.",
  },
];

export function Register() {
  const [student, setStudent] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const ids = useId();

  const application: WingsQuestApplication = {
    student: student.trim(),
    grade,
    school: school.trim(),
    city: city.trim(),
    phone: phone.trim(),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setSubmitted(true);
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ block: "nearest" });
      });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const firstName = student.trim().split(" ")[0] ?? "";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="relative z-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(19,53,184,0.10),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(19,53,184,0.05),transparent_28%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-14 pb-24 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:px-8 lg:pt-20">
          <Reveal className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <p className="section-kicker mb-4">
              WingsQuest 2026 · All India AI Aptitude Challenge · Class 6–10
            </p>
            <h1 className="section-heading mb-6">
              Your seat starts with{" "}
              <em className="display-script">one application.</em>
            </h1>
            <p className="section-body max-w-xl">
              There's no fee to sit the Challenge and nothing to prepare.
              Tell us who's taking it, and we'll confirm your Challenge Day
              slot on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      fontWeight: 500,
                      color: "#0a0a0a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {f.value}
                  </span>
                  <span className="ui-caption">{f.label}</span>
                </div>
              ))}
            </div>

          </Reveal>

          <Reveal
            delay={60}
            className="order-3 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <div className="flex flex-col gap-7 border-t border-black/8 pt-10">
              <p className="ui-label" style={{ color: "#1335b8" }}>
                What happens next
              </p>
              {nextSteps.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative grid grid-cols-[44px_1fr] items-start gap-4"
                >
                  {idx < nextSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -bottom-7 left-[21px] top-11 w-px"
                      style={{ background: "rgba(15,15,15,0.12)" }}
                    />
                  )}
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      border: "1px solid rgba(15,15,15,0.14)",
                      background: "#ffffff",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      color: "#1335b8",
                    }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "#0a0a0a",
                      }}
                    >
                      {step.title}
                    </p>
                    <p className="ui-body-sm mt-1.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24"
          >
            <div
              ref={cardRef}
              className="ui-card relative scroll-mt-28 overflow-hidden rounded-[2rem] p-6 sm:p-8"
              style={{
                boxShadow:
                  "0 1px 2px rgba(15,15,15,0.04), 0 30px 60px -28px rgba(19,53,184,0.18)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(19,53,184,0.14), transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {submitted ? (
                <div className="relative">
                  <span
                    className="blue-chip inline-flex px-3 py-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.64rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Application received
                  </span>
                  <h2
                    className="mt-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      color: "#0a0a0a",
                    }}
                  >
                    {firstName ? `You're in, ${firstName}.` : "You're in."}
                  </h2>
                  <p className="ui-body mt-4">
                    Your application is with us. We'll confirm your Challenge
                    Day slot on the parent's WhatsApp number you shared —
                    keep an eye on it.
                  </p>
                  <p className="ui-caption mt-6">
                    Questions in the meantime?{" "}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                      style={{ color: "#1335b8" }}
                    >
                      WhatsApp us
                    </a>{" "}
                    or write to{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="underline"
                      style={{ color: "#1335b8" }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex flex-col gap-3"
                >
                  <div className="mb-2">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.35rem",
                        fontWeight: 400,
                        color: "#0a0a0a",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Apply to WingsQuest 2026
                    </p>
                    <p className="ui-caption mt-1">
                      Takes under a minute · Applications close 15 August
                    </p>
                  </div>

                  <label htmlFor={`${ids}-student`} className="sr-only">
                    Student's name
                  </label>
                  <input
                    id={`${ids}-student`}
                    required
                    type="text"
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                    placeholder="Student's name"
                    className="ui-input"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label htmlFor={`${ids}-grade`} className="sr-only">
                      Class
                    </label>
                    <select
                      id={`${ids}-grade`}
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="ui-input"
                    >
                      <option value="">Class</option>
                      {[6, 7, 8, 9, 10].map((g) => (
                        <option key={g} value={g}>
                          Class {g}
                        </option>
                      ))}
                    </select>
                    <label htmlFor={`${ids}-city`} className="sr-only">
                      City
                    </label>
                    <input
                      id={`${ids}-city`}
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="ui-input"
                    />
                  </div>

                  <label htmlFor={`${ids}-school`} className="sr-only">
                    School name
                  </label>
                  <input
                    id={`${ids}-school`}
                    required
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="School name"
                    className="ui-input"
                  />

                  <label htmlFor={`${ids}-phone`} className="sr-only">
                    Parent's WhatsApp number
                  </label>
                  <input
                    id={`${ids}-phone`}
                    required
                    type="tel"
                    inputMode="tel"
                    pattern="\+?[0-9\s\-]{10,15}"
                    title="Enter a valid WhatsApp number (10 digits)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Parent's WhatsApp number"
                    className="ui-input"
                  />

                  <button type="submit" disabled={sending} className="ui-button mt-2">
                    {sending ? "Submitting…" : "Submit application →"}
                  </button>
                  {failed && (
                    <p className="ui-caption" style={{ color: "#b3261e" }}>
                      Couldn&apos;t submit just now — try again, or{" "}
                      <a
                        href={applicationWhatsappUrl(application)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        send your application on WhatsApp
                      </a>
                      .
                    </p>
                  )}
                  <p className="ui-caption">
                    No fee to sit the Challenge. We confirm your slot on the
                    parent's WhatsApp number.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
