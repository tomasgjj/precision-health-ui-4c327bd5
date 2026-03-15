import { Upload, FileText, Brain } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const points = [
  { icon: Upload, text: "Adicione seus próprios laudos prévios por foto ou PDF" },
  { icon: FileText, text: "Envie seus templates mais usados" },
  { icon: Brain, text: "A IA do Radiktor apenas organiza a estrutura do laudo e o diagnóstico." },
];

const Differentiator = () => (
  <section className="relative py-20 md:py-28">
    <div className="container max-w-[700px] mx-auto px-6 text-center">
      <ScrollReveal>
        <h2 className="text-section text-foreground mb-3">
          No Radiktor, o laudo não vem da IA.{" "}
          <span className="text-gradient-blue">Vem do médico.</span>
        </h2>
        <p className="text-[14px] text-muted-foreground mb-10">
          Alimente a plataforma com suas próprias impressões diagnósticas!
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="space-y-3 max-w-[480px] mx-auto">
          {points.map((p, i) => (
            <div key={i} className="surface-glass rounded-xl p-4 flex items-center gap-4 text-left">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <p.icon className="w-4 h-4 text-primary/70" />
              </div>
              <span className="text-[13px] text-foreground/80 leading-relaxed">{p.text}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Differentiator;
