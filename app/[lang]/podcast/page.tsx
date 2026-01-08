"use client";

import { useState } from "react";
import { LogoMark } from "../../components/Logo";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useParams } from "next/navigation";

// AI Feature type
interface AIFeature {
  id: number;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
}

// All AI features
const aiFeatures: AIFeature[] = [
  { id: 1, title: { en: "AI Mind Map", zh: "AI 靈感心智圖" }, description: { en: "Generate topic clusters and content ideas based on trending conversations in your niche.", zh: "根據你領域的熱門話題生成主題群組和內容點子。" } },
  { id: 2, title: { en: "AI Competitor Analysis", zh: "AI 同質分析" }, description: { en: "Analyze top podcasts in your space — their guest choices, episode topics, and engagement patterns.", zh: "分析你領域的頂尖 Podcast — 他們的來賓選擇、節目主題和互動模式。" } },
  { id: 3, title: { en: "AI Deep Research", zh: "AI 深度研究" }, description: { en: "Comprehensive guest dossiers including work history, talking points, and potential conversation angles.", zh: "全面的來賓檔案，包括工作經歷、談話要點和潛在對話角度。" } },
  { id: 4, title: { en: "AI Email Drafting", zh: "AI 撰寫Email草稿" }, description: { en: "Personalized outreach emails that match your voice with clear value propositions.", zh: "符合你風格的個人化邀約 Email，包含明確價值主張。" } },
  { id: 5, title: { en: "AI Meeting Brief", zh: "AI 會議簡報" }, description: { en: "Auto-generated meeting agendas and prep materials based on guest research.", zh: "根據來賓研究自動生成會議議程和準備材料。" } },
  { id: 6, title: { en: "AI Meeting Notes", zh: "AI 會議紀錄" }, description: { en: "Automatic transcription and summarization of pre-interview calls.", zh: "會前通話的自動轉錄和摘要。提取關鍵點和行動項目。" } },
  { id: 7, title: { en: "AI Opening Suggestions", zh: "AI 開場提案建議" }, description: { en: "Hook-worthy opening lines and intro scripts tailored to each guest.", zh: "為每位來賓量身定制的吸引人開場白和介紹腳本。" } },
  { id: 8, title: { en: "AI Interview Questions", zh: "AI 訪談問題建議" }, description: { en: "Smart question generation based on guest background and audience interests.", zh: "根據來賓背景和觀眾興趣智能生成問題。包含追問提示。" } },
  { id: 9, title: { en: "AI Transcript Generation", zh: "AI 逐字稿生成" }, description: { en: "Automatic transcription of your recorded episodes with speaker identification.", zh: "自動生成錄製節目的逐字稿，並識別不同講者。" } },
  { id: 10, title: { en: "AI Email Reader & Filter", zh: "AI 自動讀取 Email & 篩選" }, description: { en: "Automatically read and filter inbound guest requests by relevance and potential.", zh: "自動讀取並篩選進線來賓請求，按相關性和潛力排序。" } },
  { id: 11, title: { en: "AI Auto-Reply (Accept)", zh: "AI 自動撰寫 & 回覆 Email" }, description: { en: "Draft professional acceptance emails with collaboration details.", zh: "撰寫專業的接受郵件，包含合作細節。" } },
  { id: 12, title: { en: "AI Auto-Reply (Decline)", zh: "AI 自動撰寫 & 回覆 Email" }, description: { en: "Professional decline or postpone emails that maintain relationships.", zh: "維護關係的專業婉拒或延期 Email。" } },
  { id: 13, title: { en: "AI YouTube Content", zh: "AI 產圖片 & 文案" }, description: { en: "Auto-generate thumbnails, titles, and descriptions optimized for YouTube.", zh: "自動生成針對 YouTube 優化的縮圖、標題和描述。" } },
  { id: 14, title: { en: "AI Instagram Content", zh: "AI 產圖片 & 文案" }, description: { en: "Create engaging Instagram posts with optimized visuals and captions.", zh: "創建吸引人的 Instagram 貼文，包含優化的視覺和文案。" } },
  { id: 15, title: { en: "AI TikTok Content", zh: "AI 產影片 & 文案" }, description: { en: "Generate short-form video clips and captions for TikTok.", zh: "生成 TikTok 短影音片段和文案。" } },
  { id: 16, title: { en: "AI Newsletter Content", zh: "AI 產圖片 & 文案" }, description: { en: "Create email newsletter content with visuals and copy.", zh: "創建電子報內容，包含視覺和文案。" } },
  { id: 17, title: { en: "AI Analytics & Insights", zh: "AI 分析 & 洞見" }, description: { en: "Deep analysis of views, watch time, retention curves, and engagement rates.", zh: "深度分析觀看數、觀看時長、留存曲線和互動率。" } },
  { id: 18, title: { en: "AI Comment Summarization", zh: "AI 統整歸納留言" }, description: { en: "Aggregate and analyze comments, DMs, and emails from your audience.", zh: "彙整和分析觀眾的留言、私訊和 Email。" } },
  { id: 19, title: { en: "AI Comment Reply Suggestions", zh: "AI 建議留言回覆" }, description: { en: "Generate thoughtful reply suggestions for audience comments.", zh: "為觀眾留言生成貼心的回覆建議。" } },
  { id: 20, title: { en: "AI Learning Summary", zh: "AI 統整學習" }, description: { en: "Consolidate learnings and insights from each episode cycle.", zh: "整合每個節目週期的學習和洞察。" } },
];

// Dictionary
const dict = {
  en: {
    nav: { scheduleCall: "Get Your Time Back", home: "Home" },
    hero: {
      badge: "For Interview Podcasters",
      headline1: "Automate your",
      headline2: "podcast workflow",
      subheadline: "From guest research to post-production — AI handles the 80% so you can focus on the conversation.",
      cta: "Get Your Free Audit",
    },
    cta: {
      title: "Ready to streamline your podcast?",
      subtitle: "See exactly how much time you're spending on non-creative work. Free 30-minute workflow audit.",
      button: "Get Your Free Audit",
      note: "30-min audit • Walk away with actionable insights",
    },
  },
  zh: {
    nav: { scheduleCall: "奪回你的時間", home: "首頁" },
    hero: {
      badge: "專為訪談型 Podcast 打造",
      headline1: "自動化你的",
      headline2: "Podcast 工作流",
      subheadline: "從來賓研究到後製剪輯 — AI 處理 80% 的工作，讓你專注在對話本身。",
      cta: "獲取免費審計",
    },
    cta: {
      title: "準備好簡化你的 Podcast 流程了嗎？",
      subtitle: "看看你在非創作工作上花了多少時間。免費 30 分鐘工作流審計。",
      button: "獲取免費審計",
      note: "30 分鐘審計 • 帶走可執行的洞察",
    },
  },
};

// Category type and data
interface Category {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  features: number[];
  color: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "pre-production",
    title: { en: "Pre-Production", zh: "前期準備" },
    description: { en: "Research and planning", zh: "研究與規劃" },
    features: [1, 2, 3, 4],
    color: "#C4704F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "interview-prep",
    title: { en: "Interview Prep", zh: "訪談籌備" },
    description: { en: "Get ready for recording", zh: "錄製前準備" },
    features: [5, 6, 7, 8, 9],
    color: "#684071",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2v6m0 0l3-3m-3 3L9 5" />
        <rect x="3" y="8" width="18" height="14" rx="2" />
        <path d="M7 12h4m6 0h.01M7 16h10" />
      </svg>
    ),
  },
  {
    id: "post-production",
    title: { en: "Post-Production", zh: "後製發布" },
    description: { en: "Content & distribution", zh: "內容製作與發布" },
    features: [13, 14, 15, 16],
    color: "#225E7D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M10 9l4 2.5L10 14V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "analytics",
    title: { en: "Analytics", zh: "數據分析" },
    description: { en: "Track & optimize", zh: "追蹤與優化" },
    features: [17, 18, 19, 20],
    color: "#156A47",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
    ),
  },
  {
    id: "guest-management",
    title: { en: "Guest Management", zh: "來賓管理" },
    description: { en: "Handle requests", zh: "處理邀約請求" },
    features: [10, 11, 12],
    color: "#7D2F1E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
];

// Hero Illustration SVG
function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="podcast-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDFCFB" />
          <stop offset="100%" stopColor="#F8F6F3" />
        </linearGradient>
        <linearGradient id="podcast-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C4704F" />
          <stop offset="100%" stopColor="#D4896A" />
        </linearGradient>
        <filter id="podcast-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background circles */}
      <circle cx="420" cy="80" r="100" fill="#684071" opacity="0.08" />
      <circle cx="60" cy="320" r="80" fill="#225E7D" opacity="0.08" />
      <circle cx="250" cy="380" r="60" fill="#C4704F" opacity="0.06" />

      {/* Microphone card */}
      <g filter="url(#podcast-shadow)">
        <rect x="30" y="60" width="180" height="200" rx="16" fill="url(#podcast-grad-1)" stroke="#E8E4DE" strokeWidth="1" />
        {/* Mic icon */}
        <circle cx="120" cy="130" r="40" fill="#21201C" />
        <rect x="110" y="100" width="20" height="50" rx="10" fill="#FDFCFB" />
        <path d="M100 140 Q100 160 120 160 Q140 160 140 140" fill="none" stroke="#FDFCFB" strokeWidth="3" />
        <line x1="120" y1="160" x2="120" y2="175" stroke="#FDFCFB" strokeWidth="3" />
        {/* Sound waves */}
        <path d="M155 115 Q165 130 155 145" fill="none" stroke="#C4704F" strokeWidth="2" opacity="0.6" />
        <path d="M165 105 Q180 130 165 155" fill="none" stroke="#C4704F" strokeWidth="2" opacity="0.4" />
        {/* Labels */}
        <rect x="50" y="200" width="80" height="10" rx="5" fill="#E8E4DE" />
        <rect x="50" y="220" width="120" height="8" rx="4" fill="#E8E4DE" opacity="0.6" />
        <rect x="50" y="235" width="90" height="8" rx="4" fill="#E8E4DE" opacity="0.4" />
      </g>

      {/* AI Processing card */}
      <g filter="url(#podcast-shadow)">
        <rect x="160" y="140" width="180" height="160" rx="16" fill="url(#podcast-grad-1)" stroke="#E8E4DE" strokeWidth="1" />
        {/* AI Brain icon */}
        <circle cx="250" cy="200" r="35" fill="none" stroke="url(#podcast-accent)" strokeWidth="3" strokeDasharray="10 5" />
        <text x="250" y="205" textAnchor="middle" fill="#C4704F" fontSize="14" fontWeight="700">AI</text>
        {/* Connection dots */}
        <circle cx="210" cy="180" r="4" fill="#684071" opacity="0.6" />
        <circle cx="290" cy="180" r="4" fill="#225E7D" opacity="0.6" />
        <circle cx="210" cy="220" r="4" fill="#156A47" opacity="0.6" />
        <circle cx="290" cy="220" r="4" fill="#7D2F1E" opacity="0.6" />
        {/* Labels */}
        <rect x="180" y="255" width="100" height="8" rx="4" fill="#C4704F" opacity="0.3" />
        <rect x="180" y="270" width="70" height="6" rx="3" fill="#C4704F" opacity="0.2" />
      </g>

      {/* Output cards */}
      <g filter="url(#podcast-shadow)">
        <rect x="290" y="80" width="180" height="100" rx="16" fill="url(#podcast-grad-1)" stroke="#E8E4DE" strokeWidth="1" />
        {/* YouTube icon */}
        <rect x="310" y="100" width="50" height="35" rx="4" fill="#7D2F1E" opacity="0.2" />
        <polygon points="330,110 330,125 342,117.5" fill="#7D2F1E" />
        {/* Stats */}
        <rect x="375" y="100" width="75" height="8" rx="4" fill="#E8E4DE" />
        <rect x="375" y="115" width="55" height="6" rx="3" fill="#E8E4DE" opacity="0.6" />
        <rect x="375" y="128" width="65" height="6" rx="3" fill="#E8E4DE" opacity="0.4" />
        {/* Badge */}
        <rect x="310" y="150" width="60" height="20" rx="10" fill="#156A47" />
        <text x="340" y="164" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">80%</text>
      </g>

      <g filter="url(#podcast-shadow)">
        <rect x="290" y="200" width="180" height="100" rx="16" fill="url(#podcast-grad-1)" stroke="#E8E4DE" strokeWidth="1" />
        {/* Instagram icon */}
        <rect x="310" y="220" width="50" height="50" rx="8" fill="#684071" opacity="0.2" />
        <circle cx="335" cy="245" r="12" fill="none" stroke="#684071" strokeWidth="2" />
        <circle cx="350" cy="230" r="3" fill="#684071" />
        {/* Stats */}
        <rect x="375" y="225" width="75" height="8" rx="4" fill="#E8E4DE" />
        <rect x="375" y="240" width="55" height="6" rx="3" fill="#E8E4DE" opacity="0.6" />
        <rect x="375" y="253" width="65" height="6" rx="3" fill="#E8E4DE" opacity="0.4" />
        {/* Badge */}
        <rect x="310" y="275" width="50" height="18" rx="9" fill="#225E7D" />
      </g>

      {/* Connection lines */}
      <path d="M210 160 Q235 145 250 155" fill="none" stroke="#C4704F" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
      <path d="M340 200 Q365 180 350 160" fill="none" stroke="#C4704F" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
      <path d="M340 220 Q365 210 350 200" fill="none" stroke="#C4704F" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
    </svg>
  );
}

// Floating background shapes
function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] animate-float opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#C4704F" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#684071" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#225E7D" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-20 -left-20 w-64 h-64 animate-float-delayed opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="#21201C" strokeWidth="0.5" transform="rotate(15 50 50)" />
        </svg>
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({
  category,
  lang,
  onFeatureClick,
}: {
  category: Category;
  lang: "en" | "zh";
  onFeatureClick: (id: number) => void;
}) {
  return (
    <div className="card-hover bg-white rounded-2xl border border-[var(--sand)] overflow-hidden group">
      {/* Category Header */}
      <div
        className="px-6 py-5 flex items-center gap-4"
        style={{ backgroundColor: `${category.color}10` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: category.color, color: "white" }}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--charcoal)]">
            {category.title[lang]}
          </h3>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--warm-gray)]">
            {category.description[lang]}
          </p>
        </div>
      </div>

      {/* Features List */}
      <div className="p-4">
        <div className="space-y-2">
          {category.features.map((featureId) => {
            const feature = aiFeatures.find((f) => f.id === featureId);
            if (!feature) return null;
            return (
              <button
                key={featureId}
                onClick={() => onFeatureClick(featureId)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--cream)] hover:bg-[var(--sand)]/40 transition-all text-left group/item"
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: category.color }}
                >
                  {featureId}
                </span>
                <span className="flex-1 font-[family-name:var(--font-body)] text-sm text-[var(--charcoal)] group-hover/item:text-[var(--charcoal)] transition-colors line-clamp-1">
                  {feature.title[lang]}
                </span>
                <svg className="w-4 h-4 text-[var(--warm-gray)] group-hover/item:text-[var(--charcoal)] transition-colors opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Modal Component
function FeatureModal({
  feature,
  lang,
  onClose,
}: {
  feature: AIFeature | null;
  lang: "en" | "zh";
  onClose: () => void;
}) {
  if (!feature) return null;

  const category = categories.find(c => c.features.includes(feature.id));
  const color = category?.color || "#C4704F";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--charcoal)]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-display)]"
              style={{ backgroundColor: color }}
            >
              {feature.id}
            </span>
            <div>
              <span className="text-xs font-[family-name:var(--font-body)] font-medium text-[var(--warm-gray)] uppercase tracking-wider">
                {lang === "zh" ? "AI 應用" : "AI Feature"}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--charcoal)]">
                {feature.title[lang]}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--cream)] rounded-xl transition-colors text-[var(--warm-gray)] hover:text-[var(--charcoal)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="font-[family-name:var(--font-body)] text-[var(--charcoal-light)] leading-relaxed mb-8">
          {feature.description[lang]}
        </p>

        <button
          onClick={onClose}
          className="btn-primary w-full justify-center"
          style={{
            background: color,
          }}
        >
          <span>{lang === "zh" ? "了解" : "Got it"}</span>
        </button>
      </div>
    </div>
  );
}

// Process Step Illustration
function ProcessIllustration({ step, color }: { step: number; color: string }) {
  const illustrations = [
    <svg key="1" viewBox="0 0 80 80" className="w-full h-full">
      <circle cx="40" cy="40" r="35" fill={color} opacity="0.1" />
      <circle cx="40" cy="40" r="25" fill={color} opacity="0.15" />
      <circle cx="40" cy="35" r="10" fill="none" stroke={color} strokeWidth="2" />
      <path d="M40 45 L40 55 M35 50 L40 55 L45 50" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="2" viewBox="0 0 80 80" className="w-full h-full">
      <rect x="15" y="20" width="50" height="40" rx="6" fill={color} opacity="0.1" />
      <rect x="22" y="28" width="15" height="24" rx="3" fill={color} opacity="0.3" />
      <rect x="42" y="28" width="18" height="8" rx="2" fill={color} opacity="0.4" />
      <rect x="42" y="40" width="18" height="6" rx="2" fill={color} opacity="0.25" />
      <rect x="42" y="50" width="12" height="6" rx="2" fill={color} opacity="0.15" />
    </svg>,
    <svg key="3" viewBox="0 0 80 80" className="w-full h-full">
      <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />
      <path d="M25 50 L35 40 L45 45 L60 28" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="28" r="5" fill={color} />
    </svg>,
  ];
  return illustrations[step - 1] || illustrations[0];
}

export default function PodcastPage() {
  const params = useParams();
  const lang = (params.lang as string) === "zh-TW" ? "zh" : "en";
  const t = dict[lang];

  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);

  const handleFeatureClick = (featureId: number) => {
    const feature = aiFeatures.find((f) => f.id === featureId);
    if (feature) setSelectedFeature(feature);
  };

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)]/90 backdrop-blur-md border-b border-[var(--sand)]/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={`/${params.lang}`} className="text-[var(--charcoal)] hover:opacity-70 transition-opacity">
            <LogoMark size={36} />
          </a>
          <div className="flex items-center gap-6">
            <a href={`/${params.lang}`} className="text-[var(--charcoal-light)] hover:text-[var(--charcoal)] transition-colors font-[family-name:var(--font-body)] text-sm font-medium">
              {t.nav.home}
            </a>
            <LanguageSwitcher currentLocale={params.lang as string} />
            <a href="#cta" className="btn-primary text-sm">
              <span>{t.nav.scheduleCall}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <BackgroundShapes />

        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-[var(--terracotta)]/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-[var(--terracotta)] rounded-full animate-pulse" />
                <span className="text-sm font-[family-name:var(--font-body)] text-[var(--terracotta)] font-medium">
                  {t.hero.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up-1 font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--charcoal)] leading-[1.05] mb-6 tracking-tight">
                {t.hero.headline1}
                <br />
                <span className="gradient-text">{t.hero.headline2}</span>
              </h1>

              {/* Subheadline */}
              <p className="animate-fade-in-up-2 font-[family-name:var(--font-body)] text-xl text-[var(--charcoal-light)] max-w-lg mb-10 leading-relaxed">
                {t.hero.subheadline}
              </p>

              {/* CTA */}
              <div className="animate-fade-in-up-3 flex flex-wrap items-center gap-4">
                <a href="#cta" className="btn-primary">
                  <span>{t.hero.cta}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up-4 mt-12 flex items-center gap-8">
                {[
                  { value: "80%", label: lang === "zh" ? "節省時間" : "Time Saved" },
                  { value: "20+", label: lang === "zh" ? "AI 功能" : "AI Features" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--terracotta)]">{stat.value}</span>
                    <span className="text-sm font-[family-name:var(--font-body)] text-[var(--warm-gray)]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="animate-scale-in relative">
              <div className="absolute -inset-10 bg-gradient-to-br from-[var(--terracotta)]/10 via-[var(--accent-purple)]/10 to-[var(--accent-blue)]/10 rounded-full blur-3xl" />
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Diagram Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-8" />
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
              {lang === "zh" ? "工作流全覽" : "Workflow Overview"}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--charcoal)] leading-tight mb-4">
              {lang === "zh" ? "Podcast 製作流程" : "Podcast Production Flow"}
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg text-[var(--warm-gray)] max-w-2xl mx-auto">
              {lang === "zh"
                ? "完整的工作流程圖，展示 AI 如何在每個環節幫助你"
                : "See how AI assists at every step of your workflow"}
            </p>
          </div>

          {/* FigJam Embed */}
          <div className="rounded-2xl overflow-hidden border border-[var(--sand)] shadow-lg bg-white">
            <iframe
              style={{ border: "none" }}
              width="100%"
              height="600"
              src="https://embed.figma.com/board/tspZcqjrLEj7GVhJRHMrgY/Rewire?node-id=0-1&embed-host=share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 bg-[var(--cream-dark)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-8" />
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
              {lang === "zh" ? "AI 應用場景" : "AI Use Cases"}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--charcoal)] leading-tight mb-4">
              {lang === "zh" ? "20+ AI 自動化功能" : "20+ AI Automations"}
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg text-[var(--warm-gray)] max-w-2xl mx-auto">
              {lang === "zh" ? "點擊任一功能了解更多細節" : "Click any feature to learn more"}
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                lang={lang}
                onFeatureClick={handleFeatureClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="accent-line mx-auto mb-8" />
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--terracotta)] uppercase tracking-widest mb-4 block">
              {lang === "zh" ? "合作流程" : "How We Work"}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--charcoal)] leading-tight">
              {lang === "zh" ? "簡單三步驟" : "Simple 3-Step Process"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: lang === "zh" ? "工作流審計" : "Workflow Audit",
                description: lang === "zh"
                  ? "我們深入了解你目前的 Podcast 工作流程，找出最耗時的環節。"
                  : "We dive deep into your current workflow to identify the most time-consuming tasks.",
                color: "#C4704F",
              },
              {
                step: 2,
                title: lang === "zh" ? "客製化方案" : "Custom Solution",
                description: lang === "zh"
                  ? "根據你的需求，設計專屬的 AI 自動化方案，確保符合你的品牌調性。"
                  : "We design a custom AI automation solution that matches your brand voice.",
                color: "#684071",
              },
              {
                step: 3,
                title: lang === "zh" ? "持續優化" : "Continuous Improvement",
                description: lang === "zh"
                  ? "我們不只是交付工具，而是持續追蹤成效並優化。"
                  : "We continuously track performance and optimize for maximum value.",
                color: "#225E7D",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="card-hover relative p-8 bg-[var(--cream-dark)] rounded-2xl border border-[var(--sand)]"
              >
                {/* Illustration */}
                <div className="w-20 h-20 mb-6">
                  <ProcessIllustration step={item.step} color={item.color} />
                </div>

                {/* Step badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-body)] font-semibold mb-4 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {lang === "zh" ? `步驟 ${item.step}` : `Step ${item.step}`}
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--charcoal)] mb-4">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[var(--warm-gray)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 section-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--terracotta)] opacity-5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[var(--accent-purple)] opacity-5 blur-3xl rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="accent-line mx-auto mb-8" />
          <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[var(--terracotta-light)] uppercase tracking-widest mb-4 block">
            {lang === "zh" ? "我們的使命" : "Our Mission"}
          </span>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            {lang === "zh" ? "讓創作者專注在" : "Let Creators Focus on"}{" "}
            <span className="text-[var(--terracotta-light)]">
              {lang === "zh" ? "創作本身" : "Creating"}
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-xl text-white/70 leading-relaxed mb-16 max-w-2xl mx-auto">
            {lang === "zh"
              ? "我們相信最好的內容來自專注的創作者。透過 AI 自動化處理繁瑣的行政工作，讓你把時間和精力投入在真正重要的事情上。"
              : "We believe the best content comes from focused creators. By automating tedious work with AI, we help you invest your time where it truly matters."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-white/10">
            {[
              { value: "80%", label: lang === "zh" ? "節省時間" : "Time Saved" },
              { value: "20+", label: lang === "zh" ? "AI 功能" : "AI Features" },
              { value: "100%", label: lang === "zh" ? "客製化" : "Customized" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--terracotta-light)]">
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-body)] text-sm text-white/50 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="accent-line mx-auto mb-8" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--charcoal)] leading-tight mb-6">
            {t.cta.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-xl text-[var(--warm-gray)] mb-12 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <a href="mailto:jack@aipartner.co" className="btn-primary inline-flex">
            <span>{t.cta.button}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </a>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--warm-gray)] mt-6">
            {t.cta.note}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--charcoal)] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <LogoMark size={28} className="text-white" />
              <span className="font-[family-name:var(--font-display)] font-semibold">
                AI Partner Company
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href={`/${params.lang}`} className="text-white/60 hover:text-white transition-colors font-[family-name:var(--font-body)] text-sm">
                {t.nav.home}
              </a>
              <a href="mailto:jack@aipartner.co" className="text-white/60 hover:text-white transition-colors font-[family-name:var(--font-body)] text-sm">
                jack@aipartner.co
              </a>
            </div>
            <p className="font-[family-name:var(--font-body)] text-sm text-white/40">
              &copy; {new Date().getFullYear()} AI Partner Company.
            </p>
          </div>
        </div>
      </footer>

      {/* Feature Modal */}
      <FeatureModal
        feature={selectedFeature}
        lang={lang}
        onClose={() => setSelectedFeature(null)}
      />
    </main>
  );
}
