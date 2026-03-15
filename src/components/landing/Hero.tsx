import { ArrowRight } from "lucide-react";
import HeroDemo from "./HeroDemo";

const Hero = () => (
  <section className="relative pt-14 overflow-hidden">
    {/* Grid background */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Amber glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 70%)" }} />
    <div className="absolute top-20 left-1/3 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)" }} />

    <div className="container relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="text-center max-w-[800px] mx-auto">
        <h1 className="animate-fade-up opacity-0 [animation-delay:100ms] text-hero text-foreground">
          Laudos médicos{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient-blue">com precisão de IA</span>
        </h1>

        <p className="animate-fade-up opacity-0 [animation-delay:200ms] mt-6 text-[15px] md:text-[17px] text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
          Dite os achados por voz. O LaudoVoz transcreve, estrutura e entrega o laudo completo — pronto para revisar e assinar.
        </p>

        <div className="animate-fade-up opacity-0 [animation-delay:300ms] flex items-center justify-center gap-3 mt-10">
          <button className="h-11 px-7 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            Começar grátis
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="h-11 px-7 rounded-xl text-[13px] font-medium surface-glass text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-200">
            Ver como funciona
          </button>
        </div>
      </div>
    </div>

    {/* Demo */}
    <div className="container relative z-10 pb-0">
      <div className="animate-fade-up opacity-0 [animation-delay:500ms] max-w-[880px] mx-auto mask-fade-b">
        <HeroDemo />
      </div>
    </div>
  </section>
);

export default Hero;
