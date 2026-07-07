"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trả về ref + cờ cho biết phần tử có đang hiển thị trong viewport không.
 * Dùng để tạm dừng vòng lặp render 3D khi cuộn ra khỏi màn hình (tiết kiệm pin/GPU).
 */
export function useInViewport<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
