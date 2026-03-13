import { useState } from "react";
import { Copy, Download, RotateCcw, Save, Plus, Check, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ReportViewProps {
  transcription: string;
  onNewReport: () => void;
}

const mockReport = {
  achados: `Fígado de dimensões normais, contornos regulares, ecotextura homogênea, sem lesões focais.

Vesícula biliar normodistendida, paredes finas e regulares, sem cálculos no seu interior.

Vias biliares intra e extra-hepáticas de calibre normal.

Pâncreas de dimensões e ecotextura normais, sem dilatação do ducto de Wirsung.

Baço homogêneo, de dimensões normais.

Rins tópicos, de dimensões e contornos preservados, com espessura cortical normal, relação córtico-medular mantida, sem sinais de dilatação pielocalicinal ou litíase.

Aorta abdominal de calibre normal. Ausência de líquido livre na cavidade abdominal.`,
  impressao: `Exame ultrassonográfico do abdome total dentro dos limites da normalidade.`,
};

export default function ReportView({ transcription, onNewReport }: ReportViewProps) {
  const [patientName, setPatientName] = useState("");
  const [achados, setAchados] = useState(mockReport.achados);
  const [impressao, setImpressao] = useState(mockReport.impressao);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const full = `ACHADOS:\n${achados}\n\nIMPRESSÃO:\n${impressao}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    toast.success("Laudo copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground">Laudo Gerado</p>
            <p className="text-[11px] text-muted-foreground">USG Abdome • Agora</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ActionBtn icon={RotateCcw} tooltip="Regenerar" onClick={() => toast.info("Em breve!")} />
          <ActionBtn icon={Save} tooltip="Salvar" onClick={() => toast.success("Laudo salvo!")} />
          <ActionBtn icon={copied ? Check : Copy} tooltip="Copiar" onClick={handleCopy} active={copied} />
          <ActionBtn icon={Download} tooltip="PDF" onClick={() => toast.info("PDF em breve!")} />
        </div>
      </div>

      {/* Patient name */}
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Nome do paciente (opcional)"
        className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/30 transition"
      />

      {/* Achados */}
      <section className="rounded-lg border border-border overflow-hidden">
        <div className="px-3 py-2 bg-secondary/40 border-b border-border">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Achados
          </span>
        </div>
        <Textarea
          value={achados}
          onChange={(e) => setAchados(e.target.value)}
          className="min-h-[180px] bg-transparent border-0 text-foreground resize-none text-[13px] leading-relaxed rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </section>

      {/* Impressão */}
      <section className="rounded-lg border border-border overflow-hidden">
        <div className="px-3 py-2 bg-secondary/40 border-b border-border">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Impressão
          </span>
        </div>
        <Textarea
          value={impressao}
          onChange={(e) => setImpressao(e.target.value)}
          className="min-h-[60px] bg-transparent border-0 text-foreground resize-none text-[13px] leading-relaxed rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </section>

      {/* New report */}
      <button
        onClick={onNewReport}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors border border-dashed border-border hover:border-primary/30"
      >
        <Plus className="w-4 h-4" />
        Novo laudo
      </button>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  tooltip,
  onClick,
  active = false,
}: {
  icon: React.ElementType;
  tooltip: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
