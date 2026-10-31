import { caseMediaMap } from "./case-media.generated";

// Скриншоты кейса. Пока их нет, на сайте показываются схематичные заглушки.
// Как добавить: положить файлы в public/cases/<slug>/ (см. scripts/case-media.mjs).
export type CaseMedia = {
  cover?: string;
  screens: string[];
  before?: string;
  after?: string;
};

const empty: CaseMedia = { screens: [] };
export const getCaseMedia = (slug: string): CaseMedia => caseMediaMap[slug] ?? empty;
