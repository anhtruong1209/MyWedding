"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/site";
import Forest3D from "@/components/three/Forest3D";

/** Dải quote toàn màn hình: ảnh nền parallax + rừng 3D + ánh nắng. */
export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });
  const y = useTransform(p, [0, 1], ["-14%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72vh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src="/images/background/5.webp" alt="" fill sizes="100vw" className="object-cover" />
        {/* Phủ sáng hơn nhiều: xanh rừng nhạt + nắng vàng */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/55 via-ink/35 to-ink-deep/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,240,184,0.35),transparent_60%)]" />
      </motion.div>

      <Forest3D density="light" className="opacity-90" />

      <motion.blockquote
        initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="container-wed relative z-10 text-center"
      >
        <span className="heading-script text-6xl text-gold-light">“</span>
        <p className="mx-auto max-w-3xl font-display text-3xl font-medium leading-snug text-white text-halo sm:text-4xl">
          {site.hero.quote} Giờ thì chúng ta đều tin rồi — tin rằng người mà ta nắm tay ngày đó sẽ đi
          cùng ta đến suốt cuộc đời.
        </p>
        <p className="mt-8 font-sans text-sm uppercase tracking-widest2 text-gold-light text-halo">
          ~ ❦ ~
        </p>
      </motion.blockquote>
    </section>
  );
}
