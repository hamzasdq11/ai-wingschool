export function ForSchools() {
  const items = [
    {
      title: "Turnkey curriculum",
      desc: "A ready-to-run AI literacy program with projects, assessments, and mentor support built for Indian school contexts.",
    },
    {
      title: "Teacher enablement",
      desc: "We can train your teachers or provide ours, while keeping delivery quality, structure, and student outcomes consistent.",
    },
    {
      title: "Visible outcomes",
      desc: "Student portfolios and Demo Days give schools proof of innovation that parents can actually see and value.",
    },
  ];

  return (
    <section id="for-schools" className="section-shell relative z-10">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="section-copy">
          <p className="section-kicker mb-4">For schools</p>
          <h2 className="section-heading mb-6">
            Bring AI literacy <em>into your classrooms.</em>
          </h2>
          <p className="section-body mb-10">
            We partner with schools that want more than symbolic innovation.
            Your students get a serious program. Your institution gets a visible
            signature learning experience.
          </p>
          <button className="ui-button">Partner With Us</button>
        </div>

        <div className="grid gap-5">
          {items.map((item) => (
            <div key={item.title} className="ui-card rounded-[1.75rem] p-6">
              <p className="ui-label mb-3" style={{ color: "#1335b8" }}>
                School benefit
              </p>
              <h3 className="ui-h3">{item.title}</h3>
              <p className="ui-body-sm mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
