import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  onClose: () => void;
}

const feedbackTypes = [
  { id: "bug", icon: "🐛", label: "Bug" },
  { id: "feature", icon: "💡", label: "Ideia" },
  { id: "ux", icon: "👆", label: "Usabilidade" },
  { id: "general", icon: "💬", label: "Geral" },
];

export default function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [type, setType] = useState("bug");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!title.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Feedback enviado! Obrigado 🙏");
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-start p-3.5 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-xl w-full max-w-md p-5 mt-16 animate-fade-in shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" /> Feedback
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent border-none cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-3.5">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1.5">Tipo</label>
          <div className="grid grid-cols-4 gap-1.5">
            {feedbackTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={cn(
                  "py-2 rounded-lg text-xs font-medium cursor-pointer border transition-colors",
                  type === t.id
                    ? "gradient-cyan text-primary-foreground border-transparent"
                    : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resumo do feedback"
            maxLength={100}
            className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Descrição</label>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descreva com detalhes..."
            rows={4}
            maxLength={2000}
            className="text-sm bg-secondary/30 border-border"
          />
          <div className="text-[10px] text-muted-foreground text-right mt-0.5">{desc.length}/2000</div>
        </div>

        <button
          onClick={handleSend}
          disabled={!title.trim() || sending}
          className="w-full py-3 rounded-xl text-sm font-semibold gradient-brand text-primary-foreground border-none cursor-pointer disabled:opacity-50 transition-all"
        >
          {sending ? "Enviando..." : "Enviar Feedback"}
        </button>
      </div>
    </div>
  );
}
