import { Mic } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
          <Mic className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-foreground">LaudoVoz</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} LaudoVoz. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
