import { FileText, LayoutTemplate, Settings, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "laudos" | "mascaras" | "config" | "feedback";

interface MobileHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "laudos", icon: FileText, label: "Laudos" },
  { id: "mascaras", icon: LayoutTemplate, label: "Máscaras" },
  { id: "config", icon: Settings, label: "Config" },
  { id: "feedback", icon: MessageSquare, label: "Feedback" },
];

export default function MobileHeader({ activeTab, onTabChange }: MobileHeaderProps) {
  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-12 bg-card/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md gradient-brand flex items-center justify-center shadow-sm glow-primary-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
              <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-foreground text-[14px] tracking-tight">LaudoVoz</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
          Beta
        </span>
      </header>

      {/* Bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 bg-card/90 backdrop-blur-xl border-t border-border/50 pb-safe">
        {navItems.map((item) => {
          const active = item.id === "laudos" && activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all duration-200",
                active ? "text-primary" : "text-muted-foreground active:scale-95"
              )}
            >
              {active && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-primary" />
              )}
              <item.icon className={cn("w-5 h-5", active && "drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]")} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
