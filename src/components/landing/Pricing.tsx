import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratuito",
    price: "R$0",
    period: "",
    subtitle: "Para experimentar o produto",
    features: ["10 laudos por mês", "1 tipo de exame", "Ditado por voz + IA", "Histórico na nuvem"],
    cta: "Começar grátis",
    highlighted: false,
  },
  {
    name: "Pro Mensal",
    price: "R$1",
    period: "primeiro mês",
    subtitle: "depois R$120/mês",
    features: ["Laudos ilimitados", "Todos os tipos de exame", "Máscaras personalizadas", "Exportação em PDF", "Suporte prioritário"],
    cta: "Começar por R$1",
    highlighted: true,
  },
  {
    name: "Pro Anual",
    price: "R$80",
    period: "/mês",
    subtitle: "R$960/ano — economize 33%",
    features: ["Tudo do plano mensal", "Laudos ilimitados", "Máscaras personalizadas", "Exportação em PDF", "Suporte prioritário"],
    cta: "Assinar anual",
    highlighted: false,
  },
];

const Pricing = () => (
  <section id="precos" className="relative py-28 md:py-36 border-t border-border/50">
    <div className="absolute inset-0 section-glow pointer-events-none" />
    <div className="container relative z-10 max-w-[1020px] mx-auto px-6">
      <div className="text-center max-w-[560px] mx-auto mb-16">
        <p className="text-[12px] font-medium text-primary mb-3 tracking-widest uppercase">Preços</p>
        <h2 className="text-section text-foreground">
          Planos simples e transparentes
        </h2>
        <p className="text-muted-foreground mt-4 text-[15px]">
          Comece grátis. Faça upgrade quando precisar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-xl p-7 flex flex-col ${
              plan.highlighted
                ? "surface-card border-primary/20 bg-primary/[0.03]"
                : "surface-card"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-[11px] font-medium text-primary-foreground bg-primary px-3 py-1 rounded-full">
                  Mais popular
                </span>
              </div>
            )}

            <div className="mb-7">
              <h3 className="text-[14px] font-semibold text-foreground mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground">{plan.price}</span>
                {plan.period && <span className="text-[13px] text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-[12px] text-muted-foreground mt-1.5">{plan.subtitle}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[13px] text-secondary-foreground">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? "hero" : "outline"}
              className="w-full"
            >
              {plan.cta}
              {plan.highlighted && <ArrowRight className="w-3.5 h-3.5" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
