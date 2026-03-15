import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  { q: "Como funciona o Radiktor?", a: "Você dita os achados do exame por voz, o Radiktor transcreve, identifica os achados e monta o laudo estruturado seguindo seus próprios templates. Depois é só revisar e exportar." },
  { q: "Preciso instalar algo?", a: "Não. O Radiktor funciona diretamente no navegador, sem precisar instalar nenhum aplicativo." },
  { q: "Meus dados estão seguros?", a: "Sim. Utilizamos criptografia HTTPS, estamos em conformidade com a LGPD e os dados de cada usuário são completamente isolados." },
  { q: "Quais tipos de exame são suportados?", a: "Atualmente suportamos US de abdome total, tireoide, mamas, vias urinárias e muito mais. Você pode criar templates para qualquer tipo de exame." },
  { q: "Funciona no celular?", a: "Sim! O Radiktor é otimizado para toque. Funciona perfeitamente em smartphones e tablets." },
  { q: "Quanto custa?", a: "Temos planos a partir de R$50/mês no anual. O plano gratuito permite gerar até 15 laudos por mês com 2 modelos inclusos." },
  { q: "O laudo gerado é definitivo?", a: "Não. O Radiktor gera uma sugestão de laudo que o médico pode editar livremente. O profissional mantém total controle e responsabilidade." },
  { q: "A IA pode sugerir diagnósticos ao meu laudo?", a: "Não. A IA do Radiktor apenas organiza e estrutura o laudo com base nos achados que você dita e nos seus próprios templates. Os diagnósticos são sempre do médico." },
  { q: "A IA modifica por conta própria os meus achados?", a: "Não. A IA respeita fielmente o que você ditou. Ela apenas organiza a informação na estrutura do laudo, sem alterar o conteúdo clínico." },
  { q: "Qual a função principal do Radiktor?", a: "Transformar a ditado de achados em um laudo radiológico estruturado, usando seus próprios templates e terminologia, economizando tempo e reduzindo digitação." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container max-w-[640px] mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">FAQ</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center mb-14">
            <h2 className="text-section text-foreground">Perguntas frequentes</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "surface-glass rounded-xl overflow-hidden transition-all duration-300",
                  open === i && "border-primary/20"
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left group"
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
                  <div className="px-4 pb-4 animate-slide-in">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
