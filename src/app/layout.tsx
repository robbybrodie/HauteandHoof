import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const headingFont = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading"
});

const bodyFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Haute & Hoof",
  description: "Violet's family-led journey in riding, fashion, and sewing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
