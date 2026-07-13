"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInViewport } from "@/lib/useInViewport";

// three.js cần WebGL/DOM → chỉ tải phía client.
const ForestCanvas = dynamic(() => import("./ForestCanvas"), { ssr: false });

/**
 * Lớp rừng cổ tích 3D: cây, sương, tia nắng, đom đóm, lá & cánh hoa rơi.
 * - `density="full"` cho hero, `"light"` cho banner trang con.
 * - Tự hạ mật độ trên mobile, tạm dừng khi cuộn ra ngoài, tắt khi reduce-motion.
 */
export default function Forest3D({
  className,
  density = "full",
  theme = "forest",
}: {
  className?: string;
  density?: "full" | "light";
  /** "forest" = rừng cổ tích của bố mẹ; "blush" = mưa cánh hoa hồng cho chương của con. */
  theme?: "forest" | "blush";
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const check = () => setMobile(window.innerWidth < 768);
    check();
    setReady(true);
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(check, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  const effective = mobile ? "light" : density;

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {reduce || !ready ? (
        // Nền tĩnh thay thế khi tắt chuyển động / chưa kịp tải 3D.
        <div
          className={cn(
            "absolute inset-0",
            theme === "blush"
              ? "bg-[radial-gradient(circle_at_25%_15%,rgba(251,213,222,0.6),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(244,169,184,0.4),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_25%_15%,rgba(255,240,184,0.55),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(169,198,174,0.45),transparent_60%)]",
          )}
        />
      ) : (
        <ForestCanvas
          density={effective}
          theme={theme}
          frameloop={inView ? "always" : "never"}
        />
      )}
    </div>
  );
}
