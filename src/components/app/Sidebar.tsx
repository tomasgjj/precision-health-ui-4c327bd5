import { FileText, Clock, LayoutTemplate, Settings, LogOut, Search, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "laudos" | "historico" | "mascaras" | "config";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "laudos", label: "Laudos", icon: FileText },
  { id: "historico", label: "Histórico", icon: Clock },
  { id: "mascaras", label: "Máscaras", icon: LayoutTemplate },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "config", label: "Configurações", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 h-screen sticky top-0 bg-sidebar border-r border-border select-none">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-[52px] border-b border-border">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
            <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-semibold text-[14px] text-foreground tracking-tight">LaudoVoz</span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1">
        <button className="flex items-center gap-2 w-full px-2.5 py-[7px] rounded-lg text-[12px] text-muted-foreground bg-secondary/50 border border-border hover:bg-secondary hover:text-foreground transition-colors duration-150">
          <Search className="w-3.5 h-3.5" />
          <span>Buscar...</span>
          <kbd className="ml-auto text-[10px] text-muted-foreground/60 font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-px px-3 pt-2">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em] px-2.5 mb-1">Menu</p>
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex items-center gap-2 px-2.5 py-[7px] rounded-lg text-[13px] font-medium transition-colors duration-150",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span>{item.label}</span>
              {item.id === "laudos" && (
                <span className="ml-auto text-[10px] font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>


      {/* User */}
      <div className="px-3 py-2.5 border-t border-border">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
          <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-primary">DR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">Dr. Exemplo</p>
            <p className="text-[10px] text-muted-foreground truncate">exemplo@email.com</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </aside>
  );
}
