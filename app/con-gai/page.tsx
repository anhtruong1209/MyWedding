import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import BabyIntro from "@/components/baby/BabyIntro";
import BabyAgeCounter from "@/components/baby/BabyAgeCounter";
import BabyTimeline from "@/components/baby/BabyTimeline";
import { baby, babyGallery } from "@/data/baby";

export const metadata: Metadata = {
  title: `${baby.fullName} — Chương mới của câu chuyện`,
  description: `Nhật ký của ${baby.name}, con gái nhỏ của Trâm & Trường, từ ngày ${baby.birthText}.`,
};

export default function BabyPage() {
  return (
    // Nền hồng đặc, che nền xanh sương mặc định của <body> — chương này là một thế giới riêng.
    <div className="bg-blush-cloud">
      <PageHeader
        tone="blush"
        image={baby.hero}
        script="Chương mới"
        title={baby.fullName}
        subtitle="Câu chuyện cổ tích của bố và mẹ, từ hôm nay có thêm một nàng công chúa nhỏ."
      />

      <BabyIntro />
      <BabyAgeCounter />
      <BabyTimeline />

      <section className="section bg-blush-mist bg-blush-dream">
        <div className="container-wed">
          <Reveal className="text-center">
            <p className="eyebrow mb-3 text-blush-deep">Album của con</p>
            <p className="font-script text-3xl text-blush sm:text-4xl">Từng khoảnh khắc nhỏ</p>
            <h2 className="mt-1 font-display text-4xl leading-tight text-blush-deep sm:text-5xl">
              Nhật ký bằng hình
            </h2>
            <div className="ornament-blush mt-6 text-lg">❀</div>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg text-ink/80">
              {babyGallery.length} tấm ảnh, xếp theo thứ tự thời gian — từ ngày con còn đỏ hỏn
              trong vòng tay bố, đến khi con biết cười thành tiếng. Nhấn vào ảnh để xem lớn.
            </p>
          </Reveal>

          <div className="mt-14">
            <GalleryGrid images={[...babyGallery]} altPrefix={`${baby.name} — ảnh`} />
          </div>
        </div>
      </section>
    </div>
  );
}
