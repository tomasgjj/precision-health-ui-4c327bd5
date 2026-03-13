import { Mic, Brain, CheckCircle } from "lucide-react";

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
  <section id="como" className="relative py-28 md:py-36">
    <div className="absolute inset-0 section-glow pointer-events-none" />
    <div className="container relative z-10 max-w-[960px] mx-auto px-6">
      <div className="text-center max-w-[560px] mx-auto mb-16">
        <p className="text-[12px] font-medium text-primary mb-3 tracking-widest uppercase">Como funciona</p>
        <h2 className="text-section text-foreground">
          Do ditado ao laudo em três passos
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="group relative surface-card-hover rounded-xl p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground tabular-nums">{step.num}</span>
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
