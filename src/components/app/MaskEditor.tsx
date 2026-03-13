import { useState } from "react";
import {
  X, Plus, Save, RefreshCw, Camera, Trash2, ChevronRight, ChevronDown,
  FileText, Search, Smartphone, Loader2, Microscope, Upload, ClipboardPaste,
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
        {/* Header — clean */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border shrink-0">
          <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Editor de Máscaras
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sync tip — subtle */}
        {showSyncTip && (
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground px-4 py-2.5 shrink-0 surface-glass border-b border-border/50 relative">
            <Smartphone size={14} className="text-primary shrink-0" />
            <span>
              Criou no celular? Clique <span className="text-primary font-medium">Sync</span> no celular primeiro, depois no computador.
            </span>
            <button
              onClick={() => setShowSyncTip(false)}
              className="ml-auto p-1 text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Exam tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-border shrink-0 overflow-x-auto scrollbar-none">
          {exams.map((e, idx) => (
            <button
              key={e.name}
              onClick={() => setActiveExam(idx)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border",
                idx === activeExam
                  ? "bg-primary/10 border-primary/30 text-foreground shadow-sm"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40 hover:border-border"
              )}
            >
              {e.name}
            </button>
          ))}
          <button className="px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap border border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
            <Plus size={13} className="inline -mt-px mr-1" />
            Novo
          </button>
        </div>

        {/* Mobile tabs (Normal / Achados) */}
        <div className="flex sm:hidden border-b border-border shrink-0">
          {[
            { key: "normal" as const, label: "Normal", icon: FileText, count: sections.length },
            { key: "achados" as const, label: "Achados", icon: Microscope, count: findings.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMobileTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 justify-center flex-1 py-2.5 text-[13px] font-medium border-b-2 transition-colors",
                mobileTab === tab.key
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
              <span className="text-[10px] text-muted-foreground/70 ml-0.5">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Two-column body */}
        <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
          {/* LEFT: Sections */}
          <div className={cn(
            "sm:flex-1 flex flex-col overflow-hidden sm:border-r sm:border-border",
            mobileTab !== "normal" && "hidden sm:flex"
          )}>
            <div className="hidden sm:flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <FileText size={13} /> Normal
              </h3>
              <span className="text-[10px] text-muted-foreground/70">{sections.length} seções</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  className={cn(
                    "rounded-xl border overflow-hidden transition-all duration-200",
                    expandedSection === sec.id
                      ? "surface-glass-strong border-primary/20"
                      : "surface-glass hover:border-border"
                  )}
                >
                  <div
                    className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group"
                    onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                  >
                    <span className="text-muted-foreground/60">
                      {expandedSection === sec.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </span>
                    <span className="flex-1 text-[13px] font-medium text-secondary-foreground">{sec.label}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.info("Seção removida"); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {expandedSection === sec.id && (
                    <div className="border-t border-border/50 p-3 space-y-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Nome</label>
                        <input defaultValue={sec.label} className="input-glass text-[13px]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Texto normal</label>
                        <Textarea defaultValue={sec.text} rows={3} className="input-glass text-[13px] resize-none" />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setExpandedSection(null)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => { setExpandedSection(null); toast.success("Seção salva!"); }}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold gradient-brand text-primary-foreground transition-all"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium hover:text-foreground hover:border-border transition-colors mt-1">
                <Plus size={13} /> Nova Seção
              </button>
            </div>
          </div>

          {/* RIGHT: Findings */}
          <div className={cn(
            "sm:flex-1 flex flex-col overflow-hidden",
            mobileTab !== "achados" && "hidden sm:flex"
          )}>
            <div className="hidden sm:flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Microscope size={13} /> Achados
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/70">{findings.length}</span>
                <button className="p-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Search size={13} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
              {findings.map((f) => (
                <div
                  key={f.id}
                  className={cn(
                    "rounded-xl border overflow-hidden transition-all duration-200",
                    expandedFinding === f.id
                      ? "surface-glass-strong border-primary/20"
                      : "surface-glass hover:border-border"
                  )}
                >
                  <div
                    className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group"
                    onClick={() => setExpandedFinding(expandedFinding === f.id ? null : f.id)}
                  >
                    <span className="text-muted-foreground/60">
                      {expandedFinding === f.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-secondary-foreground truncate">{f.label}</div>
                      <div className="text-[10px] text-muted-foreground/60">{f.section}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.info("Achado removido"); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {expandedFinding === f.id && (
                    <div className="border-t border-border/50 p-3 space-y-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Nome</label>
                        <input defaultValue={f.label} className="input-glass text-[13px]" />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Corpo</label>
                        <Textarea defaultValue={f.text} rows={3} className="input-glass text-[13px] resize-none" />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setExpandedFinding(null)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => { setExpandedFinding(null); toast.success("Achado salvo!"); }}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold gradient-brand text-primary-foreground transition-all"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium hover:text-foreground hover:border-border transition-colors mt-1">
                <Plus size={13} /> Novo Achado
              </button>
            </div>
          </div>
        </div>

        {/* Sticky footer — actions */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0 bg-card">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <Camera size={14} /> Foto
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
            <RefreshCw size={14} /> Sync
          </button>
          <button
            onClick={() => toast.success("Máscaras salvas!")}
            className="ml-auto flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold gradient-brand text-primary-foreground glow-primary-sm transition-all"
          >
            <Save size={14} /> Salvar
          </button>
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
        <div className="surface-glass rounded-2xl w-full max-w-xl p-6 text-center shadow-2xl">
          <h3 className="text-base text-foreground font-semibold mb-1 flex items-center justify-center gap-2">
            <Camera size={18} className="text-primary" /> Criando máscara...
          </h3>
          <div className="py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">A IA está lendo as imagens e criando sua máscara...</p>
            <p className="text-[11px] text-muted-foreground/60 mt-2">Isso pode levar 15-30 segundos</p>
          </div>
        </div>
      </div>
    );
  }

  const totalKB = images.reduce((s, i) => s + Math.round((i.data.length * 3) / 4 / 1024), 0);

  return (
    <div
      className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="surface-glass-strong rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl">
        <h3 className="text-base text-foreground font-semibold mb-0.5 flex items-center gap-2">
          <Camera size={18} className="text-primary" /> Criar Máscara por Foto
        </h3>
        <p className="text-[11px] text-muted-foreground mb-4">Tire fotos ou cole screenshots de templates de laudo</p>

        <div className="text-[11px] text-muted-foreground/70 surface-glass rounded-lg p-2.5 px-3 mb-3 leading-relaxed">
          Fotos de perto, com boa iluminação e texto legível geram melhores resultados. Até 10 imagens.
        </div>

        <div className="flex gap-2 my-3">
          {[
            { label: "Câmera", icon: Camera, inputProps: { type: "file" as const, accept: "image/*", capture: "environment" as const } },
            { label: "Arquivo", icon: Upload, inputProps: { type: "file" as const, accept: "image/*", multiple: true } },
          ].map((item) => (
            <label
              key={item.label}
              className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium cursor-pointer hover:text-foreground hover:border-border transition-colors"
            >
              <item.icon size={16} />
              {item.label}
              <input {...item.inputProps} className="hidden" onChange={handleFileUpload} />
            </label>
          ))}
          <button className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium cursor-pointer hover:text-foreground hover:border-border transition-colors">
            <ClipboardPaste size={16} />
            Colar
          </button>
        </div>

        {images.length > 0 && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 my-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/50">
                  <img src={img.preview} className="w-full h-full object-cover" alt="" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className={cn("text-[11px]", totalKB > 3000 ? "text-warning" : "text-muted-foreground/60")}>
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
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <button
            disabled={!images.length}
            onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast.success("Máscara criada!"); onClose(); }, 3000); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold gradient-brand text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Analisar com IA
          </button>
        </div>
      </div>
    </div>
  );
}
