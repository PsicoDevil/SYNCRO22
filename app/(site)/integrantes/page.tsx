import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { MemberSelect } from "@/components/integrantes/MemberSelect";
import { members } from "@/content/members";
import { siteNavigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrantes",
  description: "Los integrantes de SYNCRO22.",
};

export default function IntegrantesPage() {
  return (
    <>
      <PageHeader
        index={siteNavigation.integrantes.index}
        title="Integrantes"
        description="Los integrantes de SYNCRO22."
      />

      <section
        className="relative overflow-hidden bg-black py-16 sm:py-24"
        aria-label="Integrantes de SYNCRO22"
      >
        {/* Luz ambiental — misma gramática visual que el resto del sitio */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,4,41,0.08),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {members.length === 0 ? (
            <EmptyState
              title="Fichas en preparación"
              description="Los perfiles de los integrantes de SYNCRO22 se publicarán aquí."
            />
          ) : (
            <MemberSelect members={members} />
          )}
        </div>
      </section>
    </>
  );
}
