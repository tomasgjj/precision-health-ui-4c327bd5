import { useState, useEffect, useCallback } from "react";
import { Mic, Square, Check, Copy, FileDown, FileText, Microscope, ChevronRight, ChevronDown, Plus, Camera } from "lucide-react";

type Phase =
  | "idle"
  | "recording" | "processing" | "result"
  | "mask-intro" | "mask-sections" | "mask-findings" | "mask-import" | "mask-done";

/* ── Report data ── */
const DICTATION_TEXT =
  "Fígado de dimensões ligeiramente aumentadas, bordas rombas, ecotextura sólida com aumento difuso da ecogenicidade e atenuação posterior. Vesícula biliar normodistendida, paredes finas, sem cálculos.";

const LAUDO_SECTIONS = [
  { label: "Fígado", text: "Fígado de topografia normal, dimensões ligeiramente aumentadas, bordas rombas, com ecotextura sólida, apresentando aumento difuso da ecogenicidade." },
  { label: "Vesícula biliar", text: "Vesícula biliar normodistendida, paredes conservadas, sem imagem ecogênica no seu interior." },
  { label: "Vias biliares", text: "Hepatocolédoco de calibre preservado. Ausência de dilatação das vias biliares." },
  { label: "Pâncreas", text: "Dimensões e contornos normais, parênquima homogêneo e ecogenicidade conservada." },
  { label: "Impressão", text: "— Aumento da ecogenicidade hepática, compatível com esteatose grau II.\n— Demais estruturas sem alterações significativas.", isImpression: true },
];

const PROCESS_STEPS = ["Transcrição do áudio", "Identificação dos achados", "Montagem do laudo"];

/* ── Mask data ── */
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

const IMPORT_STEPS = ["Lendo imagem", "Extraindo seções e achados", "Montando máscara"];

/* ── Timing ── */
const RECORDING_DURATION = 4000;
const PROCESSING_DURATION = 2500;
const RESULT_DISPLAY = 3500;

export default function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");

  // Report state
  const [typedChars, setTypedChars] = useState(0);
  const [timer, setTimer] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [visibleLaudoSections, setVisibleLaudoSections] = useState(0);

  // Mask state
  const [visibleSections, setVisibleSections] = useState(0);
  const [visibleFindings, setVisibleFindings] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStep, setImportStep] = useState(0);

  const startDemo = useCallback(() => {
    setTypedChars(0);
    setTimer(0);
    setProcessStep(0);
    setProcessProgress(0);
    setVisibleLaudoSections(0);
    setVisibleSections(0);
    setVisibleFindings(0);
    setExpandedSection(null);
    setImportProgress(0);
    setImportStep(0);
    setPhase("recording");
  }, []);

  const handleMouseEnter = () => {
    if (phase === "idle") startDemo();
  };

  // ── Recording phase ──
  useEffect(() => {
    if (phase !== "recording") return;
    const charsPerTick = Math.ceil(DICTATION_TEXT.length / (RECORDING_DURATION / 40));
    const typeId = setInterval(() => setTypedChars(c => Math.min(c + charsPerTick, DICTATION_TEXT.length)), 40);
    const timerId = setInterval(() => setTimer(t => t + 1), 1000);
    const nextPhase = setTimeout(() => setPhase("processing"), RECORDING_DURATION);
    return () => { clearInterval(typeId); clearInterval(timerId); clearTimeout(nextPhase); };
  }, [phase]);

  // ── Processing phase ──
  useEffect(() => {
    if (phase !== "processing") return;
    setProcessProgress(0);
    setProcessStep(0);
    const progressId = setInterval(() => setProcessProgress(p => Math.min(p + 2, 100)), PROCESSING_DURATION / 50);
    const s1 = setTimeout(() => setProcessStep(1), 200);
    const s2 = setTimeout(() => setProcessStep(2), PROCESSING_DURATION * 0.4);
    const s3 = setTimeout(() => setProcessStep(3), PROCESSING_DURATION * 0.75);
    const nextPhase = setTimeout(() => setPhase("result"), PROCESSING_DURATION);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(nextPhase); };
  }, [phase]);

  // ── Result phase → transition to masks ──
  useEffect(() => {
    if (phase !== "result") return;
    setVisibleLaudoSections(0);
    let i = 0;
    const revealId = setInterval(() => {
      i++;
      setVisibleLaudoSections(i);
      if (i >= LAUDO_SECTIONS.length) clearInterval(revealId);
    }, 350);
    const next = setTimeout(() => setPhase("mask-sections"), RESULT_DISPLAY + LAUDO_SECTIONS.length * 350);
    return () => { clearInterval(revealId); clearTimeout(next); };
  }, [phase]);

  // ── Mask: add sections ──
  useEffect(() => {
    if (phase !== "mask-sections") return;
    setVisibleSections(0);
    setVisibleFindings(0);
    setExpandedSection(null);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleSections(i);
      if (i === 2) setExpandedSection(0);
      if (i >= MASK_SECTIONS.length) {
        clearInterval(id);
        setTimeout(() => { setExpandedSection(null); setPhase("mask-findings"); }, 800);
      }
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  // ── Mask: add findings ──
  useEffect(() => {
    if (phase !== "mask-findings") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleFindings(i);
      if (i >= MASK_FINDINGS.length) {
        clearInterval(id);
        setTimeout(() => setPhase("mask-import"), 800);
      }
    }, 800);
    return () => clearInterval(id);
  }, [phase]);

  // ── Mask: import photo ──
  useEffect(() => {
    if (phase !== "mask-import") return;
    setImportProgress(0);
    setImportStep(0);
    const progressId = setInterval(() => setImportProgress(p => Math.min(p + 3, 100)), 80);
    const s1 = setTimeout(() => setImportStep(1), 400);
    const s2 = setTimeout(() => setImportStep(2), 1400);
    const s3 = setTimeout(() => setImportStep(3), 2400);
    const next = setTimeout(() => setPhase("mask-done"), 3200);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase]);

  // ── Mask done → loop ──
  useEffect(() => {
    if (phase !== "mask-done") return;
    const id = setTimeout(() => startDemo(), 2500);
    return () => clearTimeout(id);
  }, [phase, startDemo]);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isMaskPhase = phase.startsWith("mask");

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
          {isMaskPhase ? "Editor de Máscaras — USG Abdome Total" : "Radiktor — US Abdome Total"}
        </span>
        {/* Phase indicator pills */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${!isMaskPhase && phase !== "idle" ? "bg-primary/15 text-primary" : "bg-muted/30 text-muted-foreground/40"}`}>
            Laudo
          </span>
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${isMaskPhase ? "bg-primary/15 text-primary" : "bg-muted/30 text-muted-foreground/40"}`}>
            Máscara
          </span>
        </div>
      </div>

      {/* Demo body */}
      <div className="min-h-[320px] relative overflow-hidden">
        {/* ═══ IDLE ═══ */}
        {phase === "idle" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-4 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Mic className="w-6 h-6 text-primary/60" />
            </div>
            <p className="text-[13px] text-muted-foreground">Passe o mouse para ver a demo</p>
          </div>
        )}

        {/* ═══ RECORDING ═══ */}
        {phase === "recording" && (
          <div className="animate-fade-in space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Square className="w-3.5 h-3.5 text-destructive" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                <span className="text-[13px] font-semibold text-foreground">Gravando</span>
                <span className="text-[12px] font-mono text-muted-foreground ml-1">{fmtTime(timer)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[2px] h-6">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-primary/40"
                  style={{
                    height: `${8 + Math.sin(Date.now() / 200 + i) * 8}px`,
                    animation: `wave 0.8s ease-in-out ${i * 0.04}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <div className="surface-glass rounded-xl p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-semibold mb-2">Transcrição</div>
              <p className="text-[13px] text-foreground/80 leading-relaxed">
                {DICTATION_TEXT.slice(0, typedChars)}
                <span className="inline-block w-[2px] h-[13px] bg-primary ml-0.5 animate-pulse" />
              </p>
            </div>
          </div>
        )}

        {/* ═══ PROCESSING ═══ */}
        {phase === "processing" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in">
            <div className="text-center">
              <div className="text-[14px] font-semibold text-foreground mb-1">Processando</div>
              <div className="text-[12px] text-muted-foreground">Estruturando laudo com IA</div>
            </div>
            <div className="w-full max-w-[260px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${processProgress}%` }} />
            </div>
            <div className="space-y-2">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-2.5 text-[12px] transition-all duration-300 ${i < processStep ? "text-foreground" : "text-muted-foreground/40"}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i < processStep ? "bg-primary/15" : "border border-border/30"}`}>
                    {i < processStep ? <Check className="w-2.5 h-2.5 text-primary" /> : ""}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ RESULT ═══ */}
        {phase === "result" && (
          <div className="animate-fade-in space-y-2 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[12px] font-semibold text-primary">Laudo pronto</span>
            </div>
            <div className="space-y-1.5 max-h-[240px] overflow-y-auto scrollbar-none">
              {LAUDO_SECTIONS.map((section, i) => (
                <div
                  key={section.label}
                  className={`transition-all duration-500 ${i < visibleLaudoSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} rounded-xl p-3 ${section.isImpression ? "surface-glass border-primary/20 bg-primary/[0.03]" : "surface-glass"}`}
                >
                  <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${section.isImpression ? "text-primary/70" : "text-muted-foreground/50"}`}>{section.label}</div>
                  <div className="text-[12px] text-foreground/70 leading-relaxed whitespace-pre-line">{section.text}</div>
                </div>
              ))}
            </div>
            {visibleLaudoSections >= LAUDO_SECTIONS.length && (
              <div className="flex gap-2 pt-1 animate-fade-in">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg surface-glass text-[11px] text-muted-foreground font-medium">
                  <Copy className="w-3 h-3" /> Copiar
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg surface-glass text-[11px] text-muted-foreground font-medium">
                  <FileDown className="w-3 h-3" /> PDF
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ MASK: SECTIONS + FINDINGS ═══ */}
        {(phase === "mask-sections" || phase === "mask-findings" || phase === "mask-done") && (
          <div className="animate-fade-in flex flex-col sm:flex-row h-[320px]">
            {/* Left: Sections */}
            <div className="flex-1 border-r border-border/30 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <FileText size={12} /> Seções
                </span>
                <span className="text-[10px] text-muted-foreground/50">{visibleSections}/{MASK_SECTIONS.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {MASK_SECTIONS.map((sec, i) => (
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
                {phase === "mask-sections" && visibleSections < MASK_SECTIONS.length && (
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
                <span className="text-[10px] text-muted-foreground/50">{visibleFindings}/{MASK_FINDINGS.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {MASK_FINDINGS.map((f, i) => (
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
                {phase === "mask-findings" && visibleFindings < MASK_FINDINGS.length && (
                  <div className="flex items-center justify-center gap-1 py-2 text-primary/50 animate-pulse">
                    <Plus size={12} />
                    <span className="text-[11px]">Adicionando achado...</span>
                  </div>
                )}
                {phase === "mask-done" && (
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

        {/* ═══ MASK: IMPORT PHOTO ═══ */}
        {phase === "mask-import" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in px-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary/70" />
            </div>
            <div className="text-center">
              <div className="text-[14px] font-semibold text-foreground mb-1">Importando por foto</div>
              <div className="text-[12px] text-muted-foreground">IA lendo template e criando máscara</div>
            </div>
            <div className="w-full max-w-[260px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${importProgress}%` }} />
            </div>
            <div className="space-y-2">
              {IMPORT_STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-2.5 text-[12px] transition-all duration-300 ${i < importStep ? "text-foreground" : "text-muted-foreground/40"}`}>
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
  );
}
