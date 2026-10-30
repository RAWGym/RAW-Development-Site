// Данные студии в одном месте. Всё, что помечено TODO, — заглушки до реальных данных.

export const site = {
  name: "RAW Development",
  tagline: "From raw idea to pixel-perfect product",
  city: "Алматы",
  timeZone: "Asia/Almaty",
  yearsOfExperience: 8,
  // TODO: заменить на реальные цифры
  stats: {
    projects: 40,
    team: 5,
  },
  status: "Принимаем проекты на декабрь",
  contacts: {
    whatsapp: {
      label: "+7 706 656 93 89",
      href: "https://wa.me/77066569389",
    },
    // TODO: появятся позже
    telegram: null as null | { label: string; href: string },
    email: null as null | string,
  },
};

export const nav = [
  { href: "/services", label: "Услуги" },
  { href: "/work", label: "Кейсы" },
  { href: "/process", label: "Процесс" },
  { href: "/about", label: "О студии" },
  { href: "/contact", label: "Контакты" },
] as const;
