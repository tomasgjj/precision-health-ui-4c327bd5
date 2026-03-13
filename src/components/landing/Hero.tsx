import { Button } from "@/components/ui/button";
import { Mic, Brain, FileCheck, Copy } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 glow-top" />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px]" />

    <div className="container relative z-10 text-center max-w-5xl mx-auto px-6">
      <div className="animate-fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/40 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Plataforma de laudos com IA
        </div>

        <h1 className="font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-[-0.03em] mb-6">
          <span className="text-foreground">Laudos de</span>
          <br />
          <span className="text-gradient-hero">ultrassonografia em</span>
          <br />
          <span className="text-gradient-hero">segundos</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Dite os achados e o LaudoVoz estrutura o laudo completo — pronto para revisar e copiar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button variant="hero" size="xl">
            Começar grátis
          </Button>
          <Button variant="hero-outline" size="xl">
            Ver como funciona
          </Button>
        </div>
      </div>

      {/* Product mockup */}
      <div className="animate-fade-up [animation-delay:200ms] opacity-0 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-1 shadow-2xl shadow-primary/5">
          <div className="bg-card rounded-xl overflow-hidden">
            {/* Mockup header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" style={{ background: 'hsl(38 90% 55% / 0.6)' }} />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">LaudoVoz — US Abdome Total</span>
            </div>

            {/* Mockup content */}
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
              {/* Left: Recording + Processing */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                    <Mic className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Gravando...</div>
                    <div className="text-xs text-muted-foreground">00:12</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-accent">Processando com IA...</span>
                  </div>
                  <div className="space-y-2">
                    {["Transcrição do áudio", "Identificação dos achados", "Montagem do laudo", "Laudo pronto"].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileCheck className="w-3.5 h-3.5 text-success" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Report preview */}
              <div className="space-y-3">
                {[
                  { label: "Fígado", text: "De topografia normal, dimensões ligeiramente aumentadas..." },
                  { label: "Vesícula biliar", text: "De topografia usual, com dimensões normais..." },
                  { label: "Impressão", text: "Esteatose hepática grau II. Micronefrolitíase à direita." },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <div className="text-xs font-semibold text-primary mb-1">{item.label}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.text}</div>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
                    <Copy className="w-3 h-3" /> Copiar
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground">
                    <FileCheck className="w-3 h-3" /> PDF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="animate-fade-up [animation-delay:400ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mt-20">
        {[
          { value: "90%", label: "Economia de tempo" },
          { value: "30s", label: "Tempo médio por laudo" },
          { value: "24/7", label: "Disponível sempre" },
          { value: "LGPD", label: "Conformidade total" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
