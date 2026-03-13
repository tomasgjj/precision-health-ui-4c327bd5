import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="py-32 relative">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">FAQ</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-foreground">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
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
