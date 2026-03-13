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
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-card border border-border">
        <div className="w-5 h-5 rounded bg-accent/15 flex items-center justify-center">
          <Crown className="w-3 h-3 text-accent" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground font-medium">Plano</span>
            <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-semibold uppercase">Pro</span>
          </div>
          <span className="text-[11px] text-muted-foreground">Laudos ilimitados</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card border border-border p-3 flex items-center justify-between gap-3">
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground font-medium">Plano Gratuito</span>
          <span className={`text-[11px] font-mono font-semibold ${isLow ? "text-warning" : "text-muted-foreground"}`}>
            {used}/{total}
          </span>
        </div>
        <div className="text-[13px] font-semibold text-foreground">
          <span className="text-primary">{remaining}</span> laudos restantes
        </div>
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isLow ? "bg-warning" : "bg-primary"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold border-none cursor-pointer whitespace-nowrap shrink-0 hover:bg-primary/90 transition-colors duration-150">
        <Zap className="w-3 h-3" />
        Assinar Pro
      </button>
    </div>
  );
}
