import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center text-center">
        <p className="tech-label text-blood">ERROR 404</p>
        <h1 className="display-title mt-6 text-[clamp(4rem,15vw,10rem)] text-bone">
          PERDIDO
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-fog sm:text-base">
          La página que buscás no existe o fue movida. Volvé al inicio.
        </p>
        <div className="mt-10">
          <Button href="/" size="lg">
            VOLVER AL INICIO
          </Button>
        </div>
      </div>
    </section>
  );
}