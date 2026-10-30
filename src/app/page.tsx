import Link from "next/link";
import { ScrambleWord } from "@/components/scramble-word";
import { site } from "@/content/site";

const WORDS = ["сайты", "приложения", "Telegram-ботов", "Mini Apps", "игры", "прошивки для ТВ"];

// Этап 1: каркас. Полная главная (11 секций) появится на этапе 2.
export default function Home() {
  return (
    <section
      data-section="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-20"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <span className="label">[00] — Студия разработки · {site.city}</span>
          <span className="label">{site.yearsOfExperience}+ лет · сайты · приложения · боты · игры · ТВ</span>
        </div>

        <h1
          className="font-display text-[clamp(26px,6.2vw,120px)] font-semibold uppercase leading-[0.95] tracking-[-0.01em] [font-variation-settings:'wdth'_100] md:[font-variation-settings:'wdth'_120]"
        >
          Разрабатываем
          <br />
          <ScrambleWord words={WORDS} />
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted md:col-span-5">
            Для бизнеса и для себя. Банки, афиши, CRM, боты, плееры и игры — от идеи до продукта, в котором каждый пиксель
            на своём месте.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:col-start-8 md:justify-end">
            <Link
              href="/start"
              className="rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 hover:scale-[1.03]"
            >
              Обсудить проект
            </Link>
            <Link
              href="/work"
              data-cursor="Смотреть"
              className="rounded-full border border-line-strong px-6 py-3.5 text-sm transition-colors duration-200 hover:border-fg"
            >
              Смотреть кейсы
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
