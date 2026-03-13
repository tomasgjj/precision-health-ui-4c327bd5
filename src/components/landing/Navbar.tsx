import { Mic, Stethoscope, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="container flex items-center justify-between h-16">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
          <Mic className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg text-foreground">LaudoVoz</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#como" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
        <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
        <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Entrar</Button>
        <Button variant="hero" size="sm">Começar grátis</Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
