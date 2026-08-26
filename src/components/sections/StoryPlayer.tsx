"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { timeline } from "@/data/site";

const SLIDE_SECONDS = 7;

/**
 * Chế độ "Story" — xem trọn câu chuyện dạng tự chạy như Instagram/Facebook Story,
 * không cần cuộn: thanh tiến trình tự đầy, chạm nửa trái/phải màn hình để lùi/tiến.
 */
export default function StoryPlayer() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, setIndex]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function next() {
    setIndex((i) => {
      if (i >= timeline.length - 1) {
        setOpen(false);
        return i;
      }
      return i + 1;
    });
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const item = timeline[index];

  return (
    <>
      <div className="flex justify-center">
        <button onClick={() => setOpen(true)} className="btn-outline">
          <span aria-hidden>▶</span> Xem dạng Story
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[100svh] w-full overflow-hidden bg-ink-deep sm:h-[92svh] sm:max-h-[820px] sm:w-[420px] sm:rounded-[2rem] sm:shadow-2xl"
            >
              {/* Thanh tiến trình kiểu Story */}
              <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                {timeline.map((_, i) => (
                  <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                    {i < index && <div className="h-full w-full rounded-full bg-gold-light" />}
                    {i === index && (
                      <motion.div
                        key={index}
                        className="h-full rounded-full bg-gold-light"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: SLIDE_SECONDS, ease: "linear" }}
                        onAnimationComplete={next}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Năm + nút đóng */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 pt-[max(1.75rem,env(safe-area-inset-top))]">
                <span className="rounded-full bg-black/30 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                  {item.year}
                </span>
                <button
                  aria-label="Đóng Story"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/30 text-lg text-white backdrop-blur-sm transition hover:bg-black/50"
                >
                  ×
                </button>
              </div>

              {/* Ảnh + nội dung slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
                    <p className="font-display text-3xl text-white text-halo">{item.title}</p>
                    <p className="mt-3 line-clamp-6 font-serif text-sm leading-relaxed text-white/90">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Vùng chạm lùi / tiến */}
              <button aria-label="Câu chuyện trước" onClick={prev} className="absolute inset-y-0 left-0 z-10 w-2/5" />
              <button aria-label="Câu chuyện tiếp theo" onClick={next} className="absolute inset-y-0 right-0 z-10 w-3/5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
