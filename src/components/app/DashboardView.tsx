import { FileText, Clock, Flame } from "lucide-react";

const mockMetrics = {
  today: 7,
  avgTime: "2:34",
  streak: 5,
  byType: [
    { name: "USG Abdome", count: 4, color: "bg-primary" },
    { name: "Tireoide", count: 2, color: "bg-accent" },
    { name: "USG Mama", count: 1, color: "bg-success" },
  ],
  last7: [3, 5, 7, 9, 4, 6, 7],
};

export default function DashboardView() {
  const maxBar = Math.max(...mockMetrics.last7);

  return (
    <div className="space-y-3">
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Hoje</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{mockMetrics.today}</div>
          <div className="text-[10px] text-muted-foreground">laudos</div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Média</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{mockMetrics.avgTime}</div>
          <div className="text-[10px] text-muted-foreground">por laudo</div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Streak</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{mockMetrics.streak}</div>
          <div className="text-[10px] text-muted-foreground">dias</div>
        </div>
      </div>

      {/* By type + mini chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* By type */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2">Por tipo</div>
          <div className="space-y-1.5">
            {mockMetrics.byType.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-[12px]">
                <div className={`w-1.5 h-1.5 rounded-full ${t.color}`} />
                <span className="flex-1 text-secondary-foreground">{t.name}</span>
                <span className="text-muted-foreground font-medium tabular-nums">{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2">Últimos 7 dias</div>
          <div className="flex items-end gap-1.5 h-12">
            {mockMetrics.last7.map((val, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 rounded-sm transition-all hover:bg-primary/50"
                style={{ height: `${(val / maxBar) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
              <span key={i} className="flex-1 text-center text-[9px] text-muted-foreground/60">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
