"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/** Lưới ảnh có hiệu ứng hiện dần + mở Lightbox khi nhấn. */
export default function GalleryGrid({
  images,
  masonry = true,
}: {
  images: string[];
  masonry?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn(
          masonry
            ? "columns-2 gap-4 md:columns-3 [&>*]:mb-4"
            : "grid grid-cols-2 gap-4 md:grid-cols-3",
        )}
      >
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            onClick={() => setOpenIndex(i)}
            className={cn(
              "group relative block w-full overflow-hidden rounded-2xl shadow-soft",
              masonry ? "break-inside-avoid" : "aspect-square",
            )}
          >
            <Image
              src={src}
              alt={`Ảnh cưới ${i + 1}`}
              width={600}
              height={800}
              sizes="(max-width: 768px) 50vw, 33vw"
              className={cn(
                "w-full object-cover transition-transform duration-500 group-hover:scale-110",
                masonry ? "h-auto" : "absolute inset-0 h-full",
              )}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-forest-deep/0 opacity-0 transition group-hover:bg-forest-deep/40 group-hover:opacity-100">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/70 text-xl text-white">
                +
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox images={images} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
