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
          Laudos radiológicos completos{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient-blue">em poucos segundos</span>
        </h1>

        <p className="animate-fade-up opacity-0 [animation-delay:200ms] mt-6 text-[15px] md:text-[17px] text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
          Dite os achados e o Radiktor estrutura o laudo completo — pronto para revisar e copiar.
        </p>

        <div className="animate-fade-up opacity-0 [animation-delay:300ms] flex items-center justify-center gap-3 mt-10">
          <a href="/login" className="h-11 px-7 rounded-xl text-[13px] font-semibold bg-primary text-primary-foreground border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center gap-2 no-underline">
            Experimente grátis
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href="/login" className="h-11 px-7 rounded-xl text-[13px] font-medium surface-glass text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-200 flex items-center no-underline">
            Entrar
          </a>
        </div>

        <a href="#como" className="animate-fade-up opacity-0 [animation-delay:400ms] inline-block mt-5 text-[12px] text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-4">
          como funciona?
        </a>
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
