/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Diamond
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
  description: string;
  achievement?: string;
  image?: string;
  tags: string[];
}

// --- Data ---

const EXPERIENCES: Experience[] = [
  {
    company: "伊諾科技有限公司 (E-Tech)",
    role: "產品經理 (Product Manager)",
    period: "2024/09 - 至今",
    description: [
      "需求分析：研究客戶發展、蒐集對手資訊，分析出對公司有利的策略。",
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
      "團隊管理：管理 9-12 人團隊，優化開發流程與品質控管。"
    ],
    tags: ["團隊管理", "市場趨勢", "規格撰寫"]
  },
  {
    company: "昕力資訊 (TPIsoftware)",
    role: "產品/專案經理",
    period: "2021/06 - 2022/04",
    description: [
      "軟體開發：與開發團隊緊密配合，負責功能規劃、規格撰寫與專案進度管控。",
      "品質驗收：負責產品測試與品質驗收，確保如期如質交付。"
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
  }
];

const PROJECTS: Project[] = [
  {
    title: "CYBERPOKER",
    type: "3D 撲克手遊",
    description: "全台首創全 3D 撲克手遊，首創倒數錦標賽玩法，具備華麗 3D 場景、Avatar 與變裝系統、徽章成就系統。",
    achievement: "成功上架並獲得高度市場關注，多視角切換體驗。",
    tags: ["3D", "德州撲克", "錦標賽"]
  },
  {
    title: "聖殿德州撲克",
    type: "德州撲克 App",
    description: "信用版德州撲克，包含 NL Holdem、牌局紀錄、貼圖語音包與勝率數據分析。",
    achievement: "半年內完成開發，上線首月營收達 200 萬。",
    tags: ["NL Holdem", "數據分析", "營收成長"]
  },
  {
    title: "黑鑽娛樂城",
    type: "電競類手遊平台",
    description: "電競類麻將手遊，首創天梯排位機制與無二吹牛排位賽，支援現金與信用兩種模式。",
    achievement: "同時在線用戶達 5000 人，三個月營收七百萬。",
    tags: ["麻將", "排位系統", "高併發"]
  },
  {
    title: "BALLCITY",
    type: "運動社交 App",
    description: "籃球場地展示、線上揪團、現場回報與活動邀請推播，虛實整合體驗。",
    achievement: "獲得 App Store 當月最佳 APP 第三名。",
    tags: ["社交", "運動", "O2O"]
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

// --- Components ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

const Card = ({ children, className, delay = 0 }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn("glass-effect rounded-2xl p-6 poker-card-shadow", className)}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
      <Diamond className="w-5 h-5 fill-current" />
    </div>
    <h2 className="text-2xl font-bold tracking-tight font-display uppercase italic">{title}</h2>
    <div className="h-px flex-1 bg-gradient-to-r from-sky-500/50 to-transparent ml-4" />
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
          <div className="relative z-10 text-white font-bold text-center drop-shadow-lg">
            <p className="text-[10px] uppercase tracking-widest mb-1 opacity-90">我已經</p>
            <p className="text-base">選好了</p>
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

  return (
    <div className="min-h-screen font-sans selection:bg-sky-500/30">
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-sky-400 transition-colors">關於我</a>
            <a href="#experience" className="hover:text-sky-400 transition-colors">工作經歷</a>
            <a href="#projects" className="hover:text-sky-400 transition-colors">作品集</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">專業技能</a>
          </div>
          <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
            聯繫我
          </button>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-6 tracking-widest uppercase">
              <Sparkles className="w-3 h-3" /> 資深產品經理
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
              不只是PM，也是產品魔術師。
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              我是 Jeff，一位擁有 12 年經驗的產品經理。我擅長將「魔術心理學」與「遊戲機制」融入產品設計，創造具備高黏著度與商業價值的數位體驗。
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Mail className="w-4 h-4 text-sky-500" /> jeff760220@gmail.com
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-sky-500" /> 0958-387-877
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-sky-500" /> 台灣，新北市
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-sky-500/20 rounded-3xl rotate-6 blur-2xl" />
            <div className="relative h-full w-full glass-effect rounded-3xl overflow-hidden border border-white/10 p-2 flex items-center justify-center">
              <img 
                src="/jeff_photo.jpg" 
                alt="Jeff Yang" 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/jeff-avatar/800/800";
                }}
                referrerPolicy="no-referrer"
              />
              
              {/* 3D Realistic Cards */}
              <div className="absolute bottom-12 right-8 flex -space-x-12 perspective-1000">
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
          <SectionTitle title="自傳與核心價值" icon={<User />} />
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
          <div className="flex justify-center gap-6 p-2 bg-slate-900/80 rounded-2xl w-fit mx-auto border border-white/10 shadow-2xl">
            <button 
              onClick={() => setActiveTab('exp')}
              className={cn(
                "px-10 py-4 rounded-xl text-base font-bold transition-all transform active:scale-95",
                activeTab === 'exp' ? "bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              工作經歷
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={cn(
                "px-10 py-4 rounded-xl text-base font-bold transition-all transform active:scale-95",
                activeTab === 'projects' ? "bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              作品集
            </button>
            <button 
              onClick={() => setActiveTab('magic')}
              className={cn(
                "px-10 py-4 rounded-xl text-base font-bold transition-all transform active:scale-95",
                activeTab === 'magic' ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              神奇自傳
            </button>
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
                            <span key={tag} className="px-2 py-1 rounded bg-slate-900 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                            {item}
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
                className="grid md:grid-cols-2 gap-8"
              >
                {PROJECTS.map((project, i) => (
                  <Card key={i} className="flex flex-col group h-full" delay={i * 0.1}>
                    <div className="aspect-video rounded-xl bg-slate-900 mb-6 overflow-hidden relative border border-white/5">
                      <img 
                        src={`https://picsum.photos/seed/${project.title}/800/450`} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 rounded bg-sky-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest">
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
                    {project.achievement && (
                      <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 mb-6">
                        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-1">
                          <Trophy className="w-3 h-3" /> 專案成就
                        </div>
                        <p className="text-slate-200 text-sm font-medium">{project.achievement}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">#{tag}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => window.open('https://ais-dev-nangvu2q4cngez3tiyuxdn-202779007245.asia-northeast1.run.app/portfolio.pdf', '_blank')}
                        className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-bold transition-colors"
                      >
                        查看詳情 <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'magic' && (
              <motion.div 
                key="magic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-12 text-left"
              >
                <Card className="p-8 md:p-12 space-y-8 bg-slate-900/40 border-white/5">
                  <div className="space-y-6 text-slate-300 leading-relaxed">
                    <p className="text-xl font-bold text-white">嗨～我是一名產品經理 兼 魔術師 如果你認真的看完這份履歷，你會看到一個神奇的魔術，並且我會在最後揭露整個魔術的秘密！</p>
                    <p>首先我想用一個簡單的實例來介紹一下我過去的小作品以及設計思路～</p>
                    <p>在2017年我設計了一款吹牛的線上遊戲，沒錯，就是在酒局中常玩的骰子對戰遊戲，不過當然是跟原版多了點創新的：</p>
                    
                    <div className="space-y-6 mt-8">
                      {[
                        { title: "市場與選品", content: "身為產品經理需要對市場有‘銳利’的眼光，選擇這類遊戲的原因是大多數人都會玩或知道規則，且年齡跨度大又不分性別，受眾會相對廣一些。當然我們還是有針對TA與Persona的分析，以符合行銷時的需求與共鳴。而現在有了AI 工具的出現，會更方便的產出這些分析報告，如ChatGPT,Claude,Kimi（https://kimi.moonshot.cn/ ）等，可以依照需求特性使用不同的語言模型。甚至PM最麻煩的文件產出都直接包辦了大部分。" },
                        { title: "特色與改良", content: "從自身經歷與經過調研後我發現一個問題，大多數人都經常有希望重新骰一次的時候（超過70%）。原因是出在於牌不夠好！擔心對戰時會偏弱勢，所以我提案改良了一下，“將骰子其中一面的2 都改為 1 ”！因為1在初始狀態可以代表任意數，這樣會將好牌率大大的提升。同時少了2 這個最小的數字，等於只剩下五個數字的組合。讓玩家的對戰精彩度提高，爽度也更高。同時也為這個產品的命名定下了基調，因為沒有2 所以叫做 [無二吹牛] ，在Slogan的設計也簡單好記，獨一無二的無二吹牛。" },
                        { title: "風格搭配", content: "為了要有更好的臨場感所以UI風格以3D為主，包含了骰盅與場景皆使用3D動畫製作，在過去建模會需要一定的工程時間，現在也有AI工具能快速達成了（如CSM https://3d.csm.ai/)。但細節調整的部分還是要跟設計慢慢雕的，比如骰盅的搖動速度，開牌的節奏等，就需要一些讓玩家能更融入的調整。" },
                        { title: "音樂性", content: "除了畫面場景搭配之外，BGM的重要性也是不可忽視的，一個好的BGM可以讓用戶不知不覺的沈浸其中而不可自拔。依據我們的調研分析，有部分族群是屬於派對玩家，而在當時電音是年輕人中相當熱門的音樂類型，所以我們還特地請音樂老師製作了多首的電子樂曲，有重節奏的，有輕快型的，採首尾相接的循環設計，玩家可以自行選擇喜愛的類型。而現在當然也有AI 工具能快速達成了（如Suno https://suno.com/）。" },
                        { title: "對戰機制", content: "玩法上除了提高爽度與畫面外，當然還有對戰性的設計。我們採用了玩家隨機配對的模式，但是每場對戰會打7局，而贏的局數越多則會有更高的爆擊加成，比如7:0完封對手的情況，就會獲得原本單局“鑽石”數量的兩倍加成。所以除了勝場數外，遊戲內鑽石的額外獲得也會更有成就感。" },
                        { title: "天梯排行榜", content: "遊戲中不可或缺的就是競爭感，一個好的對手能激發出更多的潛力與挑戰。所以我們設計了天梯排行榜，包含勝率、鑽石贏取數等排行，以兩個月為一個賽季，並送出機車、手機、耳機等各種大獎。用戶數變多後也拆分了不同的分區排名，比如北區第三名、中區第七名、南區第二名。這樣的賽季頭銜會成為永久的成就獎章。除了證明實力外，在現實中也是個能向好友炫耀的小玩意。當然在最後衝榜階段我們也會舉辦一些積分加成活動，對於活躍用戶的上線時間也有很大的幫助。" },
                        { title: "專案時程", content: "在當時的團隊編制中，參與這個專案的成員一共有 7 位（包含前端、後端工程師、動畫師、UI/UX設計師、測試工程師等），而我們從提案到測試上線一共只花了7週的時間，算是相當緊湊與高效的排程。雖然因為遊戲性質與流程並不會太複雜的關係，但也算我歷來產品的最高效率之作了。上線之後的遊戲數據也算是還不錯，除了DAU/MAU有穩定增加外，一日/七日留存率也提高了不少。最後這款小遊戲在前三個月創造了七百萬的營收～" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2 border-l-2 border-sky-500/30 pl-6 py-2">
                          <h4 className="text-sky-400 font-bold text-lg">{idx + 1}. {item.title}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>

                    <p className="pt-8">以上是我最小也最高效的遊戲作品之一，如果有興趣可以看看作品集中的其他產品。上面除了代表我的創新思維外，還包含了我對現有技術的不斷更新，以及對創作的熱情，當然我最自信的部分還是在團隊的凝聚與配合上，我會盡量將各方的意見與專業整合，讓團隊成員都在統一的目標上努力，減少溝通上的落差與誤會。這樣不只團隊氣氛好，工作效率高，也能讓所有成員都知道各自的重要性。就算偶爾有加班趕工期成員也都能理解。</p>
                  </div>

                  <div className="pt-12 border-t border-white/5">
                    <Card className="p-12 border-amber-500/20 bg-amber-500/5 relative overflow-hidden text-center">
                      <div className="absolute inset-0 diamond-pattern opacity-10" />
                      <div className="relative z-10 space-y-8">
                        {magicStep === 0 ? (
                          <>
                            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-500">
                              <Wand2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold">看完履歷現在終於到了魔術的部分</h3>
                            <div className="space-y-4 text-slate-400">
                              <p>一副撲克牌除了鬼牌外共有52張，請先在 1～13 的中間 選擇一個數字。</p>
                              <p>接著在 黑桃、紅心、梅花、方塊（紅磚）等花色中選出其中一種～～然後專心地想著這張牌。</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 py-4">
                              {[1, 2, 3, 4, 5, 6].map(i => (
                                <span key={i} className="text-slate-700">｜</span>
                              ))}
                            </div>
                          </>
                        ) : null}

                        <PokerCard isFlipped={magicStep === 1} onClick={() => magicStep === 0 && setMagicStep(1)} />

                        {magicStep === 1 ? (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                          >
                            <h3 className="text-2xl font-bold">你選的牌是不是 [方塊 7 ]～～～</h3>
                            <p className="text-slate-400 leading-relaxed text-left">
                              如果是的話恭喜你有個良好的魔術體驗，不是的話也沒關係，因為我的主要目的也已經達到了，讓你認真地看到了這裡！！！ 
                            </p>
                            <div className="space-y-6 text-left pt-6 border-t border-white/10">
                              <h4 className="text-xl font-bold text-white">接下來就開始揭秘我用了什麼樣的方式來進行這個魔術</h4>
                              <p className="text-slate-400 text-sm">其實就是所謂的誘導與文字暗示。</p>
                              <p className="text-slate-400 text-sm">我在上面用了一些詞彙，比如 銳利、快速、鑽石等，是為了讓你對方塊的形狀產生一定關聯，且在最後選擇時，只有方塊(紅磚)有特別括號說明且排在最後，就是為了加深印象。此外這篇履歷中，我一共用到了: 2017年 、70%、7 局、第七名、7:0、7 位成員、7 周、七百萬以及總共 7 大項的排版來提供暗示，且在最後的選擇數字時，我用了 “ 1～13 的中間” 的說法來誘導讓你選擇中間數字 7。</p>
                              <p className="text-slate-400 text-sm">這還只是單純的從文字上融合魔術中的一小部分基本概念而已。現在想像一下如果我們之後的產品能在其中設計相關的圖案、聲音等暗示效果的話。是不是能增加用戶的黏著度與轉化率呢～～</p>
                            </div>
                            <div className="p-6 rounded-xl bg-slate-950/50 border border-white/5 text-sm text-slate-300 italic text-left">
                              最後如果你需要一份更正式的“產品經理”能做到什麼的履歷的話，我馬上能叫 AI 出一份符合你的崗位職缺描述的專屬履歷。但我更傾向講點真實的，因為真誠才是必殺技啊！
                            </div>
                            <button 
                              onClick={() => setMagicStep(0)}
                              className="text-amber-500 font-bold text-sm hover:underline"
                            >
                              重新體驗
                            </button>
                          </motion.div>
                        ) : null}
                      </div>
                    </Card>
                  </div>
                </Card>
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
        <section className="pt-24 pb-12">
          <Card className="bg-sky-500 text-slate-950 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="grid grid-cols-12 gap-4 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="aspect-square border border-slate-950/20 rounded-sm" />
                  ))}
               </div>
            </div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
                準備好提升您的 <br /> <span className="italic underline decoration-slate-950/30">產品勝率嗎？</span>
              </h2>
              <p className="text-lg font-medium text-slate-900/70 max-w-xl mx-auto">
                我正在尋找下一個挑戰。如果您需要一位具備遊戲思維、魔術直覺與數據驅動能力的資深產品經理，讓我們聊聊。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:jeff760220@gmail.com"
                  className="bg-slate-950 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl"
                >
                  <Mail className="w-5 h-5" /> 發送郵件
                </a>
                <a 
                  href="#"
                  className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/30 transition-all"
                >
                  <MessageSquare className="w-5 h-5" /> 聯繫我
                </a>
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
    </div>
  );
}
