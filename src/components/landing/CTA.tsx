import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="py-28 md:py-36 relative">
    <div className="absolute inset-0 glow-top" />
    <div className="container relative max-w-3xl mx-auto px-6 text-center">
      <h2 className="font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-5">
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
