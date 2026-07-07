"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Thẻ có hiệu ứng nghiêng 3D theo con trỏ (parallax tilt),
 * kèm ánh sáng lướt (glare). Trên thiết bị cảm ứng sẽ đứng yên.
 */
export default function TiltCard({
  children,
  className,
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    // Chỉ nghiêng theo chuột — bỏ qua chạm/bút để không nghiêng khi cuộn trên mobile.
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={cn("relative", className)}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(255,255,255,0.5), transparent 60%)`,
          ),
        }}
      />
    </motion.div>
  );
}
