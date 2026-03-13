import { FileText, Clock, LayoutTemplate, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "laudos" | "historico" | "mascaras" | "config";

interface MobileHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "dashboard", icon: BarChart3, label: "Dashboard" },
  { id: "laudos", icon: FileText, label: "Laudos" },
  { id: "historico", icon: Clock, label: "Histórico" },
  { id: "mascaras", icon: LayoutTemplate, label: "Máscaras" },
  { id: "config", icon: Settings, label: "Config" },
];

export default function MobileHeader({ activeTab, onTabChange }: MobileHeaderProps) {
  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-11 bg-background border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
              <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-semibold text-foreground text-[13px] tracking-tight">LaudoVoz</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider text-primary bg-primary/10">
          Beta
        </span>
      </header>

      {/* Bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-14 bg-background border-t border-border pb-safe">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1.5 px-4 transition-colors duration-150",
                active ? "text-primary" : "text-muted-foreground active:text-foreground"
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
