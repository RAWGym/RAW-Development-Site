import { NextResponse } from "next/server";

// Приём заявок с сайта.
// Куда отправлять, пока не решено. Если в Vercel заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID,
// заявка приходит сообщением в Telegram. Без них она пишется в логи Vercel (Functions → Logs).

type Lead = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  details?: unknown;
  source?: unknown;
  company?: unknown; // скрытое поле-ловушка для ботов
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Простой лимит частоты на один инстанс функции: не больше 5 заявок в 10 минут с одного IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Бот заполнил скрытое поле, делаем вид, что всё хорошо
  if (str(body.company, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const contact = str(body.contact, 80);
  const message = str(body.message, 2000);
  const details = str(body.details, 2000);
  const source = str(body.source, 60);

  if (name.length < 2 || contact.replace(/[^\d@a-zA-Z]/g, "").length < 5) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const text = [
    "🟠 Новая заявка с сайта",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    details && `\n${details}`,
    message && `\nКомментарий:\n${message}`,
    source && `\nФорма: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
      });
      if (!r.ok) throw new Error(`telegram ${r.status}`);
    } catch (e) {
      console.error("[lead] telegram failed", e, "\n" + text);
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
  } else {
    console.log("[lead]\n" + text);
  }

  return NextResponse.json({ ok: true });
}
