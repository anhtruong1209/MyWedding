"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { baby } from "@/data/baby";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

/**
 * Nhịp chuyển giữa hai chương: nền đi từ xanh sương (thế giới của bố mẹ)
 * sang hồng phấn (thế giới của con) — câu chuyện sang trang bằng màu sắc.
 */
export default function BabyIntro() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-cloud to-blush-mist py-24 sm:py-32">
      {/* Cánh hoa hồng lơ lửng */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { left: "8%", top: "18%", size: 14, delay: 0 },
          { left: "22%", top: "68%", size: 9, delay: 1.4 },
          { left: "78%", top: "24%", size: 11, delay: 0.7 },
          { left: "90%", top: "62%", size: 8, delay: 2.1 },
          { left: "62%", top: "12%", size: 7, delay: 1.1 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-blush-soft/60 blur-[1px]"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="container-wed relative">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal direction="right">
            <TiltCard max={8} className="overflow-hidden rounded-[2rem] shadow-petal">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={baby.portrait}
                  alt={baby.fullName}
                  fill
                  sizes="(max-width:768px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </TiltCard>
          </Reveal>

          <Reveal direction="left">
            <p className="eyebrow text-blush-deep">{baby.kicker}</p>

            <h2 className="mt-3 font-display text-4xl leading-tight text-blush-deep sm:text-5xl">
              {baby.fullName}
            </h2>

            <p className="mt-2 font-script text-3xl text-blush sm:text-4xl">
              bố mẹ gọi con là {baby.nickname}
            </p>

            <div className="ornament-blush my-6 !justify-start text-lg">❀</div>

            <p className="font-serif text-lg leading-relaxed text-ink/90">{baby.tagline}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="font-sans text-xs uppercase tracking-widest text-blush-deep/70">
                  Ngày sinh
                </dt>
                <dd className="mt-1 font-display text-2xl text-blush-deep">{baby.birthText}</dd>
              </div>
              <div>
                <dt className="font-sans text-xs uppercase tracking-widest text-blush-deep/70">
                  Danh phận
                </dt>
                <dd className="mt-1 font-display text-2xl text-blush-deep">{baby.role}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
