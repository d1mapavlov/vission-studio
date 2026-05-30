const telegramApi = process.env.TELEGRAM_BOT_TOKEN
  ? `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`
  : null;

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const lead = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const validationError = validateLead(lead);

    if (validationError) {
      res.status(400).json({ ok: false, message: validationError });
      return;
    }

    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (!telegramApi || !chatId) {
      res.status(500).json({ ok: false, message: "Telegram не настроен." });
      return;
    }

    await sendTelegramMessage(chatId, formatLeadMessage(lead));
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/leads] submit failed", error);
    res.status(500).json({ ok: false, message: "Не удалось отправить заявку." });
  }
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function sendTelegramMessage(chatId, text) {
  const response = await fetch(`${telegramApi}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.description || "Telegram sendMessage failed");
  }
}

function formatLeadMessage(lead) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());

  return [
    "🟢 <b>Новая заявка · Vission Studio</b>",
    `🕒 ${escapeHtml(submittedAt)}`,
    `🌐 Язык: <b>${escapeHtml(lead.language || "RU")}</b>`,
    "",
    "🎯 <b>Проект</b>",
    `├ Цель: <b>${escapeHtml(lead.goal)}</b>`,
    `├ Что нужно: <b>${escapeHtml(lead.need)}</b>`,
    `└ Бюджет: <b>${escapeHtml(lead.budget)}</b>`,
    "",
    "👤 <b>Клиент</b>",
    `├ Имя: <b>${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</b>`,
    `└ Контакт: ${formatContact(lead.contact)}`,
    "",
    "💬 <b>О проекте</b>",
    `<blockquote>${escapeHtml(lead.description)}</blockquote>`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatContact(contact) {
  const normalized = String(contact || "").trim();
  if (!normalized) return "не указан";

  const usernameMatch = normalized.match(/^@?([a-zA-Z0-9_]{5,32})$/);
  if (!usernameMatch) {
    return `<code>${escapeHtml(normalized)}</code>`;
  }

  const username = usernameMatch[1];
  return `<a href="https://t.me/${username}">@${escapeHtml(username)}</a>`;
}

function validateLead(lead) {
  const requiredFields = [
    ["goal", "Выберите цель."],
    ["need", "Выберите, что нужно."],
    ["budget", "Выберите бюджет."],
    ["firstName", "Введите имя."],
    ["lastName", "Введите фамилию."],
    ["description", "Расскажите о проекте."],
  ];

  for (const [field, message] of requiredFields) {
    if (!String(lead?.[field] || "").trim()) return message;
  }

  return null;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
