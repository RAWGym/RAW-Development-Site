// Собирает список скриншотов кейсов из public/cases/<slug>/ в src/content/case-media.generated.ts.
// Запускается сам перед `npm run dev` и `npm run build`.
//
// Имена файлов (jpg, png, webp или avif):
//   cover.*            обложка в списках кейсов и в шапке страницы кейса
//   screen-1.* … 3.*   экраны в блоке «Экраны» (телефон — вертикальные 9:19, веб — screen-1 широкий 16:10)
//   before.*, after.*  слайдер «до / после» (одинаковый размер)
import { readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";

const root = "public/cases";
const out = "src/content/case-media.generated.ts";
const media = {};
if (existsSync(root)) {
  for (const slug of readdirSync(root, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const files = readdirSync(`${root}/${slug.name}`).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
    const pick = (name) => files.find((f) => f.replace(/\.[^.]+$/, "") === name);
    const url = (f) => (f ? `/cases/${slug.name}/${f}` : undefined);
    const entry = {
      cover: url(pick("cover")),
      screens: [1, 2, 3].map((n) => url(pick(`screen-${n}`))).filter(Boolean),
      before: url(pick("before")),
      after: url(pick("after")),
    };
    if (entry.cover || entry.screens.length || (entry.before && entry.after)) media[slug.name] = entry;
  }
}
mkdirSync("src/content", { recursive: true });
writeFileSync(
  out,
  `// Файл создаётся скриптом scripts/case-media.mjs — не править руками.\nimport type { CaseMedia } from "./case-media";\n\nexport const caseMediaMap: Record<string, CaseMedia> = ${JSON.stringify(media, null, 2)};\n`,
);
console.log(`[case-media] ${Object.keys(media).length} кейс(ов) со скриншотами`);
