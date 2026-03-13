import { Mic, Brain, CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Mic,
    num: "01",
    title: "Dite os achados",
    desc: "Fale naturalmente em português. O sistema transcreve com precisão termos radiológicos e estrutura médica.",
  },
  {
    icon: Brain,
    num: "02",
    title: "A IA organiza o laudo",
    desc: "Os achados são identificados, classificados e estruturados automaticamente em formato profissional.",
  },
  {
    icon: CheckCircle,
    num: "03",
    title: "Revise e exporte",
    desc: "Edite qualquer seção, adicione observações e exporte como PDF com cabeçalho personalizado.",
  },
];

const HowItWorks = () => (
  <section id="como" className="relative py-24 md:py-32">
    <div className="container max-w-[960px] mx-auto px-6">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Como funciona</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="text-center max-w-[500px] mx-auto mb-16">
          <h2 className="text-section text-foreground">
            Do ditado ao laudo<br />em três passos
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="grid md:grid-cols-3 gap-px rounded-xl border border-border/50 overflow-hidden bg-border/50">
          {steps.map((step, i) => (
            <div key={i} className="bg-background p-8 relative group">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] font-mono text-muted-foreground/50">{step.num}</span>
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HowItWorks;
