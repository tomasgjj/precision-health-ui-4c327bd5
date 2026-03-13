import { useState, useMemo } from "react";
import { Copy, Check, Trash2, ClipboardList, Search, X, Filter } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const mockHistory = [
  { id: "1", exam: "USG Abdome", patient: "João Silva", date: "13/03/2026 10:30", text: "Fígado de dimensões normais, contornos regulares, ecotextura homogênea, sem lesões focais. Vesícula biliar normodistendida, paredes finas e regulares, sem cálculos no seu interior." },
  { id: "2", exam: "Tireoide", patient: "Maria Santos", date: "12/03/2026 14:15", text: "Tireoide de dimensões normais, contornos regulares, ecotextura homogênea, sem nódulos." },
  { id: "3", exam: "USG Mama", patient: "Ana Costa", date: "11/03/2026 09:00", text: "Mamas de aspecto normal, sem nódulos ou cistos identificados. Pele e tecido subcutâneo preservados." },
  { id: "4", exam: "USG Abdome", patient: "Carlos Mendes", date: "10/03/2026 16:45", text: "Fígado com aumento difuso da ecogenicidade, sugestivo de esteatose hepática grau I." },
  { id: "5", exam: "Tireoide", patient: "Lucia Ferreira", date: "09/03/2026 11:20", text: "Nódulo sólido hipoecogênico no lobo direito medindo 8mm, contornos regulares. TI-RADS 3." },
];

const examTypes = ["Todos", "USG Abdome", "Tireoide", "USG Mama"];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = history;
    if (selectedExam !== "Todos") {
      results = results.filter(r => r.exam === selectedExam);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(r =>
        r.patient.toLowerCase().includes(q) ||
        r.exam.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q)
      );
    }
    return results;
  }, [history, searchQuery, selectedExam]);

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
          <p className="text-[13px] text-muted-foreground">{filtered.length} de {history.length} laudos</p>
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

      {/* Search + filter bar */}
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por paciente, exame ou texto..."
                className="w-full pl-8 pr-8 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium border transition-colors",
                showFilters || selectedExam !== "Todos"
                  ? "border-primary/30 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <Filter size={13} />
              Filtros
              {selectedExam !== "Todos" && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 animate-fade-in">
              {examTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedExam(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap border transition-all",
                    selectedExam === type
                      ? "bg-primary/10 border-primary/30 text-foreground"
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="w-8 h-8 text-muted-foreground/40 mb-3" />
          <h2 className="text-[14px] font-semibold text-foreground mb-1">Nenhum resultado</h2>
          <p className="text-[12px] text-muted-foreground max-w-[240px]">
            Tente buscar com termos diferentes ou remova os filtros.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedExam("Todos"); }}
            className="mt-3 px-3 py-1.5 rounded-lg text-[12px] font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
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
