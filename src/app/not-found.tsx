import Link from "next/link";
import { PixelSnake } from "@/components/pages/pixel-snake";

export default function NotFound() {
  return (
    <div
      data-section="404"
      className="flex min-h-[100svh] flex-col justify-center pb-20 pt-32"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <span className="label mb-6 block">[404] Страница не найдена</span>
          <h1 className="font-display text-[clamp(32px,4.4vw,72px)] font-semibold uppercase leading-[0.95] [font-variation-settings:'wdth'_115]">
            Здесь пусто.
            <br />
            Зато есть змейка
          </h1>
          <p className="mt-6 max-w-[40ch] text-muted">
            Такой страницы нет или она переехала. Пока вы здесь, соберите пиксели: стрелки или WASD на компьютере, свайпы на телефоне.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg">
              На главную
            </Link>
            <Link href="/work" className="rounded-full border border-line-strong px-5 py-3 text-sm transition-colors hover:border-fg">
              Смотреть кейсы
            </Link>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <PixelSnake />
        </div>
      </div>
    </div>
  );
}
