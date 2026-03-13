import { Mic } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container max-w-[960px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
          <Mic className="w-3 h-3 text-primary-foreground" />
        </div>
        <span className="font-medium text-xs text-foreground">LaudoVoz</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} LaudoVoz. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
