import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import Quote from "@/components/sections/Quote";
import Invitation from "@/components/sections/Invitation";
import EventsSection from "@/components/sections/EventsSection";
import AnniversaryCounter from "@/components/sections/AnniversaryCounter";
import Guestbook from "@/components/sections/Guestbook";
import Gift from "@/components/sections/Gift";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Rsvp from "@/components/sections/Rsvp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Couple />
      <Quote />
      <Invitation />
      <EventsSection />
      <AnniversaryCounter />
      <Guestbook />
      <Gift />
      <GalleryPreview />
      <Rsvp />
    </>
  );
}
