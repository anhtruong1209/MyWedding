import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/** Tiêu đề mục: eyebrow + tên script + tiêu đề lớn + hoạ tiết lá. */
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
      {eyebrow && <p className={cn("eyebrow mb-3", light && "text-gold-light")}>{eyebrow}</p>}
      {script && (
        <p className={cn("heading-script text-3xl sm:text-4xl", light && "text-gold-light")}>
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
      <div className={cn("ornament mt-6 text-lg", light && "text-gold-light")}>❦</div>
    </Reveal>
  );
}
