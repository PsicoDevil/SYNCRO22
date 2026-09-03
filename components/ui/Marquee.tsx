import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-steel bg-ink py-4",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {doubled.map((item, index) => (
          <span
            key={index}
            className="display-title text-2xl text-smoke uppercase sm:text-3xl"
          >
            {item}
            <span className="ml-12 text-blood">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}