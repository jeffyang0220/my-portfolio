/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wand2, 
  Gamepad2, 
  Code2, 
  LineChart, 
  MessageSquare,
  Trophy,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  Users,
  Diamond,
  Heart,
  Spade,
  Club,
  Award,
  ArrowRight,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Types ---

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
}

interface Project {
  title: string;
  type: string;
  features: string[];
  milestone: string;
  isLandscape: boolean;
  images: string[];
}

// --- Data ---

const EXPERIENCES: Experience[] = [
  {
    company: "伊諾科技有限公司 (E-Tech)",
    role: "產品經理 (Product Manager)",
    period: "2024/09 - 至今",
    description: [
      "需求分析：研究客戶發展、蒐集對手資訊，分析出對公司有利的策略，確保決策如「<span class=\"text-white font-bold\">鑽石</span>」般精準。",
      "專案開發：與開發團隊緊密配合，管控專案進度；可行性評估、功能規劃、規格撰寫、測試驗收。",
      "專案負責：成為客服系統與彩票系統的專案負責人，達成多項指標，一年內獲得晉升與加薪。",
      "溝通協調：擔任三方廠商與業主溝通窗口，整合新需求與當地政策規範，達成公司營業目標。"
    ],
    tags: ["需求分析", "專案管控", "客服系統", "彩票系統"]
  },
  {
    company: "玖緒股份有限公司",
    role: "產品經理",
    period: "2022/04 - 2023/12",
    description: [
      "市場趨勢分析：研究市場趨勢、蒐集對手資訊，分析出對公司有利的策略。",
      "專案開發管控：與開發團隊緊密配合，管控專案進度；可行性評估、功能規劃、規格撰寫、測試驗收。",
      "團隊管理：管理 9-12 人團隊，優化開發流程，提升團隊反應速度，展現「<span class=\"text-white font-bold\">快速</span>」迭代的能力。"
    ],
    tags: ["團隊管理", "市場趨勢", "規格撰寫"]
  },
  {
    company: "昕力資訊 (TPIsoftware)",
    role: "產品/專案經理",
    period: "2021/06 - 2022/04",
    description: [
      "軟體開發：與開發團隊緊密配合，負責功能規劃、規格撰寫與專案進度管控。",
      "品質驗收：負責產品測試與品質驗收，確保如期如質交付，對細節有著「<span class=\"text-white font-bold\">銳利</span>」的洞察力。"
    ],
    tags: ["軟體開發", "專案管理"]
  },
  {
    company: "布洛卡斯股份有限公司",
    role: "產品經理",
    period: "2020/05 - 2021/05",
    description: [
      "產品營運：觀測用戶反饋與數據，持續營運產品並進行下一代產品規劃。",
      "決策輔助：提供各項專業分析與辦法，協助高階主管進行決策，推動各項專案。"
    ],
    tags: ["數據分析", "用戶反饋", "產品營運"]
  },
  {
    company: "布洛卡斯股份有限公司",
    role: "軟體專案主管",
    period: "2015/04 - 2019/04",
    description: [
      "負責計劃、指揮及協調與電腦系統、軟體相關之專案，並管理部門日常活動。"
    ],
    tags: ["專案協調", "部門管理", "軟體專案"]
  },
  {
    company: "鴻海集團-國碁電子",
    role: "資深工程師",
    period: "2014/02 - 2015/03",
    description: [
      "負責網路規劃、電信應用服務設計、跨部門溝通整合。",
      "管理 4 人以下團隊。"
    ],
    tags: ["網路規劃", "電信服務", "團隊管理"]
  },
  {
    company: "台灣大哥大",
    role: "網管工程師",
    period: "2011/04 - 2014/01",
    description: [
      "網路系統維護管理、監控基地台及機房設備、建立監控報告。"
    ],
    tags: ["網路維護", "設備監控", "監控報告"]
  }
];

const PROJECTS: Project[] = [
  {
    title: "CYBERPOKER",
    type: "GAME APP / iOS & Android",
    features: ["全台首創全3D 撲克手遊", "首創倒數錦標賽玩法", "全新風格拉霸機台", "徽章成就系統", "Avatar 與變裝系統", "多視角切換", "華麗3D 場景"],
    milestone: "上架產品",
    isLandscape: true,
    images: ["/images/projects/cyberpoker_1.png", "https://picsum.photos/seed/cyber2/1200/600"]
  },
  {
    title: "聖殿德州撲克",
    type: "GAME APP / iOS & Android",
    features: ["信用版德州撲克", "NL Holdem", "牌局紀錄", "貼圖語音包", "勝率數據分析"],
    milestone: "半年內完成開發，上線首月營收200萬",
    isLandscape: false,
    images: ["/images/projects/temple_1.png", "https://picsum.photos/seed/temple2/400/800"]
  },
  {
    title: "傳說麻將",
    type: "GAME APP / iOS & Android",
    features: ["首創戰隊麻將手遊", "首創3D角色互動", "技能系統", "潮流電音風格"],
    milestone: "募資五千萬(已下架產品)",
    isLandscape: true,
    images: ["/images/projects/mahjong_1.png", "https://picsum.photos/seed/legend2/1200/600"]
  },
  {
    title: "黑鑽娛樂城",
    type: "GAME APP / iOS & Android",
    features: ["電競類麻將手遊", "首創天梯排位機制", "月冠軍排行獎勵", "首創無二吹牛排位賽", "另有三項棋牌類遊戲串接", "可支援現金與信用兩種模式"],
    milestone: "同時在線用戶達五千人，三個月營收七百萬",
    isLandscape: true,
    images: ["/images/projects/diamond_1.png", "https://picsum.photos/seed/black2/1200/600"]
  }
];

const SKILLS = [
  { name: "產品策略 (Product Strategy)", icon: <LineChart className="w-4 h-4" />, level: 95 },
  { name: "專案管理 (PMP)", icon: <Briefcase className="w-4 h-4" />, level: 90 },
  { name: "UI/UX 設計思考", icon: <Layers className="w-4 h-4" />, level: 85 },
  { name: "AI 應用 (LLMs)", icon: <Cpu className="w-4 h-4" />, level: 88 },
  { name: "遊戲機制設計", icon: <Gamepad2 className="w-4 h-4" />, level: 92 },
  { name: "魔術與心理學", icon: <Wand2 className="w-4 h-4" />, level: 80 },
];

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

const Card = ({ children, className, delay = 0 }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn("glass-effect rounded-2xl p-6 poker-card-shadow", className)}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, icon, onClick, actionLabel }: { title: string, icon: React.ReactNode, onClick?: () => void, actionLabel?: string }) => (
  <div 
    className={cn(
      "flex items-center gap-3 mb-8 group transition-all duration-300",
      onClick && "cursor-pointer hover:translate-x-2"
    )}
    onClick={onClick}
  >
    <div className={cn(
      "p-2 rounded-lg bg-sky-500/20 text-sky-400 transition-colors duration-300",
      onClick && "group-hover:bg-sky-500 group-hover:text-slate-950"
    )}>
      <Diamond className="w-5 h-5 fill-current" />
    </div>
    <h2 className={cn(
      "text-2xl font-bold tracking-tight font-display uppercase italic transition-colors duration-300",
      onClick && "group-hover:text-cyan-400"
    )}>{title}</h2>
    <div className="h-px flex-1 bg-gradient-to-r from-sky-500/50 to-transparent ml-4" />
    {onClick && actionLabel && (
      <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-bold transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
        {actionLabel} <ChevronRight className="w-4 h-4" />
      </div>
    )}
  </div>
);

const PokerCard = ({ isFlipped, onClick }: { isFlipped: boolean, onClick?: () => void }) => {
  return (
    <div className="perspective-1000 w-32 h-48 mx-auto cursor-pointer group mb-8" onClick={onClick}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Back */}
        <div className="absolute inset-0 backface-hidden card-back-red rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-white font-bold text-center drop-shadow-lg leading-tight">
            <p className="text-lg">選好了</p>
            <p className="text-sm opacity-80">點擊翻開</p>
          </div>
        </div>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl border-2 border-slate-200 flex flex-col items-center justify-between py-4 text-red-600 font-bold shadow-2xl rotate-y-180">
          <span className="text-2xl self-start ml-3">7</span>
          <Diamond className="w-12 h-12 fill-current" />
          <span className="text-2xl self-end mr-3 rotate-180">7</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'exp' | 'projects' | 'magic'>('exp');
  const [magicStep, setMagicStep] = useState(0);
  const magicCardRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (magicStep === 1 && magicCardRef.current) {
      const yOffset = -100;
      const element = magicCardRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [magicStep]);

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] opacity-60" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 diamond-pattern opacity-10" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-bold text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.5)]">J</div>
            <span className="font-display font-bold tracking-tighter text-xl uppercase">Jeff Yang ~來點真實的履歷</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">關於我</a>
            <a 
              href="#experience" 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('exp');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              工作經歷
            </a>
            <a 
              href="#experience" 
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('projects');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              作品集
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">專業技能</a>
            <button 
              onClick={() => {
                setActiveTab('magic');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              自傳 <Wand2 className="w-3 h-3" />
            </button>
          </div>
          <a 
            href="https://www.instagram.com/kaizhy11?igsh=Y2JuajIzYXowZnE2&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            聯繫我
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        
        {/* Hero Section */}
        <section id="about" className="grid md:grid-cols-2 gap-12 items-center pt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 tracking-widest uppercase">
              <Sparkles className="w-3 h-3" /> 資深產品經理
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
              不只是PM，也是<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">產品魔術師</span>。
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              我是 Jeff Yang &lt;凱智&gt;，一位擁有 12 年經驗的產品經理。我擅長將「魔術心理學」與「遊戲機制」融入產品設計，創造具備高黏著度與商業價值的數位體驗。
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-cyan-500" /> jeff760220@gmail.com
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-cyan-500" /> 0958-387-877
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-cyan-500" /> 台灣，新北市
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square max-w-[320px] mx-auto"
          >
            <div className="absolute inset-0 bg-cyan-500/20 rounded-3xl rotate-6 blur-2xl" />
            <div className="relative h-full w-full bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 p-2 flex items-center justify-center">
              <img 
                src="https://picsum.photos/seed/jeff-avatar/800/800" 
                alt="Jeff Yang" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-2 right-2 flex -space-x-10 perspective-1000 scale-75 origin-bottom-right">
                <motion.div 
                  whileHover={{ rotateY: -10, y: -20, z: 50 }}
                  className="w-24 h-36 bg-white rounded-xl border-2 border-slate-200 flex flex-col items-center justify-between py-2 text-red-600 font-bold shadow-[10px_10px_25px_rgba(0,0,0,0.5)] transform -rotate-12 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-200 opacity-50" />
                  <span className="text-2xl leading-none relative z-10 self-start ml-2">A</span>
                  <Diamond className="w-8 h-8 fill-current relative z-10" />
                  <span className="text-2xl leading-none relative z-10 self-end mr-2 rotate-180">A</span>
                </motion.div>
                <motion.div 
                  whileHover={{ rotateY: 10, y: -30, z: 100 }}
                  className="w-24 h-36 bg-white rounded-xl border-2 border-slate-200 flex flex-col items-center justify-between py-2 text-red-600 font-bold shadow-[15px_15px_30px_rgba(0,0,0,0.6)] transform rotate-6 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-200 opacity-50" />
                  <span className="text-2xl leading-none relative z-10 self-start ml-2">K</span>
                  <Diamond className="w-8 h-8 fill-current relative z-10" />
                  <span className="text-2xl leading-none relative z-10 self-end mr-2 rotate-180">K</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '專案經驗', value: '12+ 年', icon: <Briefcase /> },
            { label: '成功案例', value: '20+ 個', icon: <Gamepad2 /> },
            { label: '團隊管理', value: '12+ 人', icon: <User /> },
            { label: '創造營收', value: '700萬+', icon: <Trophy /> },
          ].map((stat, i) => (
            <Card key={i} className="flex flex-col items-center text-center py-8 group hover:bg-cyan-500/5 transition-colors" delay={i * 0.1}>
              <div className="p-3 rounded-full bg-slate-900 border border-white/5 text-cyan-400 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                {React.cloneElement(stat.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <div className="text-3xl font-bold font-display mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </Card>
          ))}
        </section>

        {/* Core Values / Autobiography Section */}
        <section id="bio" className="space-y-12">
          <SectionTitle title="核心價值" icon={<User />} />
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Content */}
            <Card className="md:col-span-2 p-8 md:p-12 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32" />
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">我是 Jeff，一位熱衷於創新的產品經理</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    擁有 12 年專案經驗，近期熱衷於研究各類型 AI 應用。我擅長於與人溝通，且頭腦清楚、觀察力敏銳、邏輯能力強。我喜歡魔術，神秘的事物，創新，樂觀，正面思考。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-lg">產品策略</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">主導制定並優化公司產品策略，確保市場競爭力與業務增長。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-lg">產品開發</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">協調團隊成員，定義產品特性，監督開發進度並確保高品質交付。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-lg">用戶體驗</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">與設計團隊協作，提升產品易用性，利用數據分析持續優化。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-lg">團隊管理</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">實施敏捷開發，建立高效團隊文化，激發團隊創造力。</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right Sidebar */}
            <div className="h-full">
              <Card className="p-8 bg-slate-900/40 border-white/5 h-full flex flex-col">
                <div className="space-y-6 flex-grow">
                  <h3 className="text-2xl font-bold text-white italic">未來展望</h3>
                  <p className="text-slate-400 leading-relaxed">
                    致力於探索 AI 應用的產品創新，提升用戶體驗。期望通過持續學習和實踐，在快速變化的科技環境中保持競爭力，為用戶和企業創造更大價值。
                  </p>
                </div>
                
                <div className="space-y-4 pt-12 mt-auto">
                  <div className="text-xs text-slate-500 uppercase tracking-widest">專業證照</div>
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">PMP® 專案管理師</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Project Management Professional</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div id="experience" className="space-y-16">
            {/* Tab Switcher */}
            <div className="flex justify-center">
              <div className="inline-flex p-2 bg-slate-900/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {[
                  { id: 'exp', label: '工作經歷', icon: <Briefcase /> },
                  { id: 'projects', label: '作品集', icon: <Gamepad2 /> },
                  { id: 'magic', label: '神奇的自傳', icon: <Wand2 /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center justify-center gap-3 px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 min-w-[240px]",
                      activeTab === tab.id
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-105"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    )}
                  >
                    {React.cloneElement(tab.icon as React.ReactElement, { className: "w-6 h-6" })}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
            {activeTab === 'exp' && (
              <motion.div 
                key="exp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <SectionTitle title="職涯錦標賽" icon={<Briefcase />} />
                <div className="space-y-6">
                  {EXPERIENCES.map((exp, i) => (
                    <Card key={i} className="relative overflow-hidden group" delay={i * 0.1}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-sky-500/10 transition-colors" />
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-sky-400 font-medium">
                            <span>{exp.company}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className="text-slate-500 text-sm">{exp.period}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded bg-slate-900 border border-white/5 text-[10px] text-slate-400 uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-3 relative z-10">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                            <span className="text-sky-500 mt-1.5 flex-shrink-0">
                              <Diamond className="w-3 h-3 fill-current" />
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div 
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <SectionTitle 
                  title="作品集" 
                  icon={<Gamepad2 />} 
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/portfolio');
                  }}
                  actionLabel="進入作品集頁面"
                />
                <div className="grid md:grid-cols-2 gap-8">
                  {PROJECTS.map((project, i) => (
                    <Card key={i} className="p-0 overflow-hidden group" delay={i * 0.1}>
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-6">
                          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">{project.type}</div>
                          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-slate-400 line-clamp-2">{project.features.join(' • ')}</p>
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                          <span className="text-xs font-bold text-pink-400 italic">{project.milestone}</span>
                          <button 
                            onClick={() => {
                              window.scrollTo(0, 0);
                              navigate('/portfolio');
                            }}
                            className="text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline"
                          >
                            查看詳情 <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'magic' && (
              <motion.div 
                key="magic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="space-y-16">
                  <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                      <Wand2 className="w-4 h-4" /> Magic Storytelling
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                      嗨～我是一名產品經理 <span className="text-amber-400 italic">兼 魔術師</span>
                    </h3>
                    <p className="text-lg text-slate-400 leading-relaxed">
                      如果你認真的看完這份履歷，你會看到一個神奇的魔術，並且我會在最後揭露整個魔術的秘密！
                    </p>
                  </div>

                  <Card className="p-8 md:p-12 space-y-12 border-white/5 bg-slate-900/40">
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Gamepad2 className="w-5 h-5" />
                        </div>
                        首先我想用一個簡單的實例來介紹一下我過去的小作品以及設計思路～
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        在2017年我設計了一款吹牛的線上遊戲，沒錯，就是在酒局中常玩的骰子對戰遊戲，不過當然是跟原版多了點創新的：
                      </p>
                    </div>

                    <div className="grid gap-8">
                      {[
                        {
                          title: "市場與選品",
                          content: "身為產品經理需要對市場有‘<span class=\"text-white font-bold\">銳利</span>’的眼光，選擇這類遊戲的原因是大多數人都會玩或知道規則，且年齡跨度大又不分性別，受眾會相對廣一些。當然我們還是有針對TA與Persona的分析，以符合行銷時的需求與共鳴。而現在有了AI 工具的出現，會更方便的產出這些分析報告，如ChatGPT,Claude,Kimi,Gemini 等，可以依照需求特性使用不同的語言模型。甚至PM最麻煩的文件產出都直接包辦了大部分。"
                        },
                        {
                          title: "特色與改良",
                          content: "從自身經歷與經過調研後我發現一個問題，大多數人都經常有希望重新骰一次的時候（超過<span class=\"text-white font-bold\">70%</span>）。原因是出在於牌不夠好！擔心對戰時會偏弱勢，所以我提案改良了一下，“將骰子其中一面的2 都改為 1 ”！因為1在初始狀態可以代表任意數，這樣會將好牌率大大的提升。同時少了2 這個最小的數字，等於只剩下五個數字的組合。讓玩家的對戰精彩度提高，爽度也更高。同時也為這個產品的命名定下了基調，因為沒有2 所以叫做 [無二吹牛] ，在Slogan的設計也簡單好記，獨一無二的無二吹牛。"
                        },
                        {
                          title: "風格搭配",
                          content: "為了要有更好的臨場感所以UI風格以3D為主，包含了骰盅與場景皆使用3D動畫製作，在過去建模會需要一定的工程時間，現在也有AI工具能<span class=\"text-white font-bold\">快速</span>達成了（如CSM https://3d.csm.ai/)。但細節調整的部分還是要跟設計慢慢雕的，比如骰盅的搖動速度，開牌的節奏等，就需要一些讓玩家能更融入的調整。"
                        },
                        {
                          title: "音樂性",
                          content: "除了畫面場景搭配之外，BGM的重要性也是不可忽視的，一個好的BGM可以讓用戶不知不覺的沈浸其中而不可自拔。依據我們的調研分析，有部分族群是屬於派對玩家，而在當時電音是年輕人中相當熱門的音樂類型，所以我們還特地請音樂老師製作了多首的電子樂曲，有重節奏的，有輕快型的，採首尾相接的循環設計，玩家可以自行選擇喜愛的類型。而現在當然也有AI 工具能快速達成了（如Suno https://suno.com/）。"
                        },
                        {
                          title: "對戰機制",
                          content: "玩法上除了提高爽度與畫面外，當然還有對戰性的設計。我們採用了玩家隨機配對的模式，但是每場對戰會打<span class=\"text-white font-bold\">7局</span>，而贏的局數越多則會有更高的爆擊加成，比如<span class=\"text-white font-bold\">7:0</span>完封對手的情況，就會獲得原本單局“<span class=\"text-white font-bold\">鑽石</span>”數量的兩倍加成。所以除了勝場數外，遊戲內鑽石的額外獲得也會更有成就感。"
                        },
                        {
                          title: "天梯排行榜",
                          content: "遊戲中不可或缺的就是競爭感，一個好的對手能激發出更多的潛力與挑戰。所以我們設計了天梯排行榜，包含勝率、鑽石贏取數等排行，以兩個月為一個賽季，並送出機車、手機、耳機等各種大獎。用戶數變多後也拆分了不同的分區排名，比如北區第三名、中區<span class=\"text-white font-bold\">第七名</span>、南區第二名。這樣的賽季頭銜會成為永久的成就獎章。除了證明實力外，在現實中也是個能向好友炫耀的小玩意。當然在最後衝榜階段我們也會舉辦一些積分加成活動，對於活躍用戶的上線時間也有很大的幫助。"
                        },
                        {
                          title: "專案時程",
                          content: "在當時的團隊編制中，參與這個專案的成員一共有 <span class=\"text-white font-bold\">7 位</span>（包含前端、後端工程師、動畫師、UI/UX設計師、測試工程師等），而我們從提案到測試上線一共只花了<span class=\"text-white font-bold\">7週</span>的時間，算是相當緊湊與高效的排程。雖然因為遊戲性質與流程並不會太複雜的關係，但也算我歷來產品的最高效率之作了。上線之後的遊戲數據也算是還不錯，除了DAU/MAU有穩定增加外，一日/七日留存率也提高了不少。最後這款小遊戲在前三個月創造了<span class=\"text-white font-bold\">七百萬</span>的營收～"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 font-bold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                              {idx + 1}
                            </div>
                            {idx < 6 && <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent my-2" />}
                          </div>
                          <div className="pb-8">
                            <h5 className="text-lg font-bold text-white mb-2">{item.title}</h5>
                            <p className="text-slate-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <p className="text-slate-300 leading-relaxed italic">
                        以上是我最小也最高效的遊戲作品之一，如果有興趣可以看看作品集中的其他產品。上面除了代表我的創新思維外，還包含了我對現有技術的不斷更新，以及對創作的熱情，當然我最自信的部分還是在團隊的凝聚與配合上，我會盡量將各方的意見與專業整合，讓團隊成員都在統一的目標上努力，減少溝通上的落差與誤會。這樣不只團隊氣氛好，工作效率高，也能讓所有成員都知道各自的重要性。就算偶爾有加班趕工期成員也都能理解。
                      </p>
                    </div>
                  </Card>

                  <div className="pt-12">
                    <Card className="p-12 border-amber-500/20 bg-amber-500/5 relative overflow-hidden text-center">
                      <div className="absolute inset-0 diamond-pattern opacity-10" />
                      <div className="relative z-10 space-y-8">
                        {magicStep === 0 ? (
                          <>
                            <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                              <Wand2 className="w-12 h-12" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">看完履歷現在終於到了魔術的部分</h3>
                            <div className="space-y-4 text-slate-400 text-lg max-w-2xl mx-auto">
                              <p>一副撲克牌除了鬼牌外共有 52 張，請先在 <span className="text-amber-400 font-bold">1～13</span> 的中間 選擇一個數字。</p>
                              <p>接著在 <span className="text-red-500">黑桃、紅心、梅花、方塊（紅磚）</span> 等花色中選出其中一種～～然後專心地想著這張牌。</p>
                            </div>
                          </>
                        ) : null}

                        <div ref={magicCardRef}>
                          <PokerCard isFlipped={magicStep === 1} onClick={() => magicStep === 0 && setMagicStep(1)} />
                        </div>

                        {magicStep === 1 && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                          >
                            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                              你選的牌是不是 <br />
                              <span className="text-red-500 bg-white px-6 py-2 rounded-xl inline-block mt-4 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                                [ 方塊 7 ]
                              </span>
                            </h3>
                            <div className="max-w-3xl mx-auto space-y-8 text-left">
                              <p className="text-slate-400 leading-relaxed text-lg">
                                如果是的話恭喜你有個良好的魔術體驗，不是的話也沒關係，因為我的主要目的也已經達到了，讓你認真地看到了這裡！！！
                              </p>
                              <div className="space-y-8 pt-10 border-t border-white/10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                  Magic Reveal
                                </div>
                                <h4 className="text-2xl font-bold text-white italic">接下來就開始揭秘我用了什麼樣的方式來進行這個魔術</h4>
                                <div className="grid gap-6">
                                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
                                    <p className="text-slate-300">其實就是所謂的 <span className="text-sky-400 font-bold">誘導與文字暗示</span>。</p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                      我在上面用了一些詞彙，比如 <span className="text-sky-400 font-bold underline decoration-sky-500/50">銳利</span>、<span className="text-sky-400 font-bold underline decoration-sky-500/50">快速</span>、<span className="text-sky-400 font-bold underline decoration-sky-500/50">鑽石</span>等，是為了讓你對<span className="text-sky-400 font-bold">方塊</span>的形狀產生一定關聯，且在最後選擇時，只有<span className="text-sky-400 font-bold">方塊（紅磚）</span>有特別括號說明且排在最後，就是為了加深印象。
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                      此外這篇履歷中，我一共用到了: <span className="text-sky-400 font-bold">2017年</span> 、<span className="text-sky-400 font-bold">70%</span>、<span className="text-sky-400 font-bold">7 局</span>、<span className="text-sky-400 font-bold">第七名</span>、<span className="text-sky-400 font-bold">7:0</span>、<span className="text-sky-400 font-bold">7 位成員</span>、<span className="text-sky-400 font-bold">7 週</span>、<span className="text-sky-400 font-bold">七百萬</span>以及總共 <span className="text-sky-400 font-bold">7 大項</span> 的排版來提供暗示，且在最後的選擇數字時，我用了 <span className="text-sky-400 font-bold">“ 1～13 的中間”</span> 的說法來誘導讓你選擇中間數字 <span className="text-sky-400 font-bold">7</span>。
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                      這還只是單純的從文字上融合魔術中的一小部分基本概念而已。現在想像一下如果我們之後的產品能在其中設計相關的圖案、聲音等暗示效果的話。是不是能增加用戶的黏著度與轉化率呢～～
                                    </p>
                                  </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                                  <p className="text-slate-300 text-sm leading-relaxed">
                                    最後如果你需要一份更正式的“產品經理”能做到什麼的履歷的話，我馬上能叫 AI 出一份符合你的崗位職缺描述的專屬履歷。但我更傾向講點真實的，因為真誠才是必殺技啊！
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => setMagicStep(0)}
                              className="px-8 py-3 rounded-full border border-amber-500/30 text-amber-500 font-bold text-sm hover:bg-amber-500/10 transition-all"
                            >
                              重新體驗魔術
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-12">
          <SectionTitle title="專業技能組" icon={<Code2 />} />
          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <Card key={i} className="group" delay={i * 0.05}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                    {skill.icon}
                  </div>
                  <h4 className="font-bold text-white">{skill.name}</h4>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Next Chapter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-5xl w-full mx-auto px-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[60px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-3xl border border-white/10 rounded-[60px] p-12 md:p-24 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase mb-12"
              >
                Next Chapter
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black text-white mb-10 leading-tight tracking-tighter"
              >
                準備好提升您的<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">產品勝率嗎？</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-3xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light"
              >
                我正在尋找下一個挑戰。如果您需要一位具備<span className="text-cyan-400 font-medium">遊戲思維</span>、<span className="text-blue-400 font-medium">魔術直覺</span>與<span className="text-indigo-400 font-medium">數據驅動能力</span>的資深產品經理，讓我們聊聊。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="mailto:jeff.yang@innotech.me"
                  className="inline-flex items-center gap-4 px-10 py-5 md:px-14 md:py-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full font-black text-xl md:text-2xl transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] group"
                >
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
                  立即聯繫
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
