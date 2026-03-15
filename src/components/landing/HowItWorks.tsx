import { Mic, Brain, CheckCircle, FileText, Camera, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Mic,
    num: "1",
    title: "Dite os achados",
    desc: "Fale naturalmente em português. O sistema transcreve com precisão termos radiológicos e estrutura médica.",
  },
  {
    icon: Brain,
    num: "2",
    title: "Nós organizamos o laudo",
    desc: "Os achados são identificados, classificados e estruturados automaticamente em formato profissional.",
  },
  {
    icon: CheckCircle,
    num: "3",
    title: "Revise e exporte",
    desc: "Edite qualquer seção, adicione observações e exporte como PDF com cabeçalho personalizado.",
  },
];

const maskFeatures = [
  {
    icon: FileText,
    title: "Seções + achados",
    desc: "Defina órgãos com texto normal padrão e achados com placeholders de medidas e localização.",
  },
  {
    icon: Camera,
    title: "Importação por foto",
    desc: "Tire foto de um modelo em papel e a IA cria a máscara automaticamente.",
  },
];

const HowItWorks = () => (
  <section id="como" className="relative py-24 md:py-32">
    <div className="section-glow absolute inset-0 pointer-events-none" />
    <div className="container max-w-[960px] mx-auto px-6 relative z-10">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">Como funciona</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="text-center max-w-[500px] mx-auto mb-16">
          <h2 className="text-section text-foreground">
            Do ditado ao laudo<br />em três passos
          </h2>
          <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
            Workflow simples e direto. Foque no exame, o Radiktor cuida do resto.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative surface-glass rounded-xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                  {step.num}
                </div>
                <step.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Masks explanation */}
      <ScrollReveal delay={0.3}>
        <div className="mt-20">
          <div className="text-center max-w-[520px] mx-auto mb-10">
            <h3 className="text-[22px] md:text-[26px] font-bold text-foreground tracking-tight">
              Seus laudos, seus templates
            </h3>
            <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">
              Crie máscaras personalizadas com seções, achados e impressões.
              Importe de fotos com IA ou monte manualmente.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {maskFeatures.map((item) => (
              <div
                key={item.title}
                className="surface-glass rounded-xl p-6 text-center group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-4 h-4 text-primary/70" />
                </div>
                <h4 className="text-[14px] font-semibold text-foreground mb-1.5">{item.title}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default HowItWorks;
