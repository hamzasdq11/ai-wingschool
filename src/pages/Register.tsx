import { useId, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { applicationMailto, CONTACT_EMAIL } from "../lib/contact";
import { PAGE_META, usePageMeta } from "../lib/seo";
import { supabase } from "../lib/supabase";

const facts = [
  { value: "3 stages", label: "One journey" },
  { value: "Classes 6–10", label: "Across India" },
  { value: "28 August", label: "Stage One begins" },
];

const journey = [
  {
    number: "01",
    title: "The Challenge",
    desc: "Sixty minutes of reasoning, curiosity and builder instinct. This is where every WingsQuest journey begins.",
  },
  {
    number: "02",
    title: "The AI Builder Program",
    desc: "Selected participants turn ideas into something real, guided through an intensive building experience.",
  },
  {
    number: "03",
    title: "Flagship Expo Day",
    desc: "The strongest builders present their work live before parents, IIT/IIM mentors and industry experts panel.",
  },
  
];

type FieldName =
  | "student"
  | "grade"
  | "city"
  | "school"
  | "board"
  | "email"
  | "phone";

const FIELD_ORDER: FieldName[] = [
  "student",
  "email",
  "phone",
  "grade",
  "city",
  "school",
  "board",
];

const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "Cambridge (IGCSE)", "Other"];

const SPARK_MAX = 180;

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "rgba(15,15,15,0.62)",
  marginBottom: "0.4rem",
};

const errorTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  color: "#b3261e",
  marginTop: "0.4rem",
};

const formatPhone = (digits: string) =>
  digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;

export function Register() {
  usePageMeta(PAGE_META.register);

  const [student, setStudent] = useState("");
  const [grade, setGrade] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [board, setBoard] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // 10 digits, unformatted
  const [spark, setSpark] = useState("");
  const [sparkFocused, setSparkFocused] = useState(false);
  // Honeypot — hidden from humans; bots that fill it get a fake success.
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const fieldRefs: Record<FieldName, React.RefObject<HTMLElement | null>> = {
    student: useRef<HTMLInputElement>(null),
    grade: useRef<HTMLSelectElement>(null),
    city: useRef<HTMLInputElement>(null),
    school: useRef<HTMLInputElement>(null),
    board: useRef<HTMLSelectElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
  };
  const ids = useId();

  const values: Record<FieldName, string> = {
    student,
    grade,
    city,
    school,
    board,
    email,
    phone,
  };

  const validate = (field: FieldName, value: string): string => {
    switch (field) {
      case "student":
        return value.trim() ? "" : "Enter the student's name.";
      case "grade":
        return value ? "" : "Select a class.";
      case "city":
        return value.trim() ? "" : "Enter a city.";
      case "school":
        return value.trim() ? "" : "Enter the school name.";
      case "board":
        return value ? "" : "Select a board.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Enter a valid email address.";
      case "phone":
        return /^[6-9][0-9]{9}$/.test(value)
          ? ""
          : "Enter a valid 10-digit phone number.";
    }
  };

  const handleBlur = (field: FieldName) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
  };

  // Live-clear an error once the field becomes valid; never introduce
  // one mid-typing.
  const handleChange = (field: FieldName, value: string) => {
    setErrors((prev) =>
      prev[field] && !validate(field, value) ? { ...prev, [field]: "" } : prev,
    );
  };

  const application = {
    student: student.trim(),
    grade,
    school: school.trim(),
    board,
    city: city.trim(),
    email: email.trim(),
    phone,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of FIELD_ORDER) {
      nextErrors[field] = validate(field, values[field]);
    }
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    if (website) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setFailed(false);
    try {
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase.from("registrations").insert({
        student: application.student,
        grade: Number(application.grade),
        school: application.school,
        board: application.board,
        city: application.city,
        email: application.email,
        phone: application.phone,
        interest: spark.trim(),
      });
      if (error) {
        if (error.code === "23505") {
          setErrors((prev) => ({
            ...prev,
            email: "An application with this email already exists.",
          }));
          fieldRefs.email.current?.focus();
          return;
        }
        throw error;
      }
      setSubmitted(true);
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ block: "nearest" });
      });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const firstName = student.trim().split(" ")[0] ?? "";

  const fieldError = (field: FieldName) =>
    errors[field] ? (
      <p id={`${ids}-${field}-error`} style={errorTextStyle}>
        {errors[field]}
      </p>
    ) : null;

  const errorProps = (field: FieldName) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${ids}-${field}-error` : undefined,
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="relative z-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(19,53,184,0.10),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(19,53,184,0.05),transparent_28%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-14 pb-24 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:px-8 lg:pt-20">
          <Reveal className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <p className="section-kicker mb-4">
              WingsQuest 2026 · All India AI Aptitude Challenge · Class 6–10
            </p>
            <h1 className="section-heading mb-6">
              See how far your{" "}
              <em className="display-script">thinking</em> can take you.
            </h1>
            <p className="section-body max-w-lg">
              WingsQuest 2026 is a journey for young thinkers, builders and the relentlessly curious. It begins with a 60-minute challenge. How far you go from there is up to you.
            </p>

            <div className="mt-9 grid gap-y-5 sm:grid-cols-3 sm:gap-x-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#0a0a0a",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.value}
                  </p>
                  <p className="ui-caption mt-1.5">{f.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={60}
            className="order-3 lg:order-none lg:col-start-1 lg:row-start-2"
          >
            <div className="border-t border-black/8 pt-6">
              <p className="ui-label mb-6" style={{ color: "#1335b8" }}>
                Your WingsQuest journey
              </p>
              <div className="flex flex-col gap-6">
                {journey.map((step, idx) => (
                  <div
                    key={step.number}
                    className="relative grid grid-cols-[44px_1fr] items-start gap-4"
                  >
                    {idx < journey.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -bottom-6 left-[21.5px] top-11 w-px"
                        style={{ background: "rgba(15,15,15,0.12)" }}
                      />
                    )}
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{
                        border: "1px solid rgba(15,15,15,0.14)",
                        background: "#ffffff",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.85rem",
                        color: "#1335b8",
                      }}
                    >
                      {step.number}
                    </span>
                    <div className="pt-1">
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                          color: "#0a0a0a",
                        }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="ui-body-sm mt-1.5 max-w-sm"
                        style={{ color: "rgba(15,15,15,0.55)" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24"
          >
            <div
              ref={cardRef}
              className="ui-card relative scroll-mt-28 overflow-hidden rounded-[2rem] p-6 sm:p-8"
              style={{
                boxShadow:
                  "0 1px 2px rgba(15,15,15,0.04), 0 30px 60px -28px rgba(19,53,184,0.18)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(19,53,184,0.14), transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {submitted ? (
                <div className="relative">
                  <span
                    className="blue-chip inline-flex px-3 py-1"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.64rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Application received
                  </span>
                  <h2
                    className="mt-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      color: "#0a0a0a",
                    }}
                  >
                    {firstName ? `You're in, ${firstName}.` : "You're in."}
                  </h2>
                  <p className="ui-body mt-4">
                    Your application is with us. Your entry confirmation and
                    all official WingsQuest communications will arrive at{" "}
                    <b style={{ color: "#0a0a0a", fontWeight: 500 }}>
                      {application.email}
                    </b>{" "}
                    — keep an eye on it.
                  </p>
                  <p className="ui-caption mt-6">
                    Questions in the meantime? Write to{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="underline"
                      style={{ color: "#1335b8" }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="relative flex flex-col"
                >
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
                    <label htmlFor={`${ids}-website`}>
                      Leave this field empty
                    </label>
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
                  <div className="mb-7">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.35rem",
                        fontWeight: 400,
                        color: "#0a0a0a",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Apply to WingsQuest 2026
                    </p>
                    <p className="ui-caption mt-1">
                      Applications close 15 August
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor={`${ids}-student`} style={fieldLabelStyle}>
                        Student's full name
                      </label>
                      <input
                        id={`${ids}-student`}
                        ref={fieldRefs.student as React.RefObject<HTMLInputElement>}
                        type="text"
                        autoComplete="name"
                        value={student}
                        onChange={(e) => {
                          setStudent(e.target.value);
                          handleChange("student", e.target.value);
                        }}
                        onBlur={() => handleBlur("student")}
                        placeholder="Enter full name"
                        className={`ui-input w-full${errors.student ? " ui-input-error" : ""}`}
                        {...errorProps("student")}
                      />
                      {fieldError("student")}
                    </div>

                    <div>
                      <label htmlFor={`${ids}-email`} style={fieldLabelStyle}>
                        Email
                      </label>
                      <input
                        id={`${ids}-email`}
                        ref={fieldRefs.email as React.RefObject<HTMLInputElement>}
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleChange("email", e.target.value);
                        }}
                        onBlur={() => handleBlur("email")}
                        placeholder="Enter email address"
                        className={`ui-input w-full${errors.email ? " ui-input-error" : ""}`}
                        {...errorProps("email")}
                      />
                      {fieldError("email")}
                      <p className="ui-caption mt-2">
                        Official WingsQuest communications and details will be
                        sent here.
                      </p>
                    </div>

                    <div>
                      <label htmlFor={`${ids}-phone`} style={fieldLabelStyle}>
                        Phone number
                      </label>
                      <div
                        className={`ui-input-group${errors.phone ? " ui-input-error" : ""}`}
                      >
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
                          id={`${ids}-phone`}
                          ref={fieldRefs.phone as React.RefObject<HTMLInputElement>}
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={formatPhone(phone)}
                          onChange={(e) => {
                            const digits = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            setPhone(digits);
                            handleChange("phone", digits);
                          }}
                          onBlur={() => handleBlur("phone")}
                          placeholder="Enter phone number"
                          {...errorProps("phone")}
                        />
                      </div>
                      {fieldError("phone")}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${ids}-grade`} style={fieldLabelStyle}>
                          Class
                        </label>
                        <select
                          id={`${ids}-grade`}
                          ref={fieldRefs.grade as React.RefObject<HTMLSelectElement>}
                          value={grade}
                          onChange={(e) => {
                            setGrade(e.target.value);
                            handleChange("grade", e.target.value);
                          }}
                          onBlur={() => handleBlur("grade")}
                          className={`ui-input w-full${errors.grade ? " ui-input-error" : ""}`}
                          {...errorProps("grade")}
                        >
                          <option value="">Select class</option>
                          {[6, 7, 8, 9, 10].map((g) => (
                            <option key={g} value={g}>
                              Class {g}
                            </option>
                          ))}
                        </select>
                        {fieldError("grade")}
                      </div>
                      <div>
                        <label htmlFor={`${ids}-city`} style={fieldLabelStyle}>
                          City
                        </label>
                        <input
                          id={`${ids}-city`}
                          ref={fieldRefs.city as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            handleChange("city", e.target.value);
                          }}
                          onBlur={() => handleBlur("city")}
                          placeholder="Enter city"
                          className={`ui-input w-full${errors.city ? " ui-input-error" : ""}`}
                          {...errorProps("city")}
                        />
                        {fieldError("city")}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${ids}-school`} style={fieldLabelStyle}>
                          School
                        </label>
                        <input
                          id={`${ids}-school`}
                          ref={fieldRefs.school as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={school}
                          onChange={(e) => {
                            setSchool(e.target.value);
                            handleChange("school", e.target.value);
                          }}
                          onBlur={() => handleBlur("school")}
                          placeholder="Enter school name"
                          className={`ui-input w-full${errors.school ? " ui-input-error" : ""}`}
                          {...errorProps("school")}
                        />
                        {fieldError("school")}
                      </div>
                      <div>
                        <label htmlFor={`${ids}-board`} style={fieldLabelStyle}>
                          Board
                        </label>
                        <select
                          id={`${ids}-board`}
                          ref={fieldRefs.board as React.RefObject<HTMLSelectElement>}
                          value={board}
                          onChange={(e) => {
                            setBoard(e.target.value);
                            handleChange("board", e.target.value);
                          }}
                          onBlur={() => handleBlur("board")}
                          className={`ui-input w-full${errors.board ? " ui-input-error" : ""}`}
                          {...errorProps("board")}
                        >
                          <option value="">Select board</option>
                          {BOARDS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                        {fieldError("board")}
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${ids}-spark`} style={fieldLabelStyle}>
                        What's something you want to build, solve, or
                        understand?
                      </label>
                      <textarea
                        id={`${ids}-spark`}
                        rows={2}
                        maxLength={SPARK_MAX}
                        value={spark}
                        onChange={(e) => setSpark(e.target.value)}
                        onFocus={() => setSparkFocused(true)}
                        onBlur={() => setSparkFocused(false)}
                        className="ui-input w-full resize-none"
                      />
                      <div className="mt-1.5 flex items-baseline justify-between gap-3">
                        <p className="ui-caption">A brief response is sufficient.</p>
                        {(sparkFocused || spark.length > 0) && (
                          <p className="ui-caption shrink-0">
                            {spark.length}/{SPARK_MAX}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="ui-button mt-7"
                  >
                    {sending ? "Submitting…" : "Enter WingsQuest →"}
                  </button>
                  {failed && (
                    <p
                      className="ui-caption mt-3"
                      style={{ color: "#b3261e" }}
                    >
                      Couldn&apos;t submit just now — try again, or{" "}
                      <a
                        href={applicationMailto({
                          ...application,
                          phone: `+91 ${formatPhone(phone)}`,
                        })}
                        className="underline"
                      >
                        email us your application
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
