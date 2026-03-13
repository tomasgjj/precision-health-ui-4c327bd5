import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
  { q: "Preciso instalar algo?", a: "Não. O LaudoVoz funciona diretamente no navegador, sem precisar instalar nenhum aplicativo." },
  { q: "Meus dados estão seguros?", a: "Sim. Utilizamos criptografia HTTPS, estamos em conformidade com a LGPD e os dados de cada usuário são completamente isolados." },
  { q: "Funciona com quais exames?", a: "Atualmente suportamos US de abdome total, tireoide, mamas, vias urinárias e muito mais. Você pode criar templates customizáveis para qualquer tipo de exame." },
  { q: "Posso usar no celular?", a: "Sim! O LaudoVoz é otimizado para toque. Funciona perfeitamente em smartphones e tablets." },
  { q: "Como funciona o plano gratuito?", a: "O plano gratuito permite gerar até 10 laudos por mês com 1 tipo de exame incluso." },
  { q: "O laudo gerado é definitivo?", a: "Não. O LaudoVoz gera uma sugestão de laudo que o médico pode editar livremente. O profissional mantém total controle e responsabilidade." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container max-w-[720px] mx-auto px-6">
        <p className="text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">FAQ</p>
        <h2 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] text-foreground mb-12">
          Perguntas frequentes
        </h2>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                    open === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.a}
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
