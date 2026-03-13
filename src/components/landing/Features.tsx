import { Mic, FileEdit, PenTool, Cloud, Smartphone, FileText } from "lucide-react";

const features = [
  { icon: Mic, title: "Ditado por voz", desc: "Grave os achados em português natural. Transcrição precisa de termos radiológicos com Whisper." },
  { icon: FileEdit, title: "Templates customizáveis", desc: "Edite textos padrão, adicione achados personalizados e crie novos tipos de exame." },
  { icon: PenTool, title: "Edição completa", desc: "Cada seção do laudo é editável. Você mantém o controle total do conteúdo." },
  { icon: Cloud, title: "Histórico na nuvem", desc: "Laudos salvos com segurança. Acesse de qualquer dispositivo, a qualquer momento." },
  { icon: Smartphone, title: "Mobile e desktop", desc: "Interface responsiva otimizada para toque. Use ao lado do aparelho ou na sala de laudos." },
  { icon: FileText, title: "Exportação em PDF", desc: "PDFs profissionais com cabeçalho personalizado e assinatura digital." },
];

const Features = () => (
  <section id="recursos" className="py-28 md:py-36 relative">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Recursos</p>
        <h2 className="font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-4">
          Feito para o dia a dia do radiologista
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Menos digitação, mais produtividade. Sem perder o controle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="glass-card-hover rounded-2xl p-7 group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
