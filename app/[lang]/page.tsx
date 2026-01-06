import { Logo, LogoMark } from "../components/Logo";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href={`/${lang}`}
            className="text-[var(--charcoal)] hover:opacity-70 transition-opacity"
          >
            <LogoMark size={36} />
          </a>
          <div className="flex items-center gap-6">
            <LanguageSwitcher currentLocale={lang} />
            <a
              href="#calendly"
              className="px-5 py-2.5 bg-[var(--charcoal)] text-[var(--cream)] rounded-full text-sm font-medium hover:bg-[var(--charcoal-light)] transition-colors font-[family-name:var(--font-display)]"
            >
              {dict.nav.scheduleCall}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Subtle background accent */}
        <div className="absolute top-1/4 right-0 w-[40%] h-[50%] bg-gradient-to-bl from-[var(--sand)]/40 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Logo */}
          <div className="animate-fade-in-up mb-16 flex justify-center">
            <Logo size={140} className="text-[var(--charcoal)] animate-subtle-float" />
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up-delay-1 font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--charcoal)] leading-[1.1] mb-8 tracking-tight">
            {dict.hero.headline1}
            <br />
            <span className="accent-underline text-[var(--charcoal)]">
              {dict.hero.headline2}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up-delay-2 font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--charcoal-light)] max-w-2xl mx-auto mb-12 leading-relaxed">
            {dict.hero.subheadline}
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up-delay-3">
            <a
              href="#calendly"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--terracotta)] text-[var(--cream)] rounded-full text-lg font-medium hover:bg-[var(--terracotta-dark)] transition-all hover:scale-[1.02] font-[family-name:var(--font-display)]"
            >
              {dict.hero.cta}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in-up-delay-4 mt-24">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--charcoal)]/20 to-[var(--charcoal)]/40 mx-auto" />
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-32 bg-[var(--cream-dark)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="decorative-line mb-6" />
              <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
                {dict.value.label}
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--charcoal)] leading-tight mb-6">
                {dict.value.headline1}
                <br />
                {dict.value.headline2}
              </h2>
              <p className="font-[family-name:var(--font-display)] text-lg text-[var(--charcoal-light)] leading-relaxed">
                {dict.value.description}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: dict.value.benefit1Title,
                  description: dict.value.benefit1Desc,
                },
                {
                  number: "02",
                  title: dict.value.benefit2Title,
                  description: dict.value.benefit2Desc,
                },
                {
                  number: "03",
                  title: dict.value.benefit3Title,
                  description: dict.value.benefit3Desc,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card-hover p-8 bg-[var(--cream)] rounded-lg border border-[var(--sand)]"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extralight text-[var(--sand)]">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--charcoal)] mb-2 text-lg">
                        {item.title}
                      </h3>
                      <p className="font-[family-name:var(--font-display)] text-[var(--warm-gray)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-32 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="decorative-line mx-auto mb-6" />
            <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
              {dict.process.label}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--charcoal)] leading-tight">
              {dict.process.headline}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: dict.process.step1Title,
                description: dict.process.step1Desc,
              },
              {
                step: "02",
                title: dict.process.step2Title,
                description: dict.process.step2Desc,
              },
              {
                step: "03",
                title: dict.process.step3Title,
                description: dict.process.step3Desc,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card-hover relative p-8 bg-[var(--cream-dark)] rounded-lg border border-[var(--sand)]"
              >
                {/* Step number */}
                <div className="step-number">
                  {item.step}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--charcoal)] mb-4">
                    {item.title}
                  </h3>
                  <p className="font-[family-name:var(--font-display)] text-[var(--charcoal-light)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-[var(--charcoal)] text-[var(--cream)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="decorative-line mx-auto mb-6 bg-[var(--terracotta)]" />
          <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
            {dict.mission.label}
          </span>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
            {dict.mission.headline1}{" "}
            <span className="text-[var(--terracotta)]">
              {dict.mission.headline2}
            </span>
          </h2>

          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--cream)]/70 leading-relaxed mb-16 max-w-2xl mx-auto">
            {dict.mission.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto pt-12 border-t border-[var(--cream)]/10">
            {[
              { value: dict.mission.stat1Value, label: dict.mission.stat1Label },
              { value: dict.mission.stat2Value, label: dict.mission.stat2Label },
              { value: dict.mission.stat3Value, label: dict.mission.stat3Label },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[var(--terracotta)]">
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-display)] text-sm text-[var(--cream)]/50 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="calendly" className="py-32 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="decorative-line mx-auto mb-6" />
          <span className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
            {dict.contact.label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--charcoal)] leading-tight mb-6">
            {dict.contact.headline}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal-light)] mb-12 max-w-xl mx-auto">
            {dict.contact.description}
          </p>

          {/* Contact Card */}
          <div className="card-hover bg-[var(--cream-dark)] rounded-xl p-10 border border-[var(--sand)] max-w-md mx-auto">
            <div className="mb-8">
              <LogoMark size={48} className="mx-auto text-[var(--charcoal)]" />
            </div>

            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--charcoal)] mb-2">
              {dict.contact.companyName}
            </h3>
            <p className="font-[family-name:var(--font-display)] text-[var(--warm-gray)] mb-8">
              {dict.contact.tagline}
            </p>

            <a
              href="#calendly"
              className="inline-flex items-center justify-center w-full gap-3 px-8 py-4 bg-[var(--terracotta)] text-[var(--cream)] rounded-full text-lg font-medium hover:bg-[var(--terracotta-dark)] transition-all hover:scale-[1.01] font-[family-name:var(--font-display)]"
            >
              {dict.contact.cta}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </a>

            <p className="font-[family-name:var(--font-display)] text-sm text-[var(--warm-gray)] mt-6">
              {dict.contact.note}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--cream-dark)] border-t border-[var(--sand)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <LogoMark size={28} className="text-[var(--charcoal)]" />
              <span className="font-[family-name:var(--font-display)] font-medium text-[var(--charcoal)]">
                {dict.footer.companyName}
              </span>
            </div>

            <p className="font-[family-name:var(--font-display)] text-sm text-[var(--warm-gray)]">
              &copy; {new Date().getFullYear()} {dict.footer.companyName}.{" "}
              {dict.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
