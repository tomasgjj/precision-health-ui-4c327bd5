const steps = [
  {
    num: "1",
    title: "Dite os achados",
    desc: "Fale naturalmente. O sistema transcreve sua voz com precisão médica.",
  },
  {
    num: "2",
    title: "A IA organiza",
    desc: "Os achados são identificados e estruturados automaticamente em um laudo.",
  },
  {
    num: "3",
    title: "Revise e finalize",
    desc: "Edite se necessário e exporte o laudo pronto para envio.",
  },
];

const HowItWorks = () => (
  <section id="como" className="py-32 relative">
    <div className="container max-w-4xl mx-auto px-6">
      <div className="text-center mb-20">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Como funciona</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
          Três passos. Um laudo completo.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">Do ditado ao PDF pronto em menos de 30 segundos.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className="glass rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/30">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-display font-bold text-lg flex items-center justify-center mb-6">
                {step.num}
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
            {i < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
