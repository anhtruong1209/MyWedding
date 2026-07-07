"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInViewport } from "@/lib/useInViewport";

const RingsCanvas = dynamic(() => import("./RingsCanvas"), { ssr: false });

/** Cặp nhẫn cưới vàng 3D quay nhẹ. Ẩn khi reduce-motion, tạm dừng khi ngoài màn hình. */
export default function Rings3D({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLDivElement>();
  if (reduce) return null;
  return (
    <div ref={ref} className={cn("pointer-events-none", className)} aria-hidden>
      <RingsCanvas frameloop={inView ? "always" : "never"} />
    </div>
  );
}
