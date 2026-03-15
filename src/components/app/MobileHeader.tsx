import { FileText, Clock, LayoutTemplate, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

type Tab = "dashboard" | "laudos" | "historico" | "mascaras" | "config";

interface MobileHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: "laudos", icon: FileText, label: "Laudos" },
  { id: "historico", icon: Clock, label: "Histórico" },
  { id: "mascaras", icon: LayoutTemplate, label: "Máscaras" },
  { id: "dashboard", icon: BarChart3, label: "Dashboard" },
  { id: "config", icon: Settings, label: "Config" },
];

export default function MobileHeader({ activeTab, onTabChange }: MobileHeaderProps) {
  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-11 bg-background border-b border-border">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="LaudoVoz" className="w-5 h-5 rounded" />
          <span className="font-semibold text-foreground text-[13px] tracking-tight">LaudoVoz</span>
        </div>
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
