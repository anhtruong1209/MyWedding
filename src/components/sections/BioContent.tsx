import Image from "next/image";
import Link from "next/link";
import { bios, couple } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

/** Nội dung trang giới thiệu cô dâu / chú rể. */
export default function BioContent({ person }: { person: "bride" | "groom" }) {
  const bio = bios[person];
  const info = couple[person];
  const other = person === "bride" ? "/about-him" : "/about-her";
  const otherLabel = person === "bride" ? "Xem giới thiệu chú rể" : "Xem giới thiệu cô dâu";

  return (
    <section className="section">
      <div className="container-wed grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="right">
            <TiltCard max={7} className="overflow-hidden rounded-[2rem] shadow-soft">
              <div className="relative aspect-[3/4] w-full">
                <Image src={info.photo} alt={bio.name} fill sizes="(max-width:1024px) 90vw, 40vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/80 to-transparent p-6 text-center">
                  <p className="heading-script text-4xl text-white">{bio.name}</p>
                  <p className="font-sans text-xs uppercase tracking-widest2 text-gold-light">{bio.role}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="space-y-10">
          {bio.paragraphs.map((p, i) => (
            <Reveal key={p.heading} delay={i * 0.08} direction="left">
              <article>
                <h3 className="flex items-center gap-3 font-display text-2xl text-ink-deep">
                  <span className="text-gold">❦</span>
                  {p.heading}
                </h3>
                <p className="mt-3 font-serif text-lg leading-relaxed text-ink/90">{p.body}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 border-t border-gold/20 pt-8">
              <a href={info.facebook} target="_blank" rel="noreferrer" className="btn-outline !py-2 text-xs">
                Facebook
              </a>
              <Link href={other} className="btn-gold !py-2 text-xs">
                {otherLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
