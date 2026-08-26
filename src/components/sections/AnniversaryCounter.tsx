"use client";

import { useEffect, useState } from "react";
import { weddingDateISO } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

type Parts = { days: number; hours: number; minutes: number; seconds: number; future: boolean };

function diff(target: number): Parts {
  const now = Date.now();
  const future = target > now;
  let ms = Math.abs(now - target);
  const days = Math.floor(ms / 86_400_000);
  ms -= days * 86_400_000;
  const hours = Math.floor(ms / 3_600_000);
  ms -= hours * 3_600_000;
  const minutes = Math.floor(ms / 60_000);
  ms -= minutes * 60_000;
  const seconds = Math.floor(ms / 1000);
  return { days, hours, minutes, seconds, future };
}

const labels: Record<keyof Omit<Parts, "future">, string> = {
  days: "Ngày",
  hours: "Giờ",
  minutes: "Phút",
  seconds: "Giây",
};

export default function AnniversaryCounter() {
  const target = new Date(weddingDateISO).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const t = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const future = parts?.future ?? false;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-sage-pale/60 py-24 sm:py-28">
      <div className="container-wed">
        <SectionTitle
          eyebrow={future ? "Đếm ngược" : "Kỷ niệm"}
          script={future ? "Sắp đến rồi" : "Chuyện tình của chúng tôi"}
          title={future ? "Thời gian còn lại" : "Chúng tôi đã kết hôn được"}
        />

        <Reveal className="mt-14">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {(["days", "hours", "minutes", "seconds"] as const).map((key) => (
              <div
                key={key}
                className="glass-card flex flex-col items-center px-4 py-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="font-display text-5xl text-gradient-gold sm:text-6xl tabular-nums">
                  {parts ? String(parts[key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
                  {labels[key]}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center font-serif text-xl italic text-ink">
            {future
              ? "Từng giây phút trôi qua là một bước gần hơn đến ngày trọng đại. ♥"
              : "Và hành trình yêu thương vẫn đang tiếp tục, mỗi ngày một ngọt ngào hơn. ♥"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
