import { Zap, Crown } from "lucide-react";

interface PlanBarProps {
  used: number;
  total: number;
  plan: "free" | "pro";
}

export default function PlanBar({ used, total, plan }: PlanBarProps) {
  const remaining = total - used;
  const pct = Math.min((used / total) * 100, 100);
  const isLow = pct > 70;

  if (plan === "pro") {
    return (
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl surface-glass border-accent/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg gradient-purple flex items-center justify-center">
            <Crown className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Plano</span>
              <span className="px-1.5 py-0.5 rounded-md gradient-brand text-primary-foreground text-[9px] font-bold uppercase tracking-wider">Pro</span>
            </div>
            <span className="text-[11px] text-accent">Laudos ilimitados</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-glass rounded-xl p-3.5 flex items-center justify-between gap-3">
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Plano Gratuito</span>
          <span className={`text-[11px] font-mono font-bold ${isLow ? "text-warning" : "text-muted-foreground"}`}>
            {used}/{total}
          </span>
        </div>
        <div className="text-[13px] font-bold text-foreground">
          <span className="text-primary">{remaining}</span> laudos restantes
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${isLow ? "bg-warning" : "bg-primary"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-brand text-primary-foreground text-[11px] font-bold border-none cursor-pointer whitespace-nowrap shrink-0 hover:shadow-lg hover:-translate-y-px transition-all duration-200 glow-primary-sm">
        <Zap className="w-3.5 h-3.5" />
        Assinar Pro
      </button>
    </div>
  );
}
