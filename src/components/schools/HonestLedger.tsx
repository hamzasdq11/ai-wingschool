const ledger = [
  {
    tag: "01 · Cost",
    title: "Zero cost to enter",
    desc: "The Challenge is completely free — no fee, no purchase, nothing to buy. It's funded by us, end to end.",
  },
  {
    tag: "02 · Prep",
    title: "Zero prep",
    desc: "No syllabus, no cramming, no tuition required. It tests how you think, not what you memorized.",
  },
  {
    tag: "03 · Certificate",
    title: "A certificate, guaranteed",
    desc: "Every participant gets a WingsQuest 2026 certificate — nobody goes home empty-handed.",
  },
  {
    tag: "04 · Score",
    title: "Your private score band",
    desc: "See where you actually stand — shared privately with you, never posted on a noticeboard.",
  },
  {
    tag: "05 · Scholarship",
    title: "A shot at a scholarship",
    desc: "Score in the top 10–20% and you earn a 25–50% scholarship to the AI Builder Program, announced at your school assembly.",
  },
  {
    tag: "06 · Stage",
    title: "A shot at the stage",
    desc: "Finish the Builder Program and you demo your project to an industry and IIT/IIM panel at Flagship Expo Day.",
  },
];

export function HonestLedger() {
  return (
    <section className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">The honest ledger</p>
        <h2 className="section-heading mb-6">
          You give one hour. You could walk away with a <em>year</em> of
          momentum.
        </h2>
        <p className="section-body mb-14">
          We&apos;ve made the trade deliberately lopsided — in your favour.
          Here is exactly what you get, and exactly what it costs.
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
          <b>No pressure, at any point.</b> The Challenge is complete in
          itself. If you stop after Phase 1, the certificate and your score
          are yours to keep.
        </p>
      </div>
    </section>
  );
}
