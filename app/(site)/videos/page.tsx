import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { videos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Videos",
  description: "Videos oficiales de SYNCRO22.",
};

export default function VideosPage() {
  return (
    <>
      <PageHeader
        index="02"
        title="Videos"
        description="Videos oficiales, lyric videos y presentaciones en vivo de SYNCRO22."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {videos.length === 0 ? (
          <EmptyState
            title="Videos en preparación"
            description="Los videos oficiales de SYNCRO22 se publicarán aquí cuando estén disponibles."
          />
        ) : (
          <p>Videos próximamente.</p>
        )}
      </section>
    </>
  );
}