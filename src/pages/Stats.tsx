import { useCallback, useEffect, useState } from "react";
import { PAGE_META, usePageMeta } from "../lib/seo";

// Internal registration counter (noindex, key-gated). Data comes from
// /api/stats?key=… (service role → stats_payload()); the key is
// remembered in localStorage after the first successful load, so the
// bookmarkable URL stays clean.

const TARGET = 2000;
const KEY_STORAGE = "wq_stats_key";
const BRAND = "#1335b8";
const INK = "#0a0a0a";
const INK_MUTED = "rgba(15,15,15,0.55)";
const TRACK = "rgba(15,15,15,0.08)";

type Count = { all: number; verified: number };
type DayRow = { day: string; all: number; verified: number };
type SourceRow = { source: string; all: number; verified: number };
type GradeRow = { grade: number; all: number; verified: number };
type CityRow = { city: string; all: number; verified: number };
type FunnelStage =
  | "register_view"
  | "form_start"
  | "submit_success"
  | "verified";
type Funnel = Partial<Record<FunnelStage, number>>;

type StatsPayload = {
  generated_at: string;
  totals: Count;
  today: Count;
  yesterday: Count;
  daily: DayRow[];
  by_source: SourceRow[];
  by_grade: GradeRow[];
  by_city: CityRow[];
  funnel_today: Funnel;
  funnel_7d: Funnel;
};

const FUNNEL_STAGES: { key: FunnelStage; label: string }[] = [
  { key: "register_view", label: "Register page views" },
  { key: "form_start", label: "Started the form" },
  { key: "submit_success", label: "Submitted (code sent)" },
  { key: "verified", label: "Entered the code" },
];

const nf = new Intl.NumberFormat("en-IN");

function dayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function pct(part: number, whole: number): string {
  return whole > 0 ? `${Math.round((part / whole) * 100)}%` : "—";
}

function Tile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="ui-card rounded-2xl p-5">
      <p className="ui-caption">{label}</p>
      <p
        className="mt-1"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: INK,
        }}
      >
        {value}
      </p>
      {sub && (
        <p className="ui-caption mt-1.5" style={{ color: INK_MUTED }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// One table row with a two-tone bar: gray track = all attempts,
// solid brand fill = verified. Both numbers are printed, so the bar is
// never the only carrier of the value.
function BarRow({
  label,
  verified,
  all,
  max,
}: {
  label: string;
  verified: number;
  all: number;
  max: number;
}) {
  const trackW = max > 0 ? (all / max) * 100 : 0;
  const fillW = max > 0 ? (verified / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span
        className="w-28 shrink-0 truncate sm:w-36"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: INK,
        }}
        title={label}
      >
        {label}
      </span>
      <span className="relative block h-2 flex-1" aria-hidden>
        <span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${trackW}%`, background: TRACK }}
        />
        <span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${fillW}%`, background: BRAND }}
        />
      </span>
      <span
        className="w-24 shrink-0 text-right tabular-nums"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: INK,
        }}
      >
        {nf.format(verified)}
        <span style={{ color: INK_MUTED }}> / {nf.format(all)}</span>
      </span>
    </div>
  );
}

function Section({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ui-card rounded-2xl p-5 sm:p-6">
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: INK,
        }}
      >
        {title}
      </h2>
      {caption && (
        <p className="ui-caption mt-1" style={{ color: INK_MUTED }}>
          {caption}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Stats() {
  usePageMeta(PAGE_META.stats);

  const [key, setKey] = useState<string>(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("key");
      if (fromUrl) return fromUrl;
      return localStorage.getItem(KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  });
  const [keyInput, setKeyInput] = useState("");
  const [data, setData] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stats?key=${encodeURIComponent(k)}`);
      if (res.status === 401) {
        try {
          localStorage.removeItem(KEY_STORAGE);
        } catch {
          /* ignore */
        }
        setKey("");
        setError("That key wasn't accepted.");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const payload = (await res.json()) as StatsPayload;
      setData(payload);
      try {
        localStorage.setItem(KEY_STORAGE, k);
        // Keep the key out of the address bar / screenshots.
        if (window.location.search.includes("key=")) {
          window.history.replaceState(null, "", "/stats");
        }
      } catch {
        /* ignore */
      }
    } catch {
      setError("Couldn't load stats — try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) void load(key);
  }, [key, load]);

  if (!key) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
        <p className="ui-label mb-3" style={{ color: BRAND }}>
          WingsQuest · Internal
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          Registration stats
        </h1>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (keyInput.trim()) setKey(keyInput.trim());
          }}
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Access key"
            className="ui-input w-full"
            autoFocus
          />
          <button type="submit" className="ui-button">
            View stats →
          </button>
          {error && (
            <p className="ui-caption" style={{ color: "#b3261e" }}>
              {error}
            </p>
          )}
        </form>
      </main>
    );
  }

  const funnel7 = data?.funnel_7d ?? {};
  const funnelToday = data?.funnel_today ?? {};
  const dailyMax = Math.max(1, ...(data?.daily.map((d) => d.all) ?? [1]));
  const sourceMax = Math.max(1, ...(data?.by_source.map((s) => s.all) ?? [1]));
  const gradeMax = Math.max(1, ...(data?.by_grade.map((g) => g.all) ?? [1]));
  const cityMax = Math.max(1, ...(data?.by_city.map((c) => c.all) ?? [1]));
  const targetPct = data
    ? Math.min(100, (data.totals.verified / TARGET) * 100)
    : 0;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ui-label mb-2" style={{ color: BRAND }}>
            WingsQuest · Internal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            Registrations
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {data && (
            <span className="ui-caption" style={{ color: INK_MUTED }}>
              {data.generated_at}
            </span>
          )}
          <button
            type="button"
            onClick={() => void load(key)}
            disabled={loading}
            className="ui-button"
            style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <p className="ui-caption mt-6" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      {data && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Tile
              label="Verified today"
              value={nf.format(data.today.verified)}
              sub={`${nf.format(data.today.all)} total today · ${nf.format(
                data.yesterday.verified,
              )} verified yesterday`}
            />
            <Tile
              label="Verified — all time"
              value={nf.format(data.totals.verified)}
              sub={`${pct(data.totals.verified, TARGET)} of the ${nf.format(TARGET)} target`}
            />
            <Tile
              label="All applications"
              value={nf.format(data.totals.all)}
              sub={`${nf.format(data.totals.all - data.totals.verified)} unverified to chase`}
            />
            <div className="ui-card rounded-2xl p-5">
              <p className="ui-caption">Target progress</p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: INK,
                }}
              >
                {pct(data.totals.verified, TARGET)}
              </p>
              <span className="relative mt-3 block h-2" aria-hidden>
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: TRACK }}
                />
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${targetPct}%`, background: BRAND }}
                />
              </span>
              <p className="ui-caption mt-1.5" style={{ color: INK_MUTED }}>
                {nf.format(data.totals.verified)} of {nf.format(TARGET)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Section
              title="Last 14 days"
              caption="Solid = verified · gray = all applications that day"
            >
              {data.daily.length === 0 && (
                <p className="ui-caption">No registrations yet.</p>
              )}
              {data.daily.map((d) => (
                <BarRow
                  key={d.day}
                  label={dayLabel(d.day)}
                  verified={d.verified}
                  all={d.all}
                  max={dailyMax}
                />
              ))}
            </Section>

            <Section
              title="Funnel"
              caption="From the register page's own events (adblockers may undercount — registrations are ground truth)"
            >
              <div
                className="grid items-baseline gap-x-3 gap-y-2"
                style={{ gridTemplateColumns: "1fr auto auto auto" }}
              >
                <span className="ui-caption">Stage</span>
                <span className="ui-caption text-right">Today</span>
                <span className="ui-caption text-right">7 days</span>
                <span className="ui-caption text-right">7d, of previous</span>
                {FUNNEL_STAGES.map((stage, i) => {
                  const prev =
                    i === 0 ? undefined : funnel7[FUNNEL_STAGES[i - 1].key] ?? 0;
                  const val7 = funnel7[stage.key] ?? 0;
                  return (
                    <FunnelRow
                      key={stage.key}
                      label={stage.label}
                      today={funnelToday[stage.key] ?? 0}
                      week={val7}
                      ofPrevious={i === 0 ? "—" : pct(val7, prev ?? 0)}
                    />
                  );
                })}
              </div>
            </Section>

            <Section
              title="By source"
              caption="utm_source, else ?ref= — links you share should carry one"
            >
              {data.by_source.map((s) => (
                <BarRow
                  key={s.source}
                  label={s.source}
                  verified={s.verified}
                  all={s.all}
                  max={sourceMax}
                />
              ))}
            </Section>

            <Section title="By class">
              {data.by_grade.map((g) => (
                <BarRow
                  key={g.grade}
                  label={`Class ${g.grade}`}
                  verified={g.verified}
                  all={g.all}
                  max={gradeMax}
                />
              ))}
            </Section>

            <Section title="Top cities" caption="By verified count, top 12">
              {data.by_city.map((c) => (
                <BarRow
                  key={c.city}
                  label={c.city}
                  verified={c.verified}
                  all={c.all}
                  max={cityMax}
                />
              ))}
            </Section>
          </div>
        </>
      )}
    </main>
  );
}

function FunnelRow({
  label,
  today,
  week,
  ofPrevious,
}: {
  label: string;
  today: number;
  week: number;
  ofPrevious: string;
}) {
  const cell: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    color: INK,
  };
  return (
    <>
      <span style={cell}>{label}</span>
      <span className="text-right tabular-nums" style={cell}>
        {nf.format(today)}
      </span>
      <span className="text-right tabular-nums" style={cell}>
        {nf.format(week)}
      </span>
      <span
        className="text-right tabular-nums"
        style={{ ...cell, color: INK_MUTED }}
      >
        {ofPrevious}
      </span>
    </>
  );
}
