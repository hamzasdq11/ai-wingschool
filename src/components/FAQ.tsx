import { useState } from "react";

const faqs = [
  {
    q: "Do I need to know coding?",
    a: "No. The WingsQuest Challenge tests reasoning and curiosity, not programming; there's no code in it. And the AI Builder Program starts from zero. Technical confidence grows by making things, not by intimidation.",
  },
  {
    q: "How much does it cost?",
    a: "The Challenge is completely free: the test, the certificate, all of it. The AI Builder Program is paid, with 25–50% scholarships for the top 10–20% of scorers; the fee is shared directly with parents before anything is due.",
  },
  {
    q: "Will this clash with school and tuitions?",
    a: "The Challenge is one hour, online, from home — Challenge Day is 28 August. The Builder Program is four weeks of live online sessions designed to fit around school life.",
  },
  {
    q: "What if I don't clear the cutoff?",
    a: "You still keep your participation certificate and your private score band, and you'll know exactly where you stand. The skills WingsQuest tests are buildable, and the Challenge will run again.",
  },
  {
    q: "Who actually teaches?",
    a: "Mentors are graduates of IIT Madras, IIT Ropar, IIM Bangalore, and IIM Ranchi, most with industry experience at AI-first startups.",
  },
  {
    q: "What does a student walk away with?",
    a: "Every participant gets a WingsQuest 2026 certificate. Qualifiers who finish the Builder Program add a real AI project they built themselves and a project-completion certificate, presented on stage at Flagship Expo Day.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell relative z-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="section-kicker mb-4">Questions students and parents ask</p>
          <h2 className="section-heading">
            Frequently Asked Questions. 
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="ui-card rounded-[1.5rem] px-6 py-5"
            >
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

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="ui-body-sm">Still have a question?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/" className="ui-button-secondary">
              WhatsApp us · 2-min reply
            </a>
            <a href="#book" className="ui-button">
              Book a Free Demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
