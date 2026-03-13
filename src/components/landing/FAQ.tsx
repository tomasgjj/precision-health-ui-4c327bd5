import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Preciso instalar algo?", a: "Não. O LaudoVoz funciona diretamente no navegador, sem precisar instalar nenhum aplicativo." },
  { q: "Meus dados estão seguros?", a: "Sim. Utilizamos criptografia HTTPS, estamos em conformidade com a LGPD e os dados de cada usuário são completamente isolados." },
  { q: "Funciona com quais exames?", a: "Atualmente suportamos US de abdome total, tireoide, mamas, vias urinárias e muito mais. Você pode criar templates para qualquer tipo de exame." },
  { q: "Posso usar no celular?", a: "Sim! O LaudoVoz é otimizado para toque. Funciona perfeitamente em smartphones e tablets." },
  { q: "Como funciona o plano gratuito?", a: "O plano gratuito permite gerar até 10 laudos por mês com 1 tipo de exame incluso." },
  { q: "O laudo gerado é definitivo?", a: "Não. O LaudoVoz gera uma sugestão de laudo que o médico pode editar livremente. O profissional mantém total controle e responsabilidade." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container max-w-[640px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">FAQ</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        <div className="text-center mb-14">
          <h2 className="text-section text-foreground">
            Perguntas frequentes
          </h2>
        </div>

        <div className="border-t border-border/50">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border/50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="text-[14px] font-medium text-foreground pr-4">{faq.q}</span>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground/40 transition-transform duration-200 flex-shrink-0",
                    open === i && "rotate-90"
                  )}
                />
              </button>
              {open === i && (
                <div className="pb-4 animate-slide-in">
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
