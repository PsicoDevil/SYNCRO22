import type { Member } from "@/content/types";
import { cn } from "@/lib/utils";

interface MemberBioProps {
  member: Member;
  className?: string;
}

function BioSection({
  title,
  content,
}: {
  title: string;
  content?: string;
}) {
  if (!content) return null;

  const paragraphs = content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="border-t border-steel/60 pt-5">
      <h3 className="tech-label text-blood">{title}</h3>

      <div className="mt-3 flex flex-col gap-5">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-sm leading-relaxed text-fog sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

/**
 * Ficha editorial del integrante seleccionado.
 * Muestra únicamente información confirmada por la banda.
 */
export function MemberBio({ member, className }: MemberBioProps) {
  const bio = member.bio;

  const hasBio =
    Boolean(bio?.shortBio) ||
    Boolean(bio?.trajectory) ||
    Boolean(bio?.howJoined) ||
    Boolean(bio?.influences) ||
    Boolean(bio?.personalNote);

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="tech-label text-blood">
        {member.role ? member.role.toUpperCase() : "INTEGRANTE"}
      </span>

      <h2 className="display-title mt-4 text-4xl text-bone sm:text-5xl">
        {member.name}
      </h2>

      {hasBio ? (
        <div className="mt-8 flex flex-col gap-7 sm:mt-10">
          <BioSection title="BIO" content={bio?.shortBio} />

          <BioSection
            title="TRAYECTORIA ANTERIOR"
            content={bio?.trajectory}
          />

          <BioSection
            title="CÓMO LLEGÓ A SYNCRO22"
            content={bio?.howJoined}
          />

          <BioSection title="INFLUENCIAS" content={bio?.influences} />

          <BioSection
            title="DATO PERSONAL / ARTÍSTICO"
            content={bio?.personalNote}
          />
        </div>
      ) : (
        <p className="mt-6 border border-dashed border-steel bg-ink/50 p-6 text-sm leading-relaxed text-smoke sm:mt-8">
          Biografía pendiente de publicación. El perfil oficial de este
          integrante se completará cuando la banda confirme la información.
        </p>
      )}
    </div>
  );
}
