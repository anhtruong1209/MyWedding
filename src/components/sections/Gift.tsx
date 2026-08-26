"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gifts } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Forest3D from "@/components/three/Forest3D";

export default function Gift() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function copySTK(stk: string) {
    navigator.clipboard?.writeText(stk).then(() => {
      setCopied(stk);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function downloadQR(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() ?? "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft py-24 text-cream sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(700px_320px_at_80%_0%,#F1DDA6,transparent_60%)]" />
      <Forest3D density="light" className="opacity-80" />
      <div className="container-wed relative text-center">
        <SectionTitle eyebrow="With love" script="Gửi lời cảm ơn" title="Hộp mừng cưới" light />

        <Reveal className="mt-6">
          <p className="mx-auto max-w-xl font-serif text-lg text-cream/85">
            Cảm ơn tất cả những tình cảm mà mọi người đã dành cho Trâm &amp; Trường. Sự hiện diện của
            bạn đã là món quà quý giá nhất. ♥
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <button
            onClick={() => setOpen(true)}
            className="group mx-auto grid h-32 w-32 place-items-center rounded-3xl border border-gold/40 bg-white/5 backdrop-blur transition hover:scale-105 hover:bg-white/10"
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="h-16 w-16 fill-gold-light"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              <path d="M20 7h-2.2a3 3 0 0 0-4.8-3.4L12 4l-1-.4A3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Zm-6-1.5A1 1 0 1 1 15 7h-1V5.5ZM9 5.5A1 1 0 0 1 10 7H9a1 1 0 0 1 0-1.5ZM11 19H7v-7h4v7Zm0-9H5V9h6v1Zm6 9h-4v-7h4v7Zm2-9h-6V9h6v1Z" />
            </motion.svg>
          </button>
          <p className="mt-4 font-sans text-xs uppercase tracking-widest2 text-gold-light">
            Nhấn để mở hộp quà
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-cream p-6 text-ink shadow-soft sm:p-10"
            >
              <button
                aria-label="Đóng"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-xl text-ink hover:bg-gold-light/25"
              >
                ×
              </button>

              <div className="text-center">
                <p className="heading-script text-4xl">Hộp mừng cưới</p>
                <p className="mt-2 font-serif text-lg text-muted">
                  Vợ chồng chúng em xin cảm ơn tất cả tình cảm của mọi người ạ ♥
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {gifts.map((g) => (
                  <div key={g.label} className="glass-card flex flex-col items-center px-5 py-7 text-center">
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-ink">
                      {g.label}
                    </p>
                    <div className="relative mt-4 h-44 w-44 overflow-hidden rounded-xl border border-gold/30 bg-white">
                      <Image src={g.qr} alt={g.label} fill sizes="176px" className="object-contain p-2" />
                    </div>
                    <p className="mt-3 font-serif text-sm text-muted">STK: {g.stk}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <button onClick={() => downloadQR(g.qr)} className="btn-outline !px-4 !py-2 text-[11px]">
                        Tải mã QR
                      </button>
                      <button onClick={() => copySTK(g.stk)} className="btn-outline !px-4 !py-2 text-[11px]">
                        {copied === g.stk ? "Đã copy ✓" : "Copy STK"}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <a href={g.messenger} target="_blank" rel="noreferrer" className="font-sans text-xs font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline">
                        Messenger
                      </a>
                      <span className="text-gold">·</span>
                      <a href={g.zalo} target="_blank" rel="noreferrer" className="font-sans text-xs font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline">
                        Zalo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
