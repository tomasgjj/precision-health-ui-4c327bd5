import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "1",
    title: "Escolha o exame",
    subtitle: "Selecione o tipo de exame e adicione seus modelos",
    bullets: [
      "Escolha qual exame será realizado (ex.: US abdominal, US transvaginal).",
      "Envie seus templates ou laudos padrão — arquivos ou fotos.",
      "A IA da Radiktor aprende exclusivamente com seus modelos e sua terminologia médica, mantendo seu estilo de laudo.",
    ],
  },
  {
    num: "2",
    title: "Dite os achados",
    subtitle: "Descreva o exame com sua voz",
    bullets: [
      "Relate os principais achados de forma natural e fluida, como você falaria no dia a dia.",
      'Se o exame estiver normal, use a opção "Paciente sem alterações" para gerar automaticamente um laudo padrão.',
      "Também é possível digitar os achados manualmente.",
    ],
  },
  {
    num: "3",
    title: "Gere o laudo",
    subtitle: "Estrutura automática e organizada",
    bullets: [
      "A Radiktor transforma seus achados em um laudo estruturado, seguindo seus próprios templates.",
      "Basta identificar o paciente e gerar o documento.",
    ],
  },
  {
    num: "4",
    title: "Revise rapidamente",
    subtitle: "Ajuste se necessário",
    bullets: [
      "Faça uma revisão rápida e edite qualquer detalhe antes de finalizar.",
    ],
  },
  {
    num: "5",
    title: "Salve ou exporte",
    subtitle: "Pronto para usar",
    bullets: [
      "Salvar na plataforma",
      "Exportar o laudo",
      "Copiar o texto para seu sistema",
    ],
  },
];

const StepByStep = () => (
  <section className="relative py-24 md:py-32">
    <div className="section-glow absolute inset-0 pointer-events-none" />
    <div className="container max-w-[720px] mx-auto px-6 relative z-10">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">
            Passo a passo
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="text-center max-w-[500px] mx-auto mb-14">
          <h2 className="text-section text-foreground">
            Como usar o Radiktor no dia a dia
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/40 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <div className="flex gap-5">
                {/* Number */}
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-[12px] font-bold text-primary shrink-0 relative z-10">
                  {step.num}
                </div>
                {/* Content */}
                <div className="surface-glass rounded-xl p-5 flex-1">
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-[13px] text-muted-foreground mb-3">{step.subtitle}</p>
                  <ul className="space-y-2">
                    {step.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-[12px] text-muted-foreground leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal delay={0.5}>
        <p className="text-center text-[13px] text-muted-foreground/60 mt-10 italic">
          Menos digitação, mais precisão
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default StepByStep;
