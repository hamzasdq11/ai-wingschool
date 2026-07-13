import alexWang from "../assets/alexwang.webp";
import { Reveal } from "./Reveal";

export function WangQuote({ coda }: { coda?: React.ReactNode }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#05081C" }}
    >
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%]">
        <img
          src={alexWang}
          alt="Alexandr Wang, Chief AI Officer at Meta"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #05081C 0%, rgba(5,8,28,0.92) 14%, rgba(5,8,28,0.62) 32%, rgba(5,8,28,0.18) 58%, rgba(5,8,28,0) 78%)",
          }}
        />
      </div>

      <div className="relative px-6 py-28 sm:px-10 sm:py-32 lg:px-16 lg:py-36">
        <Reveal className="max-w-3xl">
          <a
            href="https://economictimes.indiatimes.com/magazines/panache/young-ai-billionaire-alexandr-wang-urges-teenagers-to-dedicate-all-their-time-to-one-skill-to-seize-todays-tech-opportunities-calling-it-gen-zs-bill-gates-moment/articleshow/124154622.cms"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-100"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
            }}
          >
            Source: Economic Times
          </a>

          <blockquote className="mt-7">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5.8vw, 5.25rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: "#ffffff",
              }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.45)",
                  marginRight: "0.15em",
                }}
              >
                “
              </span>
              The next Bill Gates is a{" "}
              <em className="display-script" style={{ color: "#ffffff" }}>
                13-year-old vibe-coding
              </em>{" "}
              today.
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.45)",
                  marginLeft: "0.05em",
                }}
              >
                ”
              </span>
            </p>
          </blockquote>

          <div className="mt-10 flex items-center gap-5">
            <span
              aria-hidden
              style={{
                display: "block",
                width: "3rem",
                height: "1px",
                background: "rgba(255,255,255,0.45)",
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                  color: "#ffffff",
                }}
              >
                Alexandr Wang
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginTop: "0.5rem",
                }}
              >
                Chief AI Officer · Meta
              </p>
            </div>
          </div>

          {coda && (
            <p
              className="mt-14 max-w-lg"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {coda}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
