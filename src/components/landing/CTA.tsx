import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="py-32 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsl(217_91%_60%_/_0.06),transparent)]" />
    <div className="container relative max-w-3xl mx-auto px-6 text-center">
      <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight mb-5">
        Comece a laudar em segundos
      </h2>
      <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
        Sem instalação, sem cartão de crédito. Crie sua conta e gere seu primeiro laudo agora.
      </p>
      <Button variant="hero" size="xl">
        Começar grátis
      </Button>
    </div>
  </section>
);

export default CTA;
