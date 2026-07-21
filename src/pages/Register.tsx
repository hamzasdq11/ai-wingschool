import { useEffect, useId, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { applicationMailto, CONTACT_EMAIL } from "../lib/contact";
import { PAGE_META, usePageMeta } from "../lib/seo";
import { getAttribution, track } from "../lib/analytics";

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
    desc: "The strongest builders present their work live before IIT/IIM mentors and industry experts panel.",
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

// Matches the server's RESEND_COOLDOWN_SECONDS; the response's
// `cooldown` field wins when present.
const RESEND_COOLDOWN_FALLBACK = 45;

// Common misspellings of the domains our applicants actually use. A
// mistyped email is the #1 way to lose someone at the code step: the
// code goes to an address that doesn't exist. Suggestions are
// non-blocking: one tap applies the fix, ignoring it costs nothing.
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmali.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gemail.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.om": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yhoo.com": "yahoo.com",
  "yahoo.cm": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmall.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotnail.com": "hotmail.com",
  "hotmil.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloook.com": "outlook.com",
  "outlook.co": "outlook.com",
  "iclod.com": "icloud.com",
  "icoud.com": "icloud.com",
  "redifmail.com": "rediffmail.com",
  "rediffmal.com": "rediffmail.com",
};

function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  // ".con" is not a TLD; it is always a fat-fingered ".com".
  const fixed =
    DOMAIN_TYPOS[domain] ??
    (domain.endsWith(".con") ? domain.replace(/\.con$/, ".com") : undefined);
  return fixed && fixed !== domain ? `${local}@${fixed}` : null;
}

type RegisterApiResponse = {
  ok?: boolean;
  reused?: boolean;
  cooldown?: number;
  error?: string;
  attemptsLeft?: number;
};

async function callRegisterApi(body: object): Promise<RegisterApiResponse> {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  try {
    return (await res.json()) as RegisterApiResponse;
  } catch {
    return { error: "server" };
  }
}

const linkButtonStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.78rem",
  fontWeight: 500,
  color: "#1335b8",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

const linkButtonDisabledStyle: React.CSSProperties = {
  ...linkButtonStyle,
  color: "rgba(15,15,15,0.45)",
  textDecoration: "none",
  cursor: "default",
};

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
  // Honeypot: hidden from humans; bots that fill it get a fake success.
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failedMsg, setFailedMsg] = useState<string | null>(null);

  // Email-verification step, shown in the same card after submit.
  const [step, setStep] = useState<"form" | "verify">("form");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyInfo, setVerifyInfo] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendAt, setResendAt] = useState(0);
  const [nowTs, setNowTs] = useState(() => Date.now());

  useEffect(() => {
    if (step !== "verify") return;
    const t = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [step]);
  const resendIn = Math.max(0, Math.ceil((resendAt - nowTs) / 1000));

  const cardRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  // Focusing the email input can't happen in the same tick that leaves
  // the verify step (the form hasn't remounted yet), so it's deferred
  // to the effect below.
  const focusEmailOnForm = useRef(false);

  // Funnel events: each fires at most once per visit to the page.
  const trackedFormStart = useRef(false);
  const trackedSubmitSuccess = useRef(false);
  useEffect(() => {
    track("register_view");
  }, []);
  const markFormStart = () => {
    if (trackedFormStart.current) return;
    trackedFormStart.current = true;
    track("form_start");
  };
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

  // "start" both begins the flow and re-sends: the server keeps one
  // active code per email, refreshes the stored application on rapid
  // re-submits, and rotates the code outside the cooldown window.
  const requestCode = () =>
    callRegisterApi({
      action: "start",
      application: {
        ...application,
        grade: Number(application.grade),
        interest: spark.trim(),
      },
      attribution: getAttribution(),
    });

  useEffect(() => {
    if (step === "form" && focusEmailOnForm.current) {
      focusEmailOnForm.current = false;
      fieldRefs.email.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const showEmailExists = () => {
    focusEmailOnForm.current = true;
    setStep("form");
    setErrors((prev) => ({
      ...prev,
      email: "An application with this email already exists.",
    }));
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
    setFailedMsg(null);
    try {
      const res = await requestCode();
      if (res.ok) {
        if (!trackedSubmitSuccess.current) {
          trackedSubmitSuccess.current = true;
          track("submit_success");
        }
        setStep("verify");
        setCode("");
        setVerifyError(null);
        setVerifyInfo(
          res.reused
            ? "We'd already emailed you a code. It's still valid."
            : null,
        );
        setResendAt(
          Date.now() + (res.cooldown ?? RESEND_COOLDOWN_FALLBACK) * 1000,
        );
        requestAnimationFrame(() => {
          cardRef.current?.scrollIntoView({ block: "nearest" });
        });
      } else if (res.error === "duplicate_email") {
        showEmailExists();
      } else if (res.error === "too_many_codes") {
        setFailedMsg("Too many attempts right now. Try again in an hour, or");
      } else if (res.error === "send_failed") {
        setFailedMsg("We couldn't email your code. Try again in a moment, or");
      } else {
        setFailedMsg("Couldn't submit just now. Try again, or");
      }
    } catch {
      setFailedMsg("Couldn't submit just now. Try again, or");
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async (codeToTry: string) => {
    if (verifying) return;
    setVerifying(true);
    setVerifyError(null);
    try {
      const res = await callRegisterApi({
        action: "verify",
        email: application.email,
        code: codeToTry,
      });
      if (res.ok) {
        track("verified");
        setSubmitted(true);
        requestAnimationFrame(() => {
          cardRef.current?.scrollIntoView({ block: "nearest" });
        });
        return;
      }
      switch (res.error) {
        case "invalid_code":
          setCode("");
          setVerifyError(
            res.attemptsLeft === 1
              ? "That code didn't match. One try left before you'll need a fresh one."
              : "That code didn't match. Check the latest email and try again.",
          );
          requestAnimationFrame(() => codeRef.current?.focus());
          break;
        case "expired":
          setCode("");
          setResendAt(0);
          setVerifyError("That code has expired. Tap Resend for a fresh one.");
          break;
        case "too_many_attempts":
          setCode("");
          setResendAt(0);
          setVerifyError(
            "Too many tries with that code. Tap Resend for a fresh one.",
          );
          break;
        case "duplicate_email":
          showEmailExists();
          break;
        default:
          setVerifyError("Couldn't check that code. Give it another try.");
      }
    } catch {
      setVerifyError("Couldn't check that code. Network hiccup, try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleCodeChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setCode(digits);
    if (verifyError) setVerifyError(null);
    // The sixth digit submits by itself, typed or pasted.
    if (digits.length === 6) void verifyCode(digits);
  };

  const resendCode = async () => {
    if (resending || resendIn > 0) return;
    setResending(true);
    setVerifyError(null);
    try {
      const res = await requestCode();
      if (res.ok) {
        setCode("");
        setVerifyInfo(
          res.reused
            ? "Your earlier code is still valid. Check the email we already sent."
            : "New code sent. It replaces earlier ones.",
        );
        setResendAt(
          Date.now() + (res.cooldown ?? RESEND_COOLDOWN_FALLBACK) * 1000,
        );
        requestAnimationFrame(() => codeRef.current?.focus());
      } else if (res.error === "too_many_codes") {
        setVerifyError(
          "Too many codes requested for now. Wait a while, or email us your application below.",
        );
      } else if (res.error === "duplicate_email") {
        showEmailExists();
      } else {
        setVerifyError("Couldn't send a new code. Try again in a moment.");
      }
    } catch {
      setVerifyError("Couldn't send a new code. Network hiccup, try again.");
    } finally {
      setResending(false);
    }
  };

  const editEmail = () => {
    focusEmailOnForm.current = true;
    setStep("form");
    setCode("");
    setVerifyError(null);
    setVerifyInfo(null);
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
              WingsQuest 2026 · Class 6–10
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
                    </b>
                    , so keep an eye on it.
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
              ) : step === "verify" ? (
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
                    One last step
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
                    Enter your 6-digit code
                  </h2>
                  <p className="ui-body mt-4">
                    We&apos;ve emailed it to{" "}
                    <b style={{ color: "#0a0a0a", fontWeight: 500 }}>
                      {application.email}
                    </b>
                    . It can take a minute. Check spam or promotions if it
                    hasn&apos;t landed.
                  </p>
                  {verifyInfo && (
                    <p
                      className="ui-caption mt-3"
                      style={{ color: "#1335b8" }}
                    >
                      {verifyInfo}
                    </p>
                  )}

                  <div className="mt-6">
                    <label htmlFor={`${ids}-code`} style={fieldLabelStyle}>
                      Confirmation code
                    </label>
                    <input
                      id={`${ids}-code`}
                      ref={codeRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      autoFocus
                      value={code}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      placeholder="••••••"
                      disabled={verifying}
                      className={`ui-input w-full${verifyError ? " ui-input-error" : ""}`}
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 500,
                        letterSpacing: "0.4em",
                        textIndent: "0.4em",
                        textAlign: "center",
                      }}
                      aria-invalid={Boolean(verifyError)}
                      aria-describedby={
                        verifyError ? `${ids}-code-error` : undefined
                      }
                    />
                    {verifyError && (
                      <p id={`${ids}-code-error`} style={errorTextStyle}>
                        {verifyError}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => verifyCode(code)}
                    disabled={verifying || code.length !== 6}
                    className="ui-button mt-6"
                  >
                    {verifying ? "Checking…" : "Confirm & enter →"}
                  </button>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={resendCode}
                      disabled={resending || resendIn > 0}
                      style={
                        resending || resendIn > 0
                          ? linkButtonDisabledStyle
                          : linkButtonStyle
                      }
                    >
                      {resending
                        ? "Sending…"
                        : resendIn > 0
                          ? `Resend code in ${resendIn}s`
                          : "Resend code"}
                    </button>
                    <button
                      type="button"
                      onClick={editEmail}
                      style={linkButtonStyle}
                    >
                      Wrong email? Edit it
                    </button>
                  </div>

                  <p className="ui-caption mt-6">
                    Still nothing after a few minutes?{" "}
                    <a
                      href={applicationMailto({
                        ...application,
                        phone: `+91 ${formatPhone(phone)}`,
                      })}
                      className="underline"
                      style={{ color: "#1335b8" }}
                    >
                      Email us your application
                    </a>{" "}
                    and we&apos;ll take it from there.
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  onInput={markFormStart}
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
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailSuggestion(null);
                          handleChange("email", e.target.value);
                        }}
                        onBlur={() => {
                          handleBlur("email");
                          setEmailSuggestion(suggestEmail(email.trim()));
                        }}
                        placeholder="Enter email address"
                        className={`ui-input w-full${errors.email ? " ui-input-error" : ""}`}
                        {...errorProps("email")}
                      />
                      {fieldError("email")}
                      {emailSuggestion && (
                        <button
                          type="button"
                          onClick={() => {
                            setEmail(emailSuggestion);
                            setEmailSuggestion(null);
                            handleChange("email", emailSuggestion);
                          }}
                          className="mt-2 block text-left"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.75rem",
                            color: "#1335b8",
                          }}
                        >
                          Did you mean{" "}
                          <b
                            style={{
                              fontWeight: 600,
                              textDecoration: "underline",
                              textUnderlineOffset: "3px",
                            }}
                          >
                            {emailSuggestion}
                          </b>
                          ? Tap to fix.
                        </button>
                      )}
                      <p className="ui-caption mt-2">
                        Your 6-digit confirmation code and all WingsQuest
                        communications will be sent here.
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
                    {sending ? "Sending your code…" : "Enter WingsQuest →"}
                  </button>
                  {failedMsg ? (
                    <p
                      className="ui-caption mt-3"
                      style={{ color: "#b3261e" }}
                    >
                      {failedMsg}{" "}
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
                  ) : (
                    <p className="ui-caption mt-3">
                      Last step after this: a 6-digit code lands in your email.
                      Enter it to confirm your application.
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
