import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import bannerBottom from "../assets/BannerBottom.webp";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  WHATSAPP_URL,
} from "../lib/contact";

const programLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#faq" },
  { label: "WingsQuest 2026", href: "/#wingsquest" },
  { label: "FAQ", href: "/#faq" },
];

const connectLinks = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-20 overflow-hidden"
      style={{
        backgroundImage: `url(${bannerBottom})`,
        backgroundSize: "cover",
        backgroundPosition: "center calc(50% - 2cm)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,40,0.50) 0%, rgba(8,12,40,0.88) 60%, rgba(8,12,40,0.94) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p
              className="mt-5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              AI literacy for the next generation. Built in India, for the
              students who&apos;ll define the AI era.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-14">
            <FooterColumn label="Program" links={programLinks} />
            <FooterColumn label="Connect" links={connectLinks} />
            <div className="flex flex-col gap-3">
              <FooterLabel>Reach us</FooterLabel>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-opacity hover:opacity-100"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  opacity: 0.85,
                }}
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                  textDecoration: "none",
                }}
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            © 2026 AI Wingschool. All rights reserved.
          </span>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <FooterLabel>{label}</FooterLabel>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          className="transition-opacity"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.68rem",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
      }}
    >
      {children}
    </span>
  );
}
