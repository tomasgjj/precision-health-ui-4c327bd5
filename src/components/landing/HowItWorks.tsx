import { Mic, Brain, FileCheck } from "lucide-react";

const steps = [
  {
    num: "1",
    icon: Mic,
    title: "Dite os achados",
    desc: "Fale naturalmente. O sistema transcreve sua voz com precisão médica.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    num: "2",
    icon: Brain,
    title: "A IA organiza",
    desc: "Os achados são identificados e estruturados automaticamente em um laudo.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    num: "3",
    icon: FileCheck,
    title: "Revise e finalize",
    desc: "Edite se necessário e exporte o laudo pronto para envio.",
    color: "text-success",
    bg: "bg-success/10",
  },
];

const HowItWorks = () => (
  <section id="como" className="py-28 md:py-36 relative">
    <div className="absolute inset-0 glow-top opacity-50" />
    <div className="container relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Como funciona</p>
        <h2 className="font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-4">
          Três passos. Um laudo completo.
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Do ditado ao PDF pronto em menos de 30 segundos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className="glass-card-hover rounded-2xl p-8 h-full">
              <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-muted-foreground mb-2">PASSO {step.num}</div>
              <h3 className="font-semibold text-xl mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
            {i < 2 && (
              <div className="hidden md:flex absolute top-1/2 -right-3 w-6 items-center justify-center">
                <div className="w-6 h-px bg-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
