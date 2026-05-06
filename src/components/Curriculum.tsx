export function Curriculum() {
  const classTracks = [
    {
      grade: "Class 5",
      stage: "Discover",
      description:
        "Play, not theory. Students meet AI through voice assistants, image makers, and simple chatbots — building hands-on familiarity and confidence before any code, prompt logic, or systems thinking enters the picture.",
    },
    {
      grade: "Class 6",
      stage: "Explore",
      description:
        "Curiosity first. Students learn what AI is, where it shows up, and how to ask better questions before they rush toward answers.",
    },
    {
      grade: "Class 7",
      stage: "Build",
      description:
        "Students start making with AI through guided tools, mini-projects, and creative workflows that convert ideas into visible output.",
    },
    {
      grade: "Class 8",
      stage: "Engineer",
      description:
        "They begin to understand systems: prompts, logic, workflows, prototyping, and how thoughtful AI products are assembled.",
    },
    {
      grade: "Class 9",
      stage: "Innovate",
      description:
        "Students identify real problems around them and design original solutions with sharper judgment, taste, and product thinking.",
    },
    {
      grade: "Class 10",
      stage: "Launch",
      description:
        "They polish standout projects, present them with confidence, and leave with a portfolio that signals initiative and capability.",
    },
  ];

  return (
    <section id="curriculum" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Curriculum</p>
        <h2 className="section-heading mb-6">
          A progression built for how students <em>actually grow.</em>
        </h2>
        <p className="section-body mb-5">
          Each level meets students where they are, then moves them toward
          stronger agency, sharper judgment, and more ambitious building.
        </p>
        <p className="ui-body-sm mb-14" style={{ color: "#1335b8" }}>
          Designed and taught by IIT and IIM grads.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {classTracks.map((track) => (
          <div
            key={track.grade}
            className="ui-card flex min-h-[280px] flex-col justify-between rounded-[1.75rem] p-6"
          >
            <div className="flex flex-col gap-5">
              <span className="ui-label" style={{ color: "#1335b8" }}>
                {track.grade}
              </span>
              <h3 className="ui-h3" style={{ fontSize: "1.85rem" }}>
                {track.stage}
              </h3>
            </div>

            <p className="ui-body-sm">{track.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
