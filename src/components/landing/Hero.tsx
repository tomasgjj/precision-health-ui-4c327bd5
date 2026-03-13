import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroDemo from "./HeroDemo";

const Hero = () => (
  <section className="relative pt-14 overflow-hidden">
    {/* Subtle grid background */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Top glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />

    <div className="container relative z-10 pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="text-center max-w-[800px] mx-auto">
        {/* Pill badge */}
        <div className="animate-fade-up opacity-0 [animation-delay:50ms] inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/50 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-medium text-muted-foreground">Disponível agora em beta</span>
        </div>

        <h1 className="animate-fade-up opacity-0 [animation-delay:100ms] text-hero text-foreground">
          Laudos médicos{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient-blue">com precisão de IA</span>
        </h1>

        <p className="animate-fade-up opacity-0 [animation-delay:200ms] mt-6 text-[16px] md:text-[17px] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
          Dite os achados por voz. O LaudoVoz transcreve, estrutura e entrega o laudo completo — pronto para revisar e assinar.
        </p>

        <div className="animate-fade-up opacity-0 [animation-delay:300ms] flex items-center justify-center gap-3 mt-10">
          <Button className="h-10 px-6 text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            Começar grátis
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" className="h-10 px-6 text-[13px] font-medium border-border/60 text-muted-foreground hover:text-foreground">
            Ver como funciona
          </Button>
        </div>
      </div>
    </div>

    {/* Demo */}
    <div className="container relative z-10 pb-0">
      <div className="animate-fade-up opacity-0 [animation-delay:450ms] max-w-[880px] mx-auto mask-fade-b">
        <HeroDemo />
      </div>
    </div>
  </section>
);

export default Hero;
