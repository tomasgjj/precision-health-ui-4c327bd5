import { Lock, Shield, Timer, User } from "lucide-react";

const items = [
  { icon: Lock, label: "Criptografia HTTPS" },
  { icon: Shield, label: "LGPD Compliant" },
  { icon: Timer, label: "Auto-logout 30min" },
  { icon: User, label: "Dados isolados por usuário" },
];

const Security = () => (
  <section className="py-24 relative">
    <div className="container max-w-4xl mx-auto px-6">
      <div className="glass rounded-3xl p-10 md:p-14 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Segurança</p>
        <h2 className="font-display font-bold text-2xl md:text-4xl tracking-tight mb-4">
          Segurança e conformidade
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          Seus dados e os dos seus pacientes, protegidos.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Security;
