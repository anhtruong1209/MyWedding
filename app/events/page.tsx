import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import EventsSection from "@/components/sections/EventsSection";
import AnniversaryCounter from "@/components/sections/AnniversaryCounter";
import Rsvp from "@/components/sections/Rsvp";

export const metadata: Metadata = {
  title: "Sự kiện cưới — Trâm & Trường",
  description: "Thông tin lễ hỏi và lễ cưới: thời gian, địa điểm và bản đồ.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        image="/images/misc/3.jpg"
        script="Thời gian & Địa điểm"
        title="Sự kiện"
        subtitle="Rất mong được đón tiếp bạn trong hai buổi lễ trọng đại của chúng tôi."
      />
      <EventsSection withTitle={false} />
      <AnniversaryCounter />
      <Rsvp />
    </>
  );
}
