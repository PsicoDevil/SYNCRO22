"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/site";

const navItems = [
  { href: "/musica", label: "Música" },
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/galeria", label: "Galería" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-steel/60 bg-black/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "tech-label transition-colors duration-300 hover:text-blood",
                pathname === item.href ? "text-blood" : "text-fog"
              )}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {socialLinks.facebook ? (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 w-11 items-center justify-center text-fog transition-colors duration-300 hover:text-blood lg:inline-flex"
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
              className="hidden h-11 w-11 items-center justify-center text-fog transition-colors duration-300 hover:text-blood lg:inline-flex"
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
              className="hidden h-11 w-11 items-center justify-center text-fog transition-colors duration-300 hover:text-blood lg:inline-flex"
              aria-label="Instagram de SYNCRO22"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          ) : null}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}