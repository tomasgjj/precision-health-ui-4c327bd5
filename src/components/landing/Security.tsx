import { Lock, Shield, Timer, User } from "lucide-react";

const items = [
  { icon: Lock, label: "Criptografia HTTPS", desc: "Todas as comunicações são criptografadas end-to-end." },
  { icon: Shield, label: "LGPD Compliant", desc: "Total conformidade com a Lei Geral de Proteção de Dados." },
  { icon: Timer, label: "Auto-logout 30min", desc: "Sessões expiram automaticamente por segurança." },
  { icon: User, label: "Dados isolados", desc: "Cada usuário tem seus dados completamente isolados." },
];

const Security = () => (
  <section className="py-28 md:py-36 relative">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="glass-card rounded-3xl p-10 md:p-16">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Segurança</p>
          <h2 className="font-bold text-3xl md:text-4xl tracking-[-0.02em] mb-4">
            Segurança e conformidade
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Seus dados e os dos seus pacientes, protegidos com os mais altos padrões.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground block">{item.label}</span>
                <span className="text-xs text-muted-foreground mt-1 block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Security;
