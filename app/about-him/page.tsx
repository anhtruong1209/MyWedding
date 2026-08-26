import type { Metadata } from "next";
import { bios } from "@/data/site";
import PageHeader from "@/components/layout/PageHeader";
import BioContent from "@/components/sections/BioContent";

export const metadata: Metadata = {
  title: "Giới thiệu Chú rể — Anh Trường",
  description: "Đôi điều về chú rể Anh Trường và hành trình yêu thương.",
};

export default function AboutHimPage() {
  return (
    <>
      <PageHeader
        image={bios.groom.hero}
        imagePosition="center 25%"
        script="Chú rể"
        title="Anh Trường"
        subtitle="Chàng lập trình viên yêu đời và say mê phiêu lưu."
      />
      <BioContent person="groom" />
    </>
  );
}
