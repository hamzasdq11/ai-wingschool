import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OrientationDay } from "./components/OrientationDay";
import { Problem } from "./components/Problem";
import { AIEra } from "./components/AIEra";
import { HardwareKit } from "./components/HardwareKit";
import { ProjectShowcase } from "./components/ProjectShowcase";
// import { HowItWorks } from "./components/HowItWorks"; // temporarily disabled — uncomment here and below to restore
// import { Curriculum } from "./components/Curriculum"; // temporarily disabled — uncomment here and below to restore
import { Outcomes } from "./components/Outcomes";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
// import { ForSchools } from "./components/ForSchools"; // temporarily disabled — uncomment here and below to restore
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
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
      <OrientationDay />
      <Divider />
      <Problem />
      <Divider />
      <AIEra />
      <Divider />
      <HardwareKit />
      <Divider />
      <ProjectShowcase />
      <Divider />
      {/* <HowItWorks /> */}
      {/* <Curriculum />
      <Divider /> */}
      <Outcomes />
      <Divider />
      <Pricing />
      <Testimonials />
      {/* <ForSchools /> */}
      <Divider />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;
