import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haute & Hoof",
  description: "Violet's family-led journey in riding, fashion, and sewing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
