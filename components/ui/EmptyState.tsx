import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed border-steel bg-ink/50 p-8",
        className
      )}
    >
      <span className="tech-label text-blood">PRÓXIMAMENTE</span>
      <h3 className="display-title text-2xl text-bone">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-fog">{description}</p>
      ) : null}
    </div>
  );
}