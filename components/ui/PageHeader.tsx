import { cn } from "@/lib/utils";

interface PageHeaderProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ index, title, description, className }: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-steel bg-ink pt-40 pb-16 sm:pt-48 sm:pb-20",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,4,41,0.08),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="tech-label text-blood">{index}</span>
          <span className="industrial-line flex-1" aria-hidden="true" />
        </div>
        <h1 className="display-title mt-6 text-5xl text-bone sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-fog sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}