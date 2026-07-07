"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

/** Dải quote toàn màn hình có ảnh nền cố định + parallax. */
export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src="/images/background/5.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-wine-deep/75" />
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="container-wed relative z-10 text-center text-cream"
      >
        <span className="heading-script text-6xl text-gold-light">“</span>
        <p className="mx-auto max-w-3xl font-display text-3xl font-medium leading-snug text-white sm:text-4xl">
          {site.hero.quote} Giờ thì chúng ta đều tin rồi — tin rằng người mà ta nắm tay ngày đó sẽ đi
          cùng ta đến suốt cuộc đời.
        </p>
        <p className="mt-8 font-sans text-sm uppercase tracking-widest2 text-gold-light">~ ♥ ~</p>
      </motion.blockquote>
    </section>
  );
}
