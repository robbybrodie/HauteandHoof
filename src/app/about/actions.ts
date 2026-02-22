"use server";

import { redirect } from "next/navigation";

const WINDOW = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 60_000;
const MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 3;

type Hit = { count: number; reset: number };
const hits: Map<string, Hit> = ((globalThis as Record<string, unknown>).__rateHits ??=
  new Map()) as Map<string, Hit>;

function rateOk(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return true;
  }
  entry.count++;
  return entry.count <= MAX;
}

export async function submitContact(formData: FormData) {
  const hp = formData.get("company");
  if (hp) redirect("/about?error=spam");

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) redirect("/about?error=fields");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect("/about?error=email");
  if (message.length > 2000) redirect("/about?error=length");

  const hdrs = await (await import("next/headers")).headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateOk(ip)) redirect("/about?error=rate");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@barntoblazer.com";

  if (!apiKey || !to) redirect("/about?error=config");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `Barn to Blazer contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  });

  if (!res.ok) redirect("/about?error=send");
  redirect("/about?sent=1");
}
