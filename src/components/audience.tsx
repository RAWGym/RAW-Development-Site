"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Audience = "business" | "personal";

const Ctx = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: "business",
  setAudience: () => {},
});

// Переключатель «Для бизнеса / Для себя» меняет тексты и порядок блоков на главной.
export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("business");
  return <Ctx.Provider value={{ audience, setAudience }}>{children}</Ctx.Provider>;
}

export function useAudience() {
  return useContext(Ctx);
}

export function AudienceSwitch() {
  const { audience, setAudience } = useAudience();
  const options: { id: Audience; label: string }[] = [
    { id: "business", label: "Для бизнеса" },
    { id: "personal", label: "Для себя" },
  ];
  return (
    <div role="radiogroup" aria-label="Для кого проект" className="relative inline-flex rounded-full border border-line-strong p-1">
      <span
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-fg transition-transform duration-500 ease-[var(--ease-out)]"
        style={{ transform: audience === "business" ? "translateX(0)" : "translateX(100%)" }}
        aria-hidden="true"
      />
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={audience === o.id}
          onClick={() => setAudience(o.id)}
          className={`relative z-10 min-w-[128px] rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${audience === o.id ? "text-bg" : "text-muted hover:text-fg"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
