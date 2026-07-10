import { useState } from "react";

const faqs = [
  {
    q: "Do I need to know coding?",
    a: "No. The Challenge tests reasoning and curiosity, not programming — there's no code on the paper. And the Builder Program starts from zero; technical confidence grows by making things, not by intimidation.",
  },
  {
    q: "How much does it cost?",
    a: "The Challenge is completely free — the test, the proctors, the certificate, all of it. The Builder Program is paid, with 25–50% scholarships for top scorers; the fee is shared directly with your parents and never collected at school.",
  },
  {
    q: "What if I don't clear the cutoff?",
    a: "You still keep your participation certificate and your private score band — and you'll know exactly where you stand. The skills WingsQuest tests are buildable, and the Challenge will run again.",
  },
  {
    q: "Will this clash with school and tuitions?",
    a: "The Challenge is one hour, at your school, during a school day. The Builder Program is four weeks of live online sessions designed to fit around school life.",
  },
  {
    q: "Who actually teaches?",
    a: "Mentors are graduates of IIT Madras, IIT Ropar, IIM Bangalore, and IIM Ranchi — most with industry experience at AI-first startups. AI Wingschool runs a 6-month AI Academy for Classes 5–10 out of The Landmark Towers, Civil Lines, Kanpur.",
  },
];

export function SchoolsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="school-faq" className="section-shell relative z-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="section-kicker mb-4">Questions students ask</p>
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
