import Link from "next/link";
import { galleryHighlights } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPreview() {
  return (
    <section id="gallery" className="section">
      <div className="container-wed">
        <SectionTitle eyebrow="Memories" script="Khoảnh khắc" title="Bộ sưu tập ảnh cưới" />
        <Reveal className="mt-12">
          <GalleryGrid images={galleryHighlights} />
        </Reveal>
        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn-gold">
            Xem toàn bộ album
          </Link>
        </div>
      </div>
    </section>
  );
}
