"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../i18n-config";

const localeNames: Record<Locale, string> = {
  en: "EN",
  "zh-TW": "中文",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {i18n.locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span className="text-[var(--warm-gray)] mx-1">/</span>
          )}
          <Link
            href={redirectedPathname(locale)}
            className={`px-2 py-1 rounded-md transition-colors ${
              currentLocale === locale
                ? "text-[var(--charcoal)] font-semibold"
                : "text-[var(--warm-gray)] hover:text-[var(--charcoal)]"
            }`}
          >
            {localeNames[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
