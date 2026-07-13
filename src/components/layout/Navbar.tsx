"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-mist/90 py-3 shadow-[0_10px_30px_-20px_rgba(74,29,43,0.5)] backdrop-blur-md" : "bg-transparent py-5",
      )}
    >
      <nav className="container-wed flex items-center justify-between">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="heading-script text-3xl">Trâm &amp; Trường</span>
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-gold-deep">
            10 · 11 · 2024
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative font-sans text-sm font-medium uppercase tracking-wide text-ink/80 transition-colors hover:text-forest",
                    active && "text-forest",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300",
                      active ? "scale-x-100" : "group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/#rsvp" className="btn-gold hidden lg:inline-flex !px-6 !py-2.5 text-xs">
          Xác nhận tham dự
        </Link>

        <button
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("h-0.5 w-6 bg-forest transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-forest transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-forest transition", open && "-translate-y-2 -rotate-45")} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container-wed mt-3 flex flex-col gap-1 overflow-hidden lg:hidden"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-sans text-sm uppercase tracking-wide text-ink/80 hover:bg-rose-petal/60 hover:text-forest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-4 py-2">
              <Link href="/#rsvp" onClick={() => setOpen(false)} className="btn-gold w-full">
                Xác nhận tham dự
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
