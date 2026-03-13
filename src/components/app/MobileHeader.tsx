import { FileText, LayoutTemplate, Settings, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-12 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded gradient-brand flex items-center justify-center">
            <FileText className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground text-[13px] tracking-tight">LaudoVoz</span>
        </div>
      </header>

      {/* Bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-14 bg-background/95 backdrop-blur-md border-t border-border">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
