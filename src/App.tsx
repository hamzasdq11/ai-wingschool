import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Mentors } from "./components/Mentors";
import { Problem } from "./components/Problem";
import { AIEra } from "./components/AIEra";
import { HardwareKit } from "./components/HardwareKit";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { Curriculum } from "./components/Curriculum";
import { Comparison } from "./components/Comparison";
import { Outcomes } from "./components/Outcomes";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { ForSchools } from "./components/ForSchools";
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
      <Mentors />
      <Divider />
      <Problem />
      <Divider />
      <AIEra />
      <Divider />
      <HardwareKit />
      <Divider />
      <ProjectShowcase />
      <Divider />
      <HowItWorks />
      <Divider />
      <Curriculum />
      <Divider />
      <Comparison />
      <Divider />
      <Outcomes />
      <Divider />
      <Pricing />
      <Divider />
      <Testimonials />
      <Divider />
      <ForSchools />
      <Divider />
      <FAQ />
      <Divider />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

export default App;
