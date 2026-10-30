"use client";

import { useEffect } from "react";

// Корневой layout общий и объявляет lang="ru"; на английской странице меняем язык документа
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.lang;
    root.lang = lang;
    return () => {
      root.lang = prev;
    };
  }, [lang]);
  return null;
}
