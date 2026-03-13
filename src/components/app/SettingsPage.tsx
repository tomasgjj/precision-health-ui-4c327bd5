import { useState, useRef } from "react";
import { LogOut, Shield, Trash2, Upload, Pen, AlertTriangle, Volume2, VolumeX, MessageSquare, Moon, Sun, Waves } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/use-theme";
import PlanBar from "./PlanBar";

const feedbackTypes = [
  { id: "bug", icon: "🐛", label: "Bug" },
  { id: "feature", icon: "💡", label: "Ideia" },
  { id: "ux", icon: "👆", label: "Usabilidade" },
  { id: "general", icon: "💬", label: "Geral" },
];

export default function SettingsPage() {
  const [drName, setDrName] = useState("");
  const [drCrm, setDrCrm] = useState("");
  const [signature, setSignature] = useState("");
  const sigInputRef = useRef<HTMLInputElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaEnrolling, setMfaEnrolling] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  // Feedback state
  const [fbType, setFbType] = useState("bug");
  const [fbTitle, setFbTitle] = useState("");
  const [fbDesc, setFbDesc] = useState("");
  const [fbSending, setFbSending] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleSigUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSignature(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSendFeedback = () => {
    if (!fbTitle.trim()) return;
    setFbSending(true);
    setTimeout(() => {
      setFbSending(false);
      setFbTitle("");
      setFbDesc("");
      toast.success("Feedback enviado! Obrigado 🙏");
    }, 1000);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Configurações</h1>
        <p className="text-[13px] text-muted-foreground">Logado: exemplo@email.com</p>
      </div>

      {/* Plan */}
      <PlanBar used={7} total={15} plan="free" />

      {/* Doctor info */}
      <div className="rounded-lg bg-card border border-border p-3 space-y-2.5">
        <div>
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Nome do médico (para PDF)</label>
          <input
            type="text"
            value={drName}
            onChange={(e) => setDrName(e.target.value)}
            placeholder="Dr(a). Nome Completo"
            className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">CRM (para PDF)</label>
          <input
            type="text"
            value={drCrm}
            onChange={(e) => setDrCrm(e.target.value)}
            placeholder="CRM/UF 00000"
            className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">
            <Pen size={11} className="inline mr-1" />Assinatura digital (para PDF)
          </label>
          {signature ? (
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-foreground rounded-lg p-2 border border-border">
                <img src={signature} alt="Assinatura" className="max-w-[200px] max-h-[60px] object-contain" />
              </div>
              <button onClick={() => setSignature("")} className="p-1.5 rounded-md border border-destructive/25 bg-transparent text-destructive/60 cursor-pointer hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <button onClick={() => sigInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border bg-secondary/30 text-muted-foreground cursor-pointer hover:bg-secondary hover:text-foreground transition-colors">
              <Upload size={14} /> Enviar imagem da assinatura
            </button>
          )}
          <input ref={sigInputRef} type="file" accept="image/*" className="hidden" onChange={handleSigUpload} />
        </div>
      </div>

      {/* 2FA */}
      <div className="p-3 rounded-lg bg-accent/[0.04] border border-accent/15">
        <div className="flex items-center gap-1.5 mb-2">
          <Shield size={15} className="text-accent" />
          <span className="text-xs font-bold text-accent">Autenticação em dois fatores (2FA)</span>
        </div>
        {mfaEnrolling ? (
          <div>
            <p className="text-[11px] text-muted-foreground mb-2.5">Escaneie o QR code com seu app autenticador</p>
            <div className="text-center mb-2.5 bg-primary-foreground rounded-lg p-3 inline-block">
              <div className="w-[180px] h-[180px] bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">QR Code</div>
            </div>
            <input type="text" inputMode="numeric" maxLength={6} placeholder="Código de 6 dígitos" value={mfaCode} onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))} className="w-full text-center text-lg tracking-widest font-bold px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground mb-2 focus:outline-none focus:ring-1 focus:ring-primary/40" />
            <div className="flex gap-1.5">
              <button onClick={() => { setMfaEnabled(true); setMfaEnrolling(false); toast.success("2FA ativado!"); }} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary text-primary-foreground border-none cursor-pointer">Ativar 2FA</button>
              <button onClick={() => setMfaEnrolling(false)} className="px-3 py-1.5 rounded-md text-xs border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Cancelar</button>
            </div>
          </div>
        ) : mfaEnabled ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-success font-semibold">✅ Ativado</span>
            <button onClick={() => { setMfaEnabled(false); toast.info("2FA desativado"); }} className="px-2 py-1 rounded text-[11px] border border-destructive/25 bg-transparent text-destructive cursor-pointer">Desativar</button>
          </div>
        ) : (
          <button onClick={() => setMfaEnrolling(true)} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary text-primary-foreground border-none cursor-pointer">Ativar 2FA</button>
        )}
      </div>

      {/* Sound + Theme */}
      <div className="space-y-2.5">
        <button onClick={toggleSound} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-medium border border-border bg-card text-muted-foreground cursor-pointer hover:bg-secondary hover:text-foreground transition-colors duration-150">
          {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          {soundOn ? "Sons de feedback ativados" : "Sons de feedback desativados"}
          <span className={cn("ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold uppercase", soundOn ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")}>{soundOn ? "On" : "Off"}</span>
        </button>

      </div>

      {/* Save */}
      <button onClick={() => toast.success("Configurações salvas!")} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground border-none cursor-pointer">
        Salvar Configurações
      </button>

      {/* Feedback section */}
      <div className="rounded-lg bg-card border border-border p-3 space-y-3">
        <h2 className="text-[13px] font-semibold text-foreground flex items-center gap-2">
          <MessageSquare size={15} className="text-primary" /> Feedback
        </h2>
        <div className="grid grid-cols-4 gap-1.5">
          {feedbackTypes.map((t) => (
            <button key={t.id} onClick={() => setFbType(t.id)} className={cn("py-2 rounded-lg text-xs font-medium cursor-pointer border transition-colors", fbType === t.id ? "bg-primary/10 border-primary/30 text-foreground" : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground")}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <input type="text" value={fbTitle} onChange={(e) => setFbTitle(e.target.value)} placeholder="Resumo do feedback" maxLength={100} className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
        <Textarea value={fbDesc} onChange={(e) => setFbDesc(e.target.value)} placeholder="Descreva com detalhes..." rows={3} maxLength={2000} className="text-[13px] bg-secondary/30 border-border" />
        <button onClick={handleSendFeedback} disabled={!fbTitle.trim() || fbSending} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground border-none cursor-pointer disabled:opacity-50 transition-all">
          {fbSending ? "Enviando..." : "Enviar Feedback"}
        </button>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] border border-destructive/25 bg-transparent text-destructive cursor-pointer hover:bg-destructive/10 transition-colors w-full justify-center">
        <LogOut size={14} /> Sair da conta
      </button>

      {/* Delete account */}
      <div className="border-t border-border pt-3">
        {showDelete ? (
          <div className="p-2.5 rounded-lg bg-destructive/[0.06] border border-destructive/20">
            <p className="text-xs text-destructive mb-2 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Esta ação é IRREVERSÍVEL.
            </p>
            <p className="text-[11px] text-muted-foreground mb-2">
              Digite <strong className="text-destructive">EXCLUIR MINHA CONTA</strong> para confirmar:
            </p>
            <input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-destructive/40" />
            <div className="flex gap-1.5">
              <button disabled={deleteInput !== "EXCLUIR MINHA CONTA"} className="px-3 py-1.5 rounded text-xs bg-destructive text-destructive-foreground border-none cursor-pointer disabled:opacity-50">Confirmar exclusão</button>
              <button onClick={() => setShowDelete(false)} className="px-3 py-1.5 rounded text-xs border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Cancelar</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowDelete(true)} className="text-[11px] text-destructive/60 bg-transparent border-none cursor-pointer hover:text-destructive transition-colors">
            Excluir minha conta
          </button>
        )}
      </div>
    </div>
  );
}
