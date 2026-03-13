import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Sparkles, Keyboard, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface RecorderProps {
  onGenerate: (text: string) => void;
}

type RecordState = "idle" | "recording" | "transcribing";

export default function Recorder({ onGenerate }: RecorderProps) {
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [state]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleMicClick = () => {
    if (state === "idle") {
      setState("recording");
      setSeconds(0);
      setTranscription("");
    } else if (state === "recording") {
      setState("transcribing");
      setTimeout(() => {
        setTranscription(
          "Fígado de dimensões normais, contornos regulares, ecotextura homogênea. Vesícula biliar normodistendida, paredes finas, sem cálculos. Vias biliares de calibre normal. Pâncreas de dimensões e ecotextura normais. Baço homogêneo, de dimensões normais. Rins tópicos, de dimensões e contornos preservados, sem sinais de dilatação pielocalicinal ou litíase."
        );
        setState("idle");
      }, 2000);
    }
  };

  const canGenerate = transcription.trim().length > 0;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Mode toggle */}
      <div className="flex items-center gap-0.5 p-1 rounded-xl bg-secondary/50 border border-border/50 w-fit">
        <button
          onClick={() => setMode("voice")}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200",
            mode === "voice"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic className="w-3.5 h-3.5" />
          Voz
        </button>
        <button
          onClick={() => setMode("text")}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200",
            mode === "text"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Keyboard className="w-3.5 h-3.5" />
          Texto
        </button>
      </div>

      {/* Voice mode */}
      {mode === "voice" && (
        <div className="flex flex-col items-center gap-6 py-8">
          {/* Mic button with rings */}
          <div className="relative">
            {/* Outer glow ring */}
            {state === "recording" && (
              <>
                <div className="absolute inset-0 -m-6 rounded-3xl bg-destructive/5 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 -m-3 rounded-2xl border border-destructive/20" style={{ animation: 'pulse-ring 1.5s ease-in-out infinite' }} />
              </>
            )}
            {state === "idle" && (
              <div className="absolute inset-0 -m-2 rounded-2xl border border-primary/10 transition-all duration-300" />
            )}

            <button
              onClick={handleMicClick}
              className={cn(
                "relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
                state === "idle" &&
                  "bg-secondary/80 border border-border text-foreground hover:bg-secondary hover:border-primary/30 hover:glow-primary-sm hover:scale-105 active:scale-95",
                state === "recording" &&
                  "bg-destructive/10 border-2 border-destructive text-destructive glow-recording",
                state === "transcribing" &&
                  "bg-secondary/80 border border-border text-muted-foreground cursor-wait"
              )}
              disabled={state === "transcribing"}
            >
              {state === "idle" && <Mic className="w-7 h-7" />}
              {state === "recording" && <Square className="w-5 h-5 fill-current" />}
              {state === "transcribing" && <Loader2 className="w-6 h-6 animate-spin" />}
            </button>
          </div>

          {/* Status */}
          <div className="text-center space-y-1.5">
            {state === "recording" && (
              <div className="flex items-center gap-2.5 justify-center">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-lg font-mono font-bold text-foreground tabular-nums">{formatTime(seconds)}</span>
              </div>
            )}
            <p className="text-[12px] text-muted-foreground">
              {state === "idle" && "Toque para iniciar a gravação"}
              {state === "recording" && "Gravando — toque para parar"}
              {state === "transcribing" && "Processando transcrição..."}
            </p>
          </div>

          {/* Waveform bars */}
          {state === "recording" && (
            <div className="flex items-end gap-[2px] h-8">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2.5px] bg-primary/50 rounded-full"
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animation: `wave 0.4s ${i * 0.04}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transcription area */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
            2
          </div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
            Transcrição
          </label>
        </div>

        <div className="relative">
          <Textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder={mode === "text" ? "Digite ou cole a descrição do exame aqui..." : "A transcrição aparecerá aqui após a gravação..."}
            className="min-h-[140px] bg-background/50 border-border/50 text-foreground text-[13px] leading-relaxed placeholder:text-muted-foreground/40 resize-none focus:bg-background/80 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.06)] transition-all duration-200 rounded-xl"
            rows={6}
          />
        </div>

        {/* Generate button */}
        <button
          onClick={() => canGenerate && onGenerate(transcription)}
          disabled={!canGenerate}
          className={cn(
            "w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-bold transition-all duration-200",
            canGenerate
              ? "gradient-cyan text-primary-foreground hover:shadow-lg hover:-translate-y-px active:scale-[0.98] glow-primary-sm"
              : "bg-secondary/60 text-muted-foreground/50 cursor-not-allowed border border-border/30"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Gerar Laudo
        </button>
      </div>
    </div>
  );
}
