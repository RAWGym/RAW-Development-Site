// Технологии студии по направлениям. tag, короткая пометка, зачем берём.
export type Tech = { name: string; tag: string };
export type StackGroup = { id: string; title: string; text: string; items: Tech[] };

export const stack: StackGroup[] = [
  {
    id: "web",
    title: "Веб",
    text: "Быстрые сайты и сервисы, которые хорошо индексируются и открываются за секунду.",
    items: [
      { name: "Next.js", tag: "SSR и SEO" },
      { name: "React", tag: "интерфейсы" },
      { name: "TypeScript", tag: "меньше багов" },
      { name: "Tailwind CSS", tag: "дизайн-система" },
      { name: "GSAP", tag: "анимации" },
      { name: "Canvas", tag: "графика и игры" },
    ],
  },
  {
    id: "mobile",
    title: "Мобайл",
    text: "Нативно, когда важны скорость и системные функции. Кроссплатформенно, когда важен бюджет.",
    items: [
      { name: "SwiftUI", tag: "iOS" },
      { name: "Swift", tag: "iOS" },
      { name: "Jetpack Compose", tag: "Android" },
      { name: "Kotlin", tag: "Android" },
      { name: "React Native", tag: "iOS + Android" },
      { name: "Capacitor", tag: "веб в сторы" },
      { name: "WidgetKit", tag: "виджеты" },
    ],
  },
  {
    id: "backend",
    title: "Бэкенд и данные",
    text: "Надёжное ядро: деньги, очереди, реальное время и отчёты.",
    items: [
      { name: "Node.js", tag: "API" },
      { name: "PostgreSQL", tag: "основная база" },
      { name: "Redis", tag: "очереди и кэш" },
      { name: "Supabase", tag: "быстрый старт" },
      { name: "Realtime", tag: "живые данные" },
      { name: "CloudKit", tag: "синхронизация" },
    ],
  },
  {
    id: "bots",
    title: "Боты и Mini Apps",
    text: "Продажи и сервис прямо в Telegram: запись, оплата, каталоги, рассылки.",
    items: [
      { name: "Telegram Mini Apps", tag: "магазин в чате" },
      { name: "aiogram 3", tag: "боты на Python" },
      { name: "Kaspi Pay", tag: "оплата в KZ" },
    ],
  },
  {
    id: "media",
    title: "Медиа и ТВ",
    text: "Видео и звук без задержек, интерфейсы под пульт.",
    items: [
      { name: "AVFoundation", tag: "аудио" },
      { name: "Metal", tag: "визуализация" },
      { name: "FFmpeg", tag: "транскодинг" },
      { name: "Android TV", tag: "прошивки" },
      { name: "Compose for TV", tag: "UI под пульт" },
    ],
  },
];

export const principles = [
  { t: "Скучное там, где деньги", d: "Платежи, учёт и данные на проверенных технологиях. Эксперименты только в интерфейсе." },
  { t: "Код остаётся у вас", d: "Репозиторий, доступы и документация передаются заказчику. Никакой привязки к студии." },
  { t: "Скорость как требование", d: "Бюджет на вес страницы и время отклика закладываем в ТЗ и проверяем перед релизом." },
];
