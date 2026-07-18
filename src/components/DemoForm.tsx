import { useId, useState, type ReactNode } from "react";

import { whatsappUrl } from "../lib/contact";
import { supabase } from "../lib/supabase";

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

const formatPhone = (digits: string) =>
  digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;

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
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  // Honeypot — hidden from humans; bots that fill it get a fake success.
  const [website, setWebsite] = useState("");

  const ids = useId();
  const nameId = `${ids}-name`;
  const phoneId = `${ids}-phone`;
  const gradeId = `${ids}-grade`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) {
      setSubmitted(true);
      return;
    }
    setSending(true);
    setFailed(false);
    try {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.from("demo_requests").insert({
        name: name.trim(),
        phone: `+91 ${formatPhone(phone)}`,
        grade: Number(grade),
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const fallbackWhatsapp = whatsappUrl(
    [
      "Hi Wingschool! I'd like to book a demo call.",
      `Name: ${name.trim()}`,
      `WhatsApp: +91 ${formatPhone(phone)}`,
      `Class: ${grade}`,
    ].join("\n"),
  );

  const errorNote = failed ? (
    <p className="ui-caption" style={{ color: "#b3261e" }}>
      Couldn&apos;t send just now — try again, or{" "}
      <a
        href={fallbackWhatsapp}
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        message us on WhatsApp
      </a>
      .
    </p>
  ) : null;

  const firstName = name.split(" ")[0] ?? "";

  return (
    <form id={id} onSubmit={handleSubmit} className={className}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor={`${ids}-website`}>Leave this field empty</label>
        <input
          id={`${ids}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
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
            <div className="ui-input-group">
              <span
                aria-hidden
                style={{
                  color: "rgba(15,15,15,0.55)",
                  paddingRight: "0.6rem",
                  borderRight: "1px solid #e2dfd5",
                }}
              >
                +91
              </span>
              <input
                id={phoneId}
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                pattern="[0-9]{5} [0-9]{5}"
                title="Enter a 10-digit WhatsApp number"
                value={formatPhone(phone)}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="WhatsApp number"
              />
            </div>
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
            <button type="submit" disabled={sending} className="ui-button shrink-0">
              {sending ? "Sending…" : buttonLabel}
            </button>
          </div>
          {errorNote}
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
          <div className="ui-input-group">
            <span
              aria-hidden
              style={{
                color: "rgba(15,15,15,0.55)",
                paddingRight: "0.6rem",
                borderRight: "1px solid #e2dfd5",
              }}
            >
              +91
            </span>
            <input
              id={phoneId}
              required
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              pattern="[0-9]{5} [0-9]{5}"
              title="Enter a 10-digit WhatsApp number"
              value={formatPhone(phone)}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="WhatsApp number"
            />
          </div>
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
          <button type="submit" disabled={sending} className="ui-button mt-2">
            {sending ? "Sending…" : buttonLabel}
          </button>
          {errorNote}
          {formFootnote}
        </>
      )}
    </form>
  );
}
