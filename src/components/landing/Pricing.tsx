import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Para começar a usar",
    monthlyPrice: "R$50",
    yearlyPrice: "R$30",
    period: "/mês",
    dot: "hsl(var(--muted-foreground))",
    features: [
      "Laudos limitados",
      "1 tipo de exame",
      "Ditado por voz + IA",
      "Histórico na nuvem",
      "Exportação em PDF",
    ],
    cta: "Começar com Basic",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Para radiologistas ativos",
    monthlyPrice: "R$120",
    yearlyPrice: "R$80",
    period: "/mês",
    dot: "hsl(var(--primary))",
    badge: "POPULAR",
    features: [
      "Laudos ilimitados",
      "Todos os tipos de exame",
      "Máscaras personalizadas",
      "Exportação em PDF",
      "Suporte prioritário",
    ],
    cta: "Começar com Pro",
    highlighted: true,
  },
  {
    name: "Clínica",
    description: "Para clínicas e equipes",
    monthlyPrice: null,
    yearlyPrice: null,
    period: "",
    dot: "hsl(142 76% 36%)",
    features: [
      "Tudo do plano Pro",
      "Múltiplos usuários",
      "Painel administrativo",
      "Suporte dedicado",
      "API de integração",
      "Setup personalizado",
    ],
    cta: "Fale conosco",
    highlighted: false,
    custom: true,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="precos" className="relative py-28 md:py-36 border-t border-border/50">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="container relative z-10 max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-6">
          <h2 className="text-section text-foreground">Preços</h2>
          <p className="text-muted-foreground mt-3 text-[15px]">
            Comece grátis. Faça upgrade quando precisar.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <span
            className={`text-[13px] cursor-pointer transition-colors ${
              !yearly ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setYearly(false)}
          >
            Mensal
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${
              yearly ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-foreground transition-transform duration-200 ${
                yearly ? "translate-x-[18px]" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-[13px] cursor-pointer transition-colors ${
              yearly ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
            onClick={() => setYearly(true)}
          >
            Anual
            <span className="ml-1.5 text-[11px] text-primary font-medium">-33%</span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-7 ${
                plan.highlighted
                  ? "bg-primary/[0.04]"
                  : "bg-background"
              }`}
            >
              {/* Plan header */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: plan.dot }}
                />
                <h3 className="text-[14px] font-semibold text-foreground">{plan.name}</h3>
                {plan.badge && (
                  <span className="text-[10px] font-semibold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-muted-foreground mb-5">{plan.description}</p>

              {/* Price */}
              {plan.custom ? (
                <>
                  <span className="text-2xl font-semibold tracking-tight text-foreground mb-1">
                    Sob consulta
                  </span>
                  <p className="text-[11px] text-muted-foreground mb-6">
                    preço personalizado para sua equipe
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    {plan.period && (
                      <span className="text-[13px] text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-6">
                    {yearly ? "cobrado anualmente" : "cobrado mensalmente"}
                  </p>
                </>
              )}

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[13px] text-secondary-foreground">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
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

        {/* Enterprise bar */}
        <div className="mt-4 rounded-xl surface-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold text-foreground">Enterprise</span>
            <span className="text-[13px] text-muted-foreground">
              Para hospitais e redes que precisam de limites customizados e suporte dedicado.
            </span>
          </div>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Fale conosco
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
