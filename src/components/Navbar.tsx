import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string };

const defaultLinks: NavItem[] = [
  // { label: "Curriculum", href: "#curriculum" }, // temporarily hidden — uncomment to restore
  { label: "Projects", href: "#projects" },
  // { label: "Pricing", href: "#pricing" }, // temporarily hidden — uncomment to restore
  { label: "For Schools", href: "/schools" },
  { label: "FAQ", href: "#faq" },
];

const defaultCta: NavItem = { label: "Book Free Demo", href: "#book" };

function NavAnchor({
  href,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link
        to={href}
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

export function Navbar({
  links = defaultLinks,
  cta = defaultCta,
}: {
  links?: NavItem[];
  cta?: NavItem;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-30 border-b border-black/8 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link to="/" className="no-underline">
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavAnchor
              key={link.label}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.16em] transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(15,15,15,0.62)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(15,15,15,0.95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(15,15,15,0.62)")
              }
            >
              {link.label}
            </NavAnchor>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-black/14 px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] no-underline transition-colors hover:border-black/30 hover:bg-black/3 sm:inline-flex"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(15,15,15,0.85)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.3c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            WhatsApp
          </a>
          <NavAnchor
            href={cta.href}
            className="ui-button hidden md:inline-flex"
            style={{ padding: "0.7rem 1.2rem" }}
          >
            {cta.label}
          </NavAnchor>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/14 md:hidden"
            style={{ color: "#0a0a0a" }}
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 right-0 h-px transition-transform"
                style={{
                  background: "#0a0a0a",
                  top: open ? "6px" : "0",
                  transform: open ? "rotate(45deg)" : "rotate(0)",
                }}
              />
              <span
                className="absolute left-0 right-0 h-px transition-opacity"
                style={{
                  background: "#0a0a0a",
                  top: "6px",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="absolute left-0 right-0 h-px transition-transform"
                style={{
                  background: "#0a0a0a",
                  top: open ? "6px" : "12px",
                  transform: open ? "rotate(-45deg)" : "rotate(0)",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/8 bg-white/98 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <NavAnchor
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[14px] uppercase tracking-[0.16em]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(15,15,15,0.8)",
                }}
              >
                {link.label}
              </NavAnchor>
            ))}
            <NavAnchor
              href={cta.href}
              onClick={() => setOpen(false)}
              className="ui-button mt-3"
            >
              {cta.label}
            </NavAnchor>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="ui-button-secondary"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
