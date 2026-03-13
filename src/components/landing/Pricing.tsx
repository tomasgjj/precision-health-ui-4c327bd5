import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Para começar a usar",
    monthlyPrice: "R$70",
    yearlyPrice: "R$50",
    period: "/mês",
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
    <section id="precos" className="relative py-24 md:py-32">
      <div className="container max-w-[960px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Preços</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        <div className="text-center max-w-[500px] mx-auto mb-6">
          <h2 className="text-section text-foreground">Preços simples</h2>
          <p className="text-muted-foreground mt-3 text-[14px]">
            Comece grátis. Faça upgrade quando precisar.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <span
            className={`text-[13px] cursor-pointer transition-colors ${!yearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            onClick={() => setYearly(false)}
          >
            Mensal
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${yearly ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-foreground transition-transform duration-200 ${yearly ? "translate-x-[18px]" : "translate-x-0"}`}
            />
          </button>
          <span
            className={`text-[13px] cursor-pointer transition-colors ${yearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            onClick={() => setYearly(true)}
          >
            Anual
            <span className="ml-1.5 text-[11px] text-primary font-medium">-33%</span>
          </span>
        </div>

        {/* Cards — border grid like Linear */}
        <div className="grid md:grid-cols-3 gap-px rounded-xl border border-border/50 overflow-hidden bg-border/50">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-7 ${plan.highlighted ? "bg-primary/[0.03]" : "bg-background"}`}
            >
              {/* Plan header */}
              <div className="flex items-center gap-2 mb-1">
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
                  <span className="text-2xl font-semibold tracking-tight text-foreground mb-1">Sob consulta</span>
                  <p className="text-[11px] text-muted-foreground mb-6">preço personalizado para sua equipe</p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    {plan.period && <span className="text-[13px] text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-6">
                    {yearly ? "cobrado anualmente" : "cobrado mensalmente"}
                  </p>
                </>
              )}

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary/60 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className={`w-full text-[13px] ${plan.highlighted ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border/60 text-muted-foreground hover:text-foreground"}`}
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
};

export default Pricing;
