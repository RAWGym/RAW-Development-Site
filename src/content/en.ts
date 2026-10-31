// Английская версия: одна страница /en с главным. Кейсы ведут на русские страницы.
export const enNav = [
  { href: "/en#services", label: "Services" },
  { href: "/en#work", label: "Work" },
  { href: "/en#process", label: "Process" },
  { href: "/en#contact", label: "Contact" },
] as const;

export const en = {
  status: "Booking projects for December",
  cta: "Start a project",
  home: "Home",
  hero: {
    label: "[00] — Development studio · Almaty, Kazakhstan",
    title: ["We build", "digital products"],
    lead: "Websites, mobile apps, Telegram bots and CRM systems for businesses — from idea and research to launch and support. Clear timelines, honest estimates, every pixel in place.",
  },
  services: [
    { title: "Websites", text: "Landing pages, corporate sites, e-commerce and web services.", price: "from ₸180,000" },
    { title: "Mobile apps", text: "iOS and Android — native or cross-platform.", price: "from ₸1,800,000" },
    { title: "Telegram bots & Mini Apps", text: "Booking, payments, catalogs, broadcasts and AI replies.", price: "from ₸100,000" },
    { title: "Games", text: "Casual and arcade games for mobile and the web.", price: "from ₸1,100,000" },
    { title: "Media & TV", text: "Players, media libraries and Android TV firmware.", price: "from ₸700,000" },
    { title: "UI/UX design", text: "From wireframes to a complete design system.", price: "from ₸150,000" },
  ],
  cases: {
    "yurta-bank": { kind: "Mobile banking · iOS · Android · Web", summary: "A banking app where any operation takes 2–3 taps: transfers by phone and QR, spending analytics, savings, Face ID." },
    "concerts-kz": { kind: "Tickets & events · Web", summary: "A concert ticketing site, an admin panel for organisers and our own ticket-scanner app for door staff." },
    "raw-management": { kind: "Team management · iOS · Android · Web", summary: "Tasks, calendar, contacts and finances for a manager and an assistant, synced in real time." },
    pomogaybo: { kind: "Telegram Mini App + bot", summary: "Subscriptions without card hassle: Photoshop, Claude, Notion and 20+ more services, ordered and installed right inside Telegram." },
    slotly: { kind: "Telegram booking bot", summary: "Booking and prepayment for salons in a chat: pick a master, a time and pay — no-shows dropped sharply." },
  } as Record<string, { kind: string; summary: string }>,
  process: [
    { t: "Brief", d: "Call, goals, constraints, budget.", time: "1–2 days" },
    { t: "Research", d: "Competitors, user scenarios, structure.", time: "3–5 days" },
    { t: "Design", d: "Wireframes, design system, prototype.", time: "1–3 weeks" },
    { t: "Development", d: "Sprints with a demo every week.", time: "2–12 weeks" },
    { t: "QA", d: "Devices, load, speed, security.", time: "3–7 days" },
    { t: "Launch & support", d: "Release, analytics, growth.", time: "ongoing" },
  ],
  stats: [
    { v: "8+", l: "years in development" },
    { v: "40+", l: "products launched" },
    { v: "98", l: "average Lighthouse" },
    { v: "100%", l: "delivered on time" },
  ],
  contact: {
    label: "[05] — Contact",
    title: ["Have an idea?", "Let's build it"],
    lead: "Tell us in a couple of lines what you want to make. We reply within an hour during working hours (UTC+5).",
  },
  footer: {
    tagline: "Websites, apps and bots — from idea to pixel.",
    contacts: "Contacts",
    sections: "Sections",
    city: "Almaty, Kazakhstan",
    top: "Back to top ↑",
    privacy: "Privacy",
    made: "Handmade, down to the pixel",
    years: "years in development",
  },
};
