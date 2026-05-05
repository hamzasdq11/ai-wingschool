type LogoProps = {
  variant?: "dark" | "light";
};

export function Logo({ variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <div className="flex flex-col">
      <span
        style={{
          fontFamily: "Georgia, Times, serif",
          fontSize: "clamp(1.45rem, 2vw, 1.8rem)",
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: isLight ? "rgba(255,255,255,0.98)" : "#0a0a0a",
          lineHeight: 1.1,
        }}
      >
        ai wingschool
      </span>
      <span
        style={{
          fontFamily: "var(--font-accent)",
          fontWeight: 200,
          fontStyle: "italic",
          fontSize: "1rem",
          color: isLight ? "rgba(255,255,255,0.68)" : "#6a6a6a",
          marginTop: "0.05rem",
        }}
      >
        ad meliora
      </span>
    </div>
  );
}
