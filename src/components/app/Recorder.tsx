import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Sparkles } from "lucide-react";
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
      // Simulate transcription
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
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      {/* Mic Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleMicClick}
          className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200",
            state === "idle" &&
              "gradient-brand text-primary-foreground shadow-[0_4px_24px_-4px_hsl(168_84%_40%/0.4)] hover:shadow-[0_4px_32px_-4px_hsl(168_84%_40%/0.5)] hover:scale-105",
            state === "recording" &&
              "bg-destructive text-destructive-foreground animate-pulse-brand",
            state === "transcribing" &&
              "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          disabled={state === "transcribing"}
        >
          {state === "idle" && <Mic className="w-8 h-8" />}
          {state === "recording" && <Square className="w-7 h-7" />}
          {state === "transcribing" && <Loader2 className="w-7 h-7 animate-spin" />}
        </button>

        {/* Timer / Status */}
        <span className="text-sm font-medium text-muted-foreground">
          {state === "idle" && "Toque para gravar"}
          {state === "recording" && formatTime(seconds)}
          {state === "transcribing" && "Transcrevendo..."}
        </span>
      </div>

      {/* Transcription */}
      <div className="w-full max-w-2xl space-y-3">
        <Textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="A transcrição aparecerá aqui, ou cole/edite o texto do laudo..."
          className="min-h-[160px] bg-muted/30 border-border text-foreground placeholder:text-muted-foreground resize-none"
          rows={6}
        />

        <button
          onClick={() => canGenerate && onGenerate(transcription)}
          disabled={!canGenerate}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-150",
            canGenerate
              ? "gradient-brand text-primary-foreground hover:opacity-90 shadow-lg"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Gerar Laudo
        </button>
      </div>
    </div>
  );
}
