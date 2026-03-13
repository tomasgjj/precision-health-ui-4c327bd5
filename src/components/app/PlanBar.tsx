import { Progress } from "@/components/ui/progress";

interface PlanBarProps {
  used: number;
  total: number;
  plan: "free" | "pro";
}

export default function PlanBar({ used, total, plan }: PlanBarProps) {
  const pct = Math.min((used / total) * 100, 100);

  return (
    <div className="surface-glass rounded-xl px-4 py-3 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Plano {plan === "free" ? "Free" : "Pro"}
          </span>
          <span className="text-xs text-muted-foreground">
            {used}/{total} laudos
          </span>
        </div>
        <Progress value={pct} className="h-1.5 bg-muted" />
      </div>

      {plan === "free" && (
        <button className="gradient-brand text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:opacity-90 transition-opacity">
          Assinar Pro
        </button>
      )}
    </div>
  );
}
