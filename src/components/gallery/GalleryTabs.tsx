"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryCategories } from "@/data/site";
import { cn } from "@/lib/utils";
import GalleryGrid from "./GalleryGrid";

export default function GalleryTabs() {
  const [active, setActive] = useState(galleryCategories[1]?.key ?? galleryCategories[0].key);
  const current = galleryCategories.find((c) => c.key === active) ?? galleryCategories[0];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={cn(
              "rounded-full px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide transition",
              active === cat.key
                ? "bg-wine text-white shadow-soft"
                : "border border-gold/40 text-wine hover:bg-gold hover:text-white",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <GalleryGrid images={[...current.images]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
