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
  <section id="precos" className="py-32 relative">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="text-center mb-20">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Preços</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
          Planos simples e transparentes
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">Comece grátis. Upgrade quando precisar.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-8 transition-all duration-300 ${
              plan.popular
                ? "border-2 border-primary/50 bg-gradient-to-b from-primary/5 to-transparent shadow-[0_0_60px_-20px_hsl(217_91%_60%_/_0.2)]"
                : "glass hover:border-primary/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-info text-xs font-semibold text-primary-foreground">
                Mais popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-lg text-foreground">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl text-foreground">{plan.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
            </div>
            <ul className="space-y-3 mb-8">
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
