import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/** Tiêu đề mục: eyebrow nhỏ + tên script + tiêu đề lớn + hoạ tiết. */
export default function SectionTitle({
  eyebrow,
  script,
  title,
  className,
  light = false,
}: {
  eyebrow?: string;
  script?: string;
  title: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={cn("text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {script && (
        <p className={cn("heading-script text-3xl sm:text-4xl", light && "text-rose-soft")}>
          {script}
        </p>
      )}
      <h2
        className={cn(
          "mt-1 font-display text-4xl leading-tight sm:text-5xl",
          light && "text-white",
        )}
      >
        {title}
      </h2>
      <div className="ornament mt-6 text-lg">♥</div>
    </Reveal>
  );
}
