"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Forest3D from "@/components/three/Forest3D";
import { cn } from "@/lib/utils";

const silk = [0.22, 1, 0.36, 1] as const;

/**
 * Hai tông của site: rừng cổ tích (chuyện của bố mẹ) và hồng phấn (chương của con).
 * Cùng bố cục, chỉ khác lớp phủ màu và màu chữ.
 */
const TONES = {
  forest: {
    veil: "bg-gradient-to-b from-ink-deep/50 via-ink-deep/15 to-mist",
    bloom: "bg-[radial-gradient(circle_at_25%_20%,rgba(255,240,184,0.4),transparent_58%)]",
    script: "text-gold-light text-halo",
    title: "text-white text-halo",
    subtitle: "text-white/95 text-halo",
    ornament: "ornament text-white/90",
  },
  blush: {
    // Ảnh của bé sáng và nhiều mảng trắng — phủ đậm hơn tông rừng, nếu không chữ trắng sẽ chìm.
    veil: "bg-gradient-to-b from-blush-deep/60 via-blush-deep/35 to-blush-cloud",
    bloom: "bg-[radial-gradient(circle_at_25%_20%,rgba(184,92,116,0.28),transparent_62%)]",
    script: "text-blush-pale text-halo-blush",
    title: "text-white text-halo-blush",
    subtitle: "text-white/95 text-halo-blush",
    ornament: "ornament-blush text-white/90",
  },
} as const;

/** Banner đầu trang cho các route con: ảnh parallax + rừng 3D + tiêu đề. */
export default function PageHeader({
  image,
  script,
  title,
  subtitle,
  tone = "forest",
  imagePosition = "center",
}: {
  image: string;
  script?: string;
  title: string;
  subtitle?: string;
  tone?: keyof typeof TONES;
  /** Điểm lấy nét khi cắt ảnh (CSS object-position), vd "center 30%". */
  imagePosition?: string;
}) {
  const t = TONES[tone];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const y = useTransform(p, [0, 1], ["0%", "32%"]);
  const scale = useTransform(p, [0, 1], [1.1, 1.24]);
  const textY = useTransform(p, [0, 1], ["0%", "55%"]);
  const opacity = useTransform(p, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
          className="object-cover"
        />
        {/* Phủ sáng, hoà xuống nền của trang */}
        <div className={cn("absolute inset-0", t.veil)} />
        <div className={cn("absolute inset-0", t.bloom)} />
      </motion.div>

      <Forest3D density="light" theme={tone} />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 text-center">
        {script && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: silk }}
            className={cn("font-script text-4xl sm:text-5xl", t.script)}
          >
            {script}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: silk }}
          className={cn("mt-2 font-display text-5xl sm:text-7xl", t.title)}
        >
          {title}
        </motion.h1>
        <div className={cn("mt-6", t.ornament)}>❦</div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: silk }}
            className={cn("mx-auto mt-4 max-w-xl font-serif text-lg", t.subtitle)}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
