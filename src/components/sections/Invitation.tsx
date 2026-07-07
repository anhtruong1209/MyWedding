import { events } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

/** Khối lời mời trang trọng: "Chúng tôi mời bạn vào...". */
export default function Invitation() {
  return (
    <section className="section">
      <div className="container-wed text-center">
        <Reveal>
          <p className="eyebrow">Trân trọng kính mời</p>
          <p className="heading-script mt-3 text-4xl sm:text-5xl">Chúng tôi mời bạn</p>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-xl text-muted">
            Với niềm hân hoan, chúng tôi trân trọng kính mời bạn đến chung vui và chứng kiến khoảnh
            khắc thiêng liêng nhất trong cuộc đời chúng tôi.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.12}>
              <div className="glass-card h-full px-8 py-10">
                <p className="eyebrow text-wine">{e.label}</p>
                <p className="mt-3 font-display text-3xl text-wine-deep">{e.time}h</p>
                <p className="mt-1 font-serif text-lg text-muted">{e.dateText}</p>
                <div className="ornament my-5 text-sm">♥</div>
                <p className="font-serif text-lg text-ink">{e.venue}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
