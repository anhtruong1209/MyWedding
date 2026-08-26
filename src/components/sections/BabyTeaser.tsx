"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { baby, babyHighlights } from "@/data/baby";
import Reveal from "@/components/ui/Reveal";

/**
 * Trên trang chủ, ngay sau bộ đếm ngày cưới: câu chuyện của bố mẹ mở sang chương của con.
 * Đây là chỗ duy nhất tông hồng xuất hiện giữa thế giới xanh — cố ý, để nó nổi bật.
 */
export default function BabyTeaser() {
  return (
    // Nở hồng ở giữa rồi tan lại về xanh: chương của con hé lộ giữa thế giới của bố mẹ,
    // và phần còn lại của trang chủ vẫn liền mạch tông rừng.
    <section className="relative overflow-hidden bg-gradient-to-b from-sage-pale/50 via-blush-pale/70 to-mist py-24 sm:py-28">
      <div className="container-wed">
        <Reveal className="text-center">
          <p className="eyebrow mb-3 text-blush-deep">{baby.kicker}</p>
          <p className="font-script text-3xl text-blush sm:text-4xl">Chương mới</p>
          <h2 className="mt-1 font-display text-4xl leading-tight text-blush-deep sm:text-5xl">
            {baby.fullName}
          </h2>
          <div className="ornament-blush mt-6 text-lg">❀</div>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink/85">
            Ngày {baby.birthText}, khu rừng cổ tích của chúng tôi nở thêm một bông hoa hồng nhỏ.
            Bố mẹ gọi con là {baby.nickname}.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {babyHighlights.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-petal"
              >
                <Image
                  src={src}
                  alt={`${baby.name} — ảnh ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 45vw, 22vw"
                  className="object-cover"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Link href="/con-gai" className="btn-blush">
            Xem chuyện của con ❀
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
