"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon, YouTubeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/site";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/musica", label: "Música" },
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/galeria", label: "Galería" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Cierra el menú cuando cambia la ruta (patrón de ajuste de estado durante el render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood lg:hidden"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-black transition-all duration-500 ease-out lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-steel px-4 sm:h-20 sm:px-6">
          <Image
            src="/syncrologo-cropped.svg"
            alt="SYNCRO22"
            width={940}
            height={1672}
            className="h-8 w-auto sm:h-10"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood"
            aria-label="Cerrar menú"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col justify-start gap-1 overflow-y-auto px-4 pt-4 sm:justify-center sm:gap-2 sm:px-6 sm:pt-0"
          aria-label="Menú principal"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-baseline gap-4 py-2.5 transition-all duration-300 sm:py-3",
                pathname === item.href ? "text-blood" : "text-bone hover:text-blood"
              )}
            >
              <span className="tech-label text-smoke">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display-title text-3xl uppercase sm:text-4xl">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-between border-t border-steel px-4 py-4 sm:px-6 sm:py-6">
          <span className="tech-label text-smoke">SEGUINOS</span>
          <div className="flex items-center gap-2">
            {socialLinks.facebook ? (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood"
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
                className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood"
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
                className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood"
                aria-label="Instagram de SYNCRO22"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}