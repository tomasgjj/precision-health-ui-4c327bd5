import { useState } from "react";
import { Mic, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with auth
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
            <Mic className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-[16px] text-foreground tracking-[-0.01em]">LaudoVoz</span>
        </div>

        {/* Testimonial / Value prop */}
        <div className="relative z-10 max-w-md">
          <div className="surface-card rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mic className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-foreground">Gravando achados...</p>
                <p className="text-[11px] text-muted-foreground">Ultrassonografia de Abdome</p>
              </div>
              <span className="ml-auto text-[10px] text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Ao vivo
              </span>
            </div>
            <div className="space-y-2 border-t border-border/50 pt-4">
              <p className="text-[10px] font-medium text-primary uppercase tracking-wider">Fígado</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Fígado de dimensões normais, contornos regulares, ecotextura homogênea...
              </p>
            </div>
          </div>

          <blockquote className="text-[15px] text-foreground/80 leading-relaxed mb-4">
            "O LaudoVoz reduziu meu tempo de laudo em 70%. Agora consigo atender mais pacientes sem perder qualidade."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
              DR
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">Dr. Ricardo Mendes</p>
              <p className="text-[11px] text-muted-foreground">Radiologista — São Paulo, SP</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-[11px] text-muted-foreground">
          © 2025 LaudoVoz. Todos os direitos reservados.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-[16px] text-foreground tracking-[-0.01em]">LaudoVoz</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[24px] font-semibold text-foreground tracking-tight mb-1.5 drop-shadow-[0_0_12px_hsl(var(--primary)/0.3)]">
              {isSignUp ? "Criar sua conta" : "Bem-vindo de volta"}
            </h1>
            <p className="text-[14px] text-foreground/70">
              {isSignUp
                ? "Comece a criar laudos em segundos."
                : "Entre para continuar seus laudos."}
            </p>
          </div>

          {/* Google button */}
          <button className="w-full h-10 rounded-lg border border-border/80 bg-background hover:bg-accent/50 transition-colors flex items-center justify-center gap-2.5 text-[13px] font-medium text-foreground mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar com Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. João Silva"
                  className="w-full h-10 rounded-lg border border-border/80 bg-background px-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full h-10 rounded-lg border border-border/80 bg-background px-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">
                  Senha
                </label>
                {!isSignUp && (
                  <a href="#" className="text-[11px] text-primary hover:text-primary/80 transition-colors">
                    Esqueci minha senha
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 rounded-lg border border-border/80 bg-background px-3.5 pr-10 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full mt-2">
              {isSignUp ? "Criar conta" : "Entrar"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center text-[13px] text-muted-foreground mt-6">
            {isSignUp ? "Já tem conta? " : "Não tem conta? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-[10px] text-muted-foreground/60 mt-8 leading-relaxed">
            Ao continuar, você concorda com os{" "}
            <a href="#" className="underline hover:text-muted-foreground">Termos de Uso</a>
            {" "}e{" "}
            <a href="#" className="underline hover:text-muted-foreground">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
