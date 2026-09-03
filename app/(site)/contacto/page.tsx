import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto de SYNCRO22.",
};

export default function ContactoPage() {
  const hasContactInfo = Boolean(site.contactEmail || site.bookingEmail);

  return (
    <>
      <PageHeader
        index="06"
        title="Contacto"
        description="Contacto para booking, prensa y gestión."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {!hasContactInfo ? (
          <EmptyState
            title="Contacto en preparación"
            description="Los canales de contacto de SYNCRO22 se publicarán aquí cuando estén disponibles."
          />
        ) : (
          <p>Contacto próximamente.</p>
        )}
      </section>
    </>
  );
}