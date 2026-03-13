import { Button } from "@/components/ui/button";
import { Clock, Zap, Shield } from "lucide-react";

const stats = [
  { value: "90%", label: "Economia de tempo", icon: Clock },
  { value: "30s", label: "Tempo médio por laudo", icon: Zap },
  { value: "24/7", label: "Disponível sempre", icon: null },
  { value: "LGPD", label: "Conformidade total", icon: Shield },
];

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Background glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(217_91%_60%_/_0.12),transparent_70%)]" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

    <div className="container relative z-10 text-center max-w-4xl mx-auto px-6">
      <div className="animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Plataforma de laudos com IA
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-[5rem] leading-[1.05] tracking-tight mb-6">
          Laudos de ultrassonografia{" "}
          <span className="text-gradient">em segundos</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Dite os achados e o LaudoVoz estrutura o laudo completo — pronto para revisar e copiar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="hero" size="xl">
            Começar grátis
          </Button>
          <Button variant="hero-outline" size="xl">
            Ver como funciona
          </Button>
        </div>
      </div>

      <div className="animate-fade-up [animation-delay:200ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center">
            <div className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
