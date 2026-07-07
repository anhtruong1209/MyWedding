"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import Hearts3D from "@/components/three/Hearts3D";
import Rings3D from "@/components/three/Rings3D";

function Slides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % site.hero.slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1.05 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 1.6 }, scale: { duration: 6, ease: "linear" } }}
        className="absolute inset-0"
      >
        <Image src={site.hero.slides[i]} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Slides />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/60 via-wine-deep/35 to-wine-deep/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(42,17,26,0.55))]" />
      </div>

      <Hearts3D />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-xs font-semibold uppercase text-gold-light"
        >
          {site.hero.kicker}
        </motion.p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="font-display text-5xl text-white drop-shadow-xl sm:text-6xl lg:text-7xl"
          >
            Quỳnh Trâm
          </motion.h1>

          <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
            <Rings3D className="absolute inset-0" />
            <span className="pointer-events-none absolute inset-0 grid place-items-center font-script text-4xl text-gold-light/40">
              &amp;
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="font-display text-5xl text-white drop-shadow-xl sm:text-6xl lg:text-7xl"
          >
            Anh Trường
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl font-serif text-xl italic text-cream/90 [text-shadow:0_2px_14px_rgba(42,17,26,0.75)]"
        >
          “{site.hero.quote}”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="rounded-full border border-white/40 px-6 py-2 font-sans text-sm tracking-widest text-white">
            10 · 11 · 2024 — Hải Phòng
          </span>
          <a href="#rsvp" className="btn-gold">
            Xác nhận tham dự
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#couple"
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Cuộn xuống"
      >
        <span className="mx-auto block h-10 w-6 rounded-full border-2 border-white/50">
          <span className="mx-auto mt-2 block h-2 w-0.5 rounded-full bg-white/80" />
        </span>
      </motion.a>
    </section>
  );
}
