"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon, YouTubeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { navigationItems as navItems, socialLinks } from "@/lib/site";

// El portal se monta tras hidratar, conservando el mismo HTML inicial del servidor.
const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isHydrated = useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getServerSnapshot);

  // Cierra el menú cuando cambia la ruta (patrón de ajuste de estado durante el render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!panelRef.current?.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood lg:hidden"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Fuera del header: su backdrop-filter al hacer scroll contiene a los fixed descendientes. */}
      {isHydrated ? createPortal(<div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-label="Menú de navegación"
        aria-modal={isOpen ? true : undefined}
        className={cn(
          "fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-black transition-all duration-500 ease-out lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isOpen}
        inert={!isOpen}
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
            ref={closeRef}
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center text-bone transition-colors hover:text-blood"
            aria-label="Cerrar menú"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col justify-start gap-1 overflow-y-auto overscroll-contain px-4 pt-4 sm:justify-center-safe sm:gap-2 sm:px-6 sm:pt-0"
          aria-label="Menú principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "group flex items-baseline gap-4 py-2.5 transition-all duration-300 sm:py-3",
                pathname === item.href ? "text-blood" : "text-bone hover:text-blood"
              )}
            >
              <span className="tech-label text-smoke">
                {item.index}
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
      </div>, document.body) : null}
    </>
  );
}
