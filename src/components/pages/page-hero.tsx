import type { ReactNode } from "react";

// Шапка внутренней страницы: метка, крупный заголовок и вводный текст.
export function PageHero({ label, title, lead, aside }: { label: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="pb-16 pt-36 md:pb-24 md:pt-44" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" }}>
      <div className="mx-auto max-w-[1440px]">
        <span className="label mb-6 block">{label}</span>
        <h1 className="font-display text-[clamp(38px,8.4vw,156px)] font-semibold uppercase leading-[0.9] [overflow-wrap:anywhere] [font-variation-settings:'wdth'_100] md:[font-variation-settings:'wdth'_118]">
          {title}
        </h1>
        {(lead || aside) && (
          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12">
            {lead && <div className="max-w-[60ch] text-lg leading-relaxed text-muted md:col-span-7 md:text-xl">{lead}</div>}
            {aside && <div className="md:col-span-4 md:col-start-9">{aside}</div>}
          </div>
        )}
      </div>
    </header>
  );
}

export const pagePad = { paddingLeft: "var(--gutter)", paddingRight: "var(--gutter-r)" } as const;
