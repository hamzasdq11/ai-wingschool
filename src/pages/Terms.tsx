import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "../lib/contact";
import { PAGE_META, usePageMeta } from "../lib/seo";

const sections = [
  {
    title: "About Wingschool",
    body: "Wingschool runs live, online AI programs for school students in Classes 6–10, including the WingsQuest Challenge and the AI Builder Program. This website is an information and enquiry page for those programs.",
  },
  {
    title: "The WingsQuest Challenge",
    body: "Sitting the Challenge is free. Admission to the AI Builder Program is decided on Challenge score, and merit scholarships of 25–50% are awarded to top scorers as described on this site. Dates, cutoffs, and scholarship bands may be adjusted between editions; the details confirmed to you directly at registration are the ones that apply.",
  },
  {
    title: "Fees",
    body: "The AI Builder Program is a paid program. The full fee, and any scholarship applied to it, is shared with parents in writing before any payment is due. Nothing on this website is an invoice or a demand for payment.",
  },
  {
    title: "Demo bookings",
    body: "Booking a demo through this site sends us your details over WhatsApp and creates no obligation on you. It's a conversation, not a contract. Slots are confirmed by our team on WhatsApp.",
  },
  {
    title: "Content on this site",
    body: "Program descriptions, dates, and mentor details are provided in good faith and kept current, but may change between cohorts. The Wingschool name, logo, and site content belong to AI Wingschool and can't be reused without permission.",
  },
];

export function Terms() {
  usePageMeta(PAGE_META.terms);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl">
          <p className="section-kicker mb-4">Legal</p>
          <h1 className="section-heading mb-4">Terms of Use.</h1>
          <p className="ui-caption mb-12">Last updated: July 2026</p>

          <p className="section-body mb-12">
            The short version: this site tells you about Wingschool programs
            and lets you talk to us. Here's the slightly longer version.
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="ui-h3 mb-3">{s.title}</h2>
                <p className="ui-body">{s.body}</p>
              </div>
            ))}

            <div>
              <h2 className="ui-h3 mb-3">Contact</h2>
              <p className="ui-body">
                Questions about these terms? Write to{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline"
                  style={{ color: "#1335b8" }}
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                or call {CONTACT_PHONE_DISPLAY}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
