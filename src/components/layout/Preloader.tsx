"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Màn chào mở đầu với vòng tròn quay và tên cặp đôi. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <motion.div
            className="grid h-24 w-24 place-items-center rounded-full border-2 border-gold/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.span
              className="absolute h-24 w-24 rounded-full border-t-2 border-gold"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <span className="heading-script text-3xl">T&amp;T</span>
          </motion.div>
          <motion.p
            className="mt-6 font-sans text-xs uppercase tracking-widest2 text-gold-deep"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
            Quỳnh Trâm &amp; Anh Trường
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
