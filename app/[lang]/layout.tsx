import type { Metadata } from "next";
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
  title: "AI Partner | 訪談型 YouTuber 的 AI 助理團隊",
  description:
    "從來賓研究、訪談準備到後製發布，讓 AI 處理繁瑣工作，你專注在創作真正有價值的內容。",
  keywords: [
    "AI 助理",
    "YouTuber 工具",
    "訪談自動化",
    "Podcast 製作",
    "創作者工具",
    "AI 工作流程",
  ],
  openGraph: {
    title: "AI Partner | 訪談型 YouTuber 的 AI 助理團隊",
    description:
      "從來賓研究、訪談準備到後製發布，讓 AI 處理繁瑣工作。",
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
      </body>
    </html>
  );
}
