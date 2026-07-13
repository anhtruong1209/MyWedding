"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Forest3D from "@/components/three/Forest3D";

const silk = [0.22, 1, 0.36, 1] as const;

/** Banner đầu trang cho các route con: ảnh parallax + rừng 3D + tiêu đề. */
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
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        {/* Phủ sáng, hoà xuống nền sương của trang */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest-deep/15 to-mist" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,240,184,0.4),transparent_58%)]" />
      </motion.div>

      <Forest3D density="light" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 text-center">
        {script && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: silk }}
            className="heading-script text-4xl text-gold-light text-halo sm:text-5xl"
          >
            {script}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: silk }}
          className="mt-2 font-display text-5xl text-white text-halo sm:text-7xl"
        >
          {title}
        </motion.h1>
        <div className="ornament mt-6 text-white/90">❦</div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: silk }}
            className="mx-auto mt-4 max-w-xl font-serif text-lg text-white/95 text-halo"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
