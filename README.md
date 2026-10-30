# RAW Development — сайт студии

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP · Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- Данные студии (контакты, цифры, статус): `src/content/site.ts`
- Дизайн-токены (цвета, кривые, длительности): `src/app/globals.css`
- Шрифты: `src/app/layout.tsx` — сейчас открытые (OFL) Science Gothic, Geologica, Martian Mono. Замена = правка одного файла.
- Логотип: `src/components/logo-path.ts` (векторизован из PNG, заменить исходным вектором).

Пасхалки: клавиша **G** показывает сетку вёрстки.

## Адрес сайта и SEO

Карта сайта (`/sitemap.xml`), `robots.txt`, превью для соцсетей и канонические ссылки строятся от адреса сайта.
По умолчанию это `https://rawdevelopment.vercel.app`. При переезде на свой домен задайте в Vercel переменную
`NEXT_PUBLIC_SITE_URL`, например `https://rawdev.kz`, и пересоберите проект.
