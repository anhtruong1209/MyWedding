"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Màn chào mở đầu: vòng sáng đom đóm + tên cặp đôi, nền sương rừng. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-mist"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,240,184,0.55),transparent_60%)]" />

          <motion.div
            className="relative grid h-24 w-24 place-items-center rounded-full border-2 border-sage/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute h-24 w-24 rounded-full border-t-2 border-gold"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            />
            <span className="heading-script text-3xl">T&amp;T</span>
          </motion.div>

          <motion.p
            className="relative mt-6 font-sans text-xs uppercase tracking-widest2 text-gold-deep"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.8 } }}
          >
            Ngày xửa ngày xưa...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
