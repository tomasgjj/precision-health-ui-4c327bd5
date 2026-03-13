import { Mic } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Mic className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">LaudoVoz</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#como" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
          <a href="#recursos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
          <a href="#precos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Preços</a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LaudoVoz. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
