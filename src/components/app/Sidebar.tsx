import { FileText, LayoutTemplate, Settings, MessageSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-[210px] shrink-0 h-screen sticky top-0 bg-card/95 backdrop-blur-xl border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 h-14 border-b border-border">
        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
          <FileText className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground tracking-tight">LaudoVoz</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-brand-light/12 text-brand-light"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full">
          <LogOut className="w-[18px] h-[18px]" />
          Sair
        </button>
      </div>
    </aside>
  );
}
