import { useState } from "react";

const faqs = [
  {
    q: "Will this interfere with school or board exams?",
    a: "No. We designed the cadence around Indian school life — about 30 minutes of self-paced work a day, plus a 2-hour weekend workshop. Most students fit it around tuitions. During exam weeks, the self-paced layer pauses without penalty.",
  },
  {
    q: "Does my child need to know coding?",
    a: "Not at all. We start from zero. The first month is about thinking with AI — experimentation, prompting, scoping problems. Technical confidence grows through making, not intimidation.",
  },
  {
    q: "Do we need to buy any hardware ourselves?",
    a: "No. Every project that needs hardware — microcontrollers, sensors, motors, robotics modules — ships free to your doorstep across India. If something breaks during the build, we replace it at no charge. After the program ends, the entire kit stays with your child.",
  },
  {
    q: "Can I enrol multiple children?",
    a: "Yes — and the second child gets 10% off, the third or more get 20% off. Discounts apply to AI Academy and AI Architect, are confirmed at signup, and don't require both children to be in the same season. The Trial Pass is already low-friction at ₹999, so we don't stack sibling discounts on top of it.",
  },
  {
    q: "How is this different from YouTube or self-learning?",
    a: "Three things: a live mentor who calls them out, a real cohort that creates accountability, and a portfolio they have to ship. Free content can inform — it almost never produces follow-through. We've measured this across 11 cohorts.",
  },
  {
    q: "Who actually teaches my child?",
    a: "Mentors are graduates of IIT Madras, IIT Ropar, IIM Bangalore, and IIM Ranchi — most with industry experience at AI-first startups. Cohorts are capped at 25 so every student gets seen and challenged personally.",
  },
  {
    q: "What if my child has already used ChatGPT?",
    a: "That's a great starting point — but not the finish line. Wingschool moves them from casually using AI to directing it, critiquing it, and building real products with it. Most students who arrive 'already familiar' learn the most from the engineering layer.",
  },
  {
    q: "How will I, as a parent, see progress?",
    a: "Three ways. (1) Project deliverables every 3 weeks — actual working artefacts, not grades. (2) A parent progress report every 2 weeks on the AI Academy and AI Architect plans. (3) Flagship Expo Day at the end — you'll watch your child present what they built.",
  },
  {
    q: "What happens if it doesn't work for us?",
    a: "Full refund within 7 days, no questions asked. After that, we let you switch plans, pause, or cancel mid-cohort if life changes — and if you paid upfront, we refund pro-rata for the months you didn't use. We'd rather have a happy alumni family than an unhappy paying one.",
  },
  {
    q: "Is this only for students who want to work in tech?",
    a: "No — it's for any student who wants agency in the next decade. We've had students go on to bio, design, journalism, and policy. The skill we teach (using AI to build) compounds in every field.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell relative z-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="section-kicker mb-4">Questions parents ask</p>
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
