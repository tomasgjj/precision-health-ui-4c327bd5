import { useState } from "react";
import { Copy, FileDown, Save, Plus, Check, Mic, Loader2, PenLine, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { playSuccess, playCopy, playTap } from "@/lib/sounds";

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

const spring = { type: "spring" as const, stiffness: 500, damping: 25 };

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
    setTimeout(() => {
      setSaving(false);
      playSuccess();
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
      <div className="rounded-lg bg-card border border-border p-3">
        <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">
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
      <div className="rounded-lg overflow-hidden border border-border bg-card">
        {/* Exam header */}
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[13px] font-semibold text-foreground">{mockReport.exam}</span>
          <span className="ml-auto text-[10px] text-muted-foreground">Agora</span>
        </div>

        {/* Sections */}
        {Object.entries(sections).map(([key, sec]) => (
          <div
            key={key}
            className="px-4 py-2.5 border-b border-border text-sm leading-relaxed flex justify-between items-start group hover:bg-secondary/30 transition-colors"
          >
            {editSec === key ? (
              <div className="flex-1">
                <Textarea
                  defaultValue={sec.text}
                  rows={3}
                  className="text-[13px] bg-background border-border rounded-lg focus:border-primary/30"
                  onBlur={(e) => handleSectionEdit(key, e.target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.1em] block mb-0.5">
                    {sec.label}
                  </span>
                  <span className="text-[13px] text-secondary-foreground">{sec.text}</span>
                </div>
                <button
                  onClick={() => setEditSec(key)}
                  className="bg-transparent border-none cursor-pointer text-muted-foreground/30 p-1 ml-2 shrink-0 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                  <PenLine size={12} />
                </button>
              </>
            )}
          </div>
        ))}

        {/* Impressão */}
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-primary font-medium mb-1 uppercase tracking-[0.1em] flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Impressão
          </div>
          {editImp ? (
            <Textarea
              defaultValue={impressao}
              rows={3}
              className="text-[13px] bg-background border-border rounded-lg"
              onBlur={(e) => { setImpressao(e.target.value); setEditImp(false); }}
              autoFocus
            />
          ) : (
            <div className="flex justify-between items-start group">
              <div className="text-[13px] text-secondary-foreground flex-1">{impressao}</div>
              <button
                onClick={() => setEditImp(true)}
                className="bg-transparent border-none cursor-pointer text-muted-foreground/30 p-1 ml-2 shrink-0 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <PenLine size={12} />
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
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg text-[13px] font-semibold bg-primary text-primary-foreground border-none cursor-pointer disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {saving ? <><Loader2 size={15} className="animate-spin" /> Salvando...</> : <><Save size={15} /> Salvar e Copiar</>}
        </motion.button>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg text-[13px] font-medium bg-transparent border border-border text-muted-foreground cursor-pointer hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {copied ? <><Check size={15} className="text-success" /> Copiado</> : <><Copy size={15} /> Copiar</>}
        </motion.button>
        <motion.button
          disabled={pdfing}
          onClick={() => { playTap(); setPdfing(true); setTimeout(() => { setPdfing(false); toast.info("PDF em breve!"); }, 1000); }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg text-[13px] font-medium bg-transparent border border-border text-muted-foreground cursor-pointer disabled:opacity-60 hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {pdfing ? <><Loader2 size={15} className="animate-spin" /> Gerando...</> : <><FileDown size={15} /> PDF</>}
        </motion.button>
      </div>

      {/* Secondary actions */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => { playTap(); setShowCorrection(!showCorrection); }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg text-[13px] font-semibold bg-success/10 text-success border border-success/20 cursor-pointer hover:bg-success/15 transition-colors"
        >
          <Mic size={15} /> Corrigir por Voz
        </motion.button>
        <motion.button
          onClick={() => { playTap(); onNewReport(); }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg text-[13px] font-medium bg-transparent border border-dashed border-border text-muted-foreground cursor-pointer hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <Plus size={15} /> Novo Laudo
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="bg-card border border-success/20 rounded-lg p-3.5"
    >
      <div className="flex justify-between items-center mb-2.5">
        <div className="text-[13px] font-semibold text-success flex items-center gap-2">
          <Mic size={14} />
          Correção por Voz
        </div>
        <button
          onClick={onClose}
          className="px-2 py-1 rounded text-[11px] border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="flex gap-2 mb-2.5">
        <button
          onClick={() => { playTap(); setRecording(!recording); }}
          className={cn(
            "flex-1 py-2 rounded-lg text-[13px] font-medium border cursor-pointer transition-colors",
            recording
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : "bg-success/10 text-success border-success/20"
          )}
        >
          {recording ? "⏹ Parar" : "🎙️ Gravar correção"}
        </button>
      </div>
      <Textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={2}
        placeholder="Ou digite a correção..."
        className="text-[13px] bg-background border-border mb-2 rounded-lg"
      />
      <button
        onClick={handleApply}
        disabled={!textInput.trim() || processing}
        className="w-full py-2 rounded-lg text-[13px] font-semibold bg-success text-success-foreground border-none cursor-pointer disabled:opacity-50 hover:bg-success/90 transition-colors"
      >
        {processing ? "Aplicando..." : "Aplicar Correção"}
      </button>
    </motion.div>
  );
}

function RatingPanel() {
  const [comment, setComment] = useState("");
  const [rated, setRated] = useState(false);

  if (rated) return null;

  const handleRate = (type: string) => {
    playSuccess();
    toast.success(type === "good" ? "Obrigado pelo feedback!" : "Feedback registrado, vamos melhorar!");
    setRated(true);
  };

  return (
    <div className="rounded-lg bg-card border border-border p-3.5 text-center animate-fade-in">
      <div className="text-[13px] font-medium text-foreground mb-0.5">Como ficou o laudo?</div>
      <p className="text-[11px] text-muted-foreground mb-3">Seu feedback nos ajuda a melhorar</p>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentário (opcional)"
        rows={2}
        className="text-[13px] bg-background border-border mb-2.5 rounded-lg"
      />
      <div className="flex gap-2 justify-center">
        <motion.button
          onClick={() => handleRate("good")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-success/10 border border-success/20 text-success text-[13px] font-medium cursor-pointer hover:bg-success/15 transition-colors"
        >
          👍 Bom
        </motion.button>
        <motion.button
          onClick={() => handleRate("bad")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-[13px] font-medium cursor-pointer hover:bg-destructive/15 transition-colors"
        >
          👎 Melhorar
        </motion.button>
      </div>
    </div>
  );
}
