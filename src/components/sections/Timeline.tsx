"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/site";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section">
      <div className="container-wed">
        <div ref={ref} className="relative">
          {/* Đường trục giữa */}
          <div className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-gold/20 md:left-1/2">
            <motion.div style={{ height }} className="w-full bg-gradient-to-b from-gold to-ink-deep" />
          </div>

          <ul className="space-y-16">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative">
                  {/* Huy hiệu trái tim */}
                  <span className="absolute left-6 top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-cream bg-ink text-sm text-white shadow-glow md:left-1/2">
                    ♥
                  </span>

                  <div
                    className={cn(
                      "grid gap-6 pl-16 md:grid-cols-2 md:items-center md:gap-12 md:pl-0",
                    )}
                  >
                    <Reveal
                      direction={left ? "right" : "left"}
                      className={cn("md:col-start-1", left ? "" : "md:col-start-2 md:row-start-1")}
                    >
                      <TiltCard max={7} className="overflow-hidden rounded-3xl shadow-soft">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width:768px) 90vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      </TiltCard>
                    </Reveal>

                    <Reveal
                      direction={left ? "left" : "right"}
                      className={cn(left ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1", left ? "md:text-left" : "md:text-right")}
                    >
                      <p className="eyebrow text-ink">{item.year}</p>
                      <h3 className="mt-2 font-display text-3xl text-ink-deep">{item.title}</h3>
                      <div className={cn("ornament my-4 !justify-start text-sm", !left && "md:!justify-end")}>♥</div>
                      <p className="font-serif text-lg leading-relaxed text-ink/90">{item.body}</p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
