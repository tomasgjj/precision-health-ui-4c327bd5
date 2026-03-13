import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => (
  <section className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden">
    {/* Background glow */}
    <div className="absolute inset-0 hero-glow pointer-events-none" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

    <div className="container relative z-10 text-center max-w-[600px] mx-auto px-6">
      <h2 className="text-section text-foreground mb-4">
        Comece a laudar em segundos
      </h2>
      <p className="text-[15px] text-muted-foreground mb-10 max-w-[440px] mx-auto leading-relaxed">
        Sem instalação, sem cartão de crédito. Crie sua conta e gere seu primeiro laudo agora.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button variant="hero" size="xl">
          Começar grátis
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="hero-outline" size="xl">
          Falar com equipe
        </Button>
      </div>
    </div>
  </section>
);

export default CTA;
