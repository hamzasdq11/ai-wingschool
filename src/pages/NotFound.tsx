import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PAGE_META, usePageMeta } from "../lib/seo";

export function NotFound() {
  usePageMeta(PAGE_META.notFound);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="section-shell relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-20 text-center">
          <p className="section-kicker mb-4">404</p>
          <h1 className="section-heading mb-6">
            This page never <em>took off.</em>
          </h1>
          <p className="section-body mb-10 max-w-md">
            The address may have changed, or it never existed. Everything
            worth finding is back on the home page.
          </p>
          <Link to="/" className="ui-button">
            Back to home →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
