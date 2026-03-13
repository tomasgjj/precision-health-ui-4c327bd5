import { useState } from "react";
import {
  X, Plus, Save, RefreshCw, Camera, Trash2, ChevronRight, ChevronDown,
  FileText, Search, Smartphone, Loader2, Microscope,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MaskEditorProps {
  onClose: () => void;
}

const defaultExams = [
  {
    name: "USG Abdome",
    sections: [
      { id: "figado", label: "Fígado", text: "Dimensões normais, contornos regulares, ecotextura homogênea." },
      { id: "vesicula", label: "Vesícula Biliar", text: "Normodistendida, paredes finas, sem cálculos." },
      { id: "pancreas", label: "Pâncreas", text: "Dimensões e ecotextura normais." },
      { id: "baco", label: "Baço", text: "Homogêneo, dimensões normais." },
      { id: "rins", label: "Rins", text: "Tópicos, dimensões preservadas, sem litíase." },
    ],
    findings: [
      { id: "esteatose", label: "Esteatose Hepática", section: "Fígado", text: "Fígado com aumento difuso da ecogenicidade." },
      { id: "colelitiase", label: "Colelitíase", section: "Vesícula Biliar", text: "Imagem hiperecogênica com sombra acústica posterior." },
    ],
  },
  {
    name: "Tireoide",
    sections: [
      { id: "lobo_d", label: "Lobo Direito", text: "Dimensões normais, ecotextura homogênea." },
      { id: "lobo_e", label: "Lobo Esquerdo", text: "Dimensões normais, ecotextura homogênea." },
      { id: "istmo", label: "Istmo", text: "Espessura normal." },
    ],
    findings: [
      { id: "nodulo", label: "Nódulo Tireoidiano", section: "Lobo Direito", text: "Nódulo sólido, hipoecogênico, contornos regulares." },
    ],
  },
];

export default function MaskEditor({ onClose }: MaskEditorProps) {
  const [exams, setExams] = useState(defaultExams);
  const [activeExam, setActiveExam] = useState(0);
  const [mobileTab, setMobileTab] = useState<"normal" | "achados">("normal");
  const [showSyncTip, setShowSyncTip] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  const exam = exams[activeExam];
  const sections = exam?.sections || [];
  const findings = exam?.findings || [];

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card rounded-2xl w-[96vw] h-[92vh] max-sm:w-screen max-sm:h-[100dvh] max-sm:rounded-none flex flex-col overflow-hidden border border-border shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border shrink-0 flex-wrap gap-2">
          <h2 className="text-sm sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Editor de Máscaras
          </h2>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <button
              onClick={() => setShowImport(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border-none gradient-purple text-primary-foreground whitespace-nowrap"
            >
              <Camera size={15} /> Foto
            </button>
            <button className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border border-primary/25 bg-primary/10 text-primary whitespace-nowrap">
              <RefreshCw size={15} /> Sync
            </button>
            <button
              onClick={() => toast.success("Máscaras salvas!")}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border-none gradient-cyan text-primary-foreground whitespace-nowrap"
            >
              <Save size={15} /> Salvar
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border-none bg-destructive/10 text-destructive whitespace-nowrap"
            >
              <X size={15} /> Fechar
            </button>
          </div>
        </div>

        {/* Sync tip */}
        {showSyncTip && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary text-center px-4 py-2 shrink-0 bg-primary/[0.06] border-b border-primary/20 leading-relaxed relative">
            <Smartphone size={16} className="shrink-0" />
            <span>
              Criou a máscara no celular? Clique <b>Sync</b> no celular primeiro e depois clique <b>Sync</b> no computador
            </span>
            <button
              onClick={() => setShowSyncTip(false)}
              className="absolute top-1 right-2 bg-transparent border-none text-primary/60 hover:text-primary cursor-pointer p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Exam tabs row */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 border-b border-border shrink-0 overflow-x-auto">
          {exams.map((e, idx) => (
            <button
              key={e.name}
              onClick={() => setActiveExam(idx)}
              className={cn(
                "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer border transition-colors",
                idx === activeExam
                  ? "gradient-cyan text-primary-foreground border-primary/30 shadow-md"
                  : "bg-secondary text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {e.name}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-transparent text-info border border-dashed border-info/50 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-info/10 transition-colors">
            <Plus size={14} /> Novo Exame
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="flex sm:hidden border-b border-border shrink-0">
          <button
            onClick={() => setMobileTab("normal")}
            className={cn(
              "flex items-center gap-1.5 justify-center flex-1 py-2.5 text-sm font-semibold border-b-2 cursor-pointer transition-colors",
              mobileTab === "normal"
                ? "text-primary border-primary bg-primary/[0.04]"
                : "text-muted-foreground border-transparent bg-transparent"
            )}
          >
            <FileText size={15} /> Normal <span className="text-[11px] text-muted-foreground">{sections.length}</span>
          </button>
          <button
            onClick={() => setMobileTab("achados")}
            className={cn(
              "flex items-center gap-1.5 justify-center flex-1 py-2.5 text-sm font-semibold border-b-2 cursor-pointer transition-colors",
              mobileTab === "achados"
                ? "text-primary border-primary bg-primary/[0.04]"
                : "text-muted-foreground border-transparent bg-transparent"
            )}
          >
            <Microscope size={15} /> Achados <span className="text-[11px] text-muted-foreground">{findings.length}</span>
          </button>
        </div>

        {/* Two-column body */}
        <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
          {/* LEFT: Sections */}
          <div className={cn(
            "sm:flex-1 flex flex-col overflow-hidden sm:border-r sm:border-border",
            mobileTab !== "normal" && "hidden sm:flex"
          )}>
            <div className="hidden sm:flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText size={14} /> Normal
              </h3>
              <span className="text-[11px] text-muted-foreground">{sections.length} seções</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
              {sections.map((sec) => (
                <div key={sec.id} className="rounded-xl bg-secondary/50 border border-border hover:border-muted-foreground/30 mb-2 overflow-hidden cursor-pointer transition-colors">
                  <div
                    className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3"
                    onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                  >
                    <span className="text-muted-foreground">
                      {expandedSection === sec.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                    <span className="flex-1 text-sm font-medium text-secondary-foreground">{sec.label}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.info("Seção removida"); }}
                      className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-destructive p-1 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {expandedSection === sec.id && (
                    <div className="border-t border-border p-3 sm:p-4 bg-background">
                      <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Nome</label>
                      <input
                        defaultValue={sec.label}
                        className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] mb-2 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      />
                      <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Texto normal</label>
                      <Textarea defaultValue={sec.text} rows={3} className="text-sm bg-secondary/30 border-border mb-2" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedSection(null)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          Fechar
                        </button>
                        <button
                          onClick={() => { setExpandedSection(null); toast.success("Seção salva!"); }}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold gradient-cyan text-primary-foreground border-none cursor-pointer"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent text-info border border-dashed border-info/40 cursor-pointer text-xs font-medium mt-2 hover:bg-info/[0.06] transition-colors w-full justify-center">
                <Plus size={14} /> Nova Seção
              </button>
            </div>
          </div>

          {/* RIGHT: Findings */}
          <div className={cn(
            "sm:flex-1 flex flex-col overflow-hidden",
            mobileTab !== "achados" && "hidden sm:flex"
          )}>
            <div className="hidden sm:flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Microscope size={14} /> Achados
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{findings.length}</span>
                <button className="p-1.5 rounded-lg border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <Search size={14} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
              {findings.map((f) => (
                <div key={f.id} className="rounded-xl bg-secondary/50 border border-border mb-2 overflow-hidden cursor-pointer transition-colors">
                  <div
                    className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3"
                    onClick={() => setExpandedFinding(expandedFinding === f.id ? null : f.id)}
                  >
                    <span className="text-muted-foreground">
                      {expandedFinding === f.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-secondary-foreground truncate">{f.label}</div>
                      <div className="text-[10px] text-muted-foreground">Seção: {f.section}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.info("Achado removido"); }}
                      className="bg-transparent border-none text-muted-foreground cursor-pointer hover:text-destructive p-1 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {expandedFinding === f.id && (
                    <div className="border-t border-border p-3 sm:p-4 bg-background">
                      <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Nome</label>
                      <input
                        defaultValue={f.label}
                        className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] mb-2 focus:outline-none focus:ring-1 focus:ring-primary/40"
                      />
                      <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Corpo</label>
                      <Textarea defaultValue={f.text} rows={3} className="text-sm bg-secondary/30 border-border mb-2" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedFinding(null)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          Fechar
                        </button>
                        <button
                          onClick={() => { setExpandedFinding(null); toast.success("Achado salvo!"); }}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold gradient-cyan text-primary-foreground border-none cursor-pointer"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent text-info border border-dashed border-info/40 cursor-pointer text-xs font-medium mt-2 hover:bg-info/[0.06] transition-colors w-full justify-center">
                <Plus size={14} /> Novo Achado
              </button>
            </div>
          </div>
        </div>

        {/* Import overlay */}
        {showImport && <MaskImport onClose={() => setShowImport(false)} />}
      </div>
    </div>
  );
}

function MaskImport({ onClose }: { onClose: () => void }) {
  const [images, setImages] = useState<{ preview: string; data: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImages((prev) => [...prev.slice(0, 9), { preview: result, data: result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  if (loading) {
    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center p-5 animate-fade-in">
        <div className="bg-card border border-border rounded-2xl w-full max-w-xl p-6 text-center shadow-2xl">
          <h3 className="text-lg text-foreground font-semibold mb-1">📷 Criando máscara...</h3>
          <div className="py-9">
            <Loader2 className="w-9 h-9 animate-spin text-info mx-auto mb-3.5" />
            <p className="text-sm text-muted-foreground">A IA está lendo as imagens e criando sua máscara automaticamente...</p>
            <p className="text-xs text-muted-foreground mt-2">Isso pode levar 15-30 segundos</p>
          </div>
        </div>
      </div>
    );
  }

  const totalKB = images.reduce((s, i) => s + Math.round((i.data.length * 3) / 4 / 1024), 0);

  return (
    <div
      className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center p-5 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl">
        <h3 className="text-lg text-foreground font-semibold mb-1">📷 Criar Máscara por Foto</h3>
        <p className="text-xs text-muted-foreground mb-4">Tire fotos ou cole screenshots de templates de laudo de ultrassom</p>

        <div className="text-[11px] text-muted-foreground bg-secondary/50 rounded-lg p-2 px-3 mb-2 leading-relaxed">
          💡 Fotos de perto, com boa iluminação e texto legível geram melhores resultados. Até 10 imagens.
        </div>

        <div className="flex gap-2 flex-wrap my-3">
          <label className="flex-1 min-w-[100px] py-3 rounded-xl border border-dashed border-border bg-secondary text-muted-foreground text-xs cursor-pointer hover:border-info hover:text-info transition-colors text-center">
            📷 Câmera
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
          </label>
          <label className="flex-1 min-w-[100px] py-3 rounded-xl border border-dashed border-border bg-secondary text-muted-foreground text-xs cursor-pointer hover:border-info hover:text-info transition-colors text-center">
            📁 Arquivo
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
          </label>
          <button className="flex-1 min-w-[100px] py-3 rounded-xl border border-dashed border-border bg-secondary text-muted-foreground text-xs cursor-pointer hover:border-info hover:text-info transition-colors">
            📋 Colar
          </button>
        </div>

        {images.length > 0 && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 my-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-secondary">
                  <img src={img.preview} className="w-full h-full object-cover" alt="" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/85 text-destructive-foreground border-none cursor-pointer text-[11px] flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className={cn("text-[11px] mt-1", totalKB > 3000 ? "text-warning" : "text-muted-foreground")}>
              {images.length}/10 imagens · {totalKB} KB
            </div>
          </>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm my-3">{error}</div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-secondary border border-border text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <button
            disabled={!images.length}
            onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast.success("Máscara criada!"); onClose(); }, 3000); }}
            className="flex-1 py-3 rounded-xl text-sm font-semibold gradient-cyan text-primary-foreground border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Analisar com IA
          </button>
        </div>
      </div>
    </div>
  );
}
