"use client";

import { useEffect, useRef, useState } from "react";

// ============================================
// COLOR PALETTE - Conversion.ai inspired
// ============================================
const colors = {
  cream: "#F7F5ED",
  creamDark: "#EDE9DD",
  sand: "#DDD8C8",
  charcoal: "#1A1A1A",
  charcoalLight: "#3D3D3D",
  warmGray: "#6B6B6B",
  lightGray: "#9A9A9A",
  accent: "#2D5A27", // Deep forest green
  accentLight: "#4A7C43",
  highlight: "#E8B54A", // Warm gold
  // Section colors
  teal: "#225E7D",
  tealDark: "#1A4A63",
  maroon: "#7D2F1E",
  maroonDark: "#5E2316",
  green: "#156A47",
  greenDark: "#0F4F35",
};

// ============================================
// ANIMATION HOOK
// ============================================
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ============================================
// ANIMATED SECTION WRAPPER
// ============================================
function FadeIn({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// STICKY SECTION COMPONENT - Conversion.ai style stacking
// ============================================
function StickySection({
  children,
  bgColor,
  zIndex = 1,
  isLast = false,
}: {
  children: React.ReactNode;
  bgColor: string;
  zIndex?: number;
  isLast?: boolean;
}) {
  return (
    <section
      className="sticky-section relative"
      style={{
        position: "sticky",
        top: 0,
        zIndex,
        background: bgColor,
        minHeight: isLast ? "auto" : "100vh",
      }}
    >
      {children}
    </section>
  );
}

// ============================================
// OVERLAPPING CARD COMPONENT
// ============================================
function OverlappingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overlapping-card ${className}`}
      style={{
        background: colors.cream,
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
        transform: "translateY(80px)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// STEP CARD COMPONENT
// ============================================
function StepCard({
  step,
  title,
  duration,
  description,
  delay = 0
}: {
  step: string;
  title: string;
  duration?: string;
  description: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div
        className="p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
        style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}
      >
        <div className="flex items-start gap-4 mb-4">
          <span
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{ background: colors.accent, color: colors.cream }}
          >
            {step}
          </span>
          {duration && (
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{ background: colors.creamDark, color: colors.warmGray }}
            >
              {duration}
            </span>
          )}
        </div>
        <h3
          className="text-xl font-bold mb-3"
          style={{ color: colors.charcoal }}
        >
          {title}
        </h3>
        <p
          className="leading-relaxed"
          style={{ color: colors.warmGray }}
        >
          {description}
        </p>
      </div>
    </FadeIn>
  );
}

// ============================================
// PAIN POINT CARD
// ============================================
function PainPointCard({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div
        className="p-6 rounded-xl flex items-start gap-4"
        style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}
      >
        <span className="text-2xl flex-shrink-0">😵</span>
        <p className="text-lg" style={{ color: colors.charcoal }}>{text}</p>
      </div>
    </FadeIn>
  );
}

// ============================================
// STRESSED CREATOR ILLUSTRATION
// ============================================
function StressedCreatorIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Thought bubbles - confusion */}
      <g stroke={colors.charcoal} strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Spiral/confusion cloud */}
        <path d="M175 35 Q170 30 175 25 Q180 20 185 25 Q190 20 195 25 Q200 30 195 35 Q200 40 195 45 Q190 50 185 45 Q180 50 175 45 Q170 40 175 35" />
        <path d="M182 32 Q185 28 188 32 Q191 28 188 35 Q185 38 182 35 Q179 32 182 32" />

        {/* Clock */}
        <circle cx="220" cy="30" r="12" />
        <path d="M220 22 L220 30 L226 34" />
        {/* Speed lines */}
        <path d="M235 25 L245 20" />
        <path d="M236 30 L248 30" />
        <path d="M235 35 L245 40" />

        {/* Notification bells */}
        <path d="M255 40 Q255 32 260 32 Q265 32 265 40 L268 45 L252 45 L255 40" />
        <circle cx="260" cy="48" r="2" />
        <path d="M245 50 Q245 42 250 42 Q255 42 255 50 L258 55 L242 55 L245 50" />
        <circle cx="250" cy="58" r="2" />
      </g>

      {/* Person */}
      <g stroke={colors.charcoal} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Hair bun */}
        <ellipse cx="200" cy="55" rx="12" ry="10" />

        {/* Head */}
        <ellipse cx="200" cy="80" rx="18" ry="20" />

        {/* Closed eyes (stressed) */}
        <path d="M192 77 Q194 80 196 77" />
        <path d="M204 77 Q206 80 208 77" />

        {/* Eyebrows (worried) */}
        <path d="M190 73 L196 75" />
        <path d="M204 75 L210 73" />

        {/* Mouth (frown) */}
        <path d="M195 88 Q200 85 205 88" />

        {/* Body/shoulders */}
        <path d="M175 105 Q175 95 185 100 L200 105 L215 100 Q225 95 225 105 L225 145 L175 145 L175 105" />

        {/* Arms holding head */}
        <path d="M175 110 Q160 105 155 95 Q150 85 160 80" />
        <path d="M225 110 Q240 105 245 95 Q250 85 240 80" />

        {/* Hands on temples */}
        <ellipse cx="165" cy="78" rx="8" ry="6" />
        <ellipse cx="235" cy="78" rx="8" ry="6" />
      </g>

      {/* Desk */}
      <path d="M50 160 L350 160" stroke={colors.charcoal} strokeWidth="2" />

      {/* Laptop */}
      <g stroke={colors.charcoal} strokeWidth="1.5" fill="none">
        {/* Screen */}
        <rect x="165" y="115" width="70" height="45" rx="2" />
        {/* Keyboard base */}
        <path d="M160 160 L240 160 L245 155 L155 155 Z" />
        {/* Screen content lines */}
        <line x1="175" y1="125" x2="225" y2="125" strokeWidth="1" />
        <line x1="175" y1="132" x2="220" y2="132" strokeWidth="1" />
        <line x1="175" y1="139" x2="215" y2="139" strokeWidth="1" />
        <line x1="175" y1="146" x2="210" y2="146" strokeWidth="1" />
      </g>

      {/* Left paper stack */}
      <g stroke={colors.charcoal} strokeWidth="1.2" fill="none">
        <rect x="75" y="130" width="40" height="30" rx="1" />
        <rect x="78" y="127" width="40" height="30" rx="1" />
        <rect x="81" y="124" width="40" height="30" rx="1" />
        {/* Lines on top paper */}
        <line x1="86" y1="132" x2="116" y2="132" strokeWidth="0.8" />
        <line x1="86" y1="138" x2="114" y2="138" strokeWidth="0.8" />
        <line x1="86" y1="144" x2="110" y2="144" strokeWidth="0.8" />
      </g>

      {/* Camera */}
      <g stroke={colors.charcoal} strokeWidth="1.3" fill="none">
        <rect x="80" y="105" width="35" height="22" rx="3" />
        <circle cx="97" cy="116" r="7" />
        <circle cx="97" cy="116" r="3" />
        <rect x="85" y="100" width="12" height="6" rx="1" />
      </g>

      {/* Right paper stack */}
      <g stroke={colors.charcoal} strokeWidth="1.2" fill="none">
        <rect x="270" y="130" width="40" height="30" rx="1" />
        <rect x="273" y="127" width="40" height="30" rx="1" />
        <rect x="276" y="124" width="40" height="30" rx="1" />
        {/* Checkmarks on papers */}
        <path d="M282 132 L286 136 L294 128" strokeWidth="1" />
        <path d="M282 142 L286 146 L294 138" strokeWidth="1" />
      </g>

      {/* Coffee mug */}
      <g stroke={colors.charcoal} strokeWidth="1.3" fill="none">
        <path d="M320 140 L320 158 Q320 162 325 162 L335 162 Q340 162 340 158 L340 140 L320 140" />
        <path d="M340 145 Q350 145 350 152 Q350 158 340 158" />
        {/* Steam */}
        <path d="M325 135 Q327 130 325 125" strokeWidth="1" />
        <path d="M332 135 Q334 128 332 122" strokeWidth="1" />
      </g>

      {/* Scattered papers on desk */}
      <g stroke={colors.charcoal} strokeWidth="1" fill="none">
        <rect x="130" y="155" width="20" height="15" rx="1" transform="rotate(-8 140 162)" />
        <rect x="250" y="152" width="18" height="14" rx="1" transform="rotate(5 259 159)" />
      </g>

      {/* Pen/pencil */}
      <g stroke={colors.charcoal} strokeWidth="1.2" fill="none">
        <path d="M300 155 L315 150" />
        <path d="M315 150 L318 152 L303 157 L300 155" />
      </g>
    </svg>
  );
}

// ============================================
// PROCESS ARROW
// ============================================
function ProcessArrow() {
  return (
    <div className="flex justify-center py-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5L12 19M12 19L6 13M12 19L18 13" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  return (
    <main className="min-h-screen" style={{ background: colors.creamDark }}>
      {/* ============================================
          NAVIGATION
          ============================================ */}
      <nav className="py-6 px-6" style={{ borderBottom: `1px solid ${colors.charcoal}` }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="text-xl tracking-tight" style={{ color: colors.charcoal, fontFamily: "var(--font-display)", fontWeight: 900 }}>
            REWIRE
          </span>
        </div>
      </nav>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 text-center lg:text-left">
              <FadeIn>
                <h1
                  className="text-2xl md:text-3xl lg:text-[36px] font-bold mb-6 leading-relaxed"
                  style={{ color: colors.charcoal, letterSpacing: "-0.02em" }}
                >
                  想做更多內容，想跟粉絲更多互動，但沒時間又不想擴編團隊？
                  <br />
                  <span style={{ color: colors.accent }}>
                    讓我們跟你一起建立 AI 工具，用一位新鮮人的薪水，做<span className="handdrawn-underline">十位的事</span>
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p
                  className="text-lg mb-8"
                  style={{ color: colors.warmGray }}
                >
                  我們直接進到你的創作流程，找出 AI 機會點，幫你省時間，省成本，做更多更高品質的內容
                </p>
              </FadeIn>

              <FadeIn delay={400}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: colors.charcoal, color: colors.cream }}
                >
                  <span>跟創辦人聊 20 分鐘</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </FadeIn>
            </div>

            {/* Right side - Illustration */}
            <FadeIn delay={150} className="flex-1 w-full lg:w-auto">
              <div className="max-w-[500px] mx-auto lg:mx-0">
                <img
                  src="/stressed-creator.png"
                  alt="Stressed content creator at desk"
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================
          PAIN POINTS SECTION
          ============================================ */}
      <section className="py-24 px-6" style={{ background: colors.cream }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{ color: colors.charcoal }}
            >
              你是不是也有這樣的困擾？
            </h2>
          </FadeIn>

          {/* 2x2 Grid of Pain Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Card 1 - Multiple platforms */}
            <FadeIn delay={100}>
              <div
                className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: colors.creamDark, border: `1px solid ${colors.sand}` }}
              >
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Multiple screens/platforms - hand drawn rectangles */}
                    <rect x="6" y="8" width="14" height="12" rx="1" />
                    <rect x="28" y="8" width="14" height="12" rx="1" />
                    <rect x="17" y="26" width="14" height="12" rx="1" />
                    {/* Wavy lines inside */}
                    <path d="M9 12 Q11 11 13 12 Q15 13 17 12" />
                    <path d="M31 12 Q33 11 35 12 Q37 13 39 12" />
                    <path d="M20 30 Q22 29 24 30 Q26 31 28 30" />
                    {/* Connecting arrows */}
                    <path d="M13 20 L20 26" />
                    <path d="M35 20 L28 26" />
                  </svg>
                </div>
                <p className="text-lg" style={{ color: colors.charcoal }}>
                  <strong>做完內容</strong>，還需要想跟產出各平台的內容形式
                </p>
              </div>
            </FadeIn>

            {/* Card 2 - Comments overflow */}
            <FadeIn delay={200}>
              <div
                className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: colors.creamDark, border: `1px solid ${colors.sand}` }}
              >
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Stacked comment bubbles */}
                    <path d="M8 10 Q8 6 12 6 L28 6 Q32 6 32 10 L32 18 Q32 22 28 22 L16 22 L10 28 L10 22 L12 22 Q8 22 8 18 Z" />
                    <path d="M36 14 L36 26 Q36 30 32 30 L22 30" />
                    <path d="M40 18 L40 32 Q40 36 36 36 L26 36" />
                    {/* Lines in bubble */}
                    <path d="M12 11 L24 11" />
                    <path d="M12 15 L20 15" />
                  </svg>
                </div>
                <p className="text-lg" style={{ color: colors.charcoal }}>
                  <strong>留言很多</strong>，但沒時間整理觀眾回饋
                </p>
              </div>
            </FadeIn>

            {/* Card 3 - Time stuck */}
            <FadeIn delay={300}>
              <div
                className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: colors.creamDark, border: `1px solid ${colors.sand}` }}
              >
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Clock */}
                    <circle cx="24" cy="24" r="14" />
                    <path d="M24 14 L24 24 L30 28" />
                    {/* Stress marks */}
                    <path d="M38 8 L42 4" />
                    <path d="M42 10 L46 8" />
                    <path d="M40 14 L44 14" />
                    {/* Spiral scribble */}
                    <path d="M6 8 Q4 6 6 4 Q8 2 10 4 Q12 6 10 8 Q8 10 6 8" />
                  </svg>
                </div>
                <p className="text-lg" style={{ color: colors.charcoal }}>
                  <strong>想做更多內容</strong>，但人力和時間都卡住
                </p>
              </div>
            </FadeIn>

            {/* Card 4 - AI tools don't connect */}
            <FadeIn delay={400}>
              <div
                className="p-8 rounded-2xl transition-all duration-300"
                style={{ background: colors.creamDark, border: `1px solid ${colors.sand}` }}
              >
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Scattered app/tool boxes */}
                    <rect x="4" y="6" width="10" height="10" rx="2" />
                    <rect x="19" y="4" width="10" height="10" rx="2" />
                    <rect x="34" y="8" width="10" height="10" rx="2" />
                    <rect x="8" y="28" width="10" height="10" rx="2" />
                    <rect x="28" y="30" width="10" height="10" rx="2" />
                    {/* Broken dotted lines - not connecting */}
                    <path d="M14 11 L19 9" strokeDasharray="2 2" />
                    <path d="M29 9 L34 11" strokeDasharray="2 2" />
                    <path d="M13 28 L22 20" strokeDasharray="2 2" />
                    <path d="M18 33 L28 35" strokeDasharray="2 2" />
                    {/* Confusion squiggle */}
                    <path d="M40 26 Q42 24 40 22 Q38 20 40 18" />
                  </svg>
                </div>
                <p className="text-lg" style={{ color: colors.charcoal }}>
                  <strong>試過很多 AI 工具</strong>，但接不起來、用不久
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={500}>
            <p
              className="text-xl md:text-2xl font-semibold text-center"
              style={{ color: colors.charcoal }}
            >
              問題不是你不夠努力。
              <span style={{ color: colors.accent }}>是你還<span className="handdrawn-underline">沒善用 AI</span></span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          PROCESS SECTION
          ============================================ */}
      <section className="py-24 px-6" style={{ background: colors.creamDark }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <span
              className="inline-block text-sm font-medium mb-4 uppercase tracking-wide px-4 py-1.5 rounded-full"
              style={{ background: colors.charcoal, color: colors.cream }}
            >
              合作模式
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.charcoal }}
            >
              攜手合作客製化 AI 應用
            </h2>
            <p
              className="text-xl mb-16"
              style={{ color: colors.warmGray }}
            >
              不畫 PPT，不給高空建議，我們只在意成果
            </p>
          </FadeIn>

          {/* Two-column layout: Timeline + Workflow Image */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: Compact Timeline */}
            <div className="flex-1 relative">
              {/* Vertical connecting line */}
              <div
                className="absolute left-[19px] top-6 bottom-6 w-[2px]"
                style={{ background: colors.sand }}
              />

            <div className="space-y-0">
              {/* Step 1 */}
              <FadeIn delay={100}>
                <div className="flex gap-6 pb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10" style={{ background: colors.accent, color: colors.cream }}>
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg" style={{ color: colors.charcoal }}>免費 Pilot 試點</h3>
                      <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: colors.cream, color: colors.warmGray }}>1–2 週</span>
                    </div>
                    <p className="text-base" style={{ color: colors.warmGray }}>從你現有流程中選一個最痛的點，免費做一個小實驗，讓你親眼看到 AI 是否真的有用</p>
                  </div>
                </div>
              </FadeIn>

              {/* Step 2 - Combined */}
              <FadeIn delay={150}>
                <div className="flex gap-6 pb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10" style={{ background: colors.accent, color: colors.cream }}>
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg" style={{ color: colors.charcoal }}>梳理流程，找出機會點</h3>
                      <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: colors.cream, color: colors.warmGray }}>1 週</span>
                    </div>
                    <p className="text-base" style={{ color: colors.warmGray }}>把你的創作流程畫出來，找出哪些步驟適合自動化、哪些適合 AI 輔助</p>
                  </div>
                </div>
              </FadeIn>

              {/* Step 3 */}
              <FadeIn delay={200}>
                <div className="flex gap-6 pb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10" style={{ background: colors.accent, color: colors.cream }}>
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg" style={{ color: colors.charcoal }}>客製化 AI 工具並落地</h3>
                      <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: colors.cream, color: colors.warmGray }}>1–2 週</span>
                    </div>
                    <p className="text-base" style={{ color: colors.warmGray }}>根據你的需求打造適合你的 AI 工作流，手把手接進你原本的流程</p>
                  </div>
                </div>
              </FadeIn>

              {/* Step 4 */}
              <FadeIn delay={250}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative z-10" style={{ background: colors.accent, color: colors.cream }}>
                    4
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg" style={{ color: colors.charcoal }}>持續優化與更新</h3>
                      <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: colors.cream, color: colors.warmGray }}>持續進行</span>
                    </div>
                    <p className="text-base" style={{ color: colors.warmGray }}>AI 技術更新，我們幫你一起升級，你不需要一直追新工具</p>
                  </div>
                </div>
              </FadeIn>
            </div>
            </div>

            {/* Right: Workflow Diagram Image */}
            <FadeIn delay={300} className="flex-1 w-full lg:w-auto">
              <div
                className="p-4 rounded-2xl overflow-hidden"
                style={{ background: colors.cream, border: `1px solid ${colors.sand}`, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)" }}
              >
                <img
                  src="/workflow-diagram.png"
                  alt="Podcast YouTuber AI 工作流程圖"
                  className="w-full h-auto rounded-lg"
                />
                <p
                  className="text-sm text-center mt-3"
                  style={{ color: colors.warmGray }}
                >
                  流程梳理 & 機會點範例
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================
          EXAMPLE SECTION
          ============================================ */}
      <section className="py-16 md:py-24 px-6" style={{ background: colors.cream }}>
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center">
              <span
                className="inline-block text-sm font-medium mb-3 md:mb-4 uppercase tracking-wide px-4 py-1.5 rounded-full"
                style={{ background: colors.charcoal, color: colors.cream }}
              >
                實際案例
              </span>
              <h2
                className="text-2xl md:text-4xl font-bold mb-6 md:mb-12"
                style={{ color: colors.charcoal }}
              >
                就拿一件很瑣的事當例子：影片留言整理分析
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-row items-center justify-center gap-1 md:gap-2">
              {/* Step 1: Crawl */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1"
                  style={{ background: colors.creamDark, border: `1.5px solid ${colors.sand}` }}
                >
                  <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="3" stroke={colors.charcoal} strokeWidth="1.5" fill="none" />
                    <circle cx="14" cy="14" r="7" stroke={colors.charcoal} strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
                    <circle cx="14" cy="14" r="11" stroke={colors.charcoal} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M14 3 L14 25 M3 14 L25 14 M6 6 L22 22 M22 6 L6 22" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-medium" style={{ color: colors.charcoal }}>爬留言</p>
              </div>

              {/* Arrow 1 */}
              <svg className="w-4 h-4 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M8 16 C 14 16, 18 14, 24 16 M20 12 L24 16 L20 20" stroke={colors.warmGray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 2: Analyze */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1"
                  style={{ background: colors.creamDark, border: `1.5px solid ${colors.sand}` }}
                >
                  <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 24 L4 10 M10 24 L10 14 M16 24 L16 8 M22 24 L22 12" stroke={colors.charcoal} strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 6 C 8 4, 14 10, 23 5" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-medium" style={{ color: colors.charcoal }}>分析</p>
              </div>

              {/* Arrow 2 */}
              <svg className="w-4 h-4 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M8 16 C 14 16, 18 14, 24 16 M20 12 L24 16 L20 20" stroke={colors.warmGray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 3: Report */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1"
                  style={{ background: colors.creamDark, border: `1.5px solid ${colors.sand}` }}
                >
                  <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4 L17 4 L21 8 L21 24 L7 24 Z" stroke={colors.charcoal} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 4 L17 8 L21 8" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 12 L18 12 M10 16 L18 16 M10 20 L15 20" stroke={colors.charcoal} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-medium" style={{ color: colors.charcoal }}>報告</p>
              </div>

              {/* Arrow 3 */}
              <svg className="w-4 h-4 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                <path d="M8 16 C 14 16, 18 14, 24 16 M20 12 L24 16 L20 20" stroke={colors.warmGray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Step 4: Email */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1"
                  style={{ background: colors.accent }}
                >
                  <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="7" width="20" height="14" rx="2" stroke={colors.cream} strokeWidth="1.5" fill="none" />
                    <path d="M4 9 L14 16 L24 9" stroke={colors.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-medium" style={{ color: colors.charcoal }}>寄信</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-8 md:mt-12 text-center">
              <div
                className="p-5 md:p-8 rounded-2xl max-w-lg mx-auto"
                style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}
              >
                <div className="space-y-3 md:space-y-4">
                  <input
                    type="email"
                    placeholder="你的 Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background: colors.creamDark,
                      border: `1px solid ${colors.sand}`,
                      color: colors.charcoal,
                    }}
                  />
                  <input
                    type="url"
                    placeholder="YouTube 影片連結"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background: colors.creamDark,
                      border: `1px solid ${colors.sand}`,
                      color: colors.charcoal,
                    }}
                  />
                  <button
                    className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                    style={{ background: colors.accent, color: colors.cream }}
                  >
                    寄到我信箱
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          FINAL CTA SECTION
          ============================================ */}
      <section id="contact" className="py-32 px-6" style={{ background: colors.charcoal }}>
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ color: colors.cream, fontFamily: "var(--font-display)" }}
            >
              聊 20 分鐘，找到你的 AI 切入點
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: `${colors.cream}80` }}
            >
              不用準備，不用想清楚，先聊就對了。
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: colors.cream, color: colors.charcoal }}
            >
              <span>跟創辦人聊 20 分鐘</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="py-12 px-6" style={{ background: colors.creamDark, borderTop: `1px solid ${colors.sand}` }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="tracking-tight" style={{ color: colors.charcoal, fontFamily: "var(--font-display)", fontWeight: 900 }}>
              REWIRE
            </span>

            <p className="text-sm" style={{ color: colors.warmGray }}>
              © 2026 REWIRE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================
          GLOBAL STYLES
          ============================================ */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Noto Sans TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        ::selection {
          background: ${colors.accent};
          color: ${colors.cream};
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${colors.creamDark};
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.sand};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.warmGray};
        }

        input:focus {
          outline: none;
          border-color: ${colors.accent} !important;
          box-shadow: 0 0 0 3px ${colors.accent}20;
        }

        .handdrawn-underline {
          position: relative;
          display: inline-block;
        }

        .handdrawn-underline::after {
          content: '';
          position: absolute;
          left: -2%;
          right: -2%;
          bottom: -0.2em;
          height: 0.25em;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'%3E%3Cpath d='M0 8 Q 100 0, 200 8' stroke='%232D5A27' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      `}</style>
    </main>
  );
}
