import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md";
}

/**
 * Logo oficial de SYNCRO22.
 * Asset: /syncrologo-cropped.svg
 * NO redibujar, NO modificar trazados, NO cambiar colores, NO deformar.
 * Solo se ajusta el tamaño del contenedor manteniendo la proporción original.
 */
export function Logo({ className, size = "sm" }: LogoProps) {
  // Mobile-first: compacto en teléfono, escala progresiva hasta el desktop aprobado.
  const heightClass =
    size === "sm" ? "h-6 w-auto sm:h-8 lg:h-10" : "h-8 w-auto sm:h-12";

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="SYNCRO22 — Inicio"
    >
      <Image
        src="/syncrologo-cropped.svg"
        alt="SYNCRO22"
        width={940}
        height={1672}
        className={cn("transition-opacity duration-300 group-hover:opacity-80", heightClass)}
        priority={false}
      />
    </Link>
  );
}
