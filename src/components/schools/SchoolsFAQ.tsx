import { useState } from "react";

const faqs = [
  {
    q: "Is this a sales event in disguise?",
    a: "No student is pitched anything on your campus. The Challenge is free and complete in itself. The Builder Program is offered only to qualifiers, only to their parents, only off-campus.",
  },
  {
    q: "What does the school pay?",
    a: "Nothing — not for the test, the proctors, the certificates, or the report. There is no catch to find.",
  },
  {
    q: "What if we just want the Challenge and nothing else?",
    a: "Then that's what happens. The report and certificates are yours regardless. No obligation carries forward.",
  },
  {
    q: "Who actually runs this?",
    a: "Mentors are graduates of IIT Madras, IIT Ropar, IIM Bangalore, and IIM Ranchi — most with industry experience at AI-first startups. AI Wingschool runs a 6-month AI Academy for Classes 5–10 out of The Landmark Towers, Civil Lines, Kanpur.",
  },
];

export function SchoolsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="school-faq" className="section-shell relative z-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="section-kicker mb-4">Questions principals ask</p>
          <h2 className="section-heading">Frequently Asked Questions.</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="ui-card rounded-[1.5rem] px-6 py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 bg-transparent p-0 text-left"
                style={{ border: "none" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    lineHeight: 1.45,
                    color: "#0a0a0a",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="shrink-0"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.35rem",
                    color: "#1335b8",
                    transform:
                      openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden"
                style={{
                  maxHeight: openIndex === i ? "320px" : "0px",
                  opacity: openIndex === i ? 1 : 0,
                  transition: "max-height 0.3s ease, opacity 0.2s ease",
                }}
              >
                <p className="ui-body-sm pt-4 pr-8">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
