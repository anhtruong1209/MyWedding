import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Timeline from "@/components/sections/Timeline";

export const metadata: Metadata = {
  title: "Câu chuyện tình yêu — Trâm & Trường",
  description: "Hành trình yêu thương từ 2017 đến ngày cưới 10.11.2024.",
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        image="/images/story/3.webp"
        script="Chuyện của chúng tôi"
        title="Câu chuyện tình yêu"
        subtitle="Từ ánh mắt đầu tiên nơi sân trường đến ngày nắm tay nhau trọn đời."
      />
      <Timeline />
    </>
  );
}
