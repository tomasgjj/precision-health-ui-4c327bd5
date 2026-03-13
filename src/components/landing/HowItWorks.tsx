const steps = [
  {
    num: "01",
    title: "Dite os achados",
    desc: "Fale naturalmente. O sistema transcreve sua voz com precisão médica.",
  },
  {
    num: "02",
    title: "A IA organiza",
    desc: "Os achados são identificados e estruturados automaticamente em um laudo.",
  },
  {
    num: "03",
    title: "Revise e finalize",
    desc: "Edite se necessário e exporte o laudo pronto para envio.",
  },
];

const HowItWorks = () => (
  <section id="como" className="py-24 md:py-32 border-t border-border">
    <div className="container max-w-[720px] mx-auto px-6">
      <p className="text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">Como funciona</p>
      <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mb-14">
        Três passos. Um laudo completo.
      </h2>

      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="text-sm font-medium text-muted-foreground pt-0.5 tabular-nums">{step.num}</div>
            <div className="flex-1 pb-8 border-b border-border group-last:border-0 group-last:pb-0">
              <h3 className="font-medium text-foreground mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
