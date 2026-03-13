import { Mic, FileEdit, PenTool, Cloud, Smartphone, FileText } from "lucide-react";

const features = [
  { icon: Mic, title: "Ditado por voz inteligente", desc: "Reconhecimento preciso de termos radiológicos em português. Fale naturalmente, o sistema entende." },
  { icon: FileEdit, title: "Templates customizáveis", desc: "Crie e edite modelos para qualquer tipo de exame. Seus templates, suas regras." },
  { icon: PenTool, title: "Edição total do laudo", desc: "Cada seção é editável. Altere, reordene ou adicione achados com controle completo." },
  { icon: Cloud, title: "Sync na nuvem", desc: "Todos os laudos salvos com segurança. Acesse seu histórico de qualquer lugar." },
  { icon: Smartphone, title: "Mobile-first", desc: "Interface otimizada para toque. Laude direto do celular durante o exame." },
  { icon: FileText, title: "Export PDF profissional", desc: "PDFs com cabeçalho personalizado, formatação médica e pronto para assinatura." },
];

const Features = () => (
  <section id="recursos" className="relative py-24 md:py-32">
    <div className="container max-w-[960px] mx-auto px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-border/50" />
        <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Recursos</span>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      <div className="text-center max-w-[500px] mx-auto mb-16">
        <h2 className="text-section text-foreground">
          Tudo que o radiologista precisa
        </h2>
        <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
          Menos digitação, mais precisão. Ferramentas pensadas para o fluxo real de trabalho.
        </p>
      </div>

      {/* Feature grid — Linear style with border grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl border border-border/50 overflow-hidden bg-border/50">
        {features.map((f, i) => (
          <div key={i} className="bg-background p-7 group hover:bg-card/80 transition-colors">
            <f.icon className="w-5 h-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-[14px] font-semibold text-foreground mb-1.5">{f.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
