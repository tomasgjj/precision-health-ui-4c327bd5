import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useEffect, useRef } from "react";
import { useTheme, AppTheme } from "@/hooks/use-theme";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const prevTheme = useRef<AppTheme>(theme);

  useEffect(() => {
    prevTheme.current = theme;
    if (theme !== "midnight") {
      setTheme("midnight");
    }
    return () => {
      if (prevTheme.current !== "midnight") {
        setTheme(prevTheme.current);
      }
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
