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
  <section id="precos" className="py-24 md:py-32 border-t border-border">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="max-w-[520px] mb-14">
        <p className="text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">Preços</p>
        <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground">
          Planos simples e transparentes
        </h2>
        <p className="text-muted-foreground mt-3 text-sm">Comece grátis. Upgrade quando precisar.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-background p-7 flex flex-col ${plan.popular ? "bg-accent/30" : ""}`}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-medium text-sm text-foreground">{plan.name}</h3>
                {plan.popular && (
                  <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{plan.subtitle}</p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-xs text-secondary-foreground">
                  <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "hero" : "outline"}
              size="default"
              className="w-full"
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
