import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const CTA = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

    <div className="container relative z-10 text-center max-w-[500px] mx-auto px-6">
      <ScrollReveal>
        <h2 className="text-section text-foreground mb-4">
          Comece a laudar<br />em segundos
        </h2>
        <p className="text-[14px] text-muted-foreground mb-10 max-w-[400px] mx-auto leading-relaxed">
          Sem instalação, sem cartão de crédito. Crie sua conta e gere seu primeiro laudo agora.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button className="h-10 px-6 text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            Começar grátis
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" className="h-10 px-6 text-[13px] font-medium border-border/60 text-muted-foreground hover:text-foreground">
            Falar com equipe
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CTA;
