import { Mic, FileEdit, PenTool, Cloud, Smartphone, FileText } from "lucide-react";

const features = [
  { icon: Mic, title: "Ditado por voz", desc: "Grave os achados em português natural. Transcrição precisa de termos radiológicos." },
  { icon: FileEdit, title: "Templates customizáveis", desc: "Edite textos padrão, adicione achados personalizados e crie novos tipos de exame." },
  { icon: PenTool, title: "Edição completa", desc: "Cada seção do laudo é editável. Você mantém o controle total." },
  { icon: Cloud, title: "Histórico na nuvem", desc: "Laudos salvos com segurança. Acesse de qualquer dispositivo." },
  { icon: Smartphone, title: "Mobile e desktop", desc: "Interface responsiva otimizada para toque. Use no celular ou computador." },
  { icon: FileText, title: "Exportação em PDF", desc: "PDFs profissionais com cabeçalho personalizado e assinatura digital." },
];

const Features = () => (
  <section id="recursos" className="py-24 md:py-32 border-t border-border">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="max-w-[520px] mb-14">
        <p className="text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">Recursos</p>
        <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground">
          Feito para o dia a dia do radiologista
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Menos digitação, mais produtividade. Sem perder o controle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-background p-7 hover:bg-accent/50 transition-colors duration-150"
          >
            <f.icon className="w-5 h-5 text-muted-foreground mb-4" />
            <h3 className="font-medium text-sm text-foreground mb-1.5">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
