import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { internalNavigationItems as navItems, socialLinks } from "@/lib/site";

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
              {socialLinks.facebook ? (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                  aria-label="Facebook de SYNCRO22"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              ) : null}
              {socialLinks.youtube ? (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                  aria-label="YouTube de SYNCRO22"
                >
                  <YouTubeIcon className="h-5 w-5" />
                </a>
              ) : null}
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
              {socialLinks.spotify ? (
                <a
                  href={socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                  aria-label="Spotify de SYNCRO22"
                >
                  <SpotifyIcon className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-steel/60 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <p className="tech-label text-smoke">
            © {year} SYNCRO22. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <a
            href="https://mrportfolio-seven.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio de MR (se abre en una pestaña nueva)"
            className="tech-label text-[0.625rem] text-smoke/70 transition-colors duration-300 hover:text-fog"
          >
            DEV BY MR.
          </a>
        </div>
      </div>
    </footer>
  );
}
