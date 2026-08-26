import { testimonials } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Guestbook() {
  return (
    <section className="section">
      <div className="container-wed">
        <SectionTitle
          eyebrow="Sweet words"
          script="Lời chúc phúc"
          title="Lời tâm tình từ bạn bè & gia đình"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={(i % 2) * 0.12} direction={i % 2 === 0 ? "right" : "left"}>
              <figure className="glass-card h-full px-8 py-9 transition-transform duration-300 hover:-translate-y-1">
                <span className="heading-script text-5xl leading-none text-gold">“</span>
                <blockquote className="mt-2 font-serif text-lg italic text-ink/90">{t.body}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="font-sans text-sm font-semibold uppercase tracking-wide text-ink">
                    {t.author}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
