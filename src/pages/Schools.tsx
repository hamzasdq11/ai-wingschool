import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WangQuote } from "../components/WangQuote";
import { Divider } from "../components/Divider";
import { SchoolsHero } from "../components/schools/SchoolsHero";
import { WhyNow } from "../components/schools/WhyNow";
import { FourPhases } from "../components/schools/FourPhases";
import { ChallengeDetail } from "../components/schools/ChallengeDetail";
import { ScholarshipSelection } from "../components/schools/ScholarshipSelection";
import { BuilderProgram } from "../components/schools/BuilderProgram";
import { FlagshipExpoDay } from "../components/schools/FlagshipExpoDay";
import { HonestLedger } from "../components/schools/HonestLedger";
import { OperatingPlan } from "../components/schools/OperatingPlan";
import { SchoolsFAQ } from "../components/schools/SchoolsFAQ";
import { SchoolsCTA } from "../components/schools/SchoolsCTA";

const navLinks = [
  { label: "The Challenge", href: "#challenge" },
  { label: "Builder Program", href: "#builder-program" },
  { label: "Expo Day", href: "#expo-day" },
  { label: "FAQ", href: "#school-faq" },
];

const navCta = { label: "Confirm a Challenge Date", href: "#partner" };

export function Schools() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "WingsQuest 2026 — The School AI Aptitude Challenge | AI Wingschool";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar links={navLinks} cta={navCta} />
      <SchoolsHero />
      <Divider />
      <WhyNow />
      <WangQuote coda="The question for every principal: is that 13-year-old sitting in one of your classrooms — undiscovered?" />
      <Divider />
      <FourPhases />
      <Divider />
      <ChallengeDetail />
      <Divider />
      <ScholarshipSelection />
      <Divider />
      <BuilderProgram />
      <FlagshipExpoDay />
      <Divider />
      <HonestLedger />
      <Divider />
      <OperatingPlan />
      <Divider />
      <SchoolsFAQ />
      <SchoolsCTA />
      <Footer />
    </div>
  );
}
