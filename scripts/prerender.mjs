// Runs after `vite build` (client) + `vite build --ssr` (dist-ssr).
// Renders every route to static HTML inside dist/ so crawlers that don't
// execute JavaScript still see the full page, with per-route head tags.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { render, PAGE_META, SITE_URL } = await import(
  resolve(root, "dist-ssr/prerender.js")
);

// Each non-home route is written twice: register.html for hosts that
// resolve /register via clean URLs (Vercel cleanUrls, sirv), and
// register/index.html for hosts that resolve directory indexes (/register/).
const ROUTES = [
  { path: "/", meta: PAGE_META.home, outFiles: ["dist/index.html"] },
  { path: "/register", meta: PAGE_META.register, outFiles: ["dist/register.html", "dist/register/index.html"] },
  { path: "/privacy", meta: PAGE_META.privacy, outFiles: ["dist/privacy.html", "dist/privacy/index.html"] },
  { path: "/terms", meta: PAGE_META.terms, outFiles: ["dist/terms.html", "dist/terms/index.html"] },
];

const esc = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// Replace a whole tag matched by `regex` with `tag` (literal, no $-expansion).
function setTag(html, regex, tag) {
  if (!regex.test(html)) throw new Error(`prerender: no match for ${regex}`);
  return html.replace(regex, () => tag);
}

const template = readFileSync(resolve(root, "dist/index.html"), "utf8");

for (const { path, meta, outFiles } of ROUTES) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  let html = template;

  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setTag(
    html,
    /<meta[^>]*name="description"[^>]*>/,
    `<meta name="description" content="${esc(meta.description)}" />`,
  );
  html = setTag(
    html,
    /<link[^>]*rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  );
  for (const prop of ["og:title", "twitter:title"]) {
    html = setTag(
      html,
      new RegExp(`<meta[^>]*(?:property|name)="${prop}"[^>]*>`),
      `<meta ${prop.startsWith("og:") ? "property" : "name"}="${prop}" content="${esc(meta.title)}" />`,
    );
  }
  for (const prop of ["og:description", "twitter:description"]) {
    html = setTag(
      html,
      new RegExp(`<meta[^>]*(?:property|name)="${prop}"[^>]*>`),
      `<meta ${prop.startsWith("og:") ? "property" : "name"}="${prop}" content="${esc(meta.description)}" />`,
    );
  }
  html = setTag(
    html,
    /<meta[^>]*property="og:url"[^>]*>/,
    `<meta property="og:url" content="${url}" />`,
  );

  // Keep route-scoped JSON-LD blocks only on their routes.
  html = html.replace(
    /[\t ]*<script type="application\/ld\+json"( data-routes="([^"]*)")?>[\s\S]*?<\/script>\n?/g,
    (block, attr, routes) => {
      if (!attr) return block;
      if (!routes.split(" ").includes(path)) return "";
      return block.replace(attr, "");
    },
  );

  const appHtml = render(path);
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);

  for (const outFile of outFiles) {
    const out = resolve(root, outFile);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  console.log(`prerendered ${path} -> ${outFiles.join(", ")} (${(html.length / 1024).toFixed(0)} kB)`);
}

rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
