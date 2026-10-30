// Модель калькулятора. Цифры — средние по рынку, заглушки до утверждения.

export type Kind = { id: string; label: string; base: number; weeks: [number, number]; platforms?: boolean };

export const KINDS: Kind[] = [
  { id: "landing", label: "Лендинг", base: 250_000, weeks: [2, 3] },
  { id: "site", label: "Корпоративный сайт", base: 600_000, weeks: [4, 6] },
  { id: "shop", label: "Интернет-магазин", base: 1_200_000, weeks: [6, 10] },
  { id: "service", label: "Веб-сервис / кабинет", base: 1_800_000, weeks: [8, 14] },
  { id: "app", label: "Мобильное приложение", base: 2_500_000, weeks: [10, 20], platforms: true },
  { id: "bot", label: "Telegram-бот", base: 150_000, weeks: [1, 3] },
  { id: "miniapp", label: "Mini App + бот", base: 600_000, weeks: [3, 6] },
  { id: "game", label: "Игра", base: 1_500_000, weeks: [6, 14] },
  { id: "media", label: "Плеер / ТВ", base: 1_000_000, weeks: [4, 10] },
];

export const PLATFORMS = [
  { id: "ios", label: "iOS", k: 1 },
  { id: "android", label: "Android", k: 1 },
  { id: "both", label: "iOS + Android", k: 1.6 },
];

export const FEATURES = [
  { id: "pay", label: "Онлайн-оплата", price: 150_000, weeks: 1 },
  { id: "auth", label: "Личный кабинет", price: 300_000, weeks: 2 },
  { id: "admin", label: "Админка", price: 250_000, weeks: 1.5 },
  { id: "integr", label: "1С / CRM / Kaspi", price: 300_000, weeks: 2 },
  { id: "push", label: "Уведомления", price: 100_000, weeks: 0.5 },
  { id: "ai", label: "AI-ассистент", price: 250_000, weeks: 1.5 },
  { id: "i18n", label: "Несколько языков", price: 120_000, weeks: 1 },
  { id: "analytics", label: "Аналитика", price: 80_000, weeks: 0.5 },
];

export const DESIGN = [
  { id: "base", label: "Аккуратный", hint: "на основе готовой системы", k: 0.85 },
  { id: "custom", label: "Индивидуальный", hint: "под ваш бренд", k: 1 },
  { id: "premium", label: "Премиум", hint: "анимации, 3D, детали", k: 1.35 },
];

export const PACE = [
  { id: "normal", label: "Обычный темп", k: 1, w: 1 },
  { id: "fast", label: "Быстрее", k: 1.3, w: 0.7 },
];

export type Answers = { kinds: string[]; platform: string; features: string[]; design: string; pace: string };

export function estimate(a: Answers) {
  const kinds = KINDS.filter((k) => a.kinds.includes(k.id));
  if (!kinds.length) return null;
  const pk = PLATFORMS.find((p) => p.id === a.platform)?.k ?? 1;
  const base = kinds.reduce((s, k) => s + k.base * (k.platforms ? pk : 1), 0);
  const feats = FEATURES.filter((f) => a.features.includes(f.id));
  const extra = feats.reduce((s, f) => s + f.price, 0);
  const dk = DESIGN.find((d) => d.id === a.design)?.k ?? 1;
  const pace = PACE.find((p) => p.id === a.pace) ?? PACE[0];
  const total = (base + extra) * dk * pace.k;
  const wMin = Math.max(...kinds.map((k) => k.weeks[0])) + feats.reduce((s, f) => s + f.weeks, 0) * 0.5;
  const wMax = kinds.reduce((s, k) => s + k.weeks[1], 0) * 0.8 + feats.reduce((s, f) => s + f.weeks, 0);
  return {
    min: Math.round((total * 0.85) / 10_000) * 10_000,
    max: Math.round((total * 1.25) / 10_000) * 10_000,
    weeks: [Math.max(1, Math.round(wMin * pace.w)), Math.max(2, Math.round(Math.max(wMin + 1, wMax) * pace.w))] as [number, number],
  };
}

export const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/,/g, " ") + " ₸";
