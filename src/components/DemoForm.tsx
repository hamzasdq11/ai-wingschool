import { useId, useState, type ReactNode } from "react";

type DemoFormVariant = "compact" | "stacked";

type DemoFormProps = {
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
  variant = "stacked",
  className,
  header,
  buttonLabel = "Book Free Demo →",
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
    setSubmitted(true);
  };

  const firstName = name.split(" ")[0] ?? "";

  return (
    <form onSubmit={handleSubmit} className={className}>
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
              Parent name
            </label>
            <input
              id={nameId}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Parent name"
              className="ui-input"
            />
            <label htmlFor={phoneId} className="sr-only">
              WhatsApp number
            </label>
            <input
              id={phoneId}
              required
              type="tel"
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
            Parent name
          </label>
          <input
            id={nameId}
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Parent name"
            className="ui-input"
          />
          <label htmlFor={phoneId} className="sr-only">
            WhatsApp number
          </label>
          <input
            id={phoneId}
            required
            type="tel"
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
