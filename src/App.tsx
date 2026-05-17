import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OrientationDay } from "./components/OrientationDay";
import { Problem } from "./components/Problem";
import { WangQuote } from "./components/WangQuote";
import { AIEra } from "./components/AIEra";
// import { HardwareKit } from "./components/HardwareKit"; // temporarily disabled — uncomment here and below to restore
import { ProjectShowcase } from "./components/ProjectShowcase";
// import { HowItWorks } from "./components/HowItWorks"; // temporarily disabled — uncomment here and below to restore
import { Curriculum } from "./components/Curriculum";
// import { Outcomes } from "./components/Outcomes"; // temporarily disabled — uncomment here and below to restore
import { Pricing } from "./components/Pricing";
// import { Testimonials } from "./components/Testimonials"; // temporarily disabled — uncomment here and below to restore
// import { ForSchools } from "./components/ForSchools"; // temporarily disabled — uncomment here and below to restore
import { FAQ } from "./components/FAQ";
// import { FinalCTA } from "./components/FinalCTA"; // replaced by OrientationDay as the end CTA — uncomment here and below to restore
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";

function Divider() {
  return (
    <div className="section-line">
      <div />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <Hero />
      <Divider />
      <Problem />
      <WangQuote />
      <Divider />
      <AIEra />
      <Divider />
      {/* <HardwareKit />
      <Divider /> */}
      <ProjectShowcase />
      <Divider />
      {/* <HowItWorks /> */}
      <Curriculum />
      <Divider />
      {/* <Outcomes />
      <Divider /> */}
      <Pricing />
      {/* <Testimonials /> */}
      {/* <ForSchools /> */}
      <Divider />
      <FAQ />
      <OrientationDay />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;
