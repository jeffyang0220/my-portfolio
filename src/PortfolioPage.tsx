/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Compass, 
  Cpu, 
  Zap, 
  Activity, 
  Trophy, 
  Sparkles,
  Smartphone,
  Layers,
  Mail,
  Phone,
  Download,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Project {
  title: string;
  type: string;
  features: string[];
  milestone: string;
  isLandscape: boolean;
  images: string[];
}

interface PortfolioPageProps {
  projects: Project[];
  onBack: () => void;
}

export default function PortfolioPage({ projects, onBack }: PortfolioPageProps) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const exportToPDF = async () => {
    if (!containerRef.current) return;
    
    const pdf = new jsPDF('l', 'px', [1920, 1080]);
    const slides = containerRef.current.querySelectorAll('.portfolio-slide');
    
    for (let i = 0; i < slides.length; i++) {
      const canvas = await html2canvas(slides[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a192f'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      if (i > 0) pdf.addPage([1920, 1080], 'l');
      pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
    }
    
    pdf.save('Jeff_Yang_Portfolio.pdf');
  };

  const exportToImages = async () => {
    if (!containerRef.current) return;
    
    const slides = containerRef.current.querySelectorAll('.portfolio-slide');
    
    for (let i = 0; i < slides.length; i++) {
      const canvas = await html2canvas(slides[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a192f'
      });
      
      const link = document.createElement('a');
      link.download = `Jeff_Yang_Portfolio_Page_${i + 1}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-50 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-6 z-[300] flex items-center gap-3 px-6 py-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500/20 transition-all group shadow-2xl print:hidden"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium tracking-wide">返回首頁</span>
      </motion.button>

      {/* Export Buttons - Hidden by default as per snippet style, but functional if needed */}
      <div className="fixed top-6 right-6 z-[300] flex gap-4 print:hidden opacity-0 hover:opacity-100 transition-opacity">
        <motion.button
          onClick={exportToImages}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-cyan-500/20 transition-all"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">匯出圖片</span>
        </motion.button>
        <motion.button
          onClick={exportToPDF}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 border border-cyan-400/50 rounded-full text-white hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium">匯出 PDF</span>
        </motion.button>
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
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* Phone 2: Back Angle */}
              <motion.div 
                initial={{ opacity: 0, rotateY: 40, rotateX: -10, x: -100 }}
                animate={{ opacity: 1, rotateY: 155, rotateX: -5, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[45%] w-[400px] h-[820px] bg-slate-950 rounded-[65px] shadow-[40px_40px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(34,211,238,0.3)] border-[14px] border-slate-800 overflow-hidden z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
                  <div className="absolute top-1/4 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute top-3/4 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-1/4 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="absolute left-3/4 top-0 w-[1px] h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>

                <div className="absolute top-0 left-0 w-full h-2 bg-cyan-500/40 blur-[2px]" />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-500/40 blur-[2px]" />
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500/40 blur-[2px]" />
                <div className="absolute top-0 right-0 w-2 h-full bg-cyan-500/40 blur-[2px]" />

                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-slate-900/80 backdrop-blur-xl rounded-full shadow-2xl border border-cyan-500/30 flex items-center justify-center z-20">
                  <div className="w-48 h-48 rounded-full bg-black border-[10px] border-slate-800 shadow-inner relative overflow-hidden flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.4)_0%,transparent_70%)] animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20" />
                    <div className="w-12 h-12 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                  </div>
                  
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                </div>

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

                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 z-10">
                   <div className="w-full h-full bg-cyan-500 rounded-full blur-[40px] animate-pulse" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 pointer-events-none z-30" />
              </motion.div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
            </div>
          </section>
        </div>

        {/* Project Slides */}
        {projects.map((project, index) => (
          <div key={project.title} style={{ height: `${1080 * scale}px`, width: `${1920 * scale}px` }} className="relative overflow-hidden">
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
                    {project.type}
                  </div>
                  <h2 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-50 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                    {project.title}
                  </h2>
                </div>
              </header>

              <div className={cn(
                "grid gap-12 flex-grow relative z-10",
                index % 2 === 0 ? "grid-cols-[1fr_480px]" : "grid-cols-[480px_1fr]"
              )}>
                {index % 2 === 0 ? (
                  <>
                    <div className="flex gap-8 items-center justify-center h-full">
                      {project.images.map((img, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -10, scale: 1.02 }}
                          className={cn(
                            "bg-slate-950 rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[5px] border-white/10 ring-2 ring-cyan-500/30",
                            project.isLandscape ? "w-full aspect-video" : "h-[720px] w-[340px]"
                          )}
                        >
                          <img 
                            src={img} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = project.isLandscape 
                                ? `https://picsum.photos/seed/${project.title}-${i}/1200/675`
                                : `https://picsum.photos/seed/${project.title}-${i}/600/800`;
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-6 mb-12">
                        {project.features.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-3xl text-slate-200 font-light leading-snug">
                            <div className="w-9 h-9 rounded bg-cyan-500/30 flex items-center justify-center shrink-0 mt-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
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
                ) : (
                  <>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-6 mb-12">
                        {project.features.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-3xl text-slate-200 font-light leading-snug">
                            <div className="w-9 h-9 rounded bg-cyan-500/30 flex items-center justify-center shrink-0 mt-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                              <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
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
                          className={cn(
                            "bg-slate-950 rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-[5px] border-white/10 ring-2 ring-cyan-500/30",
                            project.isLandscape ? "w-full aspect-video" : "h-[720px] w-[340px]"
                          )}
                        >
                          <img 
                            src={img} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = project.isLandscape 
                                ? `https://picsum.photos/seed/${project.title}-${i}/1200/675`
                                : `https://picsum.photos/seed/${project.title}-${i}/600/800`;
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        ))}

        {/* Contact Slide */}
        <div style={{ height: `${1080 * scale}px`, width: `${1920 * scale}px` }} className="relative overflow-hidden">
          <section 
            className="portfolio-slide w-[1920px] h-[1080px] absolute top-0 left-0 flex flex-col items-center justify-center bg-[#0a192f] overflow-hidden"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
              <div className="grid grid-cols-12 h-full w-full opacity-10">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border-[0.5px] border-cyan-500/20" />
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center"
            >
              <h2 className="text-8xl font-black mb-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                期待與您合作
              </h2>
              <p className="text-3xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
                如果您對我的作品感興趣，或有任何專案想進一步討論，歡迎隨時與我聯繫。
              </p>
              
              <div className="flex gap-12 justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                    <Mail className="w-10 h-10 text-cyan-400" />
                  </div>
                  <span className="text-xl text-slate-300">jeff760220@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Preview Overlay */}
      <div className="fixed bottom-6 left-6 z-50 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-500 print:hidden">
        Fixed Layout Presentation • Scaled to {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
