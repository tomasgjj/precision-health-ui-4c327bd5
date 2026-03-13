import { useState } from "react";
import { Copy, FileDown, Save, Plus, Check, Mic, Loader2, PenLine } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    <div className="animate-fade-in space-y-3.5">
      {/* Patient ID */}
      <div className="surface-glass rounded-xl p-3 sm:p-4">
        <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2 block">
          Paciente (opcional)
        </label>
        <input
          type="text"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Nome ou ID do paciente"
          maxLength={200}
          className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
        />
      </div>

      {/* Report body */}
      <div className="surface-glass rounded-2xl overflow-hidden">
        {/* Exam header */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3.5 bg-primary/5 border-b border-border text-sm font-bold text-primary">
          {mockReport.exam}
        </div>

        {/* Each section row */}
        {Object.entries(sections).map(([key, sec]) => (
          <div key={key} className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border text-sm leading-relaxed flex justify-between items-start">
            {editSec === key ? (
              <div className="flex-1">
                <Textarea
                  defaultValue={sec.text}
                  rows={4}
                  className="text-sm bg-secondary/30 border-border"
                  onBlur={(e) => handleSectionEdit(key, e.target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <>
                <div className="flex-1 whitespace-pre-wrap text-secondary-foreground">
                  <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">
                    {sec.label}
                  </span>
                  {sec.text}
                </div>
                <button
                  onClick={() => setEditSec(key)}
                  className="bg-transparent border-none cursor-pointer text-muted-foreground p-0.5 ml-1.5 shrink-0 hover:text-primary transition-colors"
                >
                  <PenLine size={14} />
                </button>
              </>
            )}
          </div>
        ))}

        {/* Impressão section */}
        <div className="px-3 sm:px-3.5 py-2.5 bg-accent/[0.04]">
          <div className="text-[11px] text-accent font-bold mb-1 uppercase tracking-wider">Impressão</div>
          {editImp ? (
            <Textarea
              defaultValue={impressao}
              rows={4}
              className="text-sm bg-secondary/30 border-border"
              onBlur={(e) => { setImpressao(e.target.value); setEditImp(false); }}
              autoFocus
            />
          ) : (
            <div className="flex justify-between items-start">
              <div className="text-sm whitespace-pre-wrap text-secondary-foreground flex-1">{impressao}</div>
              <button
                onClick={() => setEditImp(true)}
                className="bg-transparent border-none cursor-pointer text-muted-foreground p-0.5 ml-1.5 shrink-0 hover:text-primary transition-colors"
              >
                <PenLine size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold gradient-brand text-primary-foreground border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-lg active:scale-[0.96] disabled:opacity-60"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Salvando...</>
          ) : (
            <><Save size={16} /> Salvar e Copiar</>
          )}
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-border text-muted-foreground cursor-pointer transition-all hover:-translate-y-px hover:shadow-md hover:text-foreground"
        >
          {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
        </button>
        <button
          disabled={pdfing}
          onClick={() => { setPdfing(true); setTimeout(() => { setPdfing(false); toast.info("PDF em breve!"); }, 1000); }}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-border text-muted-foreground cursor-pointer transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-60 hover:text-foreground"
        >
          {pdfing ? <><Loader2 size={16} className="animate-spin" /> Gerando...</> : <><FileDown size={16} /> PDF</>}
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowCorrection(!showCorrection)}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold gradient-green text-primary-foreground border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-lg active:scale-[0.96]"
        >
          <Mic size={16} /> Corrigir por Voz
        </button>
        <button
          onClick={onNewReport}
          className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold bg-transparent border border-border text-muted-foreground cursor-pointer transition-all hover:-translate-y-px hover:shadow-md hover:text-foreground"
        >
          <Plus size={16} /> Novo Laudo
        </button>
      </div>

      {/* Correction panel */}
      {showCorrection && <CorrectionPanel onClose={() => setShowCorrection(false)} />}

      {/* Rating panel */}
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
      toast.success("Correção aplicada!");
      onClose();
    }, 1500);
  };

  return (
    <div className="bg-success/[0.06] border border-success/25 rounded-xl p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-bold text-success">🎙️ Correção por Voz</div>
        <button
          onClick={onClose}
          className="px-2 py-1 rounded-md text-xs border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setRecording(!recording)}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-colors",
            recording
              ? "bg-destructive/15 text-destructive"
              : "bg-success/15 text-success"
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
        className="text-sm bg-secondary/30 border-border mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          disabled={!textInput.trim() || processing}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold gradient-green text-primary-foreground border-none cursor-pointer disabled:opacity-50 transition-all"
        >
          {processing ? "⏳ Aplicando..." : "✓ Aplicar Correção"}
        </button>
      </div>
    </div>
  );
}

function RatingPanel() {
  const [comment, setComment] = useState("");
  const [rated, setRated] = useState(false);

  if (rated) return null;

  const handleRate = (type: string) => {
    toast.success(type === "good" ? "Obrigado pelo feedback!" : "Feedback registrado, vamos melhorar!");
    setRated(true);
  };

  return (
    <div className="surface-glass rounded-xl p-4 text-center animate-fade-in">
      <div className="text-sm font-semibold text-secondary-foreground mb-2">Como ficou o laudo?</div>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentário (opcional)"
        rows={2}
        className="text-sm bg-secondary/30 border-border mb-2"
      />
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => handleRate("good")}
          className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-success/15 border border-success/30 text-success text-sm font-semibold cursor-pointer hover:bg-success/25 transition-colors"
        >
          👍 Bom
        </button>
        <button
          onClick={() => handleRate("bad")}
          className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm font-semibold cursor-pointer hover:bg-destructive/25 transition-colors"
        >
          👎 Melhorar
        </button>
      </div>
    </div>
  );
}
