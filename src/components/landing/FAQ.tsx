import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    <section className="relative py-28 md:py-36 border-t border-border/50">
      <div className="container max-w-[680px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-medium text-primary mb-3 tracking-widest uppercase">FAQ</p>
          <h2 className="text-section text-foreground">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="surface-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4.5 text-left group"
              >
                <span className="text-[14px] font-medium text-foreground pr-4">{faq.q}</span>
                <div className="w-6 h-6 rounded-md bg-accent/80 flex items-center justify-center flex-shrink-0">
                  {open === i ? (
                    <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5 animate-slide-in">
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
