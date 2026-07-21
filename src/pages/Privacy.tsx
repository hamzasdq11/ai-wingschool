import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "../lib/contact";
import { PAGE_META, usePageMeta } from "../lib/seo";

const sections = [
  {
    title: "What we collect",
    body: "When you book a demo or register for WingsQuest, we ask for a parent's name, a WhatsApp number, and the child's class. That's it. We don't collect payment details on this site, and we don't use tracking cookies.",
  },
  {
    title: "How we use it",
    body: "We use your contact details to reply to your enquiry, confirm demo slots, and share information about Wingschool programs you've asked about. Booking requests are sent to us over WhatsApp, so WhatsApp's own terms and privacy policy also apply to those messages.",
  },
  {
    title: "What we never do",
    body: "We don't sell your information, and we don't share it with third parties for their marketing. Your details are only visible to the Wingschool team handling your enquiry.",
  },
  {
    title: "Your choices",
    body: `You can ask us to delete your details or stop contacting you at any time. Message us on WhatsApp or email ${CONTACT_EMAIL}, and we'll action it promptly.`,
  },
];

export function Privacy() {
  usePageMeta(PAGE_META.privacy);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl">
          <p className="section-kicker mb-4">Legal</p>
          <h1 className="section-heading mb-4">Privacy Policy.</h1>
          <p className="ui-caption mb-12">Last updated: July 2026</p>

          <p className="section-body mb-12">
            Wingschool exists to teach students, not to harvest data. This
            page explains, in plain language, what information this website
            collects and what we do with it.
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="ui-h3 mb-3">{s.title}</h2>
                <p className="ui-body">{s.body}</p>
              </div>
            ))}

            <div>
              <h2 className="ui-h3 mb-3">Questions</h2>
              <p className="ui-body">
                Anything unclear? Write to{" "}
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
