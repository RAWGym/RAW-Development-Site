import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { Numbers } from "@/components/home/numbers";
import { CtaBand } from "@/components/pages/cta-band";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "О студии",
  description: `RAW Development это студия разработки из Алматы. ${site.yearsOfExperience} лет делаем сайты, приложения, Telegram-ботов и личные продукты.`,
};

const PRINCIPLES = [
  { t: "Из сырого в точное", d: "RAW это сырая идея на входе. На выходе продукт, где выверен каждый отступ, каждая анимация и каждый текст ошибки." },
  { t: "Говорим как люди", d: "Без «синергии» и «экосистемы». Объясняем решения простыми словами и честно говорим, что не нужно делать." },
  { t: "Скорость как функция", d: "Сайт, который грузится секунду, продаёт лучше. Поэтому мы меряем скорость с первого дня, а не перед запуском." },
  { t: "Делаем для себя так же", d: "Плееры, трекеры и прошивки для себя мы собираем с тем же вниманием, что и банк. Это и есть лучшая проверка качества." },
];

// TODO: заменить реальной историей студии
const TIMELINE = [
  { y: "2018", t: "Первые сайты и боты для знакомых бизнесов" },
  { y: "2020", t: "Первые мобильные приложения и интеграции с 1С" },
  { y: "2022", t: "Telegram Mini Apps и платёжные сервисы" },
  { y: "2024", t: "Запуск собственного продукта RAW Management" },
  { y: "2025", t: "Банк, афиша концертов и Помогайбо" },
  { y: "2026", t: "Студия RAW Development и этот сайт" },
];

// TODO: роли команды, заглушки, добавить людей и фото
const TEAM = [
  { r: "Основатель и техлид", d: "Архитектура, ключевые решения, код-ревью" },
  { r: "Продуктовый дизайнер", d: "Сценарии, интерфейсы, дизайн-системы" },
  { r: "Мобильная разработка", d: "iOS, Android, React Native" },
  { r: "Веб и бэкенд", d: "Next.js, Node.js, базы данных, интеграции" },
  { r: "QA", d: "Тесты на устройствах, нагрузка, автотесты" },
];

const STACK = ["Swift", "Kotlin", "TypeScript", "React", "Next.js", "React Native", "Node.js", "Python", "PostgreSQL", "Redis", "Supabase", "Docker", "Figma", "GSAP", "WebGL", "aiogram"];

export default function AboutPage() {
  return (
    <div data-section="about">
      <PageHero
        label={`[О студии] ${site.city} · с 2018`}
        title={
          <>
            {site.yearsOfExperience} лет делаем
            <br />
            продукты
          </>
        }
        lead="RAW Development это студия разработки. Сайты, приложения, Telegram-боты и игры для бизнеса, а ещё продукты для себя: плееры, трекеры и прошивки."
      />

      <Numbers />

      <section className="py-16 md:py-24" style={pagePad} data-section="принципы">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-12 block">[Принципы]</h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={(i % 2) * 0.08} className="border-t border-line pt-6">
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[clamp(26px,3vw,44px)] uppercase leading-none [font-variation-settings:'wdth'_115]">{p.t}</h3>
                <p className="mt-4 max-w-[52ch] text-lg text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24" style={pagePad} data-section="история">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="label mb-12 block">[История]</h2>
          <ol className="border-t border-line">
            {TIMELINE.map((e) => (
              <li key={e.y} className="group grid grid-cols-[88px_1fr] items-baseline gap-6 border-b border-line py-6 md:grid-cols-[200px_1fr]">
                <span className="font-display text-3xl tabular-nums text-muted transition-colors group-hover:text-fg md:text-5xl [font-variation-settings:'wdth'_120]">{e.y}</span>
                <span className="text-lg md:text-2xl">{e.t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24" style={pagePad} data-section="команда">
        <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="label mb-8 block">[Команда]</h2>
            <ul className="border-t border-line">
              {TEAM.map((m) => (
                <li key={m.r} className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-lg">{m.r}</span>
                  <span className="text-sm text-muted">{m.d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h2 className="label mb-8 block">[Стек]</h2>
            <ul className="flex flex-wrap gap-2">
              {STACK.map((s) => (
                <li key={s} className="rounded-full border border-line-strong px-4 py-2 font-mono text-[12px] transition-colors hover:bg-fg hover:text-bg">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title="Соберём ваш проект" />
    </div>
  );
}
