"use client";

import { useEffect, useState } from "react";
import { baby } from "@/data/baby";
import Reveal from "@/components/ui/Reveal";

type Age = { months: number; days: number; totalDays: number; weeks: number };

/**
 * Tuổi của bé tính theo lịch, không quy đổi 30 ngày = 1 tháng:
 * đếm số lần đã qua ngày 27 hằng tháng, phần lẻ là số ngày dư.
 */
function ageFrom(birth: Date, now: Date): Age {
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());

  const anchor = new Date(birth);
  anchor.setMonth(birth.getMonth() + months);
  if (anchor > now) {
    months -= 1;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  const days = Math.floor((now.getTime() - anchor.getTime()) / 86_400_000);
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86_400_000);

  return { months, days, totalDays, weeks: Math.floor(totalDays / 7) };
}

export default function BabyAgeCounter() {
  // Tính trong useEffect: server và client ở hai thời điểm khác nhau, render thẳng sẽ lệch hydration.
  const [age, setAge] = useState<Age | null>(null);

  useEffect(() => {
    const birth = new Date(baby.birthISO);
    const tick = () => setAge(ageFrom(birth, new Date()));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  const cells = [
    { value: age?.months, label: "Tháng tuổi" },
    { value: age?.days, label: "Ngày lẻ" },
    { value: age?.weeks, label: "Tuần" },
    { value: age?.totalDays, label: "Ngày bên bố mẹ" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-mist to-blush-pale/70 py-24 sm:py-28">
      <div className="container-wed">
        <Reveal className="text-center">
          <p className="eyebrow mb-3 text-blush-deep">Từ ngày {baby.birthText}</p>
          <p className="font-script text-3xl text-blush sm:text-4xl">Con của bố mẹ</p>
          <h2 className="mt-1 font-display text-4xl leading-tight text-blush-deep sm:text-5xl">
            {baby.name} đã lớn từng ngày
          </h2>
          <div className="ornament-blush mt-6 text-lg">❀</div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {cells.map((c) => (
              <div
                key={c.label}
                className="glass-card-blush flex flex-col items-center px-4 py-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="font-display text-5xl tabular-nums text-gradient-blush sm:text-6xl">
                  {c.value ?? "--"}
                </span>
                <span className="mt-2 text-center font-sans text-xs uppercase tracking-widest text-blush-deep/70">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-xl italic text-blush-deep">
            Mỗi ngày con lớn thêm một chút, và bố mẹ lại yêu con thêm một chút. ❀
          </p>
        </Reveal>
      </div>
    </section>
  );
}
