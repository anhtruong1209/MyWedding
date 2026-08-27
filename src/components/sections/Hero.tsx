"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/site";
import Forest3D from "@/components/three/Forest3D";
import Rings3D from "@/components/three/Rings3D";

const silk = [0.22, 1, 0.36, 1] as const;

function Slides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % site.hero.slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 1.14 }}
        animate={{ opacity: 1, scale: 1.04 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 2.2, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
        className="absolute inset-0"
      >
        <Image
          src={site.hero.slides[i]}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Spring hoá parallax → chuyển động mượt như lụa, không giật theo từng pixel cuộn
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const y = useTransform(p, [0, 1], ["0%", "34%"]);
  const opacity = useTransform(p, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Slides />
        {/* Lớp phủ SÁNG: sương xanh nhạt + nắng vàng, hoà xuống nền trang */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/45 via-ink-deep/10 to-mist" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,240,184,0.42),transparent_55%)]" />
      </div>

      {/* Rừng cổ tích 3D */}
      <Forest3D density="full" />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4, delay: 0.3, ease: silk }}
          className="font-script text-3xl text-gold-light text-halo sm:text-4xl"
        >
          {site.hero.kicker}
        </motion.p>

        <div className="mt-5 grid grid-cols-1 items-center justify-items-center gap-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <motion.h1
            initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: silk }}
            className="font-display text-5xl text-white text-halo sm:text-6xl sm:justify-self-end lg:text-7xl"
          >
            Quỳnh Trâm
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative h-36 w-36 shrink-0 sm:h-44 sm:w-44 lg:h-56 lg:w-56"
          >
            {/*
              Không dùng transform "scale" để vào-hình ở đây: nó khiến canvas 3D
              (đo kích thước bằng getBoundingClientRect lúc mount) đôi khi bắt trúng
              thời điểm scale còn nhỏ, đóng băng canvas ở nửa kích thước thật —
              lệch hẳn khi chuyển trang rồi quay lại (remount nhanh, animation
              chưa kịp chạy xong lúc đo). Chỉ fade opacity là an toàn.
            */}
            <Rings3D className="absolute inset-0" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.5, ease: silk }}
            className="font-display text-5xl text-white text-halo sm:text-6xl sm:justify-self-start lg:text-7xl"
          >
            Anh Trường
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.05, ease: silk }}
          className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-white/95 text-halo"
        >
          {site.hero.fairy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.25, ease: silk }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <span className="rounded-full border border-white/60 bg-white/10 px-6 py-2 font-sans text-sm tracking-widest text-white backdrop-blur-sm">
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
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        aria-label="Cuộn xuống"
      >
        <span className="mx-auto block h-10 w-6 rounded-full border-2 border-white/70">
          <span className="mx-auto mt-2 block h-2 w-0.5 rounded-full bg-white" />
        </span>
      </motion.a>
    </section>
  );
}
