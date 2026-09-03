import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { InstagramIcon } from "@/components/ui/icons";
import { socialLinks } from "@/lib/site";

const navItems = [
  { href: "/musica", label: "Música" },
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/galeria", label: "Galería" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-6">
            <Logo size="sm" />
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3" aria-label="Navegación del footer">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tech-label text-fog transition-colors duration-300 hover:text-blood"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <span className="tech-label text-smoke">SEGUINOS</span>
            <div className="flex items-center gap-3">
              {socialLinks.instagram ? (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                  aria-label="Instagram de SYNCRO22"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-steel/60 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <p className="tech-label text-smoke">
            © {year} SYNCRO22. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="tech-label text-[0.625rem] text-smoke/70">DEV BY MR.</p>
        </div>
      </div>
    </footer>
  );
}