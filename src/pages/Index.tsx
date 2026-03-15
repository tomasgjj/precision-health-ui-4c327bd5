import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Differentiator from "@/components/landing/Differentiator";
import HowItWorks from "@/components/landing/HowItWorks";
import StepByStep from "@/components/landing/StepByStep";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Differentiator />
      <HowItWorks />
      <StepByStep />
      <Features />
      <Pricing />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
