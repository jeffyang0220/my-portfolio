/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Download, Loader2, Printer, Compass, Cpu, Zap, Activity, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- Portfolio Data ---
const projects = [
  {
    id: 'cyberpoker',
    category: '遊戲類 APP',
    platform: 'iOS / Android',
    title: 'CYBERPOKER',
    description: [
      '全台首創全 3D 撲克手遊',
      '首創倒數錦標賽玩法',
      '全新風格拉霸機台',
      '徽章成就系統',
      'Avatar 與變裝系統',
      '多視角切換',
      '華麗 3D 場景'
    ],
    milestone: '上架產品',
    images: [
      "/images/projects/cyberpoker_1.png",
      "/cyberpoker_2.png"
    ],
    layout: 'text-left-images-right',
    imageType: 'landscape'
  },
  {
    id: 'temple-poker',
    category: '遊戲類 APP',
    platform: 'iOS / Android',
    title: '聖殿德州撲克',
    description: [
      '信用版德州撲克',
      'NL Holdem',
      '牌局紀錄',
      '貼圖語音包',
      '勝率數據分析'
    ],
    milestone: '半年內完成開發，上線首月營收200萬',
    images: [
      '/images/projects/temple_1.png',
      '/temple_2.png'
    ],
    layout: 'text-left-images-right',
    imageType: 'portrait'
  },
  {
    id: 'legend-mahjong',
    category: '遊戲類 APP',
    platform: 'iOS / Android',
    title: '傳說麻將',
    description: [
      '首創戰隊麻將手遊',
      '首創 3D 角色互動',
      '技能系統',
      '潮流電音風格'
    ],
    milestone: '募資五千萬（已下架產品）',
    images: [
      '/images/projects/mahjong_1.png',
      '/mahjong_2.png'
    ],
    layout: 'text-left-images-right',
    imageType: 'landscape'
  },
  {
    id: 'black-diamond',
    category: '遊戲類 APP',
    platform: 'iOS / Android',
    title: '黑鑽娛樂城',
    description: [
      '電競類麻將手遊',
      '首創天梯排位機制',
      '月冠軍排行獎勵',
      '首創無二吹牛排位賽',
      '另有三項棋牌類遊戲串接',
      '可支援現金與信用兩種模式'
    ],
    milestone: '同時在線用戶達五千人，三個⽉營收七百萬',
    images: [
      '/images/projects/diamond_1.png',
      '/Diamond_2.png'
    ],
    layout: 'text-left-images-right',
    imageType: 'landscape'
  },
  {
    id: 'ballcity',
    category: 'SPORT SOCIAL APP',
    platform: 'iOS / Android',
    title: 'BALLCITY',
    description: [
      '會員系統',
      '籃球場地展示',
      '線上揪團',
      '現場回報',
      '活動邀請推播',
      '虛實整合'
    ],
    milestone: '上架獲得App Store 當月最佳APP 第三名',
    images: [
      '/ballcity_1.png',
      '/ballcity_2.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'zeroplus',
    category: '即時通訊 APP',
    platform: 'iOS / Android',
    title: 'ZERO PLUS',
    description: [
      '即時通訊',
      '會員系統',
      '群組內私密對話',
      '影片、錄音、貼圖、照片傳送',
      '用戶使用功能統計',
      '用戶量統計',
      '訊息推播提醒',
      '地圖搜尋好友'
    ],
    milestone: '上線用戶達 3 萬',
    images: [
      '/zeroplus_1.png',
      '/zeroplus_2.png',
      '/zeroplus_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'merck',
    category: '產品型錄 APP',
    platform: 'iOS / Android',
    title: 'MERCK',
    description: [
      '產品展示',
      '未來感介面設計',
      '文章、影片連結',
      '會員訂閱、收藏',
      '會員權限分立'
    ],
    milestone: '國際集團合作案',
    images: [
      '/Merck_1.png',
      '/merck_2.png',
      '/Merck_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'clipper',
    category: '智能理財 APP',
    platform: 'iOS',
    title: 'CLIPPER',
    description: [
      '智能投顧',
      '即時掌握投資狀況',
      '輪盤輸入風險指數',
      '即時客服'
    ],
    milestone: '協助客戶獲得天使輪融資 300 萬美金',
    images: [
      '/clipper_1.png',
      '/clipper_2.png',
      '/clipper_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'arguseye',
    category: 'O2O 大型雲端數據連結 APP',
    platform: 'iOS',
    title: 'ARGUS EYE',
    description: [
      '大型機台互動',
      '線上排行榜',
      '機台據點',
      '活動快訊',
      'QR Code 掃描'
    ],
    milestone: '台灣首個大型遊戲機台與APP連線產品',
    images: [
      '/arguseye_1.png',
      '/arguseye_2.png',
      '/arguseye_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'sivann',
    category: 'I.O.T 智能居家APP',
    platform: 'Android',
    title: 'SIVANN',
    description: [
      'WiFi 連結',
      '30多種裝置感測顯示與控制',
      '開關 定時 亮度調整',
      '四向控制',
      '警報設定 .....等'
    ],
    milestone: '第一個 I.O.T 整合超過 30 種裝置的APP',
    images: [
      '/sivann_1.png',
      '/sivann_2.png',
      '/sivann_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'bananafit',
    category: '教練媒合 APP',
    platform: 'iOS / Android',
    title: 'BANANA FIT',
    description: [
      '學生 V.S 教練媒合',
      '評分機制',
      '健身房介紹',
      '會員專區',
      '各式運動活動報名',
      'LBS 定位服務'
    ],
    milestone: '媒合平台服務，累積有上百位教練',
    images: [
      '/bananafit_1.png',
      '/bananafit_2.png',
      '/bananafit_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'smartchef',
    category: '美食宅配 APP',
    platform: 'iOS / Android / 網站',
    title: 'SMART CHEF CLUB',
    description: [
      '形象網頁',
      '會員系統',
      '烹飪教學流程',
      '產品展示',
      '線上訂購'
    ],
    milestone: '上線第一個月達到 3000 會員數',
    images: [
      '/smartchef_1.png',
      '/smartchef_2.png',
      '/smartchef_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'jarvis',
    category: '智能安全帽連結 APP',
    platform: 'iOS / Android',
    title: 'JARVIS',
    description: [
      '休眠背景運作',
      '語音回報',
      '激烈天氣警示',
      '定時自動關閉'
    ],
    milestone: '協助客戶達成一萬筆訂單目標',
    images: [
      '/Jarvis_1.png',
      '/Jarvis_2.png',
      '/Jarvis_3.png'
    ],
    layout: 'images-left-text-right'
  },
  {
    id: 'startek',
    category: '星友科技',
    platform: 'Mac OS',
    title: '星友科技',
    description: [
      '指紋機解鎖 Mac unlock',
      '指紋顯示',
      '特徵值比對',
      'USB連結'
    ],
    milestone: '指紋功能一年後加入到新版的Macbook',
    images: [
      '/star_1.png'
    ],
    layout: 'laptop'
  },
  {
    id: 'dreamcatcher',
    category: 'BRAND IDENTITY',
    platform: 'E-Sports',
    title: 'DREAM CATCHER GAMING',
    description: [
      'Brand color strategy',
      'High-value visual strategy to differentiate from other competitors in the E-Sports market.',
      '電競戰隊品牌合作',
      'BRAND CHARACTER'
    ],
    milestone: '電競品牌視覺優化',
    images: [
      '/dreamcatcher_1.png',
      '/dreamcatcher_3.png'
    ],
    layout: 'text-left-images-right',
    imageType: 'landscape'
  }
];

export default function Portfolio() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleX = width / 1920;
      const scaleY = height / 1080;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Ensure all images are loaded
      const images = containerRef.current.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        const image = img as HTMLImageElement;
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
      }));

      const slides = containerRef.current.querySelectorAll('.portfolio-slide');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080],
        compress: true
      });

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        // Capture with higher reliability settings
        const canvas = await html2canvas(slide, {
          scale: 1.2, // Lower scale slightly to prevent memory issues in some browsers
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#0a192f',
          width: 1920,
          height: 1080,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedSlides = clonedDoc.querySelectorAll('.portfolio-slide');
            const clonedSlide = clonedSlides[i] as HTMLElement;
            if (clonedSlide) {
              clonedSlide.style.transform = 'none';
              clonedSlide.style.position = 'static';
              clonedSlide.style.visibility = 'visible';
              clonedSlide.style.display = 'flex';
            }
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        if (i > 0) pdf.addPage([1920, 1080], 'landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
        
        setExportProgress(Math.round(((i + 1) / slides.length) * 100));
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      pdf.save('JEFF_YANG_Portfolio.pdf');
    } catch (error: any) {
      console.error('PDF Export failed:', error);
      alert('【下載失敗解決方案】\n\n由於瀏覽器安全限制，若一鍵下載無效，請嘗試以下兩種方式：\n\n1. 點擊旁邊的「列印/另存 PDF」按鈕，在彈出的視窗中將「印表機」改為「另存為 PDF」。(推薦，品質最高)\n2. 嘗試使用 Chrome 瀏覽器開啟此頁面再試一次。');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-50 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50 print:hidden">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-sky-500 hover:text-slate-950 transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> 返回首頁
        </button>
      </div>

      {/* Export Button - Removed as requested */}
      <div className="fixed top-6 right-6 z-50 flex gap-4 print:hidden">
        {/* Buttons removed */}
      </div>

      {/* Slides Container */}
      <div 
        ref={containerRef}
        className="flex flex-col items-center"
        style={{ 
          gap: 0,
          paddingBottom: '2vh'
        }}
      >
        {/* Cover Slide Wrapper */}
        <div style={{ height: `${1080 * scale}px`, width: `${1920 * scale}px` }} className="relative overflow-hidden">
          <section 
            className="portfolio-slide w-[1920px] h-[1080px] absolute top-0 left-0 flex items-center justify-between px-[100px] bg-[#0a192f] overflow-hidden"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            {/* Enhanced Tech Gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35)_0%,transparent_70%)] blur-[120px] animate-pulse" />
              <div className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_70%)] blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[320px] text-white/[0.03] whitespace-nowrap select-none tracking-widest">
                STRATEGY
              </div>
            </div>

            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-cyan-400 text-2xl tracking-[12px] uppercase font-light mb-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              >
                Senior Product Manager
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[140px] font-black leading-[0.8] mb-10 tracking-tighter bg-gradient-to-br from-white via-slate-200 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl"
              >
                JEFF<br />YANG
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-2xl text-slate-400 max-w-[550px] leading-relaxed border-l-4 border-cyan-500 pl-10 py-2"
              >
                Crafting Exceptional Digital Experiences through Data-Driven Strategy and Innovative Design Thinking.
              </motion.div>
            </div>

            {/* 3D Mobile Phones Section */}
            <div className="relative w-[700px] h-[800px] z-10 perspective-[2000px]">
              {/* Phone 1: Front Angle */}
              <motion.div 
                initial={{ opacity: 0, rotateY: -30, rotateX: 10, x: 100 }}
                animate={{ opacity: 1, rotateY: -20, rotateX: 5, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-[70%] -translate-y-1/2 w-[380px] h-[780px] bg-slate-900 rounded-[60px] shadow-[50px_50px_100px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.2)] border-[12px] border-slate-800 overflow-hidden z-20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover opacity-90"
                  alt="Phone Front"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* Phone 2: Back Angle (Futuristic High-Tech Concept) */}
              <motion.div 
                initial={{ opacity: 0, rotateY: 40, rotateX: -10, x: -100 }}
                animate={{ opacity: 1, rotateY: 155, rotateX: -5, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[45%] w-[400px] h-[820px] bg-slate-950 rounded-[65px] shadow-[40px_40px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(34,211,238,0.3)] border-[14px] border-slate-800 overflow-hidden z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Internal Tech Pattern (Circuit Board Look) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
                  <div className="absolute top-1/4 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute top-3/4 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-1/4 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-3/4 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Glowing Edge Strips */}
                <div className="absolute top-0 left-0 w-full h-2 bg-cyan-500/40 blur-[2px]" />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-500/40 blur-[2px]" />
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500/40 blur-[2px]" />
                <div className="absolute top-0 right-0 w-2 h-full bg-cyan-500/40 blur-[2px]" />

                {/* Futuristic Camera Module - Large Central Lens */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-slate-900/80 backdrop-blur-xl rounded-full shadow-2xl border border-cyan-500/30 flex items-center justify-center z-20">
                  <div className="w-48 h-48 rounded-full bg-black border-[10px] border-slate-800 shadow-inner relative overflow-hidden flex items-center justify-center">
                    {/* Glowing Lens Core */}
                    <div className="w-32 h-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.4)_0%,transparent_70%)] animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20" />
                    <div className="w-12 h-12 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                  </div>
                  
                  {/* Orbital Sensors */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                </div>

                {/* Holographic Data Overlays */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full px-12 space-y-6 z-20">
                  <div className="flex items-center justify-between text-cyan-400/60 font-mono text-xs tracking-widest uppercase">
                    <span>System Status</span>
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]"
                    />
                  </div>
                  <div className="flex justify-around pt-4">
                    <Cpu className="w-8 h-8 text-cyan-400/40" />
                    <Zap className="w-8 h-8 text-cyan-400/40" />
                    <Compass className="w-8 h-8 text-cyan-400/40" />
                  </div>
                </div>

                {/* Central Logo Placeholder (Glowing) */}
                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 z-10">
                   <div className="w-full h-full bg-cyan-500 rounded-full blur-[40px] animate-pulse" />
                </div>
                
                {/* Glossy Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 pointer-events-none z-30" />
              </motion.div>

              {/* Decorative Glow behind phones */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
            </div>
          </section>
        </div>

        {/* Project Slides */}
        {projects.map((project, index) => (
          <div key={project.id} style={{ height: `${1080 * scale}px`, width: `${1920 * scale}px` }} className="relative overflow-hidden">
            <section 
              className="portfolio-slide w-[1920px] h-[1080px] absolute top-0 left-0 flex flex-col p-[60px_100px] bg-[#0a192f] relative overflow-hidden"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.25)_0%,transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.2)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.04]" />
              </div>

              {/* Page Number */}
              <div className="absolute bottom-12 right-12 text-3xl text-slate-600 font-mono z-10 tracking-widest font-bold">
                {String(index + 2).padStart(2, '0')}
              </div>

              <header className="flex justify-between items-end mb-8 relative z-10">
                <div className="flex flex-col">
                  <div className="text-cyan-400 text-lg tracking-[8px] font-bold uppercase mb-3 opacity-100 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    {project.platform} • {project.category}
                  </div>
                  <h2 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-50 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                    {project.title}
                  </h2>
                </div>
              </header>

              <div className={`grid gap-12 flex-grow relative z-10 ${project.layout === 'images-left-text-right' ? 'grid-cols-[1fr_480px]' : 'grid-cols-[480px_1fr]'}`}>
                {project.layout === 'images-left-text-right' ? (
                  <>
                    <div className="flex gap-8 items-center justify-center h-full">
                      {project.images.map((img, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="h-[720px] w-[340px] bg-slate-950 rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[5px] border-white/10 ring-2 ring-cyan-500/30"
                        >
                          <img src={img} className="w-full h-full object-cover" crossOrigin="anonymous" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-6 mb-12">
                        {project.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-xl text-slate-200 font-light leading-snug">
                            <div className="w-7 h-7 rounded bg-cyan-500/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {project.milestone && (
                        <div className="mt-auto p-7 bg-gradient-to-br from-white/15 to-transparent rounded-[30px] border-2 border-white/20 backdrop-blur-xl shadow-2xl">
                          <div className="text-xl font-bold text-cyan-400 leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            {project.milestone}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : project.layout === 'laptop' ? (
                  <>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-6 mb-12">
                        {project.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-xl text-slate-200 font-light leading-snug">
                            <div className="w-7 h-7 rounded bg-cyan-500/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {project.milestone && (
                        <div className="mt-auto p-7 bg-gradient-to-br from-white/15 to-transparent rounded-[30px] border-2 border-white/20 backdrop-blur-xl shadow-2xl">
                          <div className="text-xl font-bold text-cyan-400 leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            {project.milestone}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative bg-slate-950 p-10 rounded-[50px] shadow-[0_40px_80px_rgba(0,0,0,0.9)] border-[5px] border-white/10 ring-2 ring-cyan-500/30 w-full max-w-[1000px]"
                      >
                        <img src={project.images[0]} className="w-full rounded-xl" crossOrigin="anonymous" />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-2 bg-slate-800 rounded-full shadow-inner" />
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-6 mb-12">
                        {project.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-xl text-slate-200 font-light leading-snug">
                            <div className="w-7 h-7 rounded bg-cyan-500/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {project.milestone && (
                        <div className="mt-auto p-7 bg-gradient-to-br from-white/15 to-transparent rounded-[30px] border-2 border-white/20 backdrop-blur-xl shadow-2xl">
                          <div className="text-xl font-bold text-cyan-400 leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            {project.milestone}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-8 items-center justify-center h-full">
                      {project.images.map((img, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -10, scale: 1.02 }}
                          className={`bg-slate-950 rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[5px] border-white/10 ring-2 ring-cyan-500/30 ${project.imageType === 'portrait' ? 'h-[720px] w-[340px]' : 'w-full aspect-video'}`}
                        >
                          <img src={img} className="w-full h-full object-cover" crossOrigin="anonymous" />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        ))}
      </div>

      {/* Preview Overlay */}
      <div className="fixed bottom-6 left-6 z-50 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-500 print:hidden">
        Fixed Layout Presentation • Scaled to {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
