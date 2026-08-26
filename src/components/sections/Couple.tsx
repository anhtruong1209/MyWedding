import Image from "next/image";
import Link from "next/link";
import { couple } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

type Person = {
  name: string;
  role: string;
  tagline: string;
  photo: string;
  facebook: string;
  email: string;
};

function PersonCard({ person, href, delay }: { person: Person; href: string; delay: number }) {
  return (
    <Reveal delay={delay} className="flex-1">
      <TiltCard className="glass-card h-full overflow-hidden p-6 text-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover"
          />
        </div>
        <p className="eyebrow mt-6">{person.role}</p>
        <h3 className="heading-script mt-1 text-4xl">{person.name}</h3>
        <p className="mx-auto mt-3 max-w-sm font-serif text-lg text-muted">{person.tagline}</p>
        <div className="mt-5 flex items-center justify-center gap-4 text-ink">
          <a href={person.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-gold">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>
          </a>
          <a href={`mailto:${person.email}`} aria-label="Email" className="transition hover:text-gold">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7 8-5H4l8 5Zm0 2L4 8v10h16V8l-8 5Z" /></svg>
          </a>
        </div>
        <Link href={href} className="btn-outline mt-6 !py-2 text-xs">
          Tìm hiểu thêm
        </Link>
      </TiltCard>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section id="couple" className="section">
      <div className="container-wed">
        <SectionTitle eyebrow="Happy couple" script="Cô dâu & Chú rể" title="Hai chúng tôi" />
        <div className="relative mt-16 flex flex-col items-stretch gap-8 lg:flex-row">
          <PersonCard person={couple.bride} href="/about-her" delay={0} />
          <div className="hidden items-center lg:flex">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-2xl text-white shadow-glow">
              ♥
            </span>
          </div>
          <PersonCard person={couple.groom} href="/about-him" delay={0.15} />
        </div>
      </div>
    </section>
  );
}
