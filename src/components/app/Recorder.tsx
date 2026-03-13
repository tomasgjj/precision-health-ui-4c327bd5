import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Sparkles, Keyboard, Send, Trash2, Pause, Play } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { playRecordStart, playRecordStop, playGenerate, playDiscard, playTap } from "@/lib/sounds";

interface RecorderProps {
  onGenerate: (text: string) => void;
}

type RecordState = "idle" | "recording" | "paused" | "transcribing";

const spring = { type: "spring" as const, stiffness: 500, damping: 25 };

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
      playRecordStart();
      setState("recording");
      setSeconds(0);
      setTranscription("");
    } else if (state === "recording") {
      playRecordStop();
      setState("transcribing");
      setTimeout(() => {
        setTranscription(
          "Fígado de dimensões normais, contornos regulares, ecotextura homogênea. Vesícula biliar normodistendida, paredes finas, sem cálculos. Vias biliares de calibre normal. Pâncreas de dimensões e ecotextura normais. Baço homogêneo, de dimensões normais. Rins tópicos, de dimensões e contornos preservados, sem sinais de dilatação pielocalicinal ou litíase."
        );
        setState("idle");
      }, 2000);
    }
  };

  const handleDiscard = () => {
    playDiscard();
    setState("idle");
    setSeconds(0);
    setTranscription("");
    toast("Gravação descartada");
  };

  const handlePauseResume = () => {
    playTap();
    if (state === "recording") setState("paused");
    else if (state === "paused") setState("recording");
  };

  const handleSend = () => {
    playTap();
    setState("transcribing");
    setTimeout(() => {
      setTranscription(
        "Fígado de dimensões normais, contornos regulares, ecotextura homogênea. Vesícula biliar normodistendida, paredes finas, sem cálculos. Vias biliares de calibre normal. Pâncreas de dimensões e ecotextura normais. Baço homogêneo, de dimensões normais. Rins tópicos, de dimensões e contornos preservados, sem sinais de dilatação pielocalicinal ou litíase."
      );
      setState("idle");
    }, 2000);
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    playGenerate();
    onGenerate(transcription);
  };

  const isRecordingOrPaused = state === "recording" || state === "paused";
  const canGenerate = transcription.trim().length > 0;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Mode toggle */}
      <div className="flex items-center gap-px p-0.5 rounded-lg bg-secondary border border-border w-fit">
        <button
          onClick={() => { playTap(); setMode("voice"); }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors duration-150",
            mode === "voice"
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic className="w-3.5 h-3.5" />
          Voz
        </button>
        <button
          onClick={() => { playTap(); setMode("text"); }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors duration-150",
            mode === "text"
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Keyboard className="w-3.5 h-3.5" />
          Texto
        </button>
      </div>

      {/* Voice mode */}
      {mode === "voice" && (
        <div className="flex flex-col items-center gap-4 py-8">
          {/* Mic button */}
          <div className="relative">
            {state === "recording" && (
              <div className="absolute inset-0 -m-4 rounded-full border border-destructive/20 animate-ping" style={{ animationDuration: '2s' }} />
            )}

            <motion.button
              onClick={handleMicClick}
              whileHover={state === "idle" ? { scale: 1.06 } : {}}
              whileTap={state !== "transcribing" ? { scale: 0.93 } : {}}
              transition={spring}
              className={cn(
                "relative w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200",
                state === "idle" &&
                  "bg-secondary border border-border text-foreground hover:border-primary/40",
                isRecordingOrPaused &&
                  "bg-destructive/10 border-2 border-destructive/40 text-destructive",
                state === "transcribing" &&
                  "bg-secondary border border-border text-muted-foreground cursor-wait"
              )}
              disabled={state === "transcribing" || isRecordingOrPaused}
            >
              {state === "idle" && <Mic className="w-6 h-6" />}
              {isRecordingOrPaused && <Square className="w-5 h-5 fill-current" />}
              {state === "transcribing" && <Loader2 className="w-5 h-5 animate-spin" />}
            </motion.button>
          </div>

          {/* Timer */}
          <AnimatePresence>
            {isRecordingOrPaused && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-lg font-semibold text-destructive tabular-nums font-mono"
              >
                {formatTime(seconds)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recording controls */}
          <AnimatePresence>
            {isRecordingOrPaused && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={spring}
                className="flex items-center gap-2"
              >
                <motion.button
                  onClick={handleDiscard}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                  className="w-11 h-11 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={handlePauseResume}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                  className="w-11 h-11 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {state === "paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </motion.button>

                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                  className="h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium text-[13px] flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status */}
          {!isRecordingOrPaused && (
            <p className="text-[12px] text-muted-foreground">
              {state === "idle" && "Toque para iniciar a gravação"}
              {state === "transcribing" && "Processando transcrição..."}
            </p>
          )}

          {/* Waveform */}
          {state === "recording" && (
            <div className="flex items-end gap-[2px] h-6">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-primary/40 rounded-full"
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
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
            2
          </div>
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.08em]">
            Transcrição
          </label>
        </div>

        <Textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder={mode === "text" ? "Digite ou cole a descrição do exame aqui..." : "A transcrição aparecerá aqui após a gravação..."}
          className="min-h-[120px] bg-card border-border text-foreground text-[13px] leading-relaxed placeholder:text-muted-foreground resize-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 rounded-lg"
          rows={5}
        />

        {/* Generate button */}
        <motion.button
          onClick={handleGenerate}
          disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.01, y: -1 } : {}}
          whileTap={canGenerate ? { scale: 0.98 } : {}}
          transition={spring}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-colors duration-150",
            canGenerate
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-muted-foreground cursor-not-allowed border border-border"
          )}
        >
          <Sparkles className="w-4 h-4" />
          Gerar Laudo
        </motion.button>
      </div>
    </div>
  );
}
