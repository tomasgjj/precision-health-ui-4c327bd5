import { useState, useEffect, useCallback } from "react";
import { Plus, Check, FileText, Microscope, ChevronRight, ChevronDown, Camera, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Phase = "idle" | "add-sections" | "add-findings" | "import-photo" | "done";

const SECTIONS = [
  { label: "Fígado", text: "Dimensões normais, contornos regulares, ecotextura homogênea." },
  { label: "Vesícula Biliar", text: "Normodistendida, paredes finas, sem cálculos." },
  { label: "Pâncreas", text: "Dimensões e ecotextura normais." },
  { label: "Rins", text: "Tópicos, dimensões preservadas, sem litíase." },
];

const FINDINGS = [
  { label: "Esteatose Grau I", organ: "Fígado", text: "Aumento difuso da ecogenicidade hepática..." },
  { label: "Colelitíase", organ: "Vesícula Biliar", text: "Imagem hiperecogênica com sombra acústica..." },
  { label: "Hemangioma", organ: "Fígado", text: "Imagem nodular hiperecogênica no segmento {loc}..." },
];

const PHASE_TIMING = {
  "add-sections": 4500,
  "add-findings": 4000,
  "import-photo": 3500,
  "done": 3000,
};

export default function MasksDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleSections, setVisibleSections] = useState(0);
  const [visibleFindings, setVisibleFindings] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStep, setImportStep] = useState(0);

  const startDemo = useCallback(() => {
    setVisibleSections(0);
    setVisibleFindings(0);
    setExpandedSection(null);
    setImportProgress(0);
    setImportStep(0);
    setPhase("add-sections");
  }, []);

  const handleMouseEnter = () => {
    if (phase === "idle") startDemo();
  };

  // Phase: add sections one by one
  useEffect(() => {
    if (phase !== "add-sections") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleSections(i);
      if (i === 2) setExpandedSection(0); // expand first to show text
      if (i >= SECTIONS.length) {
        clearInterval(id);
        setTimeout(() => {
          setExpandedSection(null);
          setPhase("add-findings");
        }, 800);
      }
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  // Phase: add findings
  useEffect(() => {
    if (phase !== "add-findings") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleFindings(i);
      if (i >= FINDINGS.length) {
        clearInterval(id);
        setTimeout(() => setPhase("import-photo"), 800);
      }
    }, 800);
    return () => clearInterval(id);
  }, [phase]);

  // Phase: import photo
  useEffect(() => {
    if (phase !== "import-photo") return;
    setImportProgress(0);
    setImportStep(0);
    const progressId = setInterval(() => {
      setImportProgress(p => Math.min(p + 3, 100));
    }, 80);
    const s1 = setTimeout(() => setImportStep(1), 400);
    const s2 = setTimeout(() => setImportStep(2), 1400);
    const s3 = setTimeout(() => setImportStep(3), 2400);
    const next = setTimeout(() => setPhase("done"), 3200);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase]);

  // Phase: done → loop
  useEffect(() => {
    if (phase !== "done") return;
    const id = setTimeout(() => startDemo(), PHASE_TIMING.done);
    return () => clearTimeout(id);
  }, [phase, startDemo]);

  return (
    <section id="mascaras" className="relative py-24 md:py-32">
      <div className="section-glow absolute inset-0 pointer-events-none" />
      <div className="container max-w-[960px] mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">
              Máscaras de Exame
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center max-w-[520px] mx-auto mb-16">
            <h2 className="text-section text-foreground">
              Seus laudos, seus<br />templates
            </h2>
            <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
              Crie máscaras personalizadas com seções, achados e impressões. 
              Importe de fotos com IA ou monte manualmente.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="rounded-xl border border-border/40 overflow-hidden cursor-default select-none bg-card/50 backdrop-blur-sm shadow-2xl max-w-[720px] mx-auto"
            onMouseEnter={handleMouseEnter}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-card/60">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
              </div>
              <span className="text-[11px] text-muted-foreground/50 ml-2 font-medium">
                Editor de Máscaras — USG Abdome Total
              </span>
            </div>

            {/* Demo body */}
            <div className="min-h-[380px] relative overflow-hidden">
              {phase === "idle" && (
                <div className="flex flex-col items-center justify-center h-[380px] gap-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary/60" />
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    Passe o mouse para ver a demo
                  </p>
                </div>
              )}

              {(phase === "add-sections" || phase === "add-findings" || phase === "done") && (
                <div className="animate-fade-in flex flex-col sm:flex-row h-[380px]">
                  {/* Left: Sections */}
                  <div className="flex-1 border-r border-border/30 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <FileText size={12} /> Seções
                      </span>
                      <span className="text-[10px] text-muted-foreground/50">{visibleSections}/{SECTIONS.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                      {SECTIONS.map((sec, i) => (
                        <div
                          key={sec.label}
                          className={`transition-all duration-500 ${i < visibleSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                        >
                          <div className="rounded-lg border border-border/50 overflow-hidden bg-card/40">
                            <div className="flex items-center gap-2 px-3 py-2">
                              {expandedSection === i
                                ? <ChevronDown size={12} className="text-muted-foreground/50" />
                                : <ChevronRight size={12} className="text-muted-foreground/50" />}
                              <span className="text-[12px] font-medium text-foreground/80">{sec.label}</span>
                            </div>
                            {expandedSection === i && (
                              <div className="border-t border-border/30 px-3 py-2">
                                <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">Texto normal</div>
                                <p className="text-[11px] text-foreground/60 leading-relaxed">{sec.text}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {visibleSections < SECTIONS.length && (
                        <div className="flex items-center justify-center gap-1 py-2 text-primary/50 animate-pulse">
                          <Plus size={12} />
                          <span className="text-[11px]">Adicionando seção...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Findings */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Microscope size={12} /> Achados
                      </span>
                      <span className="text-[10px] text-muted-foreground/50">{visibleFindings}/{FINDINGS.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                      {FINDINGS.map((f, i) => (
                        <div
                          key={f.label}
                          className={`transition-all duration-500 ${i < visibleFindings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                        >
                          <div className="rounded-lg border border-border/50 bg-card/40 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <ChevronRight size={12} className="text-muted-foreground/50" />
                              <div className="min-w-0">
                                <div className="text-[12px] font-medium text-foreground/80 truncate">{f.label}</div>
                                <div className="text-[10px] text-primary/50">{f.organ}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {phase === "add-findings" && visibleFindings < FINDINGS.length && (
                        <div className="flex items-center justify-center gap-1 py-2 text-primary/50 animate-pulse">
                          <Plus size={12} />
                          <span className="text-[11px]">Adicionando achado...</span>
                        </div>
                      )}
                      {phase === "done" && (
                        <div className="mt-3 flex items-center gap-2 justify-center animate-fade-in">
                          <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-[11px] font-semibold text-primary">Máscara completa!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {phase === "import-photo" && (
                <div className="flex flex-col items-center justify-center h-[380px] gap-5 animate-fade-in px-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary/70" />
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-semibold text-foreground mb-1">Importando por foto</div>
                    <div className="text-[12px] text-muted-foreground">IA lendo template e criando máscara</div>
                  </div>
                  <div className="w-full max-w-[260px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-100"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    {["Lendo imagem", "Extraindo seções e achados", "Montando máscara"].map((step, i) => (
                      <div
                        key={step}
                        className={`flex items-center gap-2.5 text-[12px] transition-all duration-300 ${i < importStep ? "text-foreground" : "text-muted-foreground/40"}`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i < importStep ? "bg-primary/15" : "border border-border/30"}`}>
                          {i < importStep ? <Check className="w-2.5 h-2.5 text-primary" /> : ""}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Feature bullets */}
        <ScrollReveal delay={0.3}>
          <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-[720px] mx-auto">
            {[
              { icon: FileText, title: "Seções + achados", desc: "Defina órgãos com texto normal e achados com placeholders de medidas" },
              { icon: Camera, title: "Importação por foto", desc: "Tire foto de um modelo em papel e a IA cria a máscara automaticamente" },
              { icon: Sparkles, title: "Placeholders inteligentes", desc: "Use {loc}, {med} para localização e medidas preenchidas pela IA" },
            ].map((item) => (
              <div key={item.title} className="surface-glass rounded-xl p-5 text-center group hover:border-primary/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-4 h-4 text-primary/70" />
                </div>
                <h3 className="text-[13px] font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
