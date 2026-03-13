import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => (
  <section className="py-24 md:py-32 border-t border-border">
    <div className="container max-w-[720px] mx-auto px-6">
      <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mb-3">
        Comece a laudar em segundos
      </h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-[420px]">
        Sem instalação, sem cartão de crédito. Crie sua conta e gere seu primeiro laudo agora.
      </p>
      <Button variant="hero" size="lg">
        Começar grátis
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  </section>
);

export default CTA;
