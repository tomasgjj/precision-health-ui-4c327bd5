import logoImg from "@/assets/logo.png";

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
  <footer className="border-t border-border/30 pt-14 pb-8">
    <div className="container max-w-[960px] mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-2.5 mb-4">
            <img src={logoImg} alt="Radiktor" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-[14px] text-foreground tracking-tight">Radiktor</span>
          </a>
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[200px]">
            Laudos médicos com precisão de IA.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-semibold text-muted-foreground mb-4 uppercase tracking-widest">{col.title}</h4>
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

      <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground/50">
          © {new Date().getFullYear()} Radiktor. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
