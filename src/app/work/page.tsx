import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { allCases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Банки, афиши, CRM, Telegram Mini Apps и боты для бизнеса, а также личные продукты: трекеры, плееры, игры и прошивки.",
};

export default function WorkPage() {
  return (
    <div className="pb-24 pt-36 md:pt-44" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }} data-section="work">
      <div className="mx-auto max-w-[1440px]">
        <span className="label mb-6 block">[Кейсы] — {String(allCases.length).padStart(2, "0")} проектов</span>
        <h1 className="font-display text-[clamp(40px,9vw,168px)] font-semibold uppercase leading-[0.9] [font-variation-settings:'wdth'_110] md:[font-variation-settings:'wdth'_125]">
          Работы
        </h1>
        <p className="mt-6 max-w-[56ch] text-muted md:text-lg">
          Каждый проект — от первой схемы до релиза в сторах. Для бизнеса и для себя, с одинаковым вниманием к деталям.
        </p>
        <WorkIndex />
      </div>
    </div>
  );
}
