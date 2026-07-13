import Image from "next/image";
import { events } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

/** Chi tiết lễ hỏi & lễ cưới kèm bản đồ Google Maps. */
export default function EventsSection({ withTitle = true }: { withTitle?: boolean }) {
  return (
    <section id="events" className="section bg-gradient-to-b from-transparent to-forest-pale/40">
      <div className="container-wed">
        {withTitle && (
          <SectionTitle eyebrow="When & where" script="Sự kiện cưới" title="Thời gian & Địa điểm" />
        )}

        <div className="mt-16 space-y-20">
          {events.map((e, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={e.key}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <Reveal direction={reversed ? "left" : "right"} className={reversed ? "lg:order-2" : ""}>
                  <TiltCard max={8} className="overflow-hidden rounded-3xl shadow-soft">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={e.image} alt={e.label} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-forest">
                        {e.label}
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>

                <Reveal direction={reversed ? "right" : "left"} className={reversed ? "lg:order-1" : ""}>
                  <p className="eyebrow text-forest">{e.title}</p>
                  <h3 className="mt-2 font-display text-3xl text-forest-deep sm:text-4xl">
                    {e.time}h · {e.dateText}
                  </h3>
                  <div className="mt-5 space-y-1 font-serif text-lg text-ink">
                    <p className="font-semibold">{e.venue}</p>
                    <p className="text-muted">{e.address}</p>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-gold/30 shadow-soft">
                    <iframe
                      title={`Bản đồ ${e.label}`}
                      src={e.mapEmbed}
                      className="h-64 w-full"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
