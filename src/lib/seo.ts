import { useEffect } from "react";

export const SITE_URL = "https://www.aiwingschool.com";
export const SITE_NAME = "AI Wingschool";

export type PageMeta = {
  /** Canonical path, e.g. "/register". */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

export const PAGE_META = {
  home: {
    path: "/",
    title: "AI Wingschool — Teenagers Learning to Think and Build with AI",
    description:
      "WingsQuest 2026 — India's AI aptitude challenge for Classes 6–10. A free one-hour online test, then a live AI Builder Program mentored by IIT & IIM graduates.",
  },
  register: {
    path: "/register",
    title: "Apply: WingsQuest 2026 AI Challenge, Classes 6–10 | AI Wingschool",
    description:
      "Register for WingsQuest 2026, the free All India AI Aptitude Challenge for Classes 6–10. Applications close 15 August; Challenge Day is 28 August. No coding needed.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | AI Wingschool",
    description:
      "How AI Wingschool collects, uses, and protects the information families share through WingsQuest 2026 applications and mentor-call bookings.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use | AI Wingschool",
    description:
      "The terms that govern use of aiwingschool.com and participation in WingsQuest 2026 and the AI Builder Program.",
  },
  notFound: {
    path: "/",
    title: "Page Not Found | AI Wingschool",
    description: "That page doesn't exist. Everything worth finding is on the home page.",
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

function upsertMeta(selector: string, create: () => HTMLElement, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function namedMeta(name: string, value: string) {
  upsertMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    return m;
  }, value);
}

function propertyMeta(property: string, value: string) {
  upsertMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("property", property);
    return m;
  }, value);
}

/**
 * Keeps the document head in sync on client-side navigation. On first load
 * the prerendered HTML already carries the right tags; this only matters
 * when the user (or Google's renderer) navigates within the SPA.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

    document.title = meta.title;
    namedMeta("description", meta.description);
    namedMeta(
      "robots",
      meta.noindex
        ? "noindex"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    );
    namedMeta("twitter:title", meta.title);
    namedMeta("twitter:description", meta.description);
    propertyMeta("og:title", meta.title);
    propertyMeta("og:description", meta.description);
    propertyMeta("og:url", url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (meta.noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }
  }, [meta]);
}
