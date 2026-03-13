import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CTA = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />

    <div className="container relative z-10 text-center max-w-[500px] mx-auto px-6">
      <ScrollReveal>
        <div className="surface-glass rounded-2xl p-10 md:p-14">
          <h2 className="text-section text-foreground mb-4">
            Comece a laudar<br />em segundos
          </h2>
          <p className="text-[14px] text-muted-foreground mb-10 max-w-[400px] mx-auto leading-relaxed">
            Sem instalação, sem cartão de crédito. Crie sua conta e gere seu primeiro laudo agora.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button className="h-11 px-7 rounded-xl text-[13px] font-semibold gradient-cyan text-white border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              Começar grátis
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="h-11 px-7 rounded-xl text-[13px] font-medium bg-secondary/60 text-foreground border border-border/50 cursor-pointer hover:bg-secondary transition-all duration-200">
              Falar com equipe
            </button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CTA;
