"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FooterLogo } from "./footer-logo";
import { nav, site } from "@/content/site";
import { scrollToTop } from "./smooth-scroll";

export function Footer() {
  const { whatsapp, telegram, email } = site.contacts;
  // На странице брифа бегущая строка «Обсудить проект» не нужна
  const showCta = usePathname() !== "/start";

  return (
    <>
    {showCta && (
    <Link
      href="/start"
      data-cursor="Начать"
      className="group relative mt-auto block overflow-hidden border-t border-line py-8 md:py-12"
      aria-label="Обсудить проект"
    >
      <div className="flex w-max animate-[ticker_32s_linear_infinite] group-hover:[animation-duration:14s]" aria-hidden="true">
        {[0, 1].map((k) => (
          <span key={k} className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="cta-outline px-6 font-display text-[clamp(48px,9vw,148px)] font-semibold uppercase leading-none [font-variation-settings:'wdth'_125]">
                  Обсудить проект
                </span>
                <span className="grid h-[0.9em] w-[0.9em] place-items-center font-display text-[clamp(32px,5vw,80px)] text-muted transition-transform duration-700 group-hover:rotate-90">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </Link>
    )}
    <footer
      data-section="contact"
      className={`relative ${showCta ? "" : "mt-auto "}border-t border-line pb-16 pt-20 md:pb-24`}
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 md:grid-cols-12 md:gap-6">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-5">
          <span className="label">[∞] — Связаться</span>
          <p className="max-w-[28ch] font-display text-3xl leading-[1.05] md:text-4xl" style={{ fontVariationSettings: "'wdth' 120" }}>
            Есть идея? Давайте соберём её.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fg" />
            </span>
            {site.status}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3 sm:col-span-1 md:col-span-3 md:col-start-7">
          <span className="label">Контакты</span>
          <a href={whatsapp.href} target="_blank" rel="noreferrer" className="whitespace-nowrap text-fg/90 transition-colors hover:text-fg">
            WhatsApp {whatsapp.label}
          </a>
          {telegram && (
            <a href={telegram.href} target="_blank" rel="noreferrer" className="text-fg/90 hover:text-fg">
              Telegram {telegram.label}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-fg/90 hover:text-fg">
              {email}
            </a>
          )}
          <span className="text-muted">{site.city}</span>
        </div>

        <div className="flex flex-col gap-3 md:col-span-2">
          <span className="label">Разделы</span>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-fg/90 transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="col-span-2 flex items-start justify-end md:col-span-1">
          <button
            type="button"
            onClick={scrollToTop}
            className="label rounded-full border border-line-strong px-3 py-2 transition-colors hover:border-fg hover:text-fg"
          >
            Наверх ↑
          </button>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1440px]">
        <FooterLogo />
        <div className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-wider text-muted">
          <span>© 2018–2026 RAW Development</span>
          <span>{site.yearsOfExperience}+ лет в разработке</span>
          <a href="/privacy" className="transition-colors hover:text-fg">Конфиденциальность</a>
          <span>Сделано вручную, до пикселя</span>
        </div>
      </div>
    </footer>
    </>
  );
}
