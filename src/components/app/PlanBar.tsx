import { Zap } from "lucide-react";

interface PlanBarProps {
  used: number;
  total: number;
  plan: "free" | "pro";
}

export default function PlanBar({ used, total, plan }: PlanBarProps) {
  const pct = Math.min((used / total) * 100, 100);
  const isLow = pct > 80;

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            {plan === "free" ? "Free" : "Pro"}
          </span>
          <span className={`text-[11px] font-mono ${isLow ? "text-warning" : "text-muted-foreground"}`}>
            {used}/{total}
          </span>
        </div>
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isLow ? "bg-warning" : "bg-primary"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {plan === "free" && (
        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
          <Zap className="w-3 h-3" />
          Upgrade
        </button>
      )}
    </div>
  );
}
