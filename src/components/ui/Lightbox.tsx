"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/** Lightbox phóng to ảnh, điều hướng bằng phím ← → và Esc. */
export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      const next = (index + dir + images.length) % images.length;
      onNavigate(next);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Quản lý focus: lưu phần tử đang focus, đưa focus vào nút Đóng, khôi phục khi thoát.
    restoreFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      const el = restoreFocusRef.current;
      if (el instanceof HTMLElement) el.focus();
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh cưới phóng to"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-deep/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            ref={closeBtnRef}
            aria-label="Đóng"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/40 text-2xl text-white transition hover:bg-white/15"
            onClick={onClose}
          >
            ×
          </button>
          <button
            aria-label="Ảnh trước"
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-2xl text-white transition hover:bg-white/15 sm:left-8"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ‹
          </button>
          <button
            aria-label="Ảnh kế"
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-2xl text-white transition hover:bg-white/15 sm:right-8"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            ›
          </button>

          <motion.div
            key={images[index]}
            className="relative mx-4 h-[76vh] w-[min(92vw,1100px)]"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`Ảnh cưới ${index + 1}`}
              fill
              sizes="92vw"
              className="rounded-2xl object-contain"
              priority
            />
          </motion.div>

          <p className="absolute bottom-6 font-sans text-sm tracking-widest text-white/70">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
