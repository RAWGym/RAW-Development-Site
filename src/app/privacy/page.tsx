import type { Metadata } from "next";
import { PageHero, pagePad } from "@/components/pages/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Конфиденциальность", robots: { index: false } };

// TODO: согласовать текст с юристом перед запуском
export default function PrivacyPage() {
  return (
    <div data-section="privacy">
      <PageHero label="[Документы]" title="Конфиденциальность" />
      <section className="pb-24" style={pagePad}>
        <div className="mx-auto max-w-[760px] space-y-6 text-lg leading-relaxed text-muted [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-fg">
          <p>Сайт {site.name} не собирает персональные данные через формы и не хранит их на сервере. Бриф на сайте только готовит текст сообщения, а отправляете его вы сами в WhatsApp.</p>
          <h2>Что мы получаем</h2>
          <p>Только то, что вы сами пишете нам в мессенджере: имя, номер телефона и описание задачи. Эти данные нужны, чтобы ответить и подготовить оценку проекта.</p>
          <h2>Аналитика</h2>
          <p>Сайт может использовать обезличенную аналитику посещений, чтобы понимать, какие страницы полезны. Она не позволяет установить вашу личность.</p>
          <h2>Как удалить данные</h2>
          <p>Напишите нам в WhatsApp {site.contacts.whatsapp.label}, и мы удалим переписку и все связанные данные.</p>
        </div>
      </section>
    </div>
  );
}
