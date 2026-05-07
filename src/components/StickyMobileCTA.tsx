import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/92 backdrop-blur-xl transition-transform duration-300 md:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        boxShadow: "0 -8px 24px rgba(15,15,15,0.06)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="https://wa.me/"
          aria-label="WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/14"
          style={{ color: "#0a0a0a" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.3c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
          </svg>
        </a>
        <a
          href="#book"
          className="ui-button flex-1"
          style={{ padding: "0.85rem 1.2rem" }}
        >
          Book Free Demo →
        </a>
      </div>
      <div
        className="px-4 pb-2 text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(15,15,15,0.55)",
        }}
      >
        Cohort 12 · Apply by 22 May · 9 seats left
      </div>
    </div>
  );
}
