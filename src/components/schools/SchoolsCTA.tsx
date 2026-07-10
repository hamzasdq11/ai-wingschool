const mailtoHref = `mailto:hello@aiwingschool.com?subject=${encodeURIComponent(
  "WingsQuest 2026 — Challenge date for [School name]",
)}&body=${encodeURIComponent(
  "School:\nContact person:\nTwo possible dates:\n",
)}`;

const contacts = [
  { label: "Reach us", value: "hello@aiwingschool.com" },
  { label: "Address", value: "The Landmark Towers, Civil Lines, Kanpur" },
  {
    label: "Next step",
    value: "One email with two possible dates for the Challenge.",
  },
];

export function SchoolsCTA() {
  return (
    <section id="partner" className="section-shell relative z-10">
      <div className="ui-card rounded-[2.25rem] px-8 py-14 text-center sm:px-14">
        <span
          className="blue-chip inline-flex items-center px-4 py-1.5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          WingsQuest 2026 · Slots for the season are limited
        </span>

        <h2 className="section-heading mx-auto mt-7 max-w-2xl">
          One reply. One hall. <em>One hour.</em>
        </h2>
        <p className="section-body mx-auto mt-5 max-w-xl">
          Reply with two possible dates. We handle everything from there.
        </p>

        <div className="mt-9">
          <a href={mailtoHref} className="ui-button">
            Confirm a Challenge Date →
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 border-t border-black/8 pt-8 text-left sm:grid-cols-3">
          {contacts.map((contact) => (
            <div key={contact.label}>
              <p className="ui-label mb-2">{contact.label}</p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  color: "#0a0a0a",
                }}
              >
                {contact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
