import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-4">
        <span className="tech-label text-blood">{index}</span>
        <span className="industrial-line flex-1" aria-hidden="true" />
      </div>
      <h2 className="display-title text-4xl text-bone sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-sm leading-relaxed text-fog sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}