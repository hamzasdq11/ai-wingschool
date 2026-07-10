const ledger = [
  {
    tag: "01 · Money",
    title: "Zero cost",
    desc: "No fee, no revenue share, no purchase required. The Challenge is funded by us, end to end.",
  },
  {
    tag: "02 · Effort",
    title: "Zero logistics",
    desc: "We bring proctors, question papers, certificates, and marking. You provide a hall and a date.",
  },
  {
    tag: "03 · Data",
    title: "The performance report",
    desc: "Grade-wise analytics on how your students performed — data for your management, your board, and your admissions brochure.",
  },
  {
    tag: "04 · Students",
    title: "Certificates for every student",
    desc: "No child goes home empty-handed. Every participant is certified; every finisher of the Builder Program is certified again.",
  },
  {
    tag: "05 · Visibility",
    title: "Newsletter-worthy outcomes",
    desc: "Scholarship winners, a public Flagship Expo Day, projects judged by IIT/IIM alumni — ready-made content for your newsletter, prize day, and socials.",
  },
  {
    tag: "06 · Positioning",
    title: "Innovation-forward standing",
    desc: "Be the school in Kanpur that ran an AI talent search in 2026 — before it was standard.",
  },
];

export function HonestLedger() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">The honest ledger</p>
        <h2 className="section-heading mb-6">
          Your school gives one hour. It gets a <em>year</em> of stories.
        </h2>
        <p className="section-body mb-14">
          We&apos;ve made the trade deliberately lopsided — in your favour.
          Here is exactly what your school receives, and exactly what it
          costs.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ledger.map((item) => (
          <div key={item.tag} className="ui-card rounded-[1.75rem] p-6">
            <p className="ui-label mb-4" style={{ color: "#1335b8" }}>
              {item.tag}
            </p>
            <h3 className="ui-h3">{item.title}</h3>
            <p className="ui-body-sm mt-3">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="ui-card-soft mt-8 rounded-[1.5rem] px-7 py-6">
        <p className="ui-body" style={{ color: "#0a0a0a" }}>
          <b>No obligation, at any point.</b> The Challenge does not commit
          your school to anything. If you stop after Phase 1, you still keep
          the report, and your students keep their certificates.
        </p>
      </div>
    </section>
  );
}
