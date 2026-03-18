/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PortfolioPage from './PortfolioPage';
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
  Diamond,
  Heart,
  Spade,
  Club,
  Menu,
  X
} from 'lucide-react';
import { cn } from './utils';

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
      "需求分析：研究客戶發展、蒐集對手資訊，分析出對公司有利的策略，確保決策如「<b class=\"text-white font-bold\">鑽石</b>」般精準。",
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
      "團隊管理：管理 9-12 人團隊，優化開發流程，提升團隊反應速度，展現「<b class=\"text-white font-bold\">快速</b>」迭代的能力。"
    ],
    tags: ["團隊管理", "市場趨勢", "規格撰寫"]
  },
  {
    company: "昕力資訊 (TPIsoftware)",
    role: "產品/專案經理",
    period: "2021/06 - 2022/04",
    description: [
      "軟體開發：與開發團隊緊密配合，負責功能規劃、規格撰寫與專案進度管控。",
      "品質驗收：負責產品測試與品質驗收，確保如期如質交付，對細節有著「<b class=\"text-white font-bold\">銳利</b>」的洞察力。"
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
    type: "iOS / Android • 遊戲類 APP",
    features: ["全台首創全 3D 撲克手遊", "首創倒數錦標賽玩法", "全新風格拉霸機台", "徽章成就系統", "Avatar 與變裝系統", "多視角切換", "華麗 3D 場景"],
    milestone: "上架產品",
    isLandscape: true,
    images: ["cyberpoker_1.png", "cyberpoker_2.png"]
  },
  {
    title: "聖殿德州撲克",
    type: "iOS / Android • 遊戲類 APP",
    features: ["信用版德州撲克", "NL Holdem", "牌局紀錄", "貼圖語音包", "勝率數據分析"],
    milestone: "半年內完成開發，上線首月營收200萬",
    isLandscape: false,
    images: ["temple_1.png", "temple_2.png"]
  },
  {
    title: "傳說麻將",
    type: "iOS / Android • 遊戲類 APP",
    features: ["首創戰隊麻將手遊", "首創 3D 角色互動", "技能系統", "潮流電音風格"],
    milestone: "募資五千萬（已下架產品）",
    isLandscape: true,
    images: ["mahjong_1.png", "mahjong_2.png"]
  },
  {
    title: "黑鑽娛樂城",
    type: "iOS / Android • 遊戲類 APP",
    features: ["電競類麻將手遊", "首創天梯排位機制", "月冠軍排行獎勵", "首創無二吹牛排位賽", "另有三項棋牌類遊戲串接", "可支援現金與信用兩種模式"],
    milestone: "同時在線用戶達五千人，三個⽉營收七百萬",
    isLandscape: true,
    images: ["diamond_1.png", "Diamond_2.png"]
  },
  {
    title: "BALLCITY",
    type: "iOS / Android • SPORT SOCIAL APP",
    features: ["會員系統", "籃球場地展示", "線上揪團", "現場回報", "活動邀請推播", "虛實整合"],
    milestone: "上架獲得App Store 當月最佳APP 第三名",
    isLandscape: false,
    images: ["ballcity_1.png", "ballcity_2.png"]
  },
  {
    title: "ZERO PLUS",
    type: "iOS / Android • 即時通訊 APP",
    features: ["即時通訊", "會員系統", "群組內私密對話", "影片、錄音、貼圖、照片傳送", "用戶使用功能統計", "用戶量統計", "訊息推播提醒", "地圖搜尋好友"],
    milestone: "上線用戶達 3 萬",
    isLandscape: false,
    images: ["zeroplus_1.png", "zeroplus_2.png", "zeroplus_3.png"]
  },
  {
    title: "MERCK",
    type: "iOS / Android • 產品型錄 APP",
    features: ["產品展示", "未來感介面設計", "文章、影片連結", "會員訂閱、收藏", "會員權限分立"],
    milestone: "國際集團合作案",
    isLandscape: false,
    images: ["Merck_1.png", "merck_2.png", "Merck_3.png"]
  },
  {
    title: "CLIPPER",
    type: "iOS • 智能理財 APP",
    features: ["智能投顧", "即時掌握投資狀況", "輪盤輸入風險指數", "即時客服"],
    milestone: "協助客戶獲得天使輪融資 300 萬美金",
    isLandscape: false,
    images: ["clipper_1.png", "clipper_2.png", "clipper_3.png"]
  },
  {
    title: "ARGUS EYE",
    type: "iOS • O2O 大型雲端數據連結 APP",
    features: ["大型機台互動", "線上排行榜", "機台據點", "活動快訊", "QR Code 掃描"],
    milestone: "台灣首個大型遊戲機台與APP連線產品",
    isLandscape: false,
    images: ["arguseye_1.png", "arguseye_2.png", "arguseye_3.png"]
  },
  {
    title: "SIVANN",
    type: "Android • I.O.T 智能居家APP",
    features: ["WiFi 連結", "30多種裝置感測顯示與控制", "開關 定時 亮度調整", "四向控制", "警報設定 .....等"],
    milestone: "第一個 I.O.T 整合超過 30 種裝置的APP",
    isLandscape: false,
    images: ["sivann_1.png", "sivann_2.png", "sivann_3.png"]
  },
  {
    title: "BANANA FIT",
    type: "iOS / Android • 教練媒合 APP",
    features: ["學生 V.S 教練媒合", "評分機制", "健身房介紹", "會員專區", "各式運動活動報名", "LBS 定位服務"],
    milestone: "媒合平台服務，累積有上百位教練",
    isLandscape: false,
    images: ["bananafit_1.png", "bananafit_2.png", "bananafit_3.png"]
  },
  {
    title: "SMART CHEF CLUB",
    type: "iOS / Android / 網站 • 美食宅配 APP",
    features: ["形象網頁", "會員系統", "烹飪教學流程", "產品展示", "線上訂購"],
    milestone: "上線第一個月達到 3000 會員數",
    isLandscape: false,
    images: ["smartchef_1.png", "smartchef_2.png", "smartchef_3.png"]
  },
  {
    title: "JARVIS",
    type: "iOS / Android • 智能安全帽連結 APP",
    features: ["休眠背景運作", "語音回報", "激烈天氣警示", "定時自動關閉"],
    milestone: "協助客戶達成一萬筆訂單目標",
    isLandscape: false,
    images: ["Jarvis_1.png", "Jarvis_2.png", "Jarvis_3.png"]
  },
  {
    title: "星友科技",
    type: "Mac OS • 星友科技",
    features: ["指紋機解鎖 Mac unlock", "指紋顯示", "特徵值比對", "USB連結"],
    milestone: "指紋功能一年後加入到新版的Macbook",
    isLandscape: true,
    images: ["star_1.png"]
  },
  {
    title: "DREAM CATCHER GAMING",
    type: "E-Sports • BRAND IDENTITY",
    features: ["Brand color strategy", "High-value visual strategy to differentiate from other competitors in the E-Sports market.", "電競戰隊品牌合作", "BRAND CHARACTER"],
    milestone: "電競品牌視覺優化",
    isLandscape: true,
    images: ["dreamcatcher_1.png", "dreamcatcher_3.png"]
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'exp' | 'projects' | 'magic'>('exp');
  const [magicStep, setMagicStep] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const magicCardRef = React.useRef<HTMLDivElement>(null);

  const handleNavClick = (tab: 'exp' | 'projects' | 'magic', sectionId: string) => {
    setActiveTab(tab);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setShowPortfolio(true);
  };


  useEffect(() => {
    if (magicStep === 1 && magicCardRef.current) {
      const yOffset = -100; // 留一點上方空間
      const element = magicCardRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [magicStep]);

  return (
    <div className="min-h-screen font-sans selection:bg-sky-500/30">
      <AnimatePresence mode="wait">
        {showPortfolio ? (
          <motion.div
            key="portfolio-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950 overflow-y-auto"
          >
            <PortfolioPage projects={PROJECTS} onBack={() => setShowPortfolio(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full felt-gradient opacity-60" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 diamond-pattern opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-bold text-slate-950">J</div>
            <span className="font-display font-bold tracking-tighter text-xl uppercase">Jeff Yang ~來點真實的履歷</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-sky-400 transition-colors">關於我</a>
            <button 
              onClick={() => {
                setActiveTab('magic');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              自傳 <Wand2 className="w-3 h-3" />
            </button>
            <button 
              onClick={() => {
                setActiveTab('exp');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-sky-400 transition-colors cursor-pointer"
            >
              工作經歷
            </button>
            <button 
              onClick={() => {
                setActiveTab('projects');
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-sky-400 transition-colors cursor-pointer"
            >
              作品集
            </button>
            <a href="#skills" className="hover:text-sky-400 transition-colors">專業技能</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 mt-4 py-4 space-y-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <a 
                  href="#about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  關於我
                </a>
                <button 
                  onClick={() => {
                    setActiveTab('magic');
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  自傳 <Wand2 className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('exp');
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-slate-400 hover:text-sky-400 transition-colors"
                >
                  工作經歷
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('projects');
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-slate-400 hover:text-sky-400 transition-colors"
                >
                  作品集
                </button>
                <a 
                  href="#skills" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  專業技能
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        
        {/* Hero Section */}
        <section id="about" className="grid md:grid-cols-2 gap-12 items-center pt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-6 tracking-widest uppercase">
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
                <MapPin className="w-4 h-4 text-sky-500" /> 台灣，新北市
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square max-w-[400px] mx-auto"
          >
            <div className="absolute inset-0 bg-sky-500/20 rounded-3xl rotate-6 blur-3xl animate-pulse" />
            <div className="relative h-full w-full glass-effect rounded-[2.5rem] overflow-hidden border border-white/10 p-3 flex items-center justify-center shadow-2xl">
              <img 
                src="jeff_photo.jpg" 
                alt="Jeff Yang" 
                className="w-full h-full object-cover rounded-[2rem]"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/jeff-avatar/800/800";
                }}
                referrerPolicy="no-referrer"
              />
              
              {/* 3D Realistic Cards - Repositioned to cover lower face */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex -space-x-16 perspective-1000 scale-125 z-20 origin-bottom">
                <motion.div 
                  whileHover={{ rotateY: -15, y: -20, z: 50, scale: 1.1 }}
                  className="w-28 h-40 bg-white rounded-xl border-2 border-slate-200 flex flex-col items-center justify-between py-3 text-red-600 font-bold shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform -rotate-12 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-200 opacity-50" />
                  <span className="text-3xl leading-none relative z-10 self-start ml-2">A</span>
                  <Diamond className="w-10 h-10 fill-current relative z-10" />
                  <span className="text-3xl leading-none relative z-10 self-end mr-2 rotate-180">A</span>
                </motion.div>
                <motion.div 
                  whileHover={{ rotateY: 15, y: -30, z: 100, scale: 1.1 }}
                  className="w-28 h-40 bg-white rounded-xl border-2 border-slate-200 flex flex-col items-center justify-between py-3 text-red-600 font-bold shadow-[0_25px_50px_rgba(0,0,0,0.7)] transform rotate-6 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-200 opacity-50" />
                  <span className="text-3xl leading-none relative z-10 self-start ml-2">K</span>
                  <Diamond className="w-10 h-10 fill-current relative z-10" />
                  <span className="text-3xl leading-none relative z-10 self-end mr-2 rotate-180">K</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats / Chips Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '專案經驗', value: '12+ 年', icon: <Briefcase /> },
            { label: '成功案例', value: '20+ 個', icon: <Gamepad2 /> },
            { label: '團隊管理', value: '12+ 人', icon: <User /> },
            { label: '創造營收', value: '700萬+', icon: <Trophy /> },
          ].map((stat, i) => (
            <Card key={i} className="flex flex-col items-center text-center py-8 group hover:bg-sky-500/5 transition-colors" delay={i * 0.1}>
              <div className="p-3 rounded-full bg-slate-900 border border-white/5 text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                {React.cloneElement(stat.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <div className="text-3xl font-bold font-display mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </Card>
          ))}
        </section>

        {/* Autobiography Section */}
        <section id="bio" className="space-y-12">
          <SectionTitle title="核心價值" icon={<User />} />
          <Card className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-white">我是 Jeff，一位熱衷於創新的產品經理</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  擁有 12 年專案經驗，近期熱衷於研究各類型 AI 應用。我擅長於與人溝通，且頭腦清楚、觀察力敏銳、邏輯能力強。
                  我喜歡魔術，神秘的事物，創新，樂觀，正面思考。
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <h4 className="text-sky-400 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> 產品策略
                    </h4>
                    <p className="text-sm text-slate-500">主導制定並優化公司產品策略，確保市場競爭力與業務增長。</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sky-400 font-bold flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> 產品開發
                    </h4>
                    <p className="text-sm text-slate-500">協調團隊成員，定義產品特性，監督開發進度並確保高品質交付。</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sky-400 font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4" /> 用戶體驗
                    </h4>
                    <p className="text-sm text-slate-500">與設計團隊協作，提升產品易用性，利用數據分析持續優化。</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sky-400 font-bold flex items-center gap-2">
                      <User className="w-4 h-4" /> 團隊管理
                    </h4>
                    <p className="text-sm text-slate-500">實施敏捷開發，建立高效團隊文化，激發團隊創造力。</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 space-y-6">
                <h4 className="text-xl font-bold text-white italic">未來展望</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  致力於探索 AI 應用的產品創新，提升用戶體驗。期望通過持續學習和實踐，在快速變化的科技環境中保持競爭力，為用戶和企業創造更大價值。
                </p>
                <div className="pt-4">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">專業證照</div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                    <Trophy className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-bold text-white">國際專案管理師 PMP</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Experience & Projects Tabs */}
        <section id="experience" className="space-y-12">
          <div className="relative max-w-4xl mx-auto">
            {/* Poker Frame Decorations */}
            <div className="absolute -top-4 -left-4 text-white/20 select-none pointer-events-none hidden md:block">
              <Diamond className="w-8 h-8" />
            </div>
            <div className="absolute -top-4 -right-4 text-white/20 select-none pointer-events-none hidden md:block">
              <Heart className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-4 -left-4 text-white/20 select-none pointer-events-none hidden md:block">
              <Spade className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/20 select-none pointer-events-none hidden md:block">
              <Club className="w-8 h-8" />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 p-3 bg-slate-900/90 rounded-[2rem] border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
              <button 
                onClick={() => setActiveTab('exp')}
                className={cn(
                  "px-12 py-6 rounded-2xl text-xl font-black transition-all transform active:scale-95 flex-1",
                  activeTab === 'exp' 
                    ? "bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.2)] ring-4 ring-sky-500/50" 
                    : "text-slate-500 hover:text-white hover:bg-white/5 border border-white/5"
                )}
              >
                工作經歷
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={cn(
                  "px-12 py-6 rounded-2xl text-xl font-black transition-all transform active:scale-95 flex-1",
                  activeTab === 'projects' 
                    ? "bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.2)] ring-4 ring-sky-500/50" 
                    : "text-slate-500 hover:text-white hover:bg-white/5 border border-white/5"
                )}
              >
                作品集
              </button>
              <button 
                onClick={() => setActiveTab('magic')}
                className={cn(
                  "px-12 py-6 rounded-2xl text-xl font-black transition-all transform active:scale-95 flex-1",
                  activeTab === 'magic' 
                    ? "bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-4 ring-amber-400/50" 
                    : "text-slate-500 hover:text-white hover:bg-white/5 border border-white/5"
                )}
              >
                神奇自傳
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'exp' && (
              <motion.div 
                key="exp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <SectionTitle title="職涯錦標賽" icon={<Briefcase />} />
                <div className="grid gap-4">
                  {EXPERIENCES.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-sky-500/30 transition-all duration-500 relative overflow-hidden group shadow-2xl"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-sky-400 font-bold">{exp.company}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500 font-medium">{exp.period}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-slate-800/50 border border-white/5 text-slate-500 text-[9px] font-bold uppercase tracking-widest group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                            <Diamond className="w-2.5 h-2.5 text-sky-500 mt-1 shrink-0 fill-current opacity-60" />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
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
                    setShowPortfolio(true);
                  }}
                  actionLabel="進入作品集頁面"
                />
                <div className="grid md:grid-cols-2 gap-8">
                  {PROJECTS.slice(0, 4).map((project, i) => (
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
                              setShowPortfolio(true);
                            }}
                            className="text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
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
                  {/* Intro Header */}
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

                  {/* Story Content */}
                  <div className="space-y-12">
                    {/* Intro Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-slate-900/80 border border-white/10 space-y-8 text-center relative overflow-hidden group shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="w-20 h-20 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 mx-auto group-hover:scale-110 transition-transform duration-500 relative z-10">
                        <Gamepad2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-4 relative z-10">
                        <h4 className="text-4xl font-black text-white tracking-tight">設計思路與實例</h4>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                          在 <span className="text-white font-bold glow-cyan">2017 年</span> 我設計了一款吹牛的線上遊戲，這是一個將傳統酒局遊戲數位化並加入創新的經典案例。
                        </p>
                      </div>
                      <div className="pt-8 border-t border-white/10 flex justify-center gap-12 relative z-10">
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">核心產品</div>
                          <div className="text-2xl font-black text-sky-400 italic tracking-wider">無二吹牛</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-2">專案定位</div>
                          <div className="text-2xl font-black text-sky-400 italic tracking-wider">全台首創</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Feature List (Single Column) */}
                    <div className="space-y-8">
                      {[
                        { 
                          title: "市場與選品", 
                          icon: <LineChart className="w-5 h-5" />,
                          content: <>身為產品經理需要對市場有<span className="text-white font-bold underline decoration-white/30 underline-offset-4">“銳利”</span>的眼光，選擇這類遊戲的原因是大多數人都會玩或知道規則，且年齡跨度大又不分性別，受眾會相對廣一些。當然我們還是有針對TA與Persona的分析，以符合行銷時的需求與共鳴。而現在有了AI 工具的出現，會更方便的產出這些分析報告，如ChatGPT,Claude,Kimi等，可以依照需求特性使用不同的語言模型。甚至PM最麻煩的文件產出都直接包辦了大部分。</> 
                        },
                        { 
                          title: "特色與改良", 
                          icon: <Sparkles className="w-5 h-5" />,
                          content: <>從自身經歷與經過調研後我發現一個問題，大多數人都經常有希望重新骰一次的時候（超過<span className="text-white font-bold">70%</span>）。原因是出在於牌不夠好！擔心對戰時會偏弱勢，所以我提案改良了一下，“將骰子其中一面的2 都改為 1 ”！因為1在初始狀態可以代表任意數，這樣會將好牌率大大的提升。同時少了2 這個最小的數字，等於只剩下五個數字的組合。讓玩家的對戰精彩度提高，爽度也更高。同時也為這個產品的命名定下了基調，因為沒有2 所以叫做 [無二吹牛] ，在Slogan的設計也簡單好記，獨一無二的無二吹牛。</> 
                        },
                        { 
                          title: "風格搭配", 
                          icon: <Layers className="w-5 h-5" />,
                          content: <>為了要有更好的臨場感所以UI風格以3D為主，包含了骰盅與場景皆使用3D動畫製作，在過去建模會需要一定的工程時間，現在也有AI工具能<span className="text-white font-bold underline decoration-white/30 underline-offset-4">快速</span>達成了（如CSM)。但細節調整的部分還是要跟設計慢慢雕的，比如骰盅的搖動速度，開牌的節奏等，就需要一些讓玩家能更融入的調整。</> 
                        },
                        { 
                          title: "音樂性", 
                          icon: <MessageSquare className="w-5 h-5" />,
                          content: <>除了畫面場景搭配之外，BGM的重要性也是不可忽視的，一個好的BGM可以讓用戶不知不覺的沈浸其中而不可自拔。依據我們的調研分析，有部分族群是屬於派對玩家，而在當時電音是年輕人中相當熱門的音樂類型，所以我們還特地請音樂老師製作了多首的電子樂曲，有重節奏的，有輕快型的，採首尾相接的循環設計，玩家可以自行選擇喜愛的類型。而現在當然也有AI 工具能<span className="text-white font-bold underline decoration-white/30 underline-offset-4">快速</span>達成了（如Suno）。</> 
                        },
                        { 
                          title: "對戰機制", 
                          icon: <Trophy className="w-5 h-5" />,
                          content: <>玩法上除了提高爽度與畫面外，當然還有對戰性的設計。我們採用了玩家隨機配對的模式，但是每場對戰會打<span className="text-white font-bold">7局</span>，而贏的局數越多則會有更高的爆擊加成，比如<span className="text-white font-bold">7:0</span>完封對手的情況，就會獲得原本單局<span className="text-white font-bold underline decoration-white/30 underline-offset-4">“鑽石”</span>數量的兩倍加成。所以除了勝場數外，遊戲內鑽石的額外獲得也會更有成就感。</> 
                        },
                        { 
                          title: "天梯排行榜", 
                          icon: <LineChart className="w-5 h-5" />,
                          content: <>遊戲中不可或缺的就是競爭感，一個好的對對手能激發出更多的潛力與挑戰。所以我們設計了天梯排行榜，包含勝率、<span className="text-white font-bold underline decoration-white/30 underline-offset-4">鑽石</span>贏取數等排行，以兩個月為一個賽季，並送出機車、手機、耳機等各種大獎。用戶數變多後也拆分了不同的分區排名，比如北區第三名、中區<span className="text-white font-bold">第七名</span>、南區第二名。這樣的賽季頭銜會成為永久的成就獎章。除了證明實力外，在現實中也是個能向好友炫耀的小玩意。當然在最後衝榜階段我們也會舉辦一些積分加成活動，對於活躍用戶的上線時間也有很大的幫助。</> 
                        },
                        { 
                          title: "專案時程", 
                          icon: <Briefcase className="w-5 h-5" />,
                          content: <>在當時的團隊編制中，參與這個專案的成員一共有 <span className="text-white font-bold">7 位</span>（包含前端、後端工程師、動畫師、UI/UX設計師、測試工程師等），而我們從提案到測試上線一共只花了<span className="text-white font-bold">7週</span>的時間，算是相當緊湊與高效的排程。雖然因為遊戲性質與流程並不會太複雜的關係，但也算我歷來產品的最高效率之作了。上線之後的遊戲數據也算是還不錯，除了DAU/MAU有穩定增加外，一日/七日留存率也提高了不少。最後這款小遊戲在前三個月創造了<span className="text-white font-bold">七百萬</span>的營收～</> 
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-sky-500/30 transition-all duration-500">
                          <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all duration-500 shrink-0">
                              {item.icon}
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                                <span className="text-sky-500/50 mr-2 font-mono">0{idx + 1}</span>
                                {item.title}
                              </h4>
                              <div className="text-slate-400 leading-relaxed text-base">
                                {item.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Text */}
                  <div className="max-w-3xl mx-auto p-10 rounded-3xl bg-sky-500/5 border border-sky-500/10 text-slate-300 leading-relaxed text-lg italic text-center">
                    以上是我最小也最高效的遊戲作品之一，如果有興趣可以看看作品集中的其他產品。上面除了代表我的創新思維外，還包含了我對現有技術的不斷更新，以及對創作的熱情，當然我最自信的部分還是在團隊的凝聚與配合上，我會盡量將各方的意見與專業整合，讓團隊成員都在統一的目標上努力，減少溝通上的落差與誤會。這樣不只團隊氣氛好，工作效率高，也能讓所有成員都知道各自的重要性。就算偶爾有加班趕工期成員也都能理解。
                  </div>

                  {/* Magic Reveal Section */}
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

                        {magicStep === 1 ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-10"
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
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest">
                                  Magic Reveal
                                </div>
                                <h4 className="text-2xl font-bold text-white italic">接下來就開始揭秘我用了什麼樣的方式來進行這個魔術</h4>
                                
                                <div className="grid gap-6">
                                  <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-white/5 space-y-4 hover:border-sky-500/30 transition-colors">
                                    <p className="text-xl text-slate-300 font-medium">其實就是所謂的 <span className="text-sky-400 font-bold glow-cyan">誘導與文字暗示</span>。</p>
                                    <p className="text-slate-400 text-base leading-relaxed">
                                      我在上面用了一些詞彙，比如 <span className="text-sky-400 font-bold underline decoration-sky-500/50 underline-offset-4">銳利</span>、<span className="text-sky-400 font-bold underline decoration-sky-500/50 underline-offset-4">快速</span>、<span className="text-sky-400 font-bold underline decoration-sky-500/50 underline-offset-4">鑽石</span>等，是為了讓你對方塊的形狀產生一定關聯，且在最後選擇時，只有方塊(紅磚)有特別括號說明且排在最後，就是為了加深印象。
                                    </p>
                                  </div>
                                  
                                  <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-white/5 space-y-4 hover:border-sky-500/30 transition-colors">
                                    <p className="text-slate-400 text-base leading-relaxed">
                                      此外這篇履歷中，我一共用到了: <span className="text-sky-400 font-bold">2017年</span> 、<span className="text-sky-400 font-bold">70%</span>、<span className="text-sky-400 font-bold">7 局</span>、<span className="text-sky-400 font-bold">第七名</span>、<span className="text-sky-400 font-bold">7:0</span>、<span className="text-sky-400 font-bold">7 位成員</span>、<span className="text-sky-400 font-bold">7 周</span>、<span className="text-sky-400 font-bold">七百萬</span>以及總共 <span className="text-sky-400 font-bold">7 大項</span>的排版來提供暗示，且在最後的選擇數字時，我用了 “ <span className="text-sky-400 font-bold underline decoration-sky-500/50 underline-offset-4">1～13 的中間</span>” 的說法來誘導讓你選擇中間數字 <span className="text-sky-400 font-bold glow-cyan">7</span>。
                                    </p>
                                  </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed">
                                  這還只是單純的從文字上融合魔術中的一小部分基本概念而已。現在想像一下如果我們之後的產品能在其中設計相關的圖案、聲音等暗示效果的話。是不是能增加用戶的黏著度與轉化率呢～～
                                </p>
                                
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-500/20 to-transparent border border-sky-500/30 text-slate-200 italic text-lg shadow-2xl">
                                  最後如果你需要一份更正式的“產品經理”能做到什麼的履歷的話，我馬上能叫 AI 出一份符合你的崗位職缺描述的專屬履歷。但我更傾向講點真實的，因為真誠才是必殺技啊！
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
                        ) : null}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-12">
          <SectionTitle title="專業技能組" icon={<Code2 />} />
          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <Card key={i} className="group" delay={i * 0.05}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/5 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all">
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
                    className="h-full bg-sky-500"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">熟練度</span>
                  <span className="text-[10px] text-sky-400 font-bold">{skill.level}%</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="pt-24 pb-24">
          <Card className="bg-slate-900 border-sky-500/30 p-16 text-center relative overflow-hidden group rounded-[3rem]">
            {/* Animated Background Glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 blur-[120px] rounded-full group-hover:bg-sky-500/30 transition-colors duration-700" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700" />
            
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                  準備好提升您的 <br />
                  <span className="text-sky-400 glow-cyan italic">產品勝率嗎？</span>
                </h3>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  我正在尋找下一個挑戰。如果您需要一位具備<span className="text-sky-300">遊戲思維</span>、<span className="text-sky-300">魔術直覺</span>與<span className="text-sky-300">數據驅動能力</span>的資深產品經理，讓我們聊聊。
                </p>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 text-slate-500 text-sm font-mono tracking-widest uppercase">
              </div>
            </div>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sky-500 rounded flex items-center justify-center font-bold text-slate-950 text-xs">J</div>
            <span className="font-display font-bold tracking-tighter">JEFF YANG</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Jeff Yang. 使用魔術與 AI 打造。版權所有。
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><User className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
      </motion.div>
    )}
    </AnimatePresence>
    </div>
  );
}
