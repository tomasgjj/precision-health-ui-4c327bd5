import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="container flex items-center justify-between h-14">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <Mic className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm text-foreground tracking-tight">LaudoVoz</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a href="#como" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
        <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
        <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Entrar</Button>
        <Button variant="default" size="sm">Começar grátis</Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
