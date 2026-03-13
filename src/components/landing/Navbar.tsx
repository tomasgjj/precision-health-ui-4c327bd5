import { Mic, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Mic className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">LaudoVoz</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#como" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
          <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
          <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button variant="hero" size="sm">Começar grátis</Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            <a href="#como" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Como funciona</a>
            <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Recursos</a>
            <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Preços</a>
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">Entrar</Button>
              <Button variant="hero" size="sm" className="flex-1">Começar grátis</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
