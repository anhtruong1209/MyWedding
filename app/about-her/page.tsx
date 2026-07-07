import type { Metadata } from "next";
import { bios } from "@/data/site";
import PageHeader from "@/components/layout/PageHeader";
import BioContent from "@/components/sections/BioContent";

export const metadata: Metadata = {
  title: "Giới thiệu Cô dâu — Quỳnh Trâm",
  description: "Đôi điều về cô dâu Quỳnh Trâm và chặng đường tình yêu.",
};

export default function AboutHerPage() {
  return (
    <>
      <PageHeader image={bios.bride.hero} script="Cô dâu" title="Quỳnh Trâm" subtitle="Người con gái của những giấc mơ cổ tích." />
      <BioContent person="bride" />
    </>
  );
}
