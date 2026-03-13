import { Mic, FileEdit, PenTool, Cloud, Smartphone, FileText } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: Mic, title: "Ditado por voz inteligente", desc: "Reconhecimento preciso de termos radiológicos em português. Fale naturalmente, o sistema entende.", gradient: "from-primary/20 to-primary/5" },
  { icon: FileEdit, title: "Templates customizáveis", desc: "Crie e edite modelos para qualquer tipo de exame. Seus templates, suas regras.", gradient: "from-accent/20 to-accent/5" },
  { icon: PenTool, title: "Edição total do laudo", desc: "Cada seção é editável. Altere, reordene ou adicione achados com controle completo.", gradient: "from-primary/20 to-primary/5" },
  { icon: Cloud, title: "Sync na nuvem", desc: "Todos os laudos salvos com segurança. Acesse seu histórico de qualquer lugar.", gradient: "from-accent/20 to-accent/5" },
  { icon: Smartphone, title: "Mobile-first", desc: "Interface otimizada para toque. Laude direto do celular durante o exame.", gradient: "from-primary/20 to-primary/5" },
  { icon: FileText, title: "Export PDF profissional", desc: "PDFs com cabeçalho personalizado, formatação médica e pronto para assinatura.", gradient: "from-accent/20 to-accent/5" },
];

const Features = () => (
  <section id="recursos" className="relative py-24 md:py-32">
    <div className="container max-w-[960px] mx-auto px-6">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">Recursos</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="text-center max-w-[500px] mx-auto mb-16">
          <h2 className="text-section text-foreground">
            Tudo que o radiologista precisa
          </h2>
          <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
            Menos digitação, mais precisão. Ferramentas pensadas para o fluxo real de trabalho.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="surface-glass rounded-xl p-6 group hover:border-primary/30 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                <f.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Features;
