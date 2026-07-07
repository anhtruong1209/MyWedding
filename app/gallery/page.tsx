import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import GalleryTabs from "@/components/gallery/GalleryTabs";

export const metadata: Metadata = {
  title: "Bộ sưu tập ảnh cưới — Trâm & Trường",
  description: "Album ảnh cưới của Quỳnh Trâm & Anh Trường.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        image="/images/gallery/category-2/2.jpg"
        script="Khoảnh khắc"
        title="Bộ sưu tập"
        subtitle="Những khung hình lưu giữ trọn vẹn hạnh phúc của chúng tôi."
      />
      <section className="section">
        <div className="container-wed">
          <GalleryTabs />
        </div>
      </section>
    </>
  );
}
