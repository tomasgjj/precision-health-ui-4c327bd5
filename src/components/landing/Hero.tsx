import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="relative pt-14">
    {/* Subtle top glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

    <div className="container relative z-10 pt-24 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[720px]">
        <div className="animate-fade-up">
          <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            Laudos de ultrassonografia{" "}
            <span className="text-gradient">em segundos</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-[520px] leading-relaxed">
            Dite os achados e o LaudoVoz estrutura o laudo completo — pronto para revisar e copiar.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <Button variant="hero" size="lg">
              Começar grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="hero-outline" size="lg">
              Ver como funciona
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-border" />

    {/* Stats strip */}
    <div className="container py-12">
      <div className="animate-fade-up [animation-delay:150ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[720px]">
        {[
          { value: "90%", label: "Economia de tempo" },
          { value: "30s", label: "Tempo médio por laudo" },
          { value: "24/7", label: "Disponível sempre" },
          { value: "LGPD", label: "Conformidade total" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
