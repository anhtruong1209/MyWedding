"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Cuộn mượt (inertia) toàn trang bằng Lenis.
 * Tự tắt khi người dùng bật "reduce motion" để tôn trọng cài đặt hệ thống.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic — mượt, không "trượt" quá đà
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Cho phép các link #hash cuộn mượt tới đúng section
    const onHashClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!el) return;
      const url = new URL(el.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onHashClick);

    return () => {
      document.removeEventListener("click", onHashClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
