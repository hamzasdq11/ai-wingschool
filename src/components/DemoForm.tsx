import { useId, useState, type ReactNode } from "react";

import { whatsappUrl } from "../lib/contact";

type DemoFormVariant = "compact" | "stacked";

type DemoFormProps = {
  id?: string;
  variant?: DemoFormVariant;
  className?: string;
  header?: ReactNode;
  buttonLabel?: string;
  formFootnote?: ReactNode;
  successMessage?: (firstName: string, grade: string) => ReactNode;
  successFootnote?: ReactNode;
};

function defaultSuccessMessage(firstName: string) {
  return (
    <>
      Thanks{firstName ? `, ${firstName}` : ""}. We&apos;ll WhatsApp you within
      2 hours to confirm a slot.
    </>
  );
}

export function DemoForm({
  id,
  variant = "stacked",
  className,
  header,
  buttonLabel = "Book now →",
  formFootnote,
  successMessage,
  successFootnote,
}: DemoFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ids = useId();
  const nameId = `${ids}-name`;
  const phoneId = `${ids}-phone`;
  const gradeId = `${ids}-grade`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "Hi Wingschool! I'd like to book a demo call.",
      `Name: ${name.trim()}`,
      `WhatsApp: ${phone.trim()}`,
      `Class: ${grade}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const firstName = name.split(" ")[0] ?? "";

  return (
    <form id={id} onSubmit={handleSubmit} className={className}>
      {header}

      {submitted ? (
        <div className="rounded-[1rem] border border-[rgba(19,53,184,0.22)] bg-[rgba(19,53,184,0.06)] p-5">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#0a0a0a",
            }}
          >
            {successMessage
              ? successMessage(firstName, grade)
              : defaultSuccessMessage(firstName)}
          </p>
          {successFootnote}
        </div>
      ) : variant === "compact" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <label htmlFor={nameId} className="sr-only">
              Name
            </label>
            <input
              id={nameId}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="ui-input"
            />
            <label htmlFor={phoneId} className="sr-only">
              WhatsApp number
            </label>
            <input
              id={phoneId}
              required
              type="tel"
              inputMode="tel"
              pattern="\+?[0-9\s\-]{10,15}"
              title="Enter a valid WhatsApp number (10 digits)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp number"
              className="ui-input"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor={gradeId} className="sr-only">
              Child&apos;s class
            </label>
            <select
              id={gradeId}
              required
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="ui-input flex-1"
            >
              <option value="">Child&apos;s class</option>
              {[5, 6, 7, 8, 9, 10].map((g) => (
                <option key={g} value={g}>
                  Class {g}
                </option>
              ))}
            </select>
            <button type="submit" className="ui-button shrink-0">
              {buttonLabel}
            </button>
          </div>
          {formFootnote}
        </>
      ) : (
        <>
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="ui-input"
          />
          <label htmlFor={phoneId} className="sr-only">
            WhatsApp number
          </label>
          <input
            id={phoneId}
            required
            type="tel"
            inputMode="tel"
            pattern="\+?[0-9\s\-]{10,15}"
            title="Enter a valid WhatsApp number (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp number"
            className="ui-input"
          />
          <label htmlFor={gradeId} className="sr-only">
            Child&apos;s class
          </label>
          <select
            id={gradeId}
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="ui-input"
          >
            <option value="">Child&apos;s class</option>
            {[5, 6, 7, 8, 9, 10].map((g) => (
              <option key={g} value={g}>
                Class {g}
              </option>
            ))}
          </select>
          <button type="submit" className="ui-button mt-2">
            {buttonLabel}
          </button>
          {formFootnote}
        </>
      )}
    </form>
  );
}
