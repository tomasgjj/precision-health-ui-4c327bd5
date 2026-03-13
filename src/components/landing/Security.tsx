import { Lock, Shield, Timer, User } from "lucide-react";

const items = [
  { icon: Lock, title: "Criptografia HTTPS", desc: "Todas as conexões protegidas com TLS/SSL de ponta a ponta." },
  { icon: Shield, title: "Seguro", desc: "Em conformidade total com a Lei Geral de Proteção de Dados." },
  { icon: Timer, title: "Auto-logout", desc: "Sessões expiram automaticamente após 30 min de inatividade." },
  { icon: User, title: "Isolamento de dados", desc: "Dados de cada usuário completamente isolados e protegidos." },
];

const Security = () => (
  <section id="seguranca" className="relative py-24 md:py-32">
    <div className="container max-w-[960px] mx-auto px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-border/50" />
        <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Segurança</span>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      <div className="text-center max-w-[500px] mx-auto mb-16">
        <h2 className="text-section text-foreground">
          Proteção em cada camada
        </h2>
        <p className="text-muted-foreground mt-4 text-[14px]">
          Seus dados e os dos seus pacientes, sempre protegidos.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl border border-border/50 overflow-hidden bg-border/50">
        {items.map((item, i) => (
          <div key={i} className="bg-background p-6 text-center group hover:bg-card/80 transition-colors">
            <item.icon className="w-5 h-5 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{item.title}</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Security;
