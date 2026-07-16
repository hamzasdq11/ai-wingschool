import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Problem } from "../components/Problem";
import { WangQuote } from "../components/WangQuote";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { StickyMobileCTA } from "../components/StickyMobileCTA";
import { Divider } from "../components/Divider";
import { SchoolsHero } from "../components/schools/SchoolsHero";
import { FourPhases } from "../components/schools/FourPhases";
import { InsideChallenge } from "../components/schools/InsideChallenge";
import { ChallengeCTA } from "../components/schools/ChallengeCTA";
import { PAGE_META, usePageMeta } from "../lib/seo";

export function Home() {
  usePageMeta(PAGE_META.home);

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Problem />
        <WangQuote />
        <Divider />
        <SchoolsHero />
        <Divider />
        <FourPhases />
        <Divider />
        <InsideChallenge />
        <ChallengeCTA />
        <Divider />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
