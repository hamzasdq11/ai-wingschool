/* eslint-disable react-refresh/only-export-components -- build-time SSR entry, never hot-reloaded */
// SSR entry used only at build time by scripts/prerender.mjs to render
// each route into static HTML that non-JS crawlers (GPTBot, ClaudeBot,
// PerplexityBot, …) can read. Never shipped to the browser.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { PAGE_META, SITE_URL } from "./lib/seo";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
