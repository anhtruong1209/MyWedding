"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Nhạc nền có nút bật/tắt nổi ở góc. Trình duyệt chặn autoplay có tiếng,
 * nên nhạc sẽ tự phát ngay lần đầu người dùng chạm/nhấp vào trang.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;

    const startOnInteract = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      audio.muted = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    window.addEventListener("pointerdown", startOnInteract, { once: true });
    window.addEventListener("keydown", startOnInteract, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startOnInteract);
      window.removeEventListener("keydown", startOnInteract);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    startedRef.current = true;
    if (audio.paused) {
      audio.muted = false;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={site.music} loop preload="auto" />
      <button
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-mist/85 text-ink shadow-soft backdrop-blur-md transition hover:bg-mist"
      >
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.3 }}
          className="text-xl"
        >
          {playing ? "♫" : "♪"}
        </motion.span>
        <span
          className={cn(
            "absolute inset-0 rounded-full border border-gold/40",
            playing && "animate-ping",
          )}
        />
      </button>
    </>
  );
}
