import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-forest to-forest-deep text-cream">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background:radial-gradient(600px_300px_at_20%_0%,#F1DDA6,transparent_60%)]" />
      <div className="container-wed relative py-20 text-center">
        <p className="eyebrow text-gold-light">Thank you</p>
        <p className="heading-script mt-3 text-5xl text-rose-soft sm:text-6xl">Trâm &amp; Trường</p>
        <p className="mx-auto mt-5 max-w-md font-serif text-lg text-cream/80">
          Cảm ơn bạn đã ghé thăm và chung vui cùng chúng tôi. Sự hiện diện của bạn là niềm hạnh phúc
          lớn lao trong ngày trọng đại này. ♥
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-sans text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-6 font-sans text-xs tracking-wider text-cream/60">{site.copyright}</p>
      </div>
    </footer>
  );
}
