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
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
                <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-[14px] text-foreground tracking-tight">LaudoVoz</span>
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
          © {new Date().getFullYear()} LaudoVoz. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
