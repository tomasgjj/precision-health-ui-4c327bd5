import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Sparkles, Keyboard } from "lucide-react";
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
      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-secondary/60 w-fit">
        <button
          onClick={() => setMode("voice")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all",
            mode === "voice" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic className="w-3.5 h-3.5" />
          Voz
        </button>
        <button
          onClick={() => setMode("text")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all",
            mode === "text" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Keyboard className="w-3.5 h-3.5" />
          Texto
        </button>
      </div>

      {/* Voice mode */}
      {mode === "voice" && (
        <div className="flex flex-col items-center gap-5 py-6">
          {/* Waveform / Mic area */}
          <div className="relative">
            {state === "recording" && (
              <div className="absolute inset-0 -m-4 rounded-full bg-primary/10 animate-ping" />
            )}
            <button
              onClick={handleMicClick}
              className={cn(
                "relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200",
                state === "idle" &&
                  "bg-secondary border border-border text-foreground hover:bg-secondary/80 hover:border-primary/30",
                state === "recording" &&
                  "bg-destructive/10 border-2 border-destructive text-destructive",
                state === "transcribing" &&
                  "bg-secondary border border-border text-muted-foreground cursor-not-allowed"
              )}
              disabled={state === "transcribing"}
            >
              {state === "idle" && <Mic className="w-7 h-7" />}
              {state === "recording" && <Square className="w-6 h-6 fill-current" />}
              {state === "transcribing" && <Loader2 className="w-6 h-6 animate-spin" />}
            </button>
          </div>

          {/* Status */}
          <div className="text-center space-y-1">
            {state === "recording" && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-sm font-mono text-foreground">{formatTime(seconds)}</span>
              </div>
            )}
            <p className="text-[12px] text-muted-foreground">
              {state === "idle" && "Clique para iniciar a gravação"}
              {state === "recording" && "Gravando — clique para parar"}
              {state === "transcribing" && "Processando transcrição..."}
            </p>
          </div>

          {/* Waveform bars (decorative) */}
          {state === "recording" && (
            <div className="flex items-end gap-[3px] h-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-primary/60 rounded-full"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animation: `wave 0.5s ${i * 0.05}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transcription area */}
      <div className="space-y-3">
        <Textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder={mode === "text" ? "Digite ou cole a descrição do exame aqui..." : "A transcrição aparecerá aqui após a gravação..."}
          className="min-h-[140px] bg-secondary/30 border-border text-foreground text-[13px] leading-relaxed placeholder:text-muted-foreground/60 resize-none focus:bg-secondary/50 transition-colors rounded-lg"
          rows={6}
        />

        {/* Generate button */}
        <button
          onClick={() => canGenerate && onGenerate(transcription)}
          disabled={!canGenerate}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-150",
            canGenerate
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Gerar Laudo
        </button>
      </div>
    </div>
  );
}
