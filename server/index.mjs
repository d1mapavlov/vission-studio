import http from "node:http";
import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(rootDir, ".data");
const adminPath = path.join(dataDir, "admin.json");
const offsetPath = path.join(dataDir, "telegram-offset.json");

loadEnvFile(".env");
loadEnvFile(".env.local");

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const port = Number(process.env.API_PORT || 8787);
const telegramApi = botToken ? `https://api.telegram.org/bot${botToken}` : null;

await mkdir(dataDir, { recursive: true });

if (!botToken) {
  console.warn("[api] TELEGRAM_BOT_TOKEN is missing. Leads will not be sent.");
} else {
  startTelegramPolling();
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && req.url === "/api/leads") {
    try {
      const lead = await readJson(req);
      const validationError = validateLead(lead);

      if (validationError) {
        sendJson(res, 400, { ok: false, message: validationError });
        return;
      }

      const admin = await readAdmin();
      if (!admin?.chatId) {
        sendJson(res, 409, {
          ok: false,
          code: "ADMIN_NOT_SET",
          message: "Администратор Telegram-бота ещё не назначен. Напишите /start боту.",
        });
        return;
      }

      await sendTelegramMessage(admin.chatId, formatLeadMessage(lead));
      sendJson(res, 200, { ok: true });
    } catch (error) {
      console.error("[api] lead submit failed", error);
      sendJson(res, 500, { ok: false, message: "Не удалось отправить заявку." });
    }
    return;
  }

  sendJson(res, 404, { ok: false, message: "Not found" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`[api] listening on http://127.0.0.1:${port}`);
});

function loadEnvFile(name) {
  try {
    const content = readFileSync(path.join(rootDir, name), "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (!key || process.env[key]) continue;
      process.env[key] = valueParts.join("=").trim();
    }
  } catch {
    // Optional env file.
  }
}

async function startTelegramPolling() {
  let offset = await readOffset();
  console.log("[bot] polling started. First /start user becomes admin.");

  while (true) {
    try {
      const result = await telegramRequest("getUpdates", {
        offset,
        timeout: 25,
        allowed_updates: ["message"],
      });

      for (const update of result.result || []) {
        offset = update.update_id + 1;
        await writeJson(offsetPath, { offset });
        await handleTelegramUpdate(update);
      }
    } catch (error) {
      console.error("[bot] polling error", error.message);
      await wait(3000);
    }
  }
}

async function handleTelegramUpdate(update) {
  const message = update.message;
  if (!message?.chat?.id) return;

  const text = message.text?.trim();
  if (text !== "/start") return;

  const existingAdmin = await readAdmin();
  const chatId = message.chat.id;

  if (!existingAdmin?.chatId) {
    await writeJson(adminPath, {
      chatId,
      username: message.from?.username || "",
      firstName: message.from?.first_name || "",
      assignedAt: new Date().toISOString(),
    });
    await sendTelegramMessage(
      chatId,
      "✅ Вы назначены администратором Vission Studio.\nТеперь заявки с сайта будут приходить сюда.",
    );
    return;
  }

  if (String(existingAdmin.chatId) === String(chatId)) {
    await sendTelegramMessage(chatId, "✅ Вы уже администратор. Заявки будут приходить сюда.");
    return;
  }

  await sendTelegramMessage(chatId, "Администратор уже назначен. Доступ к заявкам закрыт.");
}

async function telegramRequest(method, payload) {
  const response = await fetch(`${telegramApi}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.description || `Telegram ${method} failed`);
  }

  return data;
}

async function sendTelegramMessage(chatId, text) {
  return telegramRequest("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

function formatLeadMessage(lead) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());

  return [
    "💬 <b>Новая заявка · Vission Studio</b>",
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

async function readAdmin() {
  return readJsonFile(adminPath, null);
}

async function readOffset() {
  const data = await readJsonFile(offsetPath, { offset: 0 });
  return data.offset || 0;
}

async function readJsonFile(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
