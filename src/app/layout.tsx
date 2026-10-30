import type { Metadata, Viewport } from "next";
import { Science_Gothic, Geologica, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StatusBar } from "@/components/status-bar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { GridOverlay } from "@/components/grid-overlay";
import { Preloader } from "@/components/preloader";
import { CommandPalette } from "@/components/command-palette";
import { EasterEggs } from "@/components/easter-eggs";
import { PageTransition } from "@/components/page-transition";
import { Magnetic } from "@/components/magnetic";
import { siteUrl } from "@/content/site";

// Шрифты: открытая лицензия OFL, с кириллицей. Временные — до покупки лицензий.
const display = Science_Gothic({
  subsets: ["latin", "cyrillic"],
  axes: ["wdth"],
  variable: "--ff-display",
  display: "swap",
});

const text = Geologica({
  subsets: ["latin", "cyrillic"],
  axes: ["SHRP"],
  variable: "--ff-text",
  display: "swap",
});

const code = Martian_Mono({
  subsets: ["latin", "cyrillic"],
  axes: ["wdth"],
  variable: "--ff-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RAW Development — разработка сайтов, приложений и Telegram-ботов",
    template: "%s — RAW Development",
  },
  description:
    "Студия разработки RAW Development: сайты, мобильные приложения, Telegram-боты и Mini Apps, игры и медиа-продукты для бизнеса и для себя. 8+ лет опыта.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "./" },
  applicationName: "RAW Development",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "RAW Development",
    url: "./",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

// Разметка организации для поисковиков.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RAW Development",
  url: siteUrl,
  telephone: "+77066569389",
  areaServed: "KZ",
  address: { "@type": "PostalAddress", addressLocality: "Алматы", addressCountry: "KZ" },
  foundingDate: "2018",
  description: "Разработка сайтов, мобильных приложений, Telegram-ботов и Mini Apps.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  viewportFit: "cover",
};

// Решаем до первой отрисовки, показывать ли прелоадер (один раз за сессию).
const preloadScript = `try{if(!sessionStorage.getItem('raw-preloaded')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('preload')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${text.variable} ${code.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`.preloader{display:none}html.preload .preloader{display:flex}html.preload body{overflow:hidden}`}</style>
      </head>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StatusBar />
        <GridOverlay />
        <CommandPalette />
        <EasterEggs />
        <PageTransition />
        <Magnetic />
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
