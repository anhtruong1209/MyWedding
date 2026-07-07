"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hearts3D from "@/components/three/Hearts3D";

/** Banner đầu trang cho các route con: ảnh nền parallax + tiêu đề. */
export default function PageHeader({
  image,
  script,
  title,
  subtitle,
}: {
  image: string;
  script?: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.28]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[68vh] min-h-[460px] items-center justify-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/70 via-wine-deep/45 to-cream" />
      </motion.div>

      <Hearts3D className="opacity-70" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 text-center">
        {script && <p className="heading-script text-4xl text-rose-soft sm:text-5xl">{script}</p>}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-display text-5xl text-white drop-shadow-lg sm:text-7xl"
        >
          {title}
        </motion.h1>
        <div className="ornament mt-6 text-white/80">♥</div>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg text-cream/90">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
}
