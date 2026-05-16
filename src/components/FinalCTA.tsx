import { DemoForm } from "./DemoForm";

const guarantees = [
  { label: "₹999 paid trial · credits to Academy", icon: "✓" },
  { label: "7-day money-back", icon: "✓" },
  { label: "No long lock-in", icon: "✓" },
];

export function FinalCTA() {
  return (
    <section id="book" className="section-shell relative z-10">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-black/8 px-6 py-12 sm:px-10 sm:py-14 lg:px-14"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(19,53,184,0.14), transparent 38%), linear-gradient(180deg, #ffffff 0%, #faf9f4 100%)",
          boxShadow: "0 40px 80px -40px rgba(19,53,184,0.18)",
        }}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.08)] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1335b8]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1335b8] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1335b8]" />
              </span>
              Now in Kanpur · Apply by 22 May · 9 seats left
            </div>

            <h2 className="section-heading mt-6 mb-5">
              The world won&apos;t wait. <em>Neither should they.</em>
            </h2>

            <p className="section-body mb-8 max-w-xl">
              Book a free 1-on-1 demo and we&apos;ll walk you through the full
              learning journey, sample student projects, and what Wingschool
              would look like for your child specifically.
            </p>

            <ul className="flex flex-col gap-3">
              {guarantees.map((g) => (
                <li
                  key={g.label}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.92rem",
                    color: "#0a0a0a",
                  }}
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-[#1335b8]/30 bg-[rgba(19,53,184,0.08)] text-[12px]"
                    style={{ color: "#1335b8" }}
                  >
                    {g.icon}
                  </span>
                  {g.label}
                </li>
              ))}
            </ul>

            <p className="ui-caption mt-8">
              Prefer to talk?{" "}
              <a
                href="https://wa.me/"
                className="underline"
                style={{ color: "#1335b8" }}
              >
                WhatsApp us
              </a>{" "}
              — average reply under 2 minutes.
            </p>
          </div>

          <DemoForm
            variant="stacked"
            className="ui-card flex flex-col gap-4 rounded-[1.75rem] p-6 sm:p-8"
            header={
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Reserve a demo slot
                </p>
                <p className="ui-caption mt-1">
                  20 min · 1-on-1 with a Wingschool mentor
                </p>
              </div>
            }
            successMessage={(firstName, grade) => (
              <>
                Got it{firstName ? `, ${firstName}` : ""}. We&apos;ll WhatsApp
                you within 2 hours to confirm a slot for{" "}
                {grade ? `Class ${grade}` : "your child"}.
              </>
            )}
            formFootnote={
              <p className="ui-caption text-center">
                No payment now · No commitment
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
}
