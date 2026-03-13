import { Check, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Basic",
    description: "Para começar a usar",
    monthlyPrice: "R$70",
    yearlyPrice: "R$50",
    period: "/mês",
    features: ["Laudos limitados", "1 tipo de exame", "Ditado por voz + IA", "Histórico na nuvem", "Exportação em PDF"],
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
    features: ["Laudos ilimitados", "Todos os tipos de exame", "Máscaras personalizadas", "Exportação em PDF", "Suporte prioritário"],
    cta: "Começar com Pro",
    highlighted: true,
  },
  {
    name: "Max",
    description: "Para equipes e clínicas",
    monthlyPrice: "R$200",
    yearlyPrice: "R$150",
    period: "/mês",
    features: ["Tudo do plano Pro", "Múltiplos usuários", "Painel administrativo", "Suporte dedicado", "API de integração", "Setup personalizado"],
    cta: "Começar com Max",
    highlighted: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="precos" className="relative py-24 md:py-32">
      <div className="section-glow absolute inset-0 pointer-events-none" />
      <div className="container max-w-[960px] mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">Preços</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center max-w-[500px] mx-auto mb-6">
            <h2 className="text-section text-foreground">Preços simples</h2>
            <p className="text-muted-foreground mt-3 text-[14px]">Comece grátis. Faça upgrade quando precisar.</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-14">
            <span className={`text-[13px] cursor-pointer transition-colors ${!yearly ? "text-foreground font-semibold" : "text-muted-foreground"}`} onClick={() => setYearly(false)}>Mensal</span>
            <button onClick={() => setYearly(!yearly)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${yearly ? "bg-primary" : "bg-muted"}`}>
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${yearly ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className={`text-[13px] cursor-pointer transition-colors ${yearly ? "text-foreground font-semibold" : "text-muted-foreground"}`} onClick={() => setYearly(true)}>
              Anual
              <span className="ml-1.5 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">-33%</span>
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 ${
                  plan.highlighted
                    ? "surface-glass border-primary/30 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.2)]"
                    : "surface-glass hover:border-primary/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] gradient-brand rounded-full" />
                )}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[14px] font-semibold text-foreground">{plan.name}</h3>
                  {plan.badge && (
                    <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-muted-foreground mb-5">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span className="text-[13px] text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-6">{yearly ? "cobrado anualmente" : "cobrado mensalmente"}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary/70 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "gradient-cyan text-white border-none hover:-translate-y-0.5 hover:shadow-lg"
                      : "bg-secondary/60 text-foreground border border-border/50 hover:bg-secondary hover:border-primary/20"
                  }`}
                >
                  {plan.highlighted && <Zap className="w-3.5 h-3.5" />}
                  {plan.cta}
                  {plan.highlighted && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;
