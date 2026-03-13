import { Mic } from "lucide-react";

const footerLinks = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#como" },
      { label: "Recursos", href: "#recursos" },
      { label: "Preços", href: "#precos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos de uso", href: "#" },
      { label: "LGPD", href: "#" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border/50 pt-16 pb-8">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/90 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-[15px] text-foreground tracking-[-0.01em]">LaudoVoz</span>
          </a>
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[200px]">
            Laudos médicos com precisão de IA, feitos para o radiologista moderno.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="text-[12px] font-semibold text-foreground mb-4 uppercase tracking-wider">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} LaudoVoz. Todos os direitos reservados.
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          Feito com precisão para a medicina.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
