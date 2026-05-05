import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-10 px-6 py-14">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/8 bg-white px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p
              className="ui-body-sm mt-4"
              style={{ color: "#4a4a4a" }}
            >
              AI literacy for the next generation. Built in India, for Indian
              students.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="ui-label">Program</span>
              {[
                { label: "Curriculum", href: "#curriculum" },
                { label: "Projects", href: "#projects" },
                { label: "Pricing", href: "#pricing" },
                { label: "For Schools", href: "#for-schools" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="ui-body-sm"
                  style={{ color: "#0a0a0a", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="ui-label">Connect</span>
              {["Instagram", "LinkedIn", "WhatsApp", "Email"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="ui-body-sm"
                  style={{ color: "#0a0a0a", textDecoration: "none" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/8 pt-6 sm:flex-row sm:items-center">
          <span className="ui-caption">
            &copy; 2026 AI Wingschool. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="ui-caption"
                style={{ textDecoration: "none" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
