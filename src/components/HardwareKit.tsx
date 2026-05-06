export function HardwareKit() {
  const cards = [
    {
      label: "Every component, included",
      title: "From Arduinos to motors.",
      desc: "Microcontrollers, sensors, actuators, breadboards, batteries, jumper cables — every kit is curated per project and age-appropriate per class. Your child opens the box and starts building.",
    },
    {
      label: "Doorstep, anywhere in India",
      title: "From Mumbai to Manipur.",
      desc: "Free pan-India delivery. No surcharges, no hobby-shop scavenger hunts, no parent runaround — we coordinate logistics with your address at signup.",
    },
    {
      label: "Break it, replace it",
      title: "Stuff breaks. We resend.",
      desc: "Wire something wrong? Drop a sensor? Free replacements, no questions. After the program ends, the entire kit stays with your child — yours forever.",
    },
  ];

  return (
    <section id="hardware" className="section-shell relative z-10">
      <div className="section-copy">
        <p className="section-kicker mb-4">Beyond the screen</p>
        <h2 className="section-heading mb-6">
          Real builds. Real things in their hands. <em>Delivered home.</em>
        </h2>
        <p className="section-body mb-14">
          AI shouldn&apos;t live behind glass. Every project that needs a
          microcontroller, sensor, motor, or robotics module ships free —
          pan-India, doorstep, no parent runaround. Break a part, we replace
          it. Finish the program, the kit stays with your child.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="ui-card flex flex-col gap-4 rounded-[1.75rem] p-7"
          >
            <span className="ui-label" style={{ color: "#1335b8" }}>
              {card.label}
            </span>
            <h3 className="ui-h3">{card.title}</h3>
            <p className="ui-body-sm">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="ui-card mt-12 flex flex-wrap items-center justify-between gap-6 rounded-[1.5rem] px-6 py-5 sm:px-8">
        <div>
          <p className="ui-label" style={{ color: "#1335b8" }}>
            Embodied AI, embodied delivery
          </p>
          <p
            className="mt-2 max-w-xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#0a0a0a",
              lineHeight: 1.5,
            }}
          >
            Other programs <em>talk about</em> embodied AI. Your child is
            building it — with real parts, from their own desk.
          </p>
        </div>
        <a href="#projects" className="ui-button shrink-0">
          See what they build →
        </a>
      </div>
    </section>
  );
}
