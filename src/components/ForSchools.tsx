import { Link } from "react-router-dom";

export function ForSchools() {
  const items = [
    {
      title: "A free aptitude challenge",
      desc: "WingsQuest 2026 — a one-hour AI aptitude test hosted at your school, run entirely by our team. Every participant is certified; your school gets a full performance report.",
    },
    {
      title: "Scholarships for top performers",
      desc: "Students who clear the cutoff qualify for the AI Builder Program — and the top 10–20% earn scholarships and recognition at your school assembly.",
    },
    {
      title: "A stage at Flagship Expo Day",
      desc: "Qualifiers spend four weeks building real AI projects, then present them to a panel of industry experts and IIT/IIM alumni — with your school credited as talent partner.",
    },
  ];

  return (
    <section id="for-schools" className="section-shell relative z-10">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="section-copy">
          <p className="section-kicker mb-4">For schools</p>
          <h2 className="section-heading mb-6">
            Bring WingsQuest 2026 <em>to your school.</em>
          </h2>
          <p className="section-body mb-10">
            A free, school-hosted AI aptitude challenge that finds your
            standout students — followed by a scholarship-backed builder
            program and a public Flagship Expo Day. Zero cost, zero effort for
            your school.
          </p>
          <Link to="/schools" className="ui-button">
            Partner With Us →
          </Link>
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
