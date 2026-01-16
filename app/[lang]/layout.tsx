import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Noto_Sans_TC, DM_Sans } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "../../i18n-config";

// Chinese-optimized font
const notoSansTC = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display font for logo/headings - geometric sans-serif
const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REWIRE - 創作者的 AI 夥伴",
  description:
    "我們直接進到你的創作流程，找出 AI 機會點，幫你省時間，省成本，做更多更高品質的內容。",
  keywords: [
    "AI 助理",
    "YouTuber 工具",
    "創作者工具",
    "AI 工作流程",
    "AI 自動化",
    "REWIRE",
  ],
  openGraph: {
    title: "REWIRE - 創作者的 AI 夥伴",
    description:
      "我們直接進到你的創作流程，找出 AI 機會點，幫你省時間，省成本。",
    type: "website",
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${notoSansTC.variable} ${dmSans.variable} antialiased grain-overlay`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
