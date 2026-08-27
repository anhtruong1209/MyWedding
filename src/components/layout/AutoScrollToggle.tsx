"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

/** Tốc độ cuộn khi tự chạy — chậm rãi để người xem không phải tự tay cuộn. */
const PIXELS_PER_SECOND = 65;
const MIN_DURATION = 20;
const MAX_DURATION = 180;

/**
 * Nút nổi: bấm 1 cái là trang tự cuộn từ đầu xuống cuối, chậm rãi, không cần
 * người dùng chạm chuột/trackpad. Người dùng tự cuộn tay là huỷ ngay lập tức.
 */
export default function AutoScrollToggle() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  function stop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(lenis.scroll, { immediate: true });
    setPlaying(false);
  }

  function start() {
    const lenis = getLenis();
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, lenis.limit / PIXELS_PER_SECOND));
    lenis.scrollTo(lenis.limit, {
      duration,
      easing: (t) => t,
      onComplete: () => setPlaying(false),
    });
    setPlaying(true);
  }

  useEffect(() => {
    if (!playing) return;
    const cancel = () => {
      if (playingRef.current) stop();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [playing]);

  if (reduce) return null;

  return (
    <button
      type="button"
      aria-label={playing ? "Dừng tự động cuộn" : "Tự động cuộn xem toàn trang"}
      title={playing ? "Dừng tự động cuộn" : "Tự động cuộn xem toàn trang"}
      onClick={() => (playing ? stop() : start())}
      className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-mist/85 text-ink shadow-soft backdrop-blur-md transition hover:bg-mist"
    >
      <span className="text-lg">{playing ? "✕" : "▶"}</span>
      <span
        className={cn(
          "absolute inset-0 rounded-full border border-gold/40",
          playing && "animate-ping",
        )}
      />
    </button>
  );
}
