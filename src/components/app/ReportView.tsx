import { useState } from "react";
import { Copy, FileDown, Save, Plus, Check, Mic, Loader2, PenLine, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { playSuccess, playCopy, playGenerate, playTap, playDiscard } from "@/lib/sounds";

interface ReportViewProps {
  transcription: string;
  onNewReport: () => void;
}

const mockReport = {
  exam: "USG Abdome",
  sections: {
    figado: { label: "Fígado", text: "Dimensões normais, contornos regulares, ecotextura homogênea, sem lesões focais." },
    vesicula: { label: "Vesícula Biliar", text: "Normodistendida, paredes finas e regulares, sem cálculos no seu interior." },
    vias: { label: "Vias Biliares", text: "Intra e extra-hepáticas de calibre normal." },
    pancreas: { label: "Pâncreas", text: "Dimensões e ecotextura normais, sem dilatação do ducto de Wirsung." },
    baco: { label: "Baço", text: "Homogêneo, de dimensões normais." },
    rins: { label: "Rins", text: "Tópicos, de dimensões e contornos preservados, com espessura cortical normal, relação córtico-medular mantida, sem sinais de dilatação pielocalicinal ou litíase." },
    aorta: { label: "Aorta", text: "Abdominal de calibre normal. Ausência de líquido livre na cavidade abdominal." },
  },
  impressao: "Exame ultrassonográfico do abdome total dentro dos limites da normalidade.",
};

const btnSpring = { type: "spring" as const, stiffness: 400, damping: 17 };

export default function ReportView({ transcription, onNewReport }: ReportViewProps) {
  const [patient, setPatient] = useState("");
  const [sections, setSections] = useState(mockReport.sections);
  const [impressao, setImpressao] = useState(mockReport.impressao);
  const [editSec, setEditSec] = useState<string | null>(null);
  const [editImp, setEditImp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pdfing, setPdfing] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  const handleCopy = () => {
    playCopy();
    const full = Object.values(sections).map(s => `${s.label}:\n${s.text}`).join("\n\n") + `\n\nIMPRESSÃO:\n${impressao}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    toast.success("Laudo copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaving(true);
    // Haptic feedback on mobile
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => {
      setSaving(false);
      playSuccess();
      if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
      handleCopy();
      toast.success("Laudo salvo e copiado!");
    }, 800);
  };

  const handleSectionEdit = (key: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof typeof prev], text: value },
    }));
    setEditSec(null);
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* Patient */}
      <div className="surface-glass rounded-xl p-3.5">
        <label className="text-[11px] text-muted-foreground uppercase tracking-[0.12em] font-semibold mb-2 block">
          Paciente (opcional)
        </label>
        <input
          type="text"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Nome ou ID do paciente"
          maxLength={200}
          className="input-glass"
        />
      </div>

      {/* Report body */}
      <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="px-4 py-3 bg-primary/[0.06] border-b border-border/50 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-primary">{mockReport.exam}</span>
          <span className="ml-auto text-[10px] text-muted-foreground font-medium">Agora</span>
        </div>

        {Object.entries(sections).map(([key, sec], idx) => (
          <div
            key={key}
            className={cn(
              "px-4 py-3 border-b border-border/30 text-sm leading-relaxed flex justify-between items-start group transition-colors hover:bg-secondary/20",
              idx % 2 === 0 && "bg-card/30"
            )}
          >
            {editSec === key ? (
              <div className="flex-1">
                <Textarea
                  defaultValue={sec.text}
                  rows={4}
                  className="text-sm bg-background/50 border-border/50 rounded-xl focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.06)]"
                  onBlur={(e) => handleSectionEdit(key, e.target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <>
                <div className="flex-1 whitespace-pre-wrap text-secondary-foreground">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.15em] block mb-1">
                    {sec.label}
                  </span>
                  <span className="text-[13px]">{sec.text}</span>
                </div>
                <button
                  onClick={() => setEditSec(key)}
                  className="bg-transparent border-none cursor-pointer text-muted-foreground/40 p-1 ml-2 shrink-0 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                  <PenLine size={13} />
                </button>
              </>
            )}
          </div>
        ))}

        <div className="px-4 py-3 bg-accent/[0.03]">
          <div className="text-[10px] text-accent font-bold mb-1.5 uppercase tracking-[0.15em] flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Impressão
          </div>
          {editImp ? (
            <Textarea
              defaultValue={impressao}
              rows={4}
              className="text-sm bg-background/50 border-border/50 rounded-xl"
              onBlur={(e) => { setImpressao(e.target.value); setEditImp(false); }}
              autoFocus
            />
          ) : (
            <div className="flex justify-between items-start group">
              <div className="text-[13px] whitespace-pre-wrap text-secondary-foreground flex-1">{impressao}</div>
              <button
                onClick={() => setEditImp(true)}
                className="bg-transparent border-none cursor-pointer text-muted-foreground/40 p-1 ml-2 shrink-0 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <PenLine size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={btnSpring}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-bold gradient-brand text-primary-foreground border-none cursor-pointer disabled:opacity-60 glow-primary-sm"
        >
          {saving ? <><Loader2 size={16} className="animate-spin" /> Salvando...</> : <><Save size={16} /> Salvar e Copiar</>}
        </motion.button>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.93 }}
          transition={btnSpring}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-border/50 text-muted-foreground cursor-pointer hover:text-foreground hover:border-border"
        >
          {copied ? <><Check size={16} className="text-success" /> Copiado</> : <><Copy size={16} /> Copiar</>}
        </motion.button>
        <motion.button
          disabled={pdfing}
          onClick={() => { playTap(); setPdfing(true); setTimeout(() => { setPdfing(false); toast.info("PDF em breve!"); }, 1000); }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.93 }}
          transition={btnSpring}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-border/50 text-muted-foreground cursor-pointer disabled:opacity-60 hover:text-foreground hover:border-border"
        >
          {pdfing ? <><Loader2 size={16} className="animate-spin" /> Gerando...</> : <><FileDown size={16} /> PDF</>}
        </motion.button>
      </div>

      {/* Secondary actions */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => { playTap(); setShowCorrection(!showCorrection); }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={btnSpring}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-bold gradient-green text-primary-foreground border-none cursor-pointer"
        >
          <Mic size={16} /> Corrigir por Voz
        </motion.button>
        <motion.button
          onClick={() => { playTap(); onNewReport(); }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.93 }}
          transition={btnSpring}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-dashed border-border/50 text-muted-foreground cursor-pointer hover:text-foreground hover:border-primary/30"
        >
          <Plus size={16} /> Novo Laudo
        </motion.button>
      </div>

      {/* Correction panel */}
      {showCorrection && <CorrectionPanel onClose={() => setShowCorrection(false)} />}

      {/* Rating */}
      <RatingPanel />
    </div>
  );
}

function CorrectionPanel({ onClose }: { onClose: () => void }) {
  const [textInput, setTextInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleApply = () => {
    if (!textInput.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      playSuccess();
      toast.success("Correção aplicada!");
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={btnSpring}
      className="bg-success/[0.04] border border-success/20 rounded-xl p-4"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-bold text-success flex items-center gap-2">
          <Mic size={15} />
          Correção por Voz
        </div>
        <button
          onClick={onClose}
          className="px-2 py-1 rounded-lg text-xs border border-border/50 bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="flex gap-2 mb-3">
        <motion.button
          onClick={() => { playTap(); setRecording(!recording); }}
          whileTap={{ scale: 0.95 }}
          transition={btnSpring}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-colors duration-200",
            recording
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-success/10 text-success border border-success/20"
          )}
        >
          {recording ? "⏹ Parar" : "🎙️ Gravar correção"}
        </motion.button>
      </div>
      <Textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={2}
        placeholder="Ou digite a correção..."
        className="text-sm bg-background/50 border-border/50 mb-2 rounded-xl"
      />
      <motion.button
        onClick={handleApply}
        disabled={!textInput.trim() || processing}
        whileHover={textInput.trim() ? { scale: 1.02 } : {}}
        whileTap={textInput.trim() ? { scale: 0.96 } : {}}
        transition={btnSpring}
        className="w-full py-2.5 rounded-xl text-sm font-bold gradient-green text-primary-foreground border-none cursor-pointer disabled:opacity-50"
      >
        {processing ? "⏳ Aplicando..." : "✓ Aplicar Correção"}
      </motion.button>
    </motion.div>
  );
}

function RatingPanel() {
  const [comment, setComment] = useState("");
  const [rated, setRated] = useState(false);

  if (rated) return null;

  const handleRate = (type: string) => {
    playSuccess();
    toast.success(type === "good" ? "Obrigado pelo feedback! 🙏" : "Feedback registrado, vamos melhorar!");
    setRated(true);
  };

  return (
    <div className="surface-glass rounded-xl p-4 text-center animate-fade-in">
      <div className="text-sm font-semibold text-foreground mb-1">Como ficou o laudo?</div>
      <p className="text-[11px] text-muted-foreground mb-3">Seu feedback nos ajuda a melhorar</p>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentário (opcional)"
        rows={2}
        className="text-sm bg-background/50 border-border/50 mb-3 rounded-xl"
      />
      <div className="flex gap-2 justify-center">
        <motion.button
          onClick={() => handleRate("good")}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={btnSpring}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-success/10 border border-success/25 text-success text-sm font-semibold cursor-pointer"
        >
          👍 Bom
        </motion.button>
        <motion.button
          onClick={() => handleRate("bad")}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={btnSpring}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-sm font-semibold cursor-pointer"
        >
          👎 Melhorar
        </motion.button>
      </div>
    </div>
  );
}
