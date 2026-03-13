import { Lock, Shield, Timer, User } from "lucide-react";

const items = [
  { icon: Lock, label: "Criptografia HTTPS" },
  { icon: Shield, label: "LGPD Compliant" },
  { icon: Timer, label: "Auto-logout 30min" },
  { icon: User, label: "Dados isolados por usuário" },
];

const Security = () => (
  <section className="py-24 md:py-32 border-t border-border">
    <div className="container max-w-[720px] mx-auto px-6">
      <p className="text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">Segurança</p>
      <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mb-3">
        Segurança e conformidade
      </h2>
      <p className="text-sm text-muted-foreground mb-12 max-w-[400px]">
        Seus dados e os dos seus pacientes, protegidos.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-3">
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Security;
