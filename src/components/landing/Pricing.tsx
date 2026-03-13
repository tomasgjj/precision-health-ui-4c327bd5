import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratuito",
    price: "R$0",
    subtitle: "Para experimentar",
    features: ["10 laudos por mês", "1 tipo de exame", "Ditado por voz + IA", "Histórico na nuvem"],
    cta: "Começar grátis",
    popular: false,
  },
  {
    name: "Pro — Mensal",
    price: "R$1",
    subtitle: "primeiro mês · depois R$120/mês",
    features: ["Laudos ilimitados", "Todos os tipos de exame", "Máscaras personalizadas", "Exportação em PDF", "Suporte prioritário"],
    cta: "Começar por R$1",
    popular: true,
  },
  {
    name: "Pro — Anual",
    price: "R$80",
    subtitle: "/mês · R$960/ano — economize 33%",
    features: ["Tudo do plano mensal", "Laudos ilimitados", "Máscaras personalizadas", "Exportação em PDF", "Suporte prioritário"],
    cta: "Assinar anual",
    popular: false,
  },
];

const Pricing = () => (
  <section id="precos" className="py-28 md:py-36 relative">
    <div className="absolute inset-0 glow-top opacity-30" />
    <div className="container relative max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Preços</p>
        <h2 className="font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-4">
          Planos simples e transparentes
        </h2>
        <p className="text-muted-foreground text-lg">Comece grátis. Upgrade quando precisar.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              plan.popular
                ? "glass-card border-2 !border-primary/40 shadow-xl shadow-primary/5"
                : "glass-card-hover"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full btn-gradient text-xs font-semibold text-primary-foreground shadow-lg">
                Mais popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-foreground mb-3">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-4xl text-foreground tracking-tight">{plan.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{plan.subtitle}</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-secondary-foreground">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "hero" : "outline"}
              className="w-full"
              size="lg"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
