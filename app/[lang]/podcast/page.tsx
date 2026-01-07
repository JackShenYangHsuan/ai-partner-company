"use client";

import { useState } from "react";
import { LogoMark } from "../../components/Logo";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useParams } from "next/navigation";

// Workflow node types
type NodeType = "start" | "process" | "ai" | "end" | "feedback";

interface WorkflowNode {
  id: string;
  title: { en: string; zh: string };
  description?: { en: string; zh: string };
  aiFeatures?: { en: string; zh: string }[];
  type: NodeType;
  position: { x: number; y: number };
  connections: string[];
}

// Proactive track nodes
const proactiveNodes: WorkflowNode[] = [
  {
    id: "start-proactive",
    title: { en: "Proactive Outreach", zh: "主動邀約訪問者" },
    type: "start",
    position: { x: 0, y: 0 },
    connections: ["inspiration"],
  },
  {
    id: "inspiration",
    title: { en: "Inspiration Collection", zh: "靈感搜集" },
    description: {
      en: "Discover topics and potential guests",
      zh: "發掘主題和潛在來賓",
    },
    aiFeatures: [
      { en: "AI Mind Mapping", zh: "AI 心智圖" },
      { en: "Competitor Analysis", zh: "競爭者分析" },
    ],
    type: "ai",
    position: { x: 1, y: 0 },
    connections: ["research-proactive"],
  },
  {
    id: "research-proactive",
    title: { en: "Guest Research", zh: "受訪者背景研究" },
    description: {
      en: "Deep dive into guest background",
      zh: "深入了解來賓背景",
    },
    aiFeatures: [{ en: "AI Deep Research", zh: "AI 深度研究" }],
    type: "ai",
    position: { x: 2, y: 0 },
    connections: ["invite"],
  },
  {
    id: "invite",
    title: { en: "Invite Guest", zh: "邀約受訪者" },
    description: {
      en: "Craft personalized outreach",
      zh: "撰寫個人化邀約",
    },
    aiFeatures: [{ en: "AI Email Drafting", zh: "AI 撰寫Email草稿" }],
    type: "ai",
    position: { x: 3, y: 0 },
    connections: ["pre-meeting"],
  },
  {
    id: "pre-meeting",
    title: { en: "Pre-Interview Meeting", zh: "訪談會前會" },
    description: {
      en: "Align on topics and format",
      zh: "對齊主題和形式",
    },
    aiFeatures: [
      { en: "AI Meeting Brief", zh: "AI 會議簡報" },
      { en: "AI Meeting Notes", zh: "AI 會議紀錄" },
    ],
    type: "ai",
    position: { x: 4, y: 0 },
    connections: ["outline"],
  },
  {
    id: "outline",
    title: { en: "Interview Prep", zh: "訪綱文案籌備" },
    description: {
      en: "Prepare questions and flow",
      zh: "準備問題和流程",
    },
    aiFeatures: [
      { en: "AI Opening Suggestions", zh: "AI 開場提案建議" },
      { en: "AI Question Generation", zh: "AI 準備問題" },
    ],
    type: "ai",
    position: { x: 5, y: 0 },
    connections: ["recording"],
  },
  {
    id: "recording",
    title: { en: "Recording", zh: "正式錄製" },
    type: "process",
    position: { x: 6, y: 0 },
    connections: ["post-production"],
  },
  {
    id: "post-production",
    title: { en: "Post-Production", zh: "影片圖片文案剪輯修改" },
    description: {
      en: "Edit and create assets",
      zh: "剪輯和製作素材",
    },
    aiFeatures: [
      { en: "AI Platform Content Generation", zh: "AI 生成各平台圖文" },
    ],
    type: "ai",
    position: { x: 7, y: 0 },
    connections: ["feedback"],
  },
];

// Passive track nodes
const passiveNodes: WorkflowNode[] = [
  {
    id: "start-passive",
    title: { en: "Inbound Requests", zh: "被動進線訪問者" },
    type: "start",
    position: { x: 0, y: 1 },
    connections: ["research-passive"],
  },
  {
    id: "research-passive",
    title: { en: "Guest Screening", zh: "受訪者背景研究" },
    description: {
      en: "Evaluate inbound requests",
      zh: "評估進線請求",
    },
    aiFeatures: [{ en: "AI Auto-Filter & Rank", zh: "AI 自動篩選適合廠商" }],
    type: "ai",
    position: { x: 1, y: 1 },
    connections: ["reply-accept", "reply-decline"],
  },
  {
    id: "reply-accept",
    title: { en: "Accept & Send Outline", zh: "回覆Email及提供訪綱" },
    type: "process",
    position: { x: 2, y: 0.7 },
    connections: ["pre-meeting"],
  },
  {
    id: "reply-decline",
    title: { en: "Decline/Postpone", zh: "回覆婉拒/延期 Email" },
    description: {
      en: "Professional decline responses",
      zh: "專業婉拒回覆",
    },
    aiFeatures: [{ en: "AI Auto-Reply Email", zh: "AI 自動撰寫回覆 Email" }],
    type: "ai",
    position: { x: 2, y: 1.3 },
    connections: [],
  },
];

// Feedback loop nodes
const feedbackNodes: WorkflowNode[] = [
  {
    id: "feedback",
    title: { en: "Audience Feedback", zh: "聽眾回饋及互動" },
    type: "feedback",
    position: { x: 8, y: 0.5 },
    connections: ["quant-analysis", "qual-analysis"],
  },
  {
    id: "quant-analysis",
    title: { en: "Quantitative Analysis", zh: "量化分析聽眾回饋" },
    description: {
      en: "Views, engagement, retention",
      zh: "觀看數、曝光數、互動率",
    },
    aiFeatures: [{ en: "AI Data Analysis & Insights", zh: "AI 數據分析及洞見" }],
    type: "ai",
    position: { x: 9, y: 0.2 },
    connections: ["learning"],
  },
  {
    id: "qual-analysis",
    title: { en: "Qualitative Analysis", zh: "質化分析聽眾回饋" },
    description: {
      en: "Comments, DMs, emails",
      zh: "留言、私訊、Email",
    },
    aiFeatures: [{ en: "AI Comment Summarization", zh: "AI 統整歸納留言" }],
    type: "ai",
    position: { x: 9, y: 0.8 },
    connections: ["learning"],
  },
  {
    id: "learning",
    title: { en: "Learning & Iteration", zh: "彙整經驗和學習" },
    type: "end",
    position: { x: 10, y: 0.5 },
    connections: ["inspiration"],
  },
];

const allNodes = [...proactiveNodes, ...passiveNodes, ...feedbackNodes];

// Dictionary for the page
const dict = {
  en: {
    nav: { scheduleCall: "Get Your Time Back" },
    hero: {
      badge: "For Interview Podcasters",
      headline1: "Automate your",
      headline2: "podcast workflow",
      subheadline:
        "From guest research to post-production — AI handles the 80% so you can focus on the conversation.",
      cta: "Get Your Free Audit",
    },
    workflow: {
      title: "Your Podcast Workflow, Supercharged",
      subtitle:
        "Click any node to see how AI automates each step of your interview podcast production.",
      proactiveTrack: "Proactive Guest Outreach",
      passiveTrack: "Inbound Guest Requests",
      feedbackLoop: "Audience Insights Loop",
    },
    features: {
      title: "AI That Understands Podcasting",
      subtitle: "Purpose-built automation for interview-style content creators",
      items: [
        {
          title: "Guest Research",
          desc: "Deep-dive reports on potential guests — their work, talking points, and conversation starters.",
        },
        {
          title: "Email Automation",
          desc: "Personalized outreach that sounds like you. Accept, decline, or reschedule with one click.",
        },
        {
          title: "Interview Prep",
          desc: "AI-generated questions tailored to each guest. Never run out of things to ask.",
        },
        {
          title: "Post-Production",
          desc: "Auto-generate thumbnails, titles, descriptions, and clips for every platform.",
        },
        {
          title: "Audience Analytics",
          desc: "Summarized feedback from comments, DMs, and emails. Know what resonates.",
        },
        {
          title: "Content Calendar",
          desc: "AI-optimized scheduling based on your audience's engagement patterns.",
        },
      ],
    },
    cta: {
      title: "Ready to streamline your podcast?",
      subtitle:
        "See exactly how much time you're spending on non-creative work. Free 30-minute workflow audit.",
      button: "Get Your Free Audit",
      note: "30-min audit • Walk away with actionable insights",
    },
  },
  zh: {
    nav: { scheduleCall: "奪回你的時間" },
    hero: {
      badge: "專為訪談型 Podcast 打造",
      headline1: "自動化你的",
      headline2: "Podcast 工作流",
      subheadline:
        "從來賓研究到後製剪輯 — AI 處理 80% 的工作，讓你專注在對話本身。",
      cta: "獲取免費審計",
    },
    workflow: {
      title: "你的 Podcast 工作流，全面升級",
      subtitle: "點擊任一節點，了解 AI 如何自動化訪談型 Podcast 的每個步驟。",
      proactiveTrack: "主動邀約來賓",
      passiveTrack: "被動進線請求",
      feedbackLoop: "聽眾洞察循環",
    },
    features: {
      title: "真正懂 Podcast 的 AI",
      subtitle: "專為訪談型內容創作者打造的自動化工具",
      items: [
        {
          title: "來賓研究",
          desc: "潛在來賓的深度報告 — 他們的作品、談話要點和開場話題。",
        },
        {
          title: "Email 自動化",
          desc: "聽起來像你寫的個人化邀約。一鍵接受、婉拒或改期。",
        },
        {
          title: "訪談準備",
          desc: "針對每位來賓量身定制的 AI 生成問題。永遠不會沒話聊。",
        },
        {
          title: "後製剪輯",
          desc: "自動生成縮圖、標題、描述和各平台短片。",
        },
        {
          title: "聽眾分析",
          desc: "統整留言、私訊和 Email 的回饋摘要。知道什麼最引起共鳴。",
        },
        {
          title: "內容日曆",
          desc: "根據觀眾互動模式優化的 AI 排程建議。",
        },
      ],
    },
    cta: {
      title: "準備好簡化你的 Podcast 流程了嗎？",
      subtitle:
        "看看你在非創作工作上花了多少時間。免費 30 分鐘工作流審計。",
      button: "獲取免費審計",
      note: "30 分鐘審計 • 帶走可執行的洞察",
    },
  },
};

// Workflow Node Component
function WorkflowNodeComponent({
  node,
  isSelected,
  onClick,
  lang,
}: {
  node: WorkflowNode;
  isSelected: boolean;
  onClick: () => void;
  lang: "en" | "zh";
}) {
  const hasAI = node.aiFeatures && node.aiFeatures.length > 0;

  const bgColor = {
    start: "bg-[var(--charcoal)]",
    process: "bg-[var(--sand)]",
    ai: "bg-[var(--cream)]",
    end: "bg-[var(--charcoal-light)]",
    feedback: "bg-[var(--cream-dark)]",
  }[node.type];

  const textColor = {
    start: "text-[var(--cream)]",
    process: "text-[var(--charcoal)]",
    ai: "text-[var(--charcoal)]",
    end: "text-[var(--cream)]",
    feedback: "text-[var(--charcoal)]",
  }[node.type];

  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300 text-left min-w-[140px]
        ${bgColor} ${textColor}
        ${
          isSelected
            ? "border-[var(--terracotta)] shadow-lg scale-105"
            : "border-transparent hover:border-[var(--terracotta)]/50 hover:shadow-md"
        }
        ${hasAI ? "cursor-pointer" : "cursor-default"}
      `}
    >
      {/* AI Badge */}
      {hasAI && (
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#8B5CF6] rounded-full flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
          </svg>
        </span>
      )}

      <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm">
        {node.title[lang === "zh" ? "zh" : "en"]}
      </h4>

      {node.description && (
        <p className="text-xs opacity-70 mt-1">
          {node.description[lang === "zh" ? "zh" : "en"]}
        </p>
      )}
    </button>
  );
}

// AI Features Panel
function AIFeaturesPanel({
  node,
  lang,
  onClose,
}: {
  node: WorkflowNode | null;
  lang: "en" | "zh";
  onClose: () => void;
}) {
  if (!node || !node.aiFeatures) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--charcoal)]/50 backdrop-blur-sm">
      <div className="bg-[var(--cream)] rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-xs font-medium mb-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
              </svg>
              AI-Powered
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--charcoal)]">
              {node.title[lang === "zh" ? "zh" : "en"]}
            </h3>
            {node.description && (
              <p className="text-[var(--warm-gray)] mt-1">
                {node.description[lang === "zh" ? "zh" : "en"]}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--sand)] rounded-full transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--charcoal)] uppercase tracking-wider">
            {lang === "zh" ? "AI 功能" : "AI Features"}
          </p>
          {node.aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-[var(--cream-dark)] rounded-lg"
            >
              <div className="w-8 h-8 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-display)] font-medium text-[var(--charcoal)]">
                {feature[lang === "zh" ? "zh" : "en"]}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-[var(--charcoal)] text-[var(--cream)] rounded-full font-medium hover:bg-[var(--charcoal-light)] transition-colors"
        >
          {lang === "zh" ? "了解更多" : "Learn More"}
        </button>
      </div>
    </div>
  );
}

export default function PodcastPage() {
  const params = useParams();
  const lang = (params.lang as string) === "zh-TW" ? "zh" : "en";
  const t = dict[lang];

  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href={`/${params.lang}`}
            className="text-[var(--charcoal)] hover:opacity-70 transition-opacity"
          >
            <LogoMark size={36} />
          </a>
          <div className="flex items-center gap-6">
            <LanguageSwitcher currentLocale={params.lang as string} />
            <a
              href="#cta"
              className="px-5 py-2.5 bg-[var(--charcoal)] text-[var(--cream)] rounded-full text-sm font-medium hover:bg-[var(--charcoal-light)] transition-colors font-[family-name:var(--font-display)]"
            >
              {t.nav.scheduleCall}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20">
        <div className="absolute top-1/4 right-0 w-[40%] h-[50%] bg-gradient-to-bl from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm font-medium mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up-delay-1 font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--charcoal)] leading-[1.1] mb-8 tracking-tight">
            {t.hero.headline1}
            <br />
            <span className="text-[#8B5CF6]">{t.hero.headline2}</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up-delay-2 font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--charcoal-light)] max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.hero.subheadline}
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up-delay-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--terracotta)] text-[var(--cream)] rounded-full text-lg font-medium hover:bg-[var(--terracotta-dark)] transition-all hover:scale-[1.02] font-[family-name:var(--font-display)]"
            >
              {t.hero.cta}
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
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section className="py-24 bg-[var(--cream-dark)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-[#8B5CF6] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--charcoal)] leading-tight mb-4">
              {t.workflow.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--charcoal-light)] max-w-2xl mx-auto">
              {t.workflow.subtitle}
            </p>
          </div>

          {/* Workflow Visualization */}
          <div className="relative overflow-x-auto pb-8">
            {/* Proactive Track */}
            <div className="mb-8">
              <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--charcoal)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--charcoal)] rounded-full" />
                {t.workflow.proactiveTrack}
              </h3>
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {proactiveNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <WorkflowNodeComponent
                      node={node}
                      isSelected={selectedNode?.id === node.id}
                      onClick={() =>
                        node.aiFeatures && setSelectedNode(node)
                      }
                      lang={lang}
                    />
                    {index < proactiveNodes.length - 1 && (
                      <svg
                        width="40"
                        height="24"
                        viewBox="0 0 40 24"
                        fill="none"
                        className="mx-2 flex-shrink-0"
                      >
                        <path
                          d="M0 12H35M35 12L28 5M35 12L28 19"
                          stroke="var(--sand)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Passive Track */}
            <div className="mb-8">
              <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--charcoal)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--terracotta)] rounded-full" />
                {t.workflow.passiveTrack}
              </h3>
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {passiveNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <WorkflowNodeComponent
                      node={node}
                      isSelected={selectedNode?.id === node.id}
                      onClick={() =>
                        node.aiFeatures && setSelectedNode(node)
                      }
                      lang={lang}
                    />
                    {index < passiveNodes.length - 1 &&
                      node.id !== "reply-decline" && (
                        <svg
                          width="40"
                          height="24"
                          viewBox="0 0 40 24"
                          fill="none"
                          className="mx-2 flex-shrink-0"
                        >
                          <path
                            d="M0 12H35M35 12L28 5M35 12L28 19"
                            stroke="var(--sand)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Loop */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--charcoal)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#8B5CF6] rounded-full" />
                {t.workflow.feedbackLoop}
              </h3>
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {feedbackNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center">
                    <WorkflowNodeComponent
                      node={node}
                      isSelected={selectedNode?.id === node.id}
                      onClick={() =>
                        node.aiFeatures && setSelectedNode(node)
                      }
                      lang={lang}
                    />
                    {index < feedbackNodes.length - 1 && (
                      <svg
                        width="40"
                        height="24"
                        viewBox="0 0 40 24"
                        fill="none"
                        className="mx-2 flex-shrink-0"
                      >
                        <path
                          d="M0 12H35M35 12L28 5M35 12L28 19"
                          stroke="var(--sand)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[var(--charcoal-light)]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                </svg>
              </span>
              <span>{lang === "zh" ? "AI 自動化" : "AI Automated"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--charcoal)] rounded" />
              <span>{lang === "zh" ? "起點/終點" : "Start/End"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[var(--sand)] rounded" />
              <span>{lang === "zh" ? "手動步驟" : "Manual Step"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-[var(--terracotta)] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[var(--charcoal)] leading-tight mb-4">
              {t.features.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--charcoal-light)] max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => (
              <div
                key={index}
                className="card-hover p-6 bg-[var(--cream-dark)] rounded-xl border border-[var(--sand)]"
              >
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--charcoal)] mb-2">
                  {feature.title}
                </h3>
                <p className="font-[family-name:var(--font-display)] text-[var(--charcoal-light)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-[var(--charcoal)] text-[var(--cream)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-0.5 bg-[#8B5CF6] mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {t.cta.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--cream)]/70 mb-12 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>

          <a
            href="#calendly"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--terracotta)] text-[var(--cream)] rounded-full text-lg font-medium hover:bg-[var(--terracotta-dark)] transition-all hover:scale-[1.02] font-[family-name:var(--font-display)]"
          >
            {t.cta.button}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </a>

          <p className="font-[family-name:var(--font-display)] text-sm text-[var(--cream)]/50 mt-6">
            {t.cta.note}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--cream-dark)] border-t border-[var(--sand)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <LogoMark size={28} className="text-[var(--charcoal)]" />
              <span className="font-[family-name:var(--font-display)] font-medium text-[var(--charcoal)]">
                AI Partner Company
              </span>
            </div>

            <p className="font-[family-name:var(--font-display)] text-sm text-[var(--warm-gray)]">
              &copy; {new Date().getFullYear()} AI Partner Company.{" "}
              {lang === "zh" ? "版權所有。" : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>

      {/* AI Features Modal */}
      <AIFeaturesPanel
        node={selectedNode}
        lang={lang}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  );
}
