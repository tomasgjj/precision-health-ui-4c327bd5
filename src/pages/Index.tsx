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
  useEffect(() => {
    const root = document.documentElement;
    const prevClasses = [...root.classList].filter((c) => c.startsWith("theme-"));

    // Remove all theme classes, then force midnight
    prevClasses.forEach((c) => root.classList.remove(c));
    root.classList.add("theme-midnight");

    // Re-apply on every render in case ThemeProvider overrides
    const observer = new MutationObserver(() => {
      if (!root.classList.contains("theme-midnight")) {
        root.classList.forEach((c) => {
          if (c.startsWith("theme-") && c !== "theme-midnight") root.classList.remove(c);
        });
        root.classList.add("theme-midnight");
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      root.classList.remove("theme-midnight");
      prevClasses.forEach((c) => root.classList.add(c));
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
