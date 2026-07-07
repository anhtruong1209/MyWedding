import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicToggle from "@/components/layout/MusicToggle";
import Preloader from "@/components/layout/Preloader";

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});
const script = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});
const sans = Josefin_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  keywords: ["wedding", "đám cưới", "thiệp cưới", "Quỳnh Trâm", "Anh Trường", "Hải Phòng"],
  authors: [{ name: "Anh Trường" }],
  icons: { icon: site.favicon },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "vi_VN",
    images: [{ url: site.hero.slides[0] }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6a2e3e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${serif.variable} ${script.variable} ${sans.variable}`}
    >
      <body>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MusicToggle />
      </body>
    </html>
  );
}
