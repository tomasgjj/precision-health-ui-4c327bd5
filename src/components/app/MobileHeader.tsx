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
    <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
          <FileText className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground text-sm tracking-tight">LaudoVoz</span>
      </div>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                active
                  ? "bg-brand-light/12 text-brand-light"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </header>
  );
}
