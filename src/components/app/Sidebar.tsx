import { FileText, LayoutTemplate, Settings, MessageSquare, LogOut, Search, Plus, Moon, Sun, Monitor, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type AppTheme } from "@/hooks/use-theme";

type Tab = "laudos" | "mascaras" | "config" | "feedback";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "laudos", label: "Laudos", icon: FileText },
  { id: "mascaras", label: "Máscaras", icon: LayoutTemplate },
  { id: "config", label: "Configurações", icon: Settings },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
];

const themes: { id: AppTheme; label: string; icon: React.ElementType }[] = [
  { id: "midnight", label: "Dark", icon: Moon },
  { id: "ocean", label: "Ocean", icon: Sparkles },
  { id: "light", label: "Light", icon: Sun },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 bg-card/80 backdrop-blur-xl border-r border-border/50 select-none relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

      {/* Logo */}
      <div className="relative flex items-center gap-3 px-5 h-14 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shadow-sm glow-primary-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
            <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-bold text-[15px] text-foreground tracking-tight">LaudoVoz</span>
        <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
          Beta
        </span>
      </div>

      {/* Quick action */}
      <div className="relative px-3 pt-4 pb-2">
        <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl surface-glass text-[13px] text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 group">
          <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span>Buscar...</span>
          <kbd className="ml-auto text-[10px] text-muted-foreground/50 bg-background/50 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 flex flex-col gap-0.5 px-3 pt-1">
        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.15em] px-3 mb-1">Menu</p>
        {navItems.map((item) => {
          const active = activeTab === item.id && item.id === "laudos";
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150",
                active
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-primary" />
              )}
              <item.icon className={cn(
                "w-[18px] h-[18px] transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === "laudos" && (
                <span className="text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-md">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme */}
      <div className="relative px-3 py-3 border-t border-border/50">
        <div className="flex items-center gap-0.5 p-1 rounded-xl bg-background/50 border border-border/50">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200",
                theme === t.id
                  ? "bg-secondary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={t.label}
            >
              <t.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      {/* User */}
      <div className="relative px-3 py-3 border-t border-border/50">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-bold text-primary-foreground">DR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-foreground truncate">Dr. Exemplo</p>
            <p className="text-[10px] text-muted-foreground truncate">exemplo@email.com</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </aside>
  );
}
