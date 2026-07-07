"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInViewport } from "@/lib/useInViewport";

// three.js cần WebGL/DOM → chỉ tải phía client, không SSR.
const HeartCanvas = dynamic(() => import("./HeartCanvas"), { ssr: false });

/**
 * Lớp nền trái tim 3D bay. Tự giảm số lượng trên mobile, tạm dừng render khi
 * cuộn ra khỏi màn hình, và tắt hẳn khi người dùng bật "reduce motion".
 */
export default function Hearts3D({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const { ref, inView } = useInViewport<HTMLDivElement>();

  useEffect(() => {
    if (reduce) return;
    const compute = () => {
      const w = window.innerWidth;
      setCount(w < 640 ? 26 : w < 1024 ? 42 : 64);
    };
    compute();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(compute, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {reduce || count === 0 ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(233,195,196,0.4),transparent_60%)]" />
      ) : (
        <HeartCanvas count={count} frameloop={inView ? "always" : "never"} />
      )}
    </div>
  );
}
