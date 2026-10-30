import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { Calculator } from "@/components/start/calculator";

export const metadata: Metadata = {
  title: "Рассчитать проект",
  description: "Калькулятор стоимости и сроков: сайт, приложение, Telegram-бот, игра. Ответьте на 5 вопросов и отправьте бриф в WhatsApp.",
};

export default function StartPage() {
  return (
    <div data-section="start">
      <PageHero
        label="[Старт] — 5 вопросов, 1 минута"
        title={
          <>
            Сколько стоит
            <br />
            ваш проект
          </>
        }
        lead="Отметьте, что нужно, и сразу увидите вилку цены и сроков. Бриф уйдёт нам в WhatsApp одним нажатием."
      />
      <section className="pb-24 md:pb-36" style={pagePad}>
        <div className="mx-auto max-w-[1440px]">
          <Calculator />
        </div>
      </section>
    </div>
  );
}
