import { useState, useEffect, useCallback } from "react";
import {
  Mic, Square, Check, Copy, FileDown, FileText, Microscope,
  ChevronRight, ChevronDown, Plus, Camera, Image, Upload,
  Pencil, RotateCcw, BarChart3, Clock, Target, TrendingUp
} from "lucide-react";

type Phase =
  | "idle"
  /* 1. Mask creation */
  | "mask-intro" | "mask-upload" | "mask-analyzing" | "mask-editor" | "mask-findings" | "mask-done"
  /* 2. Report generation */
  | "report-intro" | "recording" | "processing" | "result"
  | "correction-intro" | "correction-recording" | "correction-applying" | "correction-done"
  /* 4. Dashboard */
  | "dash-intro" | "dash-stats";

/* ── Mask data ── */
const MASK_PHOTOS = ["template_p1.jpg", "template_p2.jpg", "template_p3.jpg"];

const ANALYZE_STEPS = ["Lendo imagens enviadas", "Extraindo seções e achados", "Montando máscara completa"];

const MASK_SECTIONS = [
  { label: "Fígado", text: "Dimensões normais, contornos regulares, ecotextura homogênea." },
  { label: "Vesícula Biliar", text: "Normodistendida, paredes finas, sem cálculos." },
  { label: "Pâncreas", text: "Dimensões e ecotextura normais." },
  { label: "Rins", text: "Tópicos, dimensões preservadas, sem litíase." },
];

const MASK_FINDINGS = [
  { label: "Esteatose Grau I", organ: "Fígado", body: "Aumento difuso da ecogenicidade...", impression: "Esteatose hepática grau I", ap: false },
  { label: "Colelitíase", organ: "Vesícula Biliar", body: "Imagem ecogênica com sombra acústica posterior...", impression: "Colelitíase", ap: false },
  { label: "Hemangioma", organ: "Fígado", body: "Nódulo hiperecogênico de {med}cm...", impression: "Hemangioma hepático", ap: true },
];

/* ── Report data ── */
const DICTATION_TEXT =
  "Fígado de dimensões ligeiramente aumentadas, bordas rombas, ecotextura com aumento difuso da ecogenicidade. Vesícula biliar normodistendida, paredes finas, sem cálculos.";

const LAUDO_SECTIONS = [
  { label: "Fígado", text: "Fígado de topografia normal, dimensões ligeiramente aumentadas, bordas rombas, com aumento difuso da ecogenicidade." },
  { label: "Vesícula biliar", text: "Vesícula biliar normodistendida, paredes conservadas, sem imagem ecogênica." },
  { label: "Vias biliares", text: "Hepatocolédoco de calibre preservado." },
  { label: "Impressão", text: "— Esteatose hepática grau II.\n— Demais estruturas sem alterações.", isImpression: true },
];

const PROCESS_STEPS = ["Transcrição do áudio", "Identificação dos achados", "Montagem do laudo"];

/* ── Correction data ── */
const CORRECTION_TEXT = "Na verdade o fígado mede 15 centímetros, e adiciona cisto simples de 2cm no rim direito.";

const CORRECTED_SECTIONS = [
  { label: "Fígado", text: "Fígado de topografia normal, dimensões aumentadas (15,0 cm), bordas rombas, com aumento difuso da ecogenicidade.", changed: true },
  { label: "Rins", text: "Rins tópicos, com cisto simples de 2,0 cm no rim direito.", changed: true },
  { label: "Impressão", text: "— Esteatose hepática grau II.\n— Cisto simples renal à direita (2,0 cm).", isImpression: true, changed: true },
];

/* ── Dashboard data ── */
const DASH_METRICS = [
  { label: "Laudos hoje", value: "12", icon: FileText, trend: "+3 vs ontem" },
  { label: "Tempo economizado", value: "47min", icon: Clock, trend: "vs digitação" },
  { label: "Meta diária", value: "80%", icon: Target, trend: "12/15 laudos" },
  { label: "Taxa de correção", value: "8%", icon: TrendingUp, trend: "↓2% vs semana" },
];

const DASH_HEATMAP = [
  [0, 0, 1, 3, 5, 7, 8, 6, 4, 2, 1, 0],
  [0, 1, 2, 4, 6, 8, 9, 7, 5, 3, 1, 0],
  [0, 0, 1, 3, 5, 7, 7, 5, 3, 2, 1, 0],
  [0, 1, 2, 5, 7, 9, 8, 6, 4, 2, 0, 0],
  [0, 0, 1, 4, 6, 8, 9, 7, 5, 3, 1, 0],
];

/* ── Timing ── */
const RECORDING_DURATION = 3500;
const PROCESSING_DURATION = 2200;

export default function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");

  // Mask state
  const [uploadedPhotos, setUploadedPhotos] = useState(0);
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(0);
  const [visibleFindings, setVisibleFindings] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  // Report state
  const [typedChars, setTypedChars] = useState(0);
  const [timer, setTimer] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [visibleLaudoSections, setVisibleLaudoSections] = useState(0);

  // Correction state
  const [corrTypedChars, setCorrTypedChars] = useState(0);
  const [corrTimer, setCorrTimer] = useState(0);
  const [corrProgress, setCorrProgress] = useState(0);
  const [visibleCorrSections, setVisibleCorrSections] = useState(0);

  // Dashboard state
  const [visibleMetrics, setVisibleMetrics] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [dailyProgress, setDailyProgress] = useState(0);

  const resetAll = useCallback(() => {
    setUploadedPhotos(0);
    setAnalyzeStep(0);
    setAnalyzeProgress(0);
    setVisibleSections(0);
    setVisibleFindings(0);
    setExpandedSection(null);
    setExpandedFinding(null);
    setTypedChars(0);
    setTimer(0);
    setProcessStep(0);
    setProcessProgress(0);
    setVisibleLaudoSections(0);
    setCorrTypedChars(0);
    setCorrTimer(0);
    setCorrProgress(0);
    setVisibleCorrSections(0);
  }, []);

  const startDemo = useCallback(() => {
    resetAll();
    setPhase("mask-intro");
  }, [resetAll]);

  const handleMouseEnter = () => {
    if (phase === "idle") startDemo();
  };

  // ── MASK INTRO ──
  useEffect(() => {
    if (phase !== "mask-intro") return;
    const id = setTimeout(() => setPhase("mask-upload"), 2000);
    return () => clearTimeout(id);
  }, [phase]);

  // ── MASK UPLOAD (photos appearing) ──
  useEffect(() => {
    if (phase !== "mask-upload") return;
    setUploadedPhotos(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setUploadedPhotos(i);
      if (i >= MASK_PHOTOS.length) {
        clearInterval(id);
        setTimeout(() => setPhase("mask-analyzing"), 600);
      }
    }, 500);
    return () => clearInterval(id);
  }, [phase]);

  // ── MASK ANALYZING ──
  useEffect(() => {
    if (phase !== "mask-analyzing") return;
    setAnalyzeProgress(0);
    setAnalyzeStep(0);
    const progressId = setInterval(() => setAnalyzeProgress(p => Math.min(p + 2, 100)), 60);
    const s1 = setTimeout(() => setAnalyzeStep(1), 300);
    const s2 = setTimeout(() => setAnalyzeStep(2), 1200);
    const s3 = setTimeout(() => setAnalyzeStep(3), 2200);
    const next = setTimeout(() => setPhase("mask-editor"), 3000);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase]);

  // ── MASK EDITOR (sections) ──
  useEffect(() => {
    if (phase !== "mask-editor") return;
    setVisibleSections(0);
    setVisibleFindings(0);
    setExpandedSection(null);
    setExpandedFinding(null);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleSections(i);
      if (i === 2) setExpandedSection(0);
      if (i >= MASK_SECTIONS.length) {
        clearInterval(id);
        setTimeout(() => { setExpandedSection(null); setPhase("mask-findings"); }, 800);
      }
    }, 600);
    return () => clearInterval(id);
  }, [phase]);

  // ── MASK FINDINGS ──
  useEffect(() => {
    if (phase !== "mask-findings") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleFindings(i);
      if (i === 2) setExpandedFinding(0);
      if (i >= MASK_FINDINGS.length) {
        clearInterval(id);
        setTimeout(() => { setExpandedFinding(null); setPhase("mask-done"); }, 800);
      }
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  // ── MASK DONE → report ──
  useEffect(() => {
    if (phase !== "mask-done") return;
    const id = setTimeout(() => setPhase("report-intro"), 2000);
    return () => clearTimeout(id);
  }, [phase]);

  // ── REPORT INTRO ──
  useEffect(() => {
    if (phase !== "report-intro") return;
    const id = setTimeout(() => setPhase("recording"), 2000);
    return () => clearTimeout(id);
  }, [phase]);

  // ── RECORDING ──
  useEffect(() => {
    if (phase !== "recording") return;
    setTypedChars(0);
    setTimer(0);
    const charsPerTick = Math.ceil(DICTATION_TEXT.length / (RECORDING_DURATION / 40));
    const typeId = setInterval(() => setTypedChars(c => Math.min(c + charsPerTick, DICTATION_TEXT.length)), 40);
    const timerId = setInterval(() => setTimer(t => t + 1), 1000);
    const next = setTimeout(() => setPhase("processing"), RECORDING_DURATION);
    return () => { clearInterval(typeId); clearInterval(timerId); clearTimeout(next); };
  }, [phase]);

  // ── PROCESSING ──
  useEffect(() => {
    if (phase !== "processing") return;
    setProcessProgress(0);
    setProcessStep(0);
    const progressId = setInterval(() => setProcessProgress(p => Math.min(p + 2, 100)), PROCESSING_DURATION / 50);
    const s1 = setTimeout(() => setProcessStep(1), 200);
    const s2 = setTimeout(() => setProcessStep(2), PROCESSING_DURATION * 0.4);
    const s3 = setTimeout(() => setProcessStep(3), PROCESSING_DURATION * 0.75);
    const next = setTimeout(() => setPhase("result"), PROCESSING_DURATION);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(next); };
  }, [phase]);

  // ── RESULT → correction ──
  useEffect(() => {
    if (phase !== "result") return;
    setVisibleLaudoSections(0);
    let i = 0;
    const revealId = setInterval(() => {
      i++;
      setVisibleLaudoSections(i);
      if (i >= LAUDO_SECTIONS.length) clearInterval(revealId);
    }, 300);
    const next = setTimeout(() => setPhase("correction-intro"), 3000 + LAUDO_SECTIONS.length * 300);
    return () => { clearInterval(revealId); clearTimeout(next); };
  }, [phase]);

  // ── CORRECTION INTRO ──
  useEffect(() => {
    if (phase !== "correction-intro") return;
    const id = setTimeout(() => setPhase("correction-recording"), 2000);
    return () => clearTimeout(id);
  }, [phase]);

  // ── CORRECTION RECORDING ──
  useEffect(() => {
    if (phase !== "correction-recording") return;
    setCorrTypedChars(0);
    setCorrTimer(0);
    const charsPerTick = Math.ceil(CORRECTION_TEXT.length / (2500 / 40));
    const typeId = setInterval(() => setCorrTypedChars(c => Math.min(c + charsPerTick, CORRECTION_TEXT.length)), 40);
    const timerId = setInterval(() => setCorrTimer(t => t + 1), 1000);
    const next = setTimeout(() => setPhase("correction-applying"), 2500);
    return () => { clearInterval(typeId); clearInterval(timerId); clearTimeout(next); };
  }, [phase]);

  // ── CORRECTION APPLYING ──
  useEffect(() => {
    if (phase !== "correction-applying") return;
    setCorrProgress(0);
    const progressId = setInterval(() => setCorrProgress(p => Math.min(p + 3, 100)), 50);
    const next = setTimeout(() => setPhase("correction-done"), 2000);
    return () => { clearInterval(progressId); clearTimeout(next); };
  }, [phase]);

  // ── CORRECTION DONE → loop ──
  useEffect(() => {
    if (phase !== "correction-done") return;
    setVisibleCorrSections(0);
    let i = 0;
    const revealId = setInterval(() => {
      i++;
      setVisibleCorrSections(i);
      if (i >= CORRECTED_SECTIONS.length) clearInterval(revealId);
    }, 300);
    const next = setTimeout(() => startDemo(), 3500);
    return () => { clearInterval(revealId); clearTimeout(next); };
  }, [phase, startDemo]);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isMaskPhase = phase.startsWith("mask-");
  const isReportPhase = phase === "recording" || phase === "processing" || phase === "result" || phase === "report-intro";
  const isCorrectionPhase = phase.startsWith("correction-");

  const getPhaseLabel = () => {
    if (isMaskPhase) return "Máscaras";
    if (isReportPhase) return "Laudo";
    if (isCorrectionPhase) return "Correção";
    return "";
  };

  const getTitleBar = () => {
    if (isMaskPhase) return "Editor de Máscaras — USG Abdome Total";
    if (isReportPhase) return "Radiktor — USG Abdome Total";
    if (isCorrectionPhase) return "Correção por Voz — USG Abdome Total";
    return "Radiktor";
  };

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
        <span className="text-[11px] text-muted-foreground/50 ml-2 font-medium truncate">
          {getTitleBar()}
        </span>
        {/* Phase pills */}
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          {["Máscaras", "Laudo", "Correção"].map((label) => (
            <span
              key={label}
              className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${
                getPhaseLabel() === label
                  ? "bg-primary/15 text-primary"
                  : "bg-muted/30 text-muted-foreground/40"
              }`}
            >
              {label}
            </span>
          ))}
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

        {/* ═══ MASK INTRO ═══ */}
        {phase === "mask-intro" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in">
            {/* Camera icon with glow ring */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center animate-scale-in">
                <Camera className="w-9 h-9 text-primary" />
              </div>
            </div>
            <div className="text-center animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <h3 className="text-[18px] font-bold text-foreground mb-1.5">1. Fotografe seu Template</h3>
              <p className="text-[13px] text-muted-foreground max-w-[300px]">
                Tire fotos do seu modelo impresso — a IA extrai seções e achados automaticamente
              </p>
            </div>
            <div className="flex items-center gap-4 mt-1 animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <Camera className="w-3.5 h-3.5" /> Câmera
              </div>
              <div className="w-px h-3 bg-border/40" />
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <Upload className="w-3.5 h-3.5" /> Arquivo
              </div>
              <div className="w-px h-3 bg-border/40" />
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <span className="font-mono text-[10px]">Ctrl+V</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ MASK UPLOAD ═══ */}
        {phase === "mask-upload" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in px-6">
            <div className="text-center mb-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-primary" />
                <div className="text-[14px] font-semibold text-foreground">Importando fotos</div>
              </div>
              <div className="text-[12px] text-muted-foreground">Até 10 fotos do template · JPEG comprimido</div>
            </div>
            <div className="flex items-center gap-3">
              {MASK_PHOTOS.map((_, i) => (
                <div
                  key={i}
                  className={`relative w-20 h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-500 ${
                    i < uploadedPhotos
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]"
                      : "border-border/30 bg-muted/10"
                  }`}
                >
                  {i < uploadedPhotos ? (
                    <div className="flex flex-col items-center gap-1 animate-scale-in">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <Image className="w-4 h-4 text-primary/70" />
                      </div>
                      <span className="text-[9px] text-primary/60 font-medium">Pág. {i + 1}</span>
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-primary-foreground" />
                      </div>
                    </div>
                  ) : (
                    <Upload className="w-4 h-4 text-muted-foreground/30" />
                  )}
                </div>
              ))}
            </div>
            {uploadedPhotos >= MASK_PHOTOS.length && (
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md" />
                <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold">
                  <Camera className="w-4 h-4" />
                  Analisar com IA
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ MASK ANALYZING ═══ */}
        {phase === "mask-analyzing" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in px-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary/70" />
            </div>
            <div className="text-center">
              <div className="text-[14px] font-semibold text-foreground mb-1">Analisando com IA</div>
              <div className="text-[12px] text-muted-foreground">Lendo {MASK_PHOTOS.length} páginas do template</div>
            </div>
            <div className="w-full max-w-[260px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${analyzeProgress}%` }} />
            </div>
            <div className="space-y-2">
              {ANALYZE_STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-2.5 text-[12px] transition-all duration-300 ${i < analyzeStep ? "text-foreground" : "text-muted-foreground/40"}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i < analyzeStep ? "bg-primary/15" : "border border-border/30"}`}>
                    {i < analyzeStep ? <Check className="w-2.5 h-2.5 text-primary" /> : ""}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MASK EDITOR (sections + findings split view) ═══ */}
        {(phase === "mask-editor" || phase === "mask-findings" || phase === "mask-done") && (
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
                {phase === "mask-editor" && visibleSections < MASK_SECTIONS.length && (
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
                    <div className="rounded-lg border border-border/50 bg-card/40 overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2">
                        {expandedFinding === i
                          ? <ChevronDown size={12} className="text-muted-foreground/50" />
                          : <ChevronRight size={12} className="text-muted-foreground/50" />}
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-medium text-foreground/80 truncate">{f.label}</div>
                          <div className="text-[10px] text-primary/50">{f.organ} · {f.ap ? "adiciona" : "substitui"}</div>
                        </div>
                      </div>
                      {expandedFinding === i && (
                        <div className="border-t border-border/30 px-3 py-2 space-y-1.5">
                          <div>
                            <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-0.5">Corpo</div>
                            <p className="text-[10px] text-foreground/60">{f.body}</p>
                          </div>
                          <div>
                            <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-0.5">Impressão</div>
                            <p className="text-[10px] text-primary/60">{f.impression}</p>
                          </div>
                        </div>
                      )}
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

        {/* ═══ REPORT INTRO ═══ */}
        {phase === "report-intro" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-scale-in">
              <Mic className="w-7 h-7 text-primary/70" />
            </div>
            <div className="text-center animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <h3 className="text-[18px] font-bold text-foreground mb-1.5">2. Geração do Laudo</h3>
              <p className="text-[13px] text-muted-foreground max-w-[280px]">
                Grave o que está vendo e a IA monta o laudo estruturado
              </p>
            </div>
            <div className="flex gap-1.5 mt-1 animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse [animation-delay:200ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse [animation-delay:400ms]" />
            </div>
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

        {/* ═══ CORRECTION INTRO ═══ */}
        {phase === "correction-intro" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-scale-in">
              <Pencil className="w-7 h-7 text-primary/70" />
            </div>
            <div className="text-center animate-fade-in [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <h3 className="text-[18px] font-bold text-foreground mb-1.5">3. Correção por Voz</h3>
              <p className="text-[13px] text-muted-foreground max-w-[280px]">
                Grave a correção e o laudo é atualizado automaticamente
              </p>
            </div>
            <div className="flex gap-1.5 mt-1 animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse [animation-delay:200ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse [animation-delay:400ms]" />
            </div>
          </div>
        )}

        {/* ═══ CORRECTION RECORDING ═══ */}
        {phase === "correction-recording" && (
          <div className="animate-fade-in space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-warning/10 flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5 text-warning" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                <span className="text-[13px] font-semibold text-foreground">Corrigindo</span>
                <span className="text-[12px] font-mono text-muted-foreground ml-1">{fmtTime(corrTimer)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[2px] h-6">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-warning/40"
                  style={{
                    height: `${8 + Math.sin(Date.now() / 200 + i) * 8}px`,
                    animation: `wave 0.8s ease-in-out ${i * 0.04}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <div className="surface-glass rounded-xl p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-semibold mb-2">Correção</div>
              <p className="text-[13px] text-foreground/80 leading-relaxed">
                {CORRECTION_TEXT.slice(0, corrTypedChars)}
                <span className="inline-block w-[2px] h-[13px] bg-warning ml-0.5 animate-pulse" />
              </p>
            </div>
          </div>
        )}

        {/* ═══ CORRECTION APPLYING ═══ */}
        {phase === "correction-applying" && (
          <div className="flex flex-col items-center justify-center h-[320px] gap-5 animate-fade-in">
            <div className="text-center">
              <div className="text-[14px] font-semibold text-foreground mb-1">Aplicando correção</div>
              <div className="text-[12px] text-muted-foreground">Atualizando laudo com as alterações</div>
            </div>
            <div className="w-full max-w-[260px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-warning transition-all duration-100" style={{ width: `${corrProgress}%` }} />
            </div>
          </div>
        )}

        {/* ═══ CORRECTION DONE ═══ */}
        {phase === "correction-done" && (
          <div className="animate-fade-in space-y-2 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[12px] font-semibold text-primary">Laudo corrigido</span>
            </div>
            <div className="space-y-1.5 max-h-[240px] overflow-y-auto scrollbar-none">
              {CORRECTED_SECTIONS.map((section, i) => (
                <div
                  key={section.label}
                  className={`transition-all duration-500 ${i < visibleCorrSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} rounded-xl p-3 ${section.isImpression ? "surface-glass border-primary/20 bg-primary/[0.03]" : "surface-glass"} ${section.changed ? "ring-1 ring-warning/30" : ""}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${section.isImpression ? "text-primary/70" : "text-muted-foreground/50"}`}>{section.label}</span>
                    {section.changed && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-warning/15 text-warning font-medium">alterado</span>}
                  </div>
                  <div className="text-[12px] text-foreground/70 leading-relaxed whitespace-pre-line">{section.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
