import { useState, useEffect, useCallback } from "react";
import {
  Mic, Square, Check, Copy, FileDown, FileText, Microscope,
  ChevronRight, ChevronDown, Plus, Camera,
} from "lucide-react";

type Phase = "idle" | "running" | "done";

/* ── Left: Report data ── */
const DICTATION_TEXT =
  "Fígado de dimensões ligeiramente aumentadas, bordas rombas, ecotextura sólida com aumento difuso da ecogenicidade e atenuação posterior. Vesícula biliar normodistendida, paredes finas, sem cálculos.";

const LAUDO_SECTIONS = [
  { label: "Fígado", text: "Fígado de topografia normal, dimensões ligeiramente aumentadas, bordas rombas, com ecotextura sólida, apresentando aumento difuso da ecogenicidade." },
  { label: "Vesícula biliar", text: "Vesícula biliar normodistendida, paredes conservadas, sem imagem ecogênica no seu interior." },
  { label: "Vias biliares", text: "Hepatocolédoco de calibre preservado. Ausência de dilatação das vias biliares." },
  { label: "Impressão", text: "— Esteatose grau II.\n— Demais estruturas sem alterações.", isImpression: true },
];

const PROCESS_STEPS = ["Transcrição do áudio", "Identificação dos achados", "Montagem do laudo"];

/* ── Right: Mask data ── */
const MASK_SECTIONS = [
  { label: "Fígado", text: "Dimensões normais, contornos regulares, ecotextura homogênea." },
  { label: "Vesícula Biliar", text: "Normodistendida, paredes finas, sem cálculos." },
  { label: "Pâncreas", text: "Dimensões e ecotextura normais." },
  { label: "Rins", text: "Tópicos, dimensões preservadas, sem litíase." },
];

const MASK_FINDINGS = [
  { label: "Esteatose Grau I", organ: "Fígado" },
  { label: "Colelitíase", organ: "Vesícula Biliar" },
  { label: "Hemangioma", organ: "Fígado" },
];

/* ── Sub-phase types ── */
type LeftPhase = "recording" | "processing" | "result";
type RightPhase = "sections" | "findings" | "import" | "complete";

export default function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");

  // Left (laudo)
  const [leftPhase, setLeftPhase] = useState<LeftPhase>("recording");
  const [typedChars, setTypedChars] = useState(0);
  const [timer, setTimer] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [visibleLaudo, setVisibleLaudo] = useState(0);

  // Right (mask)
  const [rightPhase, setRightPhase] = useState<RightPhase>("sections");
  const [visibleSections, setVisibleSections] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [visibleFindings, setVisibleFindings] = useState(0);
  const [importProgress, setImportProgress] = useState(0);
  const [importStep, setImportStep] = useState(0);

  const resetAll = useCallback(() => {
    setTypedChars(0); setTimer(0); setProcessStep(0); setProcessProgress(0); setVisibleLaudo(0);
    setVisibleSections(0); setExpandedSection(null); setVisibleFindings(0); setImportProgress(0); setImportStep(0);
    setLeftPhase("recording"); setRightPhase("sections");
  }, []);

  const startDemo = useCallback(() => {
    resetAll();
    setPhase("running");
  }, [resetAll]);

  const handleMouseEnter = () => { if (phase === "idle") startDemo(); };

  // ═══ LEFT: Recording ═══
  useEffect(() => {
    if (phase !== "running" || leftPhase !== "recording") return;
    const cpt = Math.ceil(DICTATION_TEXT.length / (4000 / 40));
    const typeId = setInterval(() => setTypedChars(c => Math.min(c + cpt, DICTATION_TEXT.length)), 40);
    const timerId = setInterval(() => setTimer(t => t + 1), 1000);
    const next = setTimeout(() => setLeftPhase("processing"), 4000);
    return () => { clearInterval(typeId); clearInterval(timerId); clearTimeout(next); };
  }, [phase, leftPhase]);

  // ═══ LEFT: Processing ═══
  useEffect(() => {
    if (phase !== "running" || leftPhase !== "processing") return;
    setProcessProgress(0); setProcessStep(0);
    const pid = setInterval(() => setProcessProgress(p => Math.min(p + 2, 100)), 50);
    const s1 = setTimeout(() => setProcessStep(1), 200);
    const s2 = setTimeout(() => setProcessStep(2), 1000);
    const s3 = setTimeout(() => setProcessStep(3), 1800);
    const next = setTimeout(() => setLeftPhase("result"), 2500);
    return () => { clearInterval(pid); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase, leftPhase]);

  // ═══ LEFT: Result ═══
  useEffect(() => {
    if (phase !== "running" || leftPhase !== "result") return;
    setVisibleLaudo(0);
    let i = 0;
    const id = setInterval(() => { i++; setVisibleLaudo(i); if (i >= LAUDO_SECTIONS.length) clearInterval(id); }, 350);
    return () => clearInterval(id);
  }, [phase, leftPhase]);

  // ═══ RIGHT: Sections ═══
  useEffect(() => {
    if (phase !== "running" || rightPhase !== "sections") return;
    setVisibleSections(0); setExpandedSection(null);
    let i = 0;
    const id = setInterval(() => {
      i++; setVisibleSections(i);
      if (i === 2) setExpandedSection(0);
      if (i >= MASK_SECTIONS.length) { clearInterval(id); setTimeout(() => { setExpandedSection(null); setRightPhase("findings"); }, 600); }
    }, 700);
    return () => clearInterval(id);
  }, [phase, rightPhase]);

  // ═══ RIGHT: Findings ═══
  useEffect(() => {
    if (phase !== "running" || rightPhase !== "findings") return;
    setVisibleFindings(0);
    let i = 0;
    const id = setInterval(() => {
      i++; setVisibleFindings(i);
      if (i >= MASK_FINDINGS.length) { clearInterval(id); setTimeout(() => setRightPhase("import"), 600); }
    }, 800);
    return () => clearInterval(id);
  }, [phase, rightPhase]);

  // ═══ RIGHT: Import ═══
  useEffect(() => {
    if (phase !== "running" || rightPhase !== "import") return;
    setImportProgress(0); setImportStep(0);
    const pid = setInterval(() => setImportProgress(p => Math.min(p + 3, 100)), 80);
    const s1 = setTimeout(() => setImportStep(1), 400);
    const s2 = setTimeout(() => setImportStep(2), 1400);
    const s3 = setTimeout(() => setImportStep(3), 2400);
    const next = setTimeout(() => setRightPhase("complete"), 3000);
    return () => { clearInterval(pid); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase, rightPhase]);

  // ═══ Check if both sides done → loop ═══
  useEffect(() => {
    if (phase !== "running") return;
    if (leftPhase === "result" && visibleLaudo >= LAUDO_SECTIONS.length && rightPhase === "complete") {
      setPhase("done");
    }
  }, [phase, leftPhase, visibleLaudo, rightPhase]);

  useEffect(() => {
    if (phase !== "done") return;
    const id = setTimeout(startDemo, 3000);
    return () => clearTimeout(id);
  }, [phase, startDemo]);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="rounded-xl border border-border/40 overflow-hidden cursor-default select-none bg-card/50 backdrop-blur-sm shadow-2xl"
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
          Radiktor — US Abdome Total
        </span>
      </div>

      {/* ═══ IDLE ═══ */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center h-[340px] gap-4 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Mic className="w-6 h-6 text-primary/60" />
          </div>
          <p className="text-[13px] text-muted-foreground">Passe o mouse para ver a demo</p>
        </div>
      )}

      {/* ═══ SPLIT VIEW ═══ */}
      {(phase === "running" || phase === "done") && (
        <div className="flex h-[340px] animate-fade-in">
          {/* ── LEFT: Laudo flow ── */}
          <div className="flex-1 border-r border-border/30 flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-card/30">
              <Mic size={11} className="text-primary/60" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Geração de Laudo</span>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {/* Recording */}
              {leftPhase === "recording" && (
                <div className="animate-fade-in p-4 space-y-3 h-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <Square className="w-3 h-3 text-destructive" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                    <span className="text-[11px] font-semibold text-foreground">Gravando</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{fmtTime(timer)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-[2px] h-5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-[2px] rounded-full bg-primary/40" style={{
                        height: `${6 + Math.sin(Date.now() / 200 + i) * 6}px`,
                        animation: `wave 0.8s ease-in-out ${i * 0.04}s infinite alternate`,
                      }} />
                    ))}
                  </div>
                  <div className="surface-glass rounded-lg p-3">
                    <div className="text-[9px] text-muted-foreground/50 uppercase tracking-widest font-semibold mb-1">Transcrição</div>
                    <p className="text-[11px] text-foreground/80 leading-relaxed">
                      {DICTATION_TEXT.slice(0, typedChars)}
                      <span className="inline-block w-[2px] h-[11px] bg-primary ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </div>
              )}

              {/* Processing */}
              {leftPhase === "processing" && (
                <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in px-4">
                  <div className="text-center">
                    <div className="text-[12px] font-semibold text-foreground mb-0.5">Processando</div>
                    <div className="text-[10px] text-muted-foreground">Estruturando com IA</div>
                  </div>
                  <div className="w-full max-w-[200px] h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${processProgress}%` }} />
                  </div>
                  <div className="space-y-1.5">
                    {PROCESS_STEPS.map((step, i) => (
                      <div key={step} className={`flex items-center gap-2 text-[10px] transition-all duration-300 ${i < processStep ? "text-foreground" : "text-muted-foreground/40"}`}>
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${i < processStep ? "bg-primary/15" : "border border-border/30"}`}>
                          {i < processStep ? <Check className="w-2 h-2 text-primary" /> : ""}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {leftPhase === "result" && (
                <div className="animate-fade-in p-3 space-y-1.5 overflow-y-auto h-full scrollbar-none">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-primary">Laudo pronto</span>
                  </div>
                  {LAUDO_SECTIONS.map((sec, i) => (
                    <div key={sec.label} className={`transition-all duration-500 ${i < visibleLaudo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} rounded-lg p-2.5 ${sec.isImpression ? "surface-glass border-primary/20 bg-primary/[0.03]" : "surface-glass"}`}>
                      <div className={`text-[9px] font-semibold uppercase tracking-wider mb-0.5 ${sec.isImpression ? "text-primary/70" : "text-muted-foreground/50"}`}>{sec.label}</div>
                      <div className="text-[10px] text-foreground/70 leading-relaxed whitespace-pre-line">{sec.text}</div>
                    </div>
                  ))}
                  {visibleLaudo >= LAUDO_SECTIONS.length && (
                    <div className="flex gap-1.5 pt-1 animate-fade-in">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md surface-glass text-[9px] text-muted-foreground font-medium">
                        <Copy className="w-2.5 h-2.5" /> Copiar
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md surface-glass text-[9px] text-muted-foreground font-medium">
                        <FileDown className="w-2.5 h-2.5" /> PDF
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Mask flow ── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-card/30">
              <FileText size={11} className="text-primary/60" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Criação de Máscara</span>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {/* Sections + Findings */}
              {(rightPhase === "sections" || rightPhase === "findings" || rightPhase === "complete") && (
                <div className="animate-fade-in h-full flex flex-col">
                  {/* Sections list */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
                    <div className="flex items-center gap-1 mb-1.5">
                      <FileText size={10} className="text-muted-foreground/50" />
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/70">Seções</span>
                      <span className="text-[9px] text-muted-foreground/40 ml-auto">{visibleSections}/{MASK_SECTIONS.length}</span>
                    </div>
                    {MASK_SECTIONS.map((sec, i) => (
                      <div key={sec.label} className={`transition-all duration-500 ${i < visibleSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                        <div className="rounded-md border border-border/40 overflow-hidden bg-card/30">
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                            {expandedSection === i ? <ChevronDown size={10} className="text-muted-foreground/50" /> : <ChevronRight size={10} className="text-muted-foreground/50" />}
                            <span className="text-[10px] font-medium text-foreground/80">{sec.label}</span>
                          </div>
                          {expandedSection === i && (
                            <div className="border-t border-border/20 px-2.5 py-1.5">
                              <p className="text-[9px] text-foreground/50 leading-relaxed">{sec.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {rightPhase === "sections" && visibleSections < MASK_SECTIONS.length && (
                      <div className="flex items-center justify-center gap-1 py-1.5 text-primary/50 animate-pulse">
                        <Plus size={10} /><span className="text-[9px]">Adicionando...</span>
                      </div>
                    )}

                    {/* Findings */}
                    {(rightPhase === "findings" || rightPhase === "complete") && (
                      <>
                        <div className="flex items-center gap-1 mt-3 mb-1.5">
                          <Microscope size={10} className="text-muted-foreground/50" />
                          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/70">Achados</span>
                          <span className="text-[9px] text-muted-foreground/40 ml-auto">{visibleFindings}/{MASK_FINDINGS.length}</span>
                        </div>
                        {MASK_FINDINGS.map((f, i) => (
                          <div key={f.label} className={`transition-all duration-500 ${i < visibleFindings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                            <div className="rounded-md border border-border/40 bg-card/30 px-2.5 py-1.5">
                              <div className="text-[10px] font-medium text-foreground/80">{f.label}</div>
                              <div className="text-[8px] text-primary/50">{f.organ}</div>
                            </div>
                          </div>
                        ))}
                        {rightPhase === "findings" && visibleFindings < MASK_FINDINGS.length && (
                          <div className="flex items-center justify-center gap-1 py-1.5 text-primary/50 animate-pulse">
                            <Plus size={10} /><span className="text-[9px]">Adicionando...</span>
                          </div>
                        )}
                        {rightPhase === "complete" && (
                          <div className="mt-2 flex items-center gap-1.5 justify-center animate-fade-in">
                            <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-primary" />
                            </div>
                            <span className="text-[10px] font-semibold text-primary">Máscara completa!</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Import photo */}
              {rightPhase === "import" && (
                <div className="flex flex-col items-center justify-center h-full gap-3 animate-fade-in px-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-primary/70" />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-semibold text-foreground mb-0.5">Importando por foto</div>
                    <div className="text-[9px] text-muted-foreground">IA criando máscara</div>
                  </div>
                  <div className="w-full max-w-[180px] h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${importProgress}%` }} />
                  </div>
                  <div className="space-y-1.5">
                    {["Lendo imagem", "Extraindo seções", "Montando máscara"].map((step, i) => (
                      <div key={step} className={`flex items-center gap-2 text-[10px] transition-all duration-300 ${i < importStep ? "text-foreground" : "text-muted-foreground/40"}`}>
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${i < importStep ? "bg-primary/15" : "border border-border/30"}`}>
                          {i < importStep ? <Check className="w-2 h-2 text-primary" /> : ""}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
