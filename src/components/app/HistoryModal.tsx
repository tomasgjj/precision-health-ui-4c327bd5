import { useState } from "react";
import { X, Copy, Check, Trash2, ClipboardList } from "lucide-react";
import { toast } from "sonner";

interface HistoryModalProps {
  onClose: () => void;
}

const mockHistory = [
  { id: "1", exam: "USG Abdome", patient: "João Silva", date: "13/03/2026 10:30", text: "Fígado de dimensões normais, contornos regulares, ecotextura homogênea, sem lesões focais. Vesícula biliar normodistendida, paredes finas e regulares, sem cálculos no seu interior." },
  { id: "2", exam: "Tireoide", patient: "Maria Santos", date: "12/03/2026 14:15", text: "Tireoide de dimensões normais, contornos regulares, ecotextura homogênea, sem nódulos." },
  { id: "3", exam: "USG Mama", patient: "Ana Costa", date: "11/03/2026 09:00", text: "Mamas de aspecto normal, sem nódulos ou cistos identificados. Pele e tecido subcutâneo preservados." },
];

export default function HistoryModal({ onClose }: HistoryModalProps) {
  const [history, setHistory] = useState(mockHistory);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? history : history.slice(0, 50);

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
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-start p-3.5 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-5 mt-8 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-3.5">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" /> Histórico de Laudos
          </h2>
          <div className="flex gap-1.5">
            {history.length > 0 && (
              <button
                onClick={() => { setHistory([]); toast.success("Histórico limpo"); }}
                className="px-2.5 py-1 rounded-md text-[11px] border border-destructive/25 bg-transparent text-destructive cursor-pointer hover:bg-destructive/10 transition-colors"
              >
                Limpar tudo
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Nenhum laudo salvo ainda.</div>
        ) : (
          <>
            {displayed.map((r) => (
              <div key={r.id} className="bg-secondary/30 border border-border rounded-lg p-3 mb-2 animate-fade-in">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <div className="text-xs font-semibold text-secondary-foreground">{r.exam}</div>
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
                <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-24 overflow-hidden">
                  {r.text.substring(0, 300)}{r.text.length > 300 ? "..." : ""}
                </div>
              </div>
            ))}
            {!showAll && history.length > 50 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full py-2 rounded-lg text-xs text-muted-foreground border border-border bg-transparent cursor-pointer mt-2 hover:text-primary transition-colors"
              >
                Ver todos ({history.length} laudos)
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
