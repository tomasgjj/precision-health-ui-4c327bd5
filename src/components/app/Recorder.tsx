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

const btnSpring = { type: "spring" as const, stiffness: 400, damping: 17 };

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
    <div className="space-y-5 animate-fade-in">
      {/* Mode toggle */}
      <div className="flex items-center gap-0.5 p-1 rounded-xl bg-secondary/50 border border-border/50 w-fit">
        <button
          onClick={() => { playTap(); setMode("voice"); }}
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
          onClick={() => { playTap(); setMode("text"); }}
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
        <div className="flex flex-col items-center gap-5 py-6">
          {/* Mic / Stop button */}
          <div className="relative">
            {state === "recording" && (
              <>
                <div className="absolute inset-0 -m-6 rounded-3xl bg-destructive/5 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 -m-3 rounded-2xl border border-destructive/20" style={{ animation: 'pulse-ring 1.5s ease-in-out infinite' }} />
              </>
            )}
            {state === "idle" && (
              <div className="absolute inset-0 -m-2 rounded-2xl border border-primary/10 transition-all duration-300" />
            )}

            <motion.button
              onClick={handleMicClick}
              whileHover={state === "idle" ? { scale: 1.08 } : {}}
              whileTap={state !== "transcribing" ? { scale: 0.92 } : {}}
              transition={btnSpring}
              className={cn(
                "relative w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300",
                state === "idle" &&
                  "bg-secondary/80 border border-border text-foreground hover:border-primary/30",
                isRecordingOrPaused &&
                  "bg-secondary/80 border-2 border-destructive/50 text-foreground",
                state === "transcribing" &&
                  "bg-secondary/80 border border-border text-muted-foreground cursor-wait"
              )}
              disabled={state === "transcribing" || isRecordingOrPaused}
            >
              {state === "idle" && <Mic className="w-7 h-7" />}
              {isRecordingOrPaused && <Square className="w-6 h-6 fill-current text-muted-foreground" />}
              {state === "transcribing" && <Loader2 className="w-6 h-6 animate-spin" />}
            </motion.button>
          </div>

          {/* Timer */}
          {isRecordingOrPaused && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-destructive tabular-nums font-mono"
            >
              {formatTime(seconds)}
            </motion.div>
          )}

          {/* Recording controls */}
          <AnimatePresence>
            {isRecordingOrPaused && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={btnSpring}
                className="flex items-center gap-3"
              >
                <motion.button
                  onClick={handleDiscard}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  transition={btnSpring}
                  className="w-14 h-14 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={handlePauseResume}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  transition={btnSpring}
                  className="w-14 h-14 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-200"
                >
                  {state === "paused" ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  transition={btnSpring}
                  className="h-14 px-6 rounded-xl gradient-cyan flex items-center justify-center gap-2 text-primary-foreground font-semibold text-sm glow-primary-sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status text */}
          {!isRecordingOrPaused && (
            <p className="text-[12px] text-muted-foreground">
              {state === "idle" && "Toque para iniciar a gravação"}
              {state === "transcribing" && "Processando transcrição..."}
            </p>
          )}

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

        <Textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder={mode === "text" ? "Digite ou cole a descrição do exame aqui..." : "A transcrição aparecerá aqui após a gravação..."}
          className="min-h-[140px] bg-background/50 border-border/50 text-foreground text-[13px] leading-relaxed placeholder:text-muted-foreground/40 resize-none focus:bg-background/80 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.06)] transition-all duration-200 rounded-xl"
          rows={6}
        />

        {/* Generate button */}
        <motion.button
          onClick={handleGenerate}
          disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.02, y: -2 } : {}}
          whileTap={canGenerate ? { scale: 0.96 } : {}}
          transition={btnSpring}
          className={cn(
            "w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-bold transition-colors duration-200",
            canGenerate
              ? "gradient-cyan text-primary-foreground glow-primary-sm"
              : "bg-secondary/60 text-muted-foreground/50 cursor-not-allowed border border-border/30"
          )}
        >
          <motion.span
            className="flex items-center gap-2.5"
            animate={canGenerate ? { } : {}}
          >
            <Sparkles className="w-4 h-4" />
            Gerar Laudo
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
