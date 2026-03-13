import { useState, useRef } from "react";
import { LogOut, Shield, Trash2, Upload, Pen, AlertTriangle, X, Volume2, VolumeX, Moon, Sun, Waves } from "lucide-react";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/use-theme";
import PlanBar from "./PlanBar";

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
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

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-start p-3.5 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-xl p-3 sm:p-4 mt-12 w-full max-w-md animate-fade-in shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Configurações</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border border-destructive/25 bg-transparent text-destructive cursor-pointer hover:bg-destructive/10 transition-colors">
              <LogOut size={13} /> Sair
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent border-none cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground mb-2">Logado: exemplo@email.com</div>

        {/* PlanBar */}
        <div className="mb-3">
          <PlanBar used={7} total={15} plan="free" />
        </div>

        {/* Doctor name */}
        <div className="mb-2">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">Nome do médico (para PDF)</label>
          <input
            type="text"
            value={drName}
            onChange={(e) => setDrName(e.target.value)}
            placeholder="Dr(a). Nome Completo"
            className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>

        {/* CRM */}
        <div className="mb-2.5">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">CRM (para PDF)</label>
          <input
            type="text"
            value={drCrm}
            onChange={(e) => setDrCrm(e.target.value)}
            placeholder="CRM/UF 00000"
            className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>

        {/* Signature */}
        <div className="mb-2.5">
          <label className="text-[11px] text-muted-foreground font-semibold block mb-1">
            <Pen size={11} className="inline mr-1" />Assinatura digital (para PDF)
          </label>
          {signature ? (
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-foreground rounded-lg p-2 border border-border">
                <img src={signature} alt="Assinatura" className="max-w-[200px] max-h-[60px] object-contain" />
              </div>
              <button
                onClick={() => setSignature("")}
                className="p-1.5 rounded-md border border-destructive/25 bg-transparent text-destructive/60 cursor-pointer hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => sigInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border bg-secondary/30 text-muted-foreground cursor-pointer hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Upload size={14} /> Enviar imagem da assinatura
            </button>
          )}
          <input ref={sigInputRef} type="file" accept="image/*" className="hidden" onChange={handleSigUpload} />
        </div>

        {/* 2FA */}
        <div className="p-3 rounded-lg bg-accent/[0.04] border border-accent/15 mb-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield size={15} className="text-accent" />
            <span className="text-xs font-bold text-accent">Autenticação em dois fatores (2FA)</span>
          </div>
          {mfaEnrolling ? (
            <div>
              <p className="text-[11px] text-muted-foreground mb-2.5">Escaneie o QR code com seu app autenticador</p>
              <div className="text-center mb-2.5 bg-primary-foreground rounded-lg p-3 inline-block">
                <div className="w-[180px] h-[180px] bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                  QR Code
                </div>
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Código de 6 dígitos"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-lg tracking-widest font-bold px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground mb-2 focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setMfaEnabled(true); setMfaEnrolling(false); toast.success("2FA ativado!"); }}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold gradient-brand text-primary-foreground border-none cursor-pointer"
                >
                  Ativar 2FA
                </button>
                <button
                  onClick={() => setMfaEnrolling(false)}
                  className="px-3 py-1.5 rounded-md text-xs border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : mfaEnabled ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-success font-semibold">✅ Ativado</span>
              <button
                onClick={() => { setMfaEnabled(false); toast.info("2FA desativado"); }}
                className="px-2 py-1 rounded text-[11px] border border-destructive/25 bg-transparent text-destructive cursor-pointer"
              >
                Desativar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMfaEnrolling(true)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold gradient-brand text-primary-foreground border-none cursor-pointer"
            >
              Ativar 2FA
            </button>
          )}
        </div>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-medium border border-border bg-secondary/30 text-muted-foreground cursor-pointer mb-2 hover:bg-secondary hover:text-foreground transition-colors duration-150"
        >
          {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          {soundOn ? "Sons de feedback ativados" : "Sons de feedback desativados"}
          <span className={cn(
            "ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
            soundOn ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
          )}>
            {soundOn ? "On" : "Off"}
          </span>
        </button>


        {/* Save */}
        <button
          onClick={() => toast.success("Configurações salvas!")}
          className="w-full py-2.5 rounded-xl text-sm font-semibold gradient-brand text-primary-foreground border-none cursor-pointer mb-2"
        >
          Salvar Configurações
        </button>

        {/* Delete account */}
        <div className="border-t border-border pt-2.5 mt-2.5">
          {showDelete ? (
            <div className="p-2.5 rounded-lg bg-destructive/[0.06] border border-destructive/20">
              <p className="text-xs text-destructive mb-2 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Esta ação é IRREVERSÍVEL. Todos os seus dados serão excluídos.
              </p>
              <p className="text-[11px] text-muted-foreground mb-2">
                Digite <strong className="text-destructive">EXCLUIR MINHA CONTA</strong> para confirmar:
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-border text-foreground text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-destructive/40"
              />
              <div className="flex gap-1.5">
                <button
                  disabled={deleteInput !== "EXCLUIR MINHA CONTA"}
                  className="px-3 py-1.5 rounded text-xs bg-destructive text-destructive-foreground border-none cursor-pointer disabled:opacity-50"
                >
                  Confirmar exclusão
                </button>
                <button
                  onClick={() => setShowDelete(false)}
                  className="px-3 py-1.5 rounded text-xs border border-border bg-transparent text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDelete(true)}
              className="text-[11px] text-destructive/60 bg-transparent border-none cursor-pointer hover:text-destructive transition-colors"
            >
              Excluir minha conta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
