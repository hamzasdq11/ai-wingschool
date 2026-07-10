import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
// import { OrientationDay } from "../components/OrientationDay"; // temporarily hidden — uncomment here and below to restore
import { Problem } from "../components/Problem";
import { WangQuote } from "../components/WangQuote";
// import { AIEra } from "../components/AIEra"; // temporarily hidden — uncomment here and below to restore
// import { HardwareKit } from "../components/HardwareKit"; // temporarily disabled — uncomment here and below to restore
// import { ProjectShowcase } from "../components/ProjectShowcase"; // temporarily disabled — uncomment here and below to restore
// import { HowItWorks } from "../components/HowItWorks"; // temporarily disabled — uncomment here and below to restore
// import { Curriculum } from "../components/Curriculum"; // temporarily hidden — uncomment here and below to restore
// import { Outcomes } from "../components/Outcomes"; // temporarily disabled — uncomment here and below to restore
// import { Pricing } from "../components/Pricing"; // temporarily hidden — uncomment here and below to restore
// import { Testimonials } from "../components/Testimonials"; // temporarily disabled — uncomment here and below to restore
// import { ForSchools } from "../components/ForSchools"; // temporarily hidden — uncomment here and below to restore
import { FAQ } from "../components/FAQ";
// import { FinalCTA } from "../components/FinalCTA"; // replaced by OrientationDay as the end CTA — uncomment here and below to restore
import { Footer } from "../components/Footer";
import { StickyMobileCTA } from "../components/StickyMobileCTA";
import { Divider } from "../components/Divider";
import { SchoolsHero } from "../components/schools/SchoolsHero";
import { FourPhases } from "../components/schools/FourPhases";
// import { ChallengeDetail } from "../components/schools/ChallengeDetail"; // temporarily hidden — uncomment here and below to restore
// import { ScholarshipSelection } from "../components/schools/ScholarshipSelection"; // temporarily hidden — uncomment here and below to restore
// import { BuilderProgram } from "../components/schools/BuilderProgram"; // temporarily hidden — uncomment here and below to restore
// import { FlagshipExpoDay } from "../components/schools/FlagshipExpoDay"; // temporarily hidden — uncomment here and below to restore
import { HonestLedger } from "../components/schools/HonestLedger";
import { OperatingPlan } from "../components/schools/OperatingPlan";
import { SchoolsFAQ } from "../components/schools/SchoolsFAQ";
import { SchoolsCTA } from "../components/schools/SchoolsCTA";

export function Home() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <Hero />
      <Divider />
      <Problem />
      <WangQuote />
      <Divider />
      {/* <AIEra />
      <Divider /> */}
      {/* <HardwareKit />
      <Divider /> */}
      {/* <ProjectShowcase />
      <Divider /> */}
      {/* <HowItWorks /> */}
      {/* <Curriculum /> */}
      {/* <Outcomes />
      <Divider /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <ForSchools /> */}
      <SchoolsHero />
      <Divider />
      <FourPhases />
      <Divider />
      {/* <ChallengeDetail />
      <Divider /> */}
      {/* <ScholarshipSelection />
      <Divider /> */}
      {/* <BuilderProgram />
      <FlagshipExpoDay />
      <Divider /> */}
      <HonestLedger />
      <Divider />
      <OperatingPlan />
      <Divider />
      <SchoolsFAQ />
      <SchoolsCTA />
      <Divider />
      <FAQ />
      {/* <OrientationDay /> */}
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
