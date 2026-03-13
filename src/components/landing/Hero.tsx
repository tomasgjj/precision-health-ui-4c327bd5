import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroDemo from "./HeroDemo";

const Hero = () => (
  <section className="relative pt-14 overflow-hidden">
    {/* Radial glow — Linear-style */}
    <div className="absolute inset-0 hero-glow pointer-events-none" />
    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

    <div className="container relative z-10 pt-28 pb-20 md:pt-40 md:pb-32">
      {/* Headline — centered, massive, Linear-style */}
      <div className="text-center max-w-[820px] mx-auto">
        <h1 className="animate-fade-up opacity-0 [animation-delay:100ms] text-hero text-foreground">
          Laudos médicos com{" "}
          <span className="text-gradient-blue">precisão de IA</span>
          {" "}em segundos
        </h1>

        <p className="animate-fade-up opacity-0 [animation-delay:200ms] mt-6 text-base md:text-lg text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
          Dite os achados por voz. O LaudoVoz transcreve, estrutura e entrega o laudo completo — pronto para revisar e assinar.
        </p>

        <div className="animate-fade-up opacity-0 [animation-delay:300ms] flex items-center justify-center gap-3 mt-10">
          <Button variant="hero" size="xl">
            Começar grátis
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="hero-outline" size="xl">
            Ver como funciona
          </Button>
        </div>
      </div>
    </div>

    {/* Interactive demo — hover to play */}
    <div className="container relative z-10 pb-0">
      <div className="animate-fade-up opacity-0 [animation-delay:450ms] max-w-[900px] mx-auto mask-fade-b">
        <HeroDemo />
      </div>
    </div>
  </section>
);

export default Hero;
