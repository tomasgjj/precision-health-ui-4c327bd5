import { useState } from "react";
import {
  Plus, Save, RefreshCw, Camera, Trash2, ChevronRight, ChevronDown,
  FileText, Search, Smartphone, Loader2, Microscope, Upload, ClipboardPaste, X, LayoutTemplate, Star,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

export default function MaskEditorPage() {
  const [exams] = useState(defaultExams);
  const [activeExam, setActiveExam] = useState(0);
  const [mobileTab, setMobileTab] = useState<"normal" | "achados">("normal");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);

  const exam = exams[activeExam];
  const sections = exam?.sections || [];
  const findings = exam?.findings || [];

  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4">
          <LayoutTemplate className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-[15px] font-semibold text-foreground mb-1">Nenhuma máscara</h2>
        <p className="text-[13px] text-muted-foreground max-w-[280px] mb-4">
          Máscaras são modelos de laudo pré-preenchidos. Crie uma para agilizar seus laudos.
        </p>
        <button className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-primary text-primary-foreground">
          <Plus size={14} className="inline mr-1.5 -mt-px" /> Criar Máscara
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Editor de Máscaras
        </h1>
        <p className="text-[13px] text-muted-foreground">Personalize os modelos de laudo</p>
      </div>

      {/* Exam tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {exams.map((e, idx) => (
          <button
            key={e.name}
            onClick={() => setActiveExam(idx)}
            className={cn(
              "px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border",
              idx === activeExam
                ? "bg-primary/10 border-primary/30 text-foreground"
                : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            )}
          >
            {e.name}
          </button>
        ))}
        <button className="px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap border border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
          <Plus size={13} className="inline -mt-px mr-1" /> Novo
        </button>
      </div>

      {/* Mobile tabs */}
      <div className="flex sm:hidden border-b border-border">
        {[
          { key: "normal" as const, label: "Normal", icon: FileText, count: sections.length },
          { key: "achados" as const, label: "Achados", icon: Microscope, count: findings.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMobileTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 justify-center flex-1 py-2.5 text-[13px] font-medium border-b-2 transition-colors",
              mobileTab === tab.key ? "text-primary border-primary" : "text-muted-foreground border-transparent"
            )}
          >
            <tab.icon size={14} /> {tab.label}
            <span className="text-[10px] text-muted-foreground/70 ml-0.5">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Two-column body */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sections */}
        <div className={cn("sm:flex-1 space-y-1.5", mobileTab !== "normal" && "hidden sm:block")}>
          <div className="hidden sm:flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <FileText size={13} /> Normal
            </h3>
            <span className="text-[10px] text-muted-foreground/70">{sections.length} seções</span>
          </div>
          {sections.map((sec) => (
            <div key={sec.id} className={cn("rounded-lg border overflow-hidden transition-all duration-200 bg-card", expandedSection === sec.id ? "border-primary/20" : "border-border hover:border-border")}>
              <div className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group" onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}>
                <span className="text-muted-foreground/60">{expandedSection === sec.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</span>
                <span className="flex-1 text-[13px] font-medium text-secondary-foreground">{sec.label}</span>
                <button onClick={(e) => { e.stopPropagation(); toast.info("Seção removida"); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive">
                  <Trash2 size={13} />
                </button>
              </div>
              {expandedSection === sec.id && (
                <div className="border-t border-border/50 p-3 space-y-2">
                  <div>
                    <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Nome</label>
                    <input defaultValue={sec.label} className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Texto normal</label>
                    <Textarea defaultValue={sec.text} rows={3} className="text-[13px] bg-secondary/30 border-border resize-none" />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setExpandedSection(null)} className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
                    <button onClick={() => { setExpandedSection(null); toast.success("Seção salva!"); }} className="flex-1 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground transition-all">Salvar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-dashed border-border/60 text-muted-foreground text-xs font-medium hover:text-foreground hover:border-border transition-colors mt-1">
            <Plus size={13} /> Nova Seção
          </button>
        </div>

        {/* Findings */}
        <div className={cn("sm:flex-1 space-y-1.5", mobileTab !== "achados" && "hidden sm:block")}>
          <div className="hidden sm:flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Microscope size={13} /> Achados
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground/70">{findings.length}</span>
              <button className="p-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors"><Search size={13} /></button>
            </div>
          </div>
          {findings.map((f) => (
            <div key={f.id} className={cn("rounded-lg border overflow-hidden transition-all duration-200 bg-card", expandedFinding === f.id ? "border-primary/20" : "border-border hover:border-border")}>
              <div className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group" onClick={() => setExpandedFinding(expandedFinding === f.id ? null : f.id)}>
                <span className="text-muted-foreground/60">{expandedFinding === f.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-secondary-foreground truncate">{f.label}</div>
                  <div className="text-[10px] text-muted-foreground/60">{f.section}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toast.info("Achado removido"); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive">
                  <Trash2 size={13} />
                </button>
              </div>
              {expandedFinding === f.id && (
                <div className="border-t border-border/50 p-3 space-y-2">
                  <div>
                    <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Nome</label>
                    <input defaultValue={f.label} className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider block mb-1">Corpo</label>
                    <Textarea defaultValue={f.text} rows={3} className="text-[13px] bg-secondary/30 border-border resize-none" />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setExpandedFinding(null)} className="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
                    <button onClick={() => { setExpandedFinding(null); toast.success("Achado salvo!"); }} className="flex-1 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground transition-all">Salvar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-dashed border-border/60 text-muted-foreground text-xs font-medium hover:text-foreground hover:border-border transition-colors mt-1">
            <Plus size={13} /> Novo Achado
          </button>
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex items-center gap-2 pt-2">
        <button onClick={() => setShowImport(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
          <Camera size={14} /> Foto
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors">
          <RefreshCw size={14} /> Sync
        </button>
        <button onClick={() => toast.success("Máscaras salvas!")} className="ml-auto flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground transition-all">
          <Save size={14} /> Salvar
        </button>
      </div>

      {/* Import modal */}
      {showImport && <MaskImport onClose={() => setShowImport(false)} />}
    </div>
  );
}

function MaskImport({ onClose }: { onClose: () => void }) {
  const [images, setImages] = useState<{ preview: string; data: string }[]>([]);
  const [loading, setLoading] = useState(false);

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

  const totalKB = images.reduce((s, i) => s + Math.round((i.data.length * 3) / 4 / 1024), 0);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fade-in">
        <div className="bg-card rounded-2xl w-full max-w-xl p-6 text-center border border-border">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">A IA está lendo as imagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-5">
        <h3 className="text-base text-foreground font-semibold mb-0.5 flex items-center gap-2">
          <Camera size={18} className="text-primary" /> Criar Máscara por Foto
        </h3>
        <p className="text-[11px] text-muted-foreground mb-4">Tire fotos ou cole screenshots de templates</p>

        <div className="flex gap-2 my-3">
          {[
            { label: "Câmera", icon: Camera, inputProps: { type: "file" as const, accept: "image/*", capture: "environment" as const } },
            { label: "Arquivo", icon: Upload, inputProps: { type: "file" as const, accept: "image/*", multiple: true } },
          ].map((item) => (
            <label key={item.label} className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium cursor-pointer hover:text-foreground hover:border-border transition-colors">
              <item.icon size={16} /> {item.label}
              <input {...item.inputProps} className="hidden" onChange={handleFileUpload} />
            </label>
          ))}
          <button className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-xl border border-dashed border-border/60 text-muted-foreground text-xs font-medium cursor-pointer hover:text-foreground hover:border-border transition-colors">
            <ClipboardPaste size={16} /> Colar
          </button>
        </div>

        {images.length > 0 && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 my-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/50">
                  <img src={img.preview} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
            <div className={cn("text-[11px]", totalKB > 3000 ? "text-destructive" : "text-muted-foreground/60")}>
              {images.length}/10 imagens · {totalKB} KB
            </div>
          </>
        )}

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
          <button disabled={!images.length} onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast.success("Máscara criada!"); onClose(); }, 3000); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-40 transition-all">Analisar com IA</button>
        </div>
      </div>
    </div>
  );
}
