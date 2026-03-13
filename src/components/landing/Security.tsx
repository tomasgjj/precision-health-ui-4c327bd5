import { Lock, Shield, Timer, User } from "lucide-react";

const items = [
  { icon: Lock, title: "Criptografia HTTPS", desc: "Todas as conexões protegidas com TLS/SSL de ponta a ponta." },
  { icon: Shield, title: "LGPD Compliant", desc: "Em conformidade total com a Lei Geral de Proteção de Dados." },
  { icon: Timer, title: "Auto-logout", desc: "Sessões expiram automaticamente após 30 min de inatividade." },
  { icon: User, title: "Isolamento de dados", desc: "Dados de cada usuário completamente isolados e protegidos." },
];

const Security = () => (
  <section id="seguranca" className="relative py-28 md:py-36 border-t border-border/50">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="text-center max-w-[560px] mx-auto mb-16">
        <p className="text-[12px] font-medium text-primary mb-3 tracking-widest uppercase">Segurança</p>
        <h2 className="text-section text-foreground">
          Proteção em cada camada
        </h2>
        <p className="text-muted-foreground mt-4 text-[15px]">
          Seus dados e os dos seus pacientes, sempre protegidos.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="surface-card-hover rounded-xl p-6 text-center">
            <div className="w-10 h-10 rounded-lg bg-accent/80 border border-border/50 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-4.5 h-4.5 text-muted-foreground" />
            </div>
            <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{item.title}</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Security;
