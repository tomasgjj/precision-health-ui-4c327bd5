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
  <section id="recursos" className="relative py-28 md:py-36 border-t border-border/50">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="text-center max-w-[560px] mx-auto mb-16">
        <p className="text-[12px] font-medium text-primary mb-3 tracking-widest uppercase">Recursos</p>
        <h2 className="text-section text-foreground">
          Tudo que o radiologista precisa
        </h2>
        <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
          Menos digitação, mais precisão. Ferramentas pensadas para o fluxo real de trabalho.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="group surface-card-hover rounded-xl p-6"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/80 border border-border/50 flex items-center justify-center mb-5 group-hover:border-primary/20 transition-colors">
              <f.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-[14px] font-semibold text-foreground mb-1.5">{f.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
