import { supabase } from "./supabase";

// Attribution + funnel events, owned in Supabase (`events` table) so
// there are no plan caps and the /stats page can join them against
// registrations. Everything here is fire-and-forget: analytics must
// never break or slow the form.

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ref: string | null;
  referrer: string | null;
};

export type FunnelEvent =
  | "register_view"
  | "form_start"
  | "submit_success"
  | "verified";

const ATTR_KEY = "wq_attr";
const SESSION_KEY = "wq_sid";

const EMPTY: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  ref: null,
  referrer: null,
};

function externalReferrer(): string | null {
  try {
    const ref = document.referrer;
    if (!ref) return null;
    return new URL(ref).host === location.host ? null : ref.slice(0, 300);
  } catch {
    return null;
  }
}

/**
 * Call once at boot. If the landing URL carries campaign params
 * (utm_*, ?ref=) they win — last campaign touch — otherwise the first
 * stored attribution (or first external referrer) sticks.
 */
export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(location.search);
    const fromUrl: Attribution = {
      utm_source: params.get("utm_source")?.slice(0, 160) || null,
      utm_medium: params.get("utm_medium")?.slice(0, 160) || null,
      utm_campaign: params.get("utm_campaign")?.slice(0, 160) || null,
      ref: params.get("ref")?.slice(0, 160) || null,
      referrer: externalReferrer(),
    };
    const hasCampaign =
      fromUrl.utm_source || fromUrl.utm_medium || fromUrl.utm_campaign || fromUrl.ref;
    if (hasCampaign || !localStorage.getItem(ATTR_KEY)) {
      localStorage.setItem(ATTR_KEY, JSON.stringify(fromUrl));
    }
  } catch {
    // storage unavailable (private mode etc.) — attribution stays empty
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) };
  } catch {
    return EMPTY;
  }
}

function sessionId(): string | null {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return null;
  }
}

export function track(name: FunnelEvent): void {
  if (!supabase) return;
  void supabase
    .from("events")
    .insert({
      name,
      session: sessionId(),
      path: location.pathname.slice(0, 200),
      ...getAttribution(),
    })
    .then(
      () => {},
      () => {},
    );
}
