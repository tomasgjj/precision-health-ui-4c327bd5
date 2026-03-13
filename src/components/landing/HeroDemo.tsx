import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Square, Check, Copy, FileDown } from "lucide-react";

type Phase = "idle" | "recording" | "masks" | "processing" | "result";

const DICTATION_TEXT =
  "Fígado de dimensões ligeiramente aumentadas, bordas rombas, ecotextura sólida com aumento difuso da ecogenicidade e atenuação posterior. Vesícula biliar normodistendida, paredes finas, sem cálculos.";

const LAUDO_SECTIONS = [
  { label: "Fígado", text: "Fígado de topografia normal, dimensões ligeiramente aumentadas, bordas rombas, com ecotextura sólida, apresentando aumento difuso da ecogenicidade." },
  { label: "Vesícula biliar", text: "Vesícula biliar normodistendida, paredes conservadas, sem imagem ecogênica no seu interior." },
  { label: "Vias biliares", text: "Hepatocolédoco de calibre preservado. Ausência de dilatação das vias biliares." },
  { label: "Pâncreas", text: "Dimensões e contornos normais, parênquima homogêneo e ecogenicidade conservada." },
  { label: "Impressão", text: "— Aumento da ecogenicidade hepática, compatível com esteatose grau II.\n— Demais estruturas sem alterações significativas.", isImpression: true },
];

const PROCESS_STEPS = [
  "Transcrição do áudio",
  "Identificação dos achados",
  "Montagem do laudo",
];

// Phase durations
const RECORDING_DURATION = 4000; // 4s of typing
const PROCESSING_DURATION = 2500; // 2.5s
const RESULT_DISPLAY = 4000; // 4s showing result before looping

export default function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [timer, setTimer] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(0);
  const phaseRef = useRef<Phase>("idle");

  // Keep ref in sync
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const startDemo = useCallback(() => {
    setTypedChars(0);
    setTimer(0);
    setProcessStep(0);
    setProcessProgress(0);
    setVisibleSections(0);
    setPhase("recording");
  }, []);

  // Auto-start on hover
  const handleMouseEnter = () => {
    if (phase === "idle") startDemo();
  };

  // Recording phase
  useEffect(() => {
    if (phase !== "recording") return;
    const charsPerTick = Math.ceil(DICTATION_TEXT.length / (RECORDING_DURATION / 40));
    const typeId = setInterval(() => {
      setTypedChars((c) => Math.min(c + charsPerTick, DICTATION_TEXT.length));
    }, 40);
    const timerId = setInterval(() => setTimer((t) => t + 1), 1000);
    const nextPhase = setTimeout(() => setPhase("processing"), RECORDING_DURATION);
    return () => { clearInterval(typeId); clearInterval(timerId); clearTimeout(nextPhase); };
  }, [phase]);

  // Processing phase
  useEffect(() => {
    if (phase !== "processing") return;
    setProcessProgress(0);
    setProcessStep(0);
    const progressId = setInterval(() => {
      setProcessProgress((p) => Math.min(p + 2, 100));
    }, PROCESSING_DURATION / 50);
    const s1 = setTimeout(() => setProcessStep(1), 200);
    const s2 = setTimeout(() => setProcessStep(2), PROCESSING_DURATION * 0.4);
    const s3 = setTimeout(() => setProcessStep(3), PROCESSING_DURATION * 0.75);
    const nextPhase = setTimeout(() => setPhase("result"), PROCESSING_DURATION);
    return () => { clearInterval(progressId); clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(nextPhase); };
  }, [phase]);

  // Result phase
  useEffect(() => {
    if (phase !== "result") return;
    setVisibleSections(0);
    let i = 0;
    const revealId = setInterval(() => {
      i++;
      setVisibleSections(i);
      if (i >= LAUDO_SECTIONS.length) clearInterval(revealId);
    }, 350);
    // Loop back
    const loopTimeout = setTimeout(() => startDemo(), RESULT_DISPLAY + LAUDO_SECTIONS.length * 350);
    return () => { clearInterval(revealId); clearTimeout(loopTimeout); };
  }, [phase, startDemo]);

  const fmtTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="surface-card rounded-xl overflow-hidden cursor-default select-none"
      onMouseEnter={handleMouseEnter}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#fbbf24" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#4ade80" }} />
        </div>
        <span className="text-[11px] text-muted-foreground ml-2">
          LaudoVoz — US Abdome Total
        </span>
      </div>

      {/* Demo body */}
      <div className="min-h-[340px] p-6 relative overflow-hidden">
        {/* IDLE */}
        {phase === "idle" && (
          <div className="flex flex-col items-center justify-center h-[300px] gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Mic className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Passe o mouse para ver a demo
            </p>
          </div>
        )}

        {/* RECORDING */}
        {phase === "recording" && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Square className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-[13px] font-semibold text-foreground">Gravando...</span>
                  <span className="text-sm font-bold text-destructive tabular-nums ml-1">{fmtTime(timer)}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">Ultrassonografia de Abdome Total</div>
              </div>
            </div>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-[3px] h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-primary/60"
                  style={{
                    height: `${12 + Math.sin(Date.now() / 200 + i) * 10}px`,
                    animation: `wave 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                  }}
                />
              ))}
            </div>

            {/* Dictation text */}
            <div className="bg-background/50 border border-border/50 rounded-lg p-4">
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Transcrição</div>
              <p className="text-[13px] text-foreground/90 leading-relaxed">
                {DICTATION_TEXT.slice(0, typedChars)}
                <span className="inline-block w-[2px] h-[14px] bg-primary ml-0.5 animate-pulse" />
              </p>
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {phase === "processing" && (
          <div className="flex flex-col items-center justify-center h-[300px] gap-5 animate-fade-in">
            <div className="text-4xl">🧠</div>
            <div className="text-center">
              <div className="text-[15px] font-semibold text-foreground mb-1">Processando com IA...</div>
              <div className="text-[12px] text-muted-foreground">Identificando achados e estruturando laudo</div>
            </div>
            <div className="w-full max-w-[280px] h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${processProgress}%` }} />
            </div>
            <div className="space-y-2">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step} className={`flex items-center gap-2 text-[13px] transition-all duration-300 ${i < processStep ? "text-foreground opacity-100" : "text-muted-foreground opacity-40"}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${i < processStep ? "bg-primary/20 text-primary" : "bg-muted/20"}`}>
                    {i < processStep ? <Check className="w-3 h-3" /> : ""}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div className="animate-fade-in space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-success/10 border border-success/20">
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-[12px] font-semibold text-success">Laudo pronto</span>
              </div>
            </div>
            <div className="space-y-2 max-h-[260px] overflow-y-auto scrollbar-none">
              {LAUDO_SECTIONS.map((section, i) => (
                <div
                  key={section.label}
                  className={`transition-all duration-500 ${i < visibleSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${section.isImpression ? "bg-primary/5 border border-primary/15 rounded-lg p-3 mt-3" : "bg-background/40 border border-border/30 rounded-lg p-3"}`}
                >
                  <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${section.isImpression ? "text-primary" : "text-muted-foreground"}`}>{section.label}</div>
                  <div className="text-[12px] text-foreground/80 leading-relaxed whitespace-pre-line">{section.text}</div>
                </div>
              ))}
            </div>
            {visibleSections >= LAUDO_SECTIONS.length && (
              <div className="flex gap-2 pt-2 animate-fade-in">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/20 border border-border/30 text-[12px] text-muted-foreground">
                  <Copy className="w-3 h-3" /> Copiar
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/20 border border-border/30 text-[12px] text-muted-foreground">
                  <FileDown className="w-3 h-3" /> Exportar PDF
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
