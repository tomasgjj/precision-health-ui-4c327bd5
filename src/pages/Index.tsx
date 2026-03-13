import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  // Force midnight theme on landing page
  useEffect(() => {
    const root = document.documentElement;
    const prevClasses = [...root.classList];

    root.classList.remove("theme-light");
    root.classList.add("theme-midnight");

    return () => {
      root.classList.remove("theme-midnight");
      // Restore previous
      prevClasses.forEach((c) => {
        if (c.startsWith("theme-")) root.classList.add(c);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
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
