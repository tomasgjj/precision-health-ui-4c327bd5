import { useState } from "react";
import { Copy, Download, RotateCcw, Save, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const handleCopy = () => {
    const full = `ACHADOS:\n${achados}\n\nIMPRESSÃO:\n${impressao}`;
    navigator.clipboard.writeText(full);
    toast.success("Laudo copiado!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 animate-fade-in">
      {/* Patient name */}
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Nome do paciente (opcional)"
        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
      />

      {/* Achados */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Achados
        </label>
        <Textarea
          value={achados}
          onChange={(e) => setAchados(e.target.value)}
          className="min-h-[200px] bg-muted/30 border-border text-foreground resize-none text-sm leading-relaxed"
        />
      </div>

      {/* Impressão */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Impressão
        </label>
        <Textarea
          value={impressao}
          onChange={(e) => setImpressao(e.target.value)}
          className="min-h-[80px] bg-muted/30 border-border text-foreground resize-none text-sm leading-relaxed"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <ActionBtn icon={RotateCcw} label="Corrigir" onClick={() => toast.info("Em breve!")} />
        <ActionBtn icon={Save} label="Salvar" onClick={() => toast.success("Laudo salvo!")} />
        <ActionBtn icon={Copy} label="Copiar" onClick={handleCopy} />
        <ActionBtn icon={Download} label="PDF" onClick={() => toast.info("PDF em breve!")} />
        <ActionBtn icon={Plus} label="Novo" onClick={onNewReport} variant="primary" />
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary";
}) {
  return (
    <button
      onClick={onClick}
      className={
        variant === "primary"
          ? "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium gradient-brand text-primary-foreground hover:opacity-90 transition"
          : "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium surface-glass text-foreground hover:bg-muted/50 transition"
      }
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
