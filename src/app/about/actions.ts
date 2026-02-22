"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function validEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

type Bucket = { count: number; resetAt: number };

const rateLimitStore = (globalThis as typeof globalThis & { __contactRateLimit?: Map<string, Bucket> })
  .__contactRateLimit ?? new Map<string, Bucket>();

if (!(globalThis as typeof globalThis & { __contactRateLimit?: Map<string, Bucket> }).__contactRateLimit) {
  (globalThis as typeof globalThis & { __contactRateLimit?: Map<string, Bucket> }).__contactRateLimit =
    rateLimitStore;
}

function clientIpFromHeaders(value: string | null) {
  if (!value) return "unknown";
  return value.split(",")[0]?.trim() || "unknown";
}

async function isRateLimited() {
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
  const maxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);

  const requestHeaders = await headers();
  const ip = clientIpFromHeaders(requestHeaders.get("x-forwarded-for") ?? requestHeaders.get("x-real-ip"));
  const key = `contact:${ip}`;
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  rateLimitStore.set(key, { ...current, count: current.count + 1 });
  return false;
}

export async function sendParentContact(formData: FormData) {
  const name = text(formData, "name");
  const email = text(formData, "email");
  const subject = text(formData, "subject");
  const message = text(formData, "message");
  const company = text(formData, "company");

  if (company) {
    redirect("/about?sent=1");
  }

  if (!name || !email || !subject || !message) {
    redirect("/about?error=missing");
  }

  if (!validEmail(email) || message.length < 10 || message.length > 2500) {
    redirect("/about?error=invalid");
  }

  if (await isRateLimited()) {
    redirect("/about?error=rate");
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "contact@hauteandhoof.com";

  if (!resendApiKey || !toEmail) {
    redirect("/about?error=config");
  }

  const emailBody = [
    "New parent contact form submission from Haute & Hoof.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `[Haute & Hoof Parent Contact] ${subject}`,
        text: emailBody,
        reply_to: email
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      redirect("/about?error=send");
    }
  } catch {
    redirect("/about?error=send");
  }

  redirect("/about?sent=1");
}
