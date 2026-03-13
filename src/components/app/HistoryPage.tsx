import { useState } from "react";
import { Copy, Check, Trash2, ClipboardList } from "lucide-react";
import { toast } from "sonner";

const mockHistory = [
  { id: "1", exam: "USG Abdome", patient: "João Silva", date: "13/03/2026 10:30", text: "Fígado de dimensões normais, contornos regulares, ecotextura homogênea, sem lesões focais. Vesícula biliar normodistendida, paredes finas e regulares, sem cálculos no seu interior." },
  { id: "2", exam: "Tireoide", patient: "Maria Santos", date: "12/03/2026 14:15", text: "Tireoide de dimensões normais, contornos regulares, ecotextura homogênea, sem nódulos." },
  { id: "3", exam: "USG Mama", patient: "Ana Costa", date: "11/03/2026 09:00", text: "Mamas de aspecto normal, sem nódulos ou cistos identificados. Pele e tecido subcutâneo preservados." },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Laudo copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
    toast.success("Laudo removido");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h1 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Histórico de Laudos
          </h1>
          <p className="text-[13px] text-muted-foreground">{history.length} laudos salvos</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => { setHistory([]); toast.success("Histórico limpo"); }}
            className="px-2.5 py-1 rounded-md text-[11px] border border-destructive/25 bg-transparent text-destructive cursor-pointer hover:bg-destructive/10 transition-colors"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4">
            <ClipboardList className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-[15px] font-semibold text-foreground mb-1">Nenhum laudo ainda</h2>
          <p className="text-[13px] text-muted-foreground max-w-[260px]">
            Grave seu primeiro laudo e ele aparecerá aqui para consulta rápida.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-3 animate-fade-in">
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <div className="text-[13px] font-semibold text-foreground">{r.exam}</div>
                  <div className="text-[11px] text-muted-foreground">{r.patient} · {r.date}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCopy(r.id, r.text)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[11px] border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                  >
                    {copiedId === r.id ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1 rounded border border-destructive/25 bg-transparent text-destructive/60 cursor-pointer hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="text-[12px] text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-24 overflow-hidden">
                {r.text.substring(0, 300)}{r.text.length > 300 ? "..." : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
