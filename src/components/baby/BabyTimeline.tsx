"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { babyMilestones } from "@/data/baby";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

/** Các mốc lớn của bé — cùng bố cục so-le với Timeline của bố mẹ, đổi sang tông hồng. */
export default function BabyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // Có nền riêng, nếu không nền xanh sương của toàn site sẽ lộ ra giữa chương hồng.
    <section className="section bg-gradient-to-b from-blush-pale/70 via-blush-cloud to-blush-mist">
      <div className="container-wed">
        <div ref={ref} className="relative">
          {/* Trục thời gian, tự đầy dần theo lượt cuộn */}
          <div className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-blush/20 md:left-1/2">
            <motion.div style={{ height }} className="w-full bg-gradient-to-b from-blush-soft to-blush-deep" />
          </div>

          <ul className="space-y-16">
            {babyMilestones.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative">
                  <span className="absolute left-6 top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-blush-cloud bg-blush text-sm text-white shadow-petal-glow md:left-1/2">
                    ❀
                  </span>

                  <div className="grid gap-6 pl-16 md:grid-cols-2 md:items-center md:gap-12 md:pl-0">
                    <Reveal
                      direction={left ? "right" : "left"}
                      className={cn("md:col-start-1", left ? "" : "md:col-start-2 md:row-start-1")}
                    >
                      <TiltCard max={7} className="overflow-hidden rounded-3xl shadow-petal">
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
                      className={cn(
                        "md:row-start-1",
                        left ? "md:col-start-2 md:text-left" : "md:col-start-1 md:text-right",
                      )}
                    >
                      <p className="eyebrow text-blush-deep">{item.when}</p>
                      <h3 className="mt-2 font-display text-3xl text-blush-deep">{item.title}</h3>
                      <div
                        className={cn(
                          "ornament-blush my-4 !justify-start text-sm",
                          !left && "md:!justify-end",
                        )}
                      >
                        ❀
                      </div>
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
