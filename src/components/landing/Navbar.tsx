import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Como funciona", href: "#como" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "Segurança", href: "#seguranca" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30">
      <div className="bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2.5">
            <img src={logoImg} alt="Radiktor" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-[14px] text-foreground tracking-tight">Radiktor</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a href="/login" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex px-3 py-1.5">
              Entrar
            </a>
            <button className="h-8 px-4 rounded-lg text-[12px] font-semibold bg-primary text-primary-foreground border-none cursor-pointer hover:shadow-md transition-all duration-200 flex items-center gap-1.5">
              Começar grátis
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                {mobileOpen ? (
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                ) : (
                  <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl animate-slide-in">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
