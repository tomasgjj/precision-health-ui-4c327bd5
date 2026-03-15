import { useState, useRef } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const TwoFactor = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
    });
    setCode(newCode);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: verify 2FA code
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <img src={logoImg} alt="Radiktor" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold text-[16px] text-foreground tracking-[-0.01em]">Radiktor</span>
        </div>

        {/* Card */}
        <div className="surface-card rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-5 h-5 text-primary" />
          </div>

          <h1 className="text-[20px] font-semibold text-foreground tracking-tight mb-1.5">
            Verificação em dois fatores
          </h1>
          <p className="text-[13px] text-muted-foreground mb-8">
            Digite o código de 6 dígitos do seu aplicativo autenticador
          </p>

          {/* OTP Input */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2.5 mb-8" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 rounded-lg border border-border/80 bg-background text-center text-[22px] font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                />
              ))}
            </div>

            <Button variant="hero" className="w-full mb-4">
              Verificar
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>

          <button className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
