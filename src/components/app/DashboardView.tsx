import { useState } from "react";
import {
  FileText, Clock, Flame, Zap, Target, TrendingUp, TrendingDown,
  Award, BarChart3, Type, CheckCircle2, Calendar
} from "lucide-react";

type Period = "7d" | "30d" | "3m";

const mockData = {
  "7d": {
    today: 7,
    avgTime: "2:34",
    streak: 5,
    timeSaved: 42, // minutos
    dailyGoal: { current: 7, target: 10 },
    correctionRate: 12, // %
    wordsDictated: 4820,
    totalReports: [3, 5, 7, 9, 4, 6, 7],
    dayLabels: ["S", "T", "Q", "Q", "S", "S", "D"],
    prevPeriodTotal: 34,
    currentPeriodTotal: 41,
    peakHours: [
      [0, 0, 0, 0, 0, 0, 1, 3, 7, 9, 5, 4, 2, 3, 6, 8, 5, 3, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 6, 8, 7, 3, 1, 4, 7, 9, 6, 2, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 4, 8, 10, 6, 5, 3, 2, 5, 7, 4, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 3, 7, 9, 8, 4, 2, 3, 6, 8, 5, 3, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 5, 7, 4, 3, 1, 2, 4, 6, 3, 1, 0, 0, 0, 0, 0, 0],
    ],
    peakDayLabels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    byType: [
      { name: "USG Abdome", count: 18, color: "bg-primary" },
      { name: "Tireoide", count: 12, color: "bg-accent" },
      { name: "USG Mama", count: 7, color: "bg-success" },
    ],
    topMasks: [
      { name: "USG Abdome Total", uses: 18, pct: 44 },
      { name: "Tireoide com Doppler", uses: 12, pct: 29 },
      { name: "USG Mama Bilateral", uses: 7, pct: 17 },
    ],
    allTimeTotal: 847,
    milestone: { current: 847, next: 1000, label: "1.000 laudos!" },
  },
  "30d": {
    today: 7,
    avgTime: "2:48",
    streak: 5,
    timeSaved: 186,
    dailyGoal: { current: 7, target: 10 },
    correctionRate: 14,
    wordsDictated: 21400,
    totalReports: [22, 28, 35, 30],
    dayLabels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    prevPeriodTotal: 98,
    currentPeriodTotal: 115,
    peakHours: [
      [0, 0, 0, 0, 0, 0, 2, 8, 18, 24, 14, 10, 5, 8, 16, 22, 12, 6, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 6, 15, 21, 16, 8, 4, 10, 18, 24, 14, 5, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 3, 10, 20, 28, 16, 12, 7, 6, 14, 20, 10, 5, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 7, 17, 23, 18, 9, 5, 8, 15, 21, 11, 6, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 5, 12, 18, 10, 7, 3, 5, 10, 16, 8, 3, 1, 0, 0, 0, 0, 0],
    ],
    peakDayLabels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    byType: [
      { name: "USG Abdome", count: 52, color: "bg-primary" },
      { name: "Tireoide", count: 35, color: "bg-accent" },
      { name: "USG Mama", count: 28, color: "bg-success" },
    ],
    topMasks: [
      { name: "USG Abdome Total", uses: 52, pct: 45 },
      { name: "Tireoide com Doppler", uses: 35, pct: 30 },
      { name: "USG Mama Bilateral", uses: 28, pct: 24 },
    ],
    allTimeTotal: 847,
    milestone: { current: 847, next: 1000, label: "1.000 laudos!" },
  },
  "3m": {
    today: 7,
    avgTime: "2:52",
    streak: 5,
    timeSaved: 540,
    dailyGoal: { current: 7, target: 10 },
    correctionRate: 16,
    wordsDictated: 62000,
    totalReports: [85, 102, 98, 88, 95, 110, 92, 105, 98, 112, 108, 115],
    dayLabels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    prevPeriodTotal: 280,
    currentPeriodTotal: 335,
    peakHours: [
      [0, 0, 0, 0, 0, 1, 5, 20, 45, 60, 35, 25, 12, 20, 40, 55, 30, 15, 5, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 3, 15, 38, 52, 40, 20, 10, 25, 45, 58, 32, 12, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 6, 22, 50, 65, 38, 28, 15, 15, 35, 50, 25, 10, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 18, 42, 58, 42, 22, 12, 20, 38, 52, 28, 14, 5, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 4, 12, 30, 42, 25, 18, 8, 12, 25, 38, 18, 8, 2, 0, 0, 0, 0, 0],
    ],
    peakDayLabels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    byType: [
      { name: "USG Abdome", count: 156, color: "bg-primary" },
      { name: "Tireoide", count: 98, color: "bg-accent" },
      { name: "USG Mama", count: 81, color: "bg-success" },
    ],
    topMasks: [
      { name: "USG Abdome Total", uses: 156, pct: 47 },
      { name: "Tireoide com Doppler", uses: 98, pct: 29 },
      { name: "USG Mama Bilateral", uses: 81, pct: 24 },
    ],
    allTimeTotal: 847,
    milestone: { current: 847, next: 1000, label: "1.000 laudos!" },
  },
};

const periodLabels: Record<Period, string> = {
  "7d": "7 dias",
  "30d": "30 dias",
  "3m": "3 meses",
};

function formatNumber(n: number) {
  return n.toLocaleString("pt-BR");
}

function GoalRing({ current, target }: { current: number; target: number }) {
  const pct = Math.min((current / target) * 100, 100);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[72px] h-[72px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="4"
        />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-foreground tabular-nums">{current}</span>
        <span className="text-[9px] text-muted-foreground">/{target}</span>
      </div>
    </div>
  );
}

function TrendBadge({ current, previous }: { current: number; previous: number }) {
  const diff = current - previous;
  const pct = previous > 0 ? Math.round((diff / previous) * 100) : 0;
  const isUp = diff >= 0;

  return (
    <div className={`inline-flex items-center gap-0.5 text-[11px] font-medium tabular-nums ${isUp ? "text-success" : "text-destructive"}`}>
      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {isUp ? "+" : ""}{pct}%
    </div>
  );
}

function HeatmapGrid({ data, dayLabels }: { data: number[][]; dayLabels: string[] }) {
  const maxVal = Math.max(...data.flat());
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const visibleHours = hours.filter((h) => h >= 6 && h <= 20);

  return (
    <div className="space-y-0.5">
      <div className="flex gap-0.5">
        <div className="w-7" />
        {visibleHours.map((h) => (
          <div key={h} className="flex-1 text-center text-[8px] text-muted-foreground/50 tabular-nums">
            {h}h
          </div>
        ))}
      </div>
      {data.map((row, di) => (
        <div key={di} className="flex gap-0.5 items-center">
          <div className="w-7 text-[9px] text-muted-foreground/60 text-right pr-1">{dayLabels[di]}</div>
          {visibleHours.map((h) => {
            const val = row[h];
            const opacity = maxVal > 0 ? val / maxVal : 0;
            return (
              <div
                key={h}
                className="flex-1 aspect-square rounded-[2px] transition-colors"
                style={{
                  backgroundColor: opacity > 0
                    ? `hsl(var(--primary) / ${Math.max(0.08, opacity * 0.9)})`
                    : "hsl(var(--muted) / 0.3)",
                }}
                title={`${dayLabels[di]} ${h}h: ${val} laudos`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function DashboardView() {
  const [period, setPeriod] = useState<Period>("7d");
  const d = mockData[period];
  const maxBar = Math.max(...d.totalReports);
  const milestonePct = Math.round((d.milestone.current / d.milestone.next) * 100);

  return (
    <div className="space-y-4">
      {/* Period selector */}
      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/50 w-fit">
        {(["7d", "30d", "3m"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
              period === p
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>

      {/* Row 1: Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Hoje</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{d.today}</div>
          <div className="text-[10px] text-muted-foreground">laudos</div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Média</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{d.avgTime}</div>
          <div className="text-[10px] text-muted-foreground">por laudo</div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Streak</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{d.streak}</div>
          <div className="text-[10px] text-muted-foreground">dias</div>
        </div>

        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Economizado</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{d.timeSaved}<span className="text-sm font-normal text-muted-foreground">min</span></div>
          <div className="text-[10px] text-muted-foreground">vs digitação</div>
        </div>
      </div>

      {/* Row 2: Goal ring + Quality metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Daily goal */}
        <div className="rounded-lg bg-card border border-border p-3 flex items-center gap-3">
          <GoalRing current={d.dailyGoal.current} target={d.dailyGoal.target} />
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Target className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Meta diária</span>
            </div>
            <div className="text-[12px] text-secondary-foreground">
              {d.dailyGoal.current} de {d.dailyGoal.target} laudos
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {d.dailyGoal.current >= d.dailyGoal.target ? "🎉 Meta batida!" : `Faltam ${d.dailyGoal.target - d.dailyGoal.current}`}
            </div>
          </div>
        </div>

        {/* Correction rate */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Taxa de correção</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{d.correctionRate}%</div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${100 - d.correctionRate}%` }}
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{100 - d.correctionRate}% sem correção</div>
        </div>

        {/* Words dictated */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Type className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Palavras ditadas</span>
          </div>
          <div className="text-xl font-bold text-foreground tabular-nums">{formatNumber(d.wordsDictated)}</div>
          <div className="text-[10px] text-muted-foreground">no período</div>
        </div>
      </div>

      {/* Row 3: Chart + Comparativo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Bar chart */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Últimos {periodLabels[period]}
            </div>
            <TrendBadge current={d.currentPeriodTotal} previous={d.prevPeriodTotal} />
          </div>
          <div className="flex items-end gap-1 h-16">
            {d.totalReports.map((val, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/25 rounded-sm transition-all hover:bg-primary/45"
                style={{ height: `${(val / maxBar) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {d.dayLabels.map((label, i) => (
              <span key={i} className="flex-1 text-center text-[8px] text-muted-foreground/50">{label}</span>
            ))}
          </div>
        </div>

        {/* Comparativo */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-3">Comparativo</div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-muted-foreground">Período atual</span>
                <span className="text-foreground font-semibold tabular-nums">{d.currentPeriodTotal}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(d.currentPeriodTotal / Math.max(d.currentPeriodTotal, d.prevPeriodTotal)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-muted-foreground">Período anterior</span>
                <span className="text-foreground font-semibold tabular-nums">{d.prevPeriodTotal}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-muted-foreground/30 rounded-full transition-all duration-500"
                  style={{ width: `${(d.prevPeriodTotal / Math.max(d.currentPeriodTotal, d.prevPeriodTotal)) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1 border-t border-border">
              <TrendBadge current={d.currentPeriodTotal} previous={d.prevPeriodTotal} />
              <span className="text-[10px] text-muted-foreground">vs período anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Heatmap */}
      <div className="rounded-lg bg-card border border-border p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Horários de pico</span>
        </div>
        <HeatmapGrid data={d.peakHours} dayLabels={d.peakDayLabels} />
      </div>

      {/* Row 5: By type + Top masks + All-time */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* By type */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Por tipo</span>
          </div>
          <div className="space-y-1.5">
            {d.byType.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-[12px]">
                <div className={`w-1.5 h-1.5 rounded-full ${t.color}`} />
                <span className="flex-1 text-secondary-foreground">{t.name}</span>
                <span className="text-muted-foreground font-medium tabular-nums">{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top masks */}
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2">Máscaras mais usadas</div>
          <div className="space-y-2">
            {d.topMasks.map((m, i) => (
              <div key={m.name}>
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                  <span className="text-secondary-foreground flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground/60 font-medium tabular-nums">#{i + 1}</span>
                    {m.name}
                  </span>
                  <span className="text-muted-foreground tabular-nums">{m.pct}%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/50 rounded-full transition-all duration-500"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All-time milestone */}
        <div className="rounded-lg bg-card border border-border p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Total all-time</span>
            </div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{formatNumber(d.allTimeTotal)}</div>
            <div className="text-[10px] text-muted-foreground">laudos gerados</div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
              <span>Próximo marco</span>
              <span className="font-medium">{d.milestone.label}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
                style={{ width: `${milestonePct}%` }}
              />
            </div>
            <div className="text-[9px] text-muted-foreground/60 mt-0.5 tabular-nums">{milestonePct}% concluído</div>
          </div>
        </div>
      </div>
    </div>
  );
}
