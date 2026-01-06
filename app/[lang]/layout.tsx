import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "../../i18n-config";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Partner Company | Helping Creators Do More With Less",
  description:
    "We help YouTubers and creators build AI capabilities to automate mundane tasks, so you can focus on what you do best — creating.",
  keywords: [
    "AI agency",
    "YouTube automation",
    "creator tools",
    "AI workflows",
    "content creator",
  ],
  openGraph: {
    title: "AI Partner Company | Helping Creators Do More With Less",
    description:
      "We help YouTubers and creators build AI capabilities to automate mundane tasks.",
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
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${plusJakarta.variable} antialiased grain-overlay`}>
        {children}
      </body>
    </html>
  );
}
