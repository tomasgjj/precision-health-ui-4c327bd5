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
  <section id="recursos" className="py-32 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsl(217_91%_60%_/_0.04),transparent)]" />
    <div className="container relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-20">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Recursos</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
          Feito para o dia a dia do radiologista
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
          Menos digitação, mais produtividade. Sem perder o controle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-7 transition-all duration-300 hover:border-primary/20 group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
