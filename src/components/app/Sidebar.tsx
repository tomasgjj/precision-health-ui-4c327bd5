import { FileText, LayoutTemplate, Settings, MessageSquare, LogOut, Search, Plus, ChevronDown, Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type AppTheme } from "@/hooks/use-theme";

type Tab = "laudos" | "mascaras" | "config" | "feedback";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: React.ElementType; shortcut?: string }[] = [
  { id: "laudos", label: "Laudos", icon: FileText, shortcut: "⌘ 1" },
  { id: "mascaras", label: "Máscaras", icon: LayoutTemplate, shortcut: "⌘ 2" },
  { id: "config", label: "Configurações", icon: Settings, shortcut: "⌘ ," },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
];

const themes: { id: AppTheme; label: string; icon: React.ElementType; color: string }[] = [
  { id: "midnight", label: "Midnight", icon: Moon, color: "bg-blue-500" },
  { id: "ocean", label: "Ocean", icon: Monitor, color: "bg-teal-500" },
  { id: "light", label: "Light", icon: Sun, color: "bg-amber-400" },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 h-screen sticky top-0 bg-sidebar border-r border-border select-none">
      {/* Workspace header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded gradient-brand flex items-center justify-center">
            <FileText className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-[13px] font-semibold text-foreground tracking-tight">LaudoVoz</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-3 pt-3 pb-1 space-y-1">
        <button className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Buscar</span>
          <kbd className="ml-auto text-[10px] text-muted-foreground/60 bg-secondary/80 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>
        <button className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          <span>Novo laudo</span>
          <kbd className="ml-auto text-[10px] text-muted-foreground/60 bg-secondary/80 px-1.5 py-0.5 rounded font-mono">⌘N</kbd>
        </button>
      </div>

      <div className="px-3 py-1.5">
        <div className="h-px bg-border" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-100",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && (
                <span className="text-[10px] text-muted-foreground/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.shortcut}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme switcher */}
      <div className="px-3 py-2 border-t border-border">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 mb-1.5">Tema</p>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-secondary/40">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium transition-all",
                theme === t.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={t.label}
            >
              <t.icon className="w-3 h-3" />
              <span className="hidden xl:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-border space-y-1">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">DR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">Dr. Exemplo</p>
            <p className="text-[10px] text-muted-foreground truncate">exemplo@email.com</p>
          </div>
        </div>
        <button className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md text-[12px] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
