"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, Brain, PencilLine, Zap, Terminal, Code2 } from "lucide-react";

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-background px-6 scroll-smooth font-sans text-foreground overflow-hidden">
      {/* Deep Space / Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 dark:bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[-20%] w-[40%] h-[60%] bg-cyan-400/20 dark:bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Top Navigation */}
      <div className="sticky top-0 w-full p-6 flex justify-between items-center max-w-7xl z-30">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight group cursor-pointer">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-cyan-600 text-white text-sm italic overflow-hidden shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/20 group-hover:shadow-blue-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -ml-4 w-1/2" />
            M
          </div>
          <span className="text-gray-900 dark:text-gray-100">MathQuiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500">AI</span></span>
        </div>
        <ThemeToggle />
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center pt-24 md:pt-32 pb-20 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/50 text-blue-600 dark:text-cyan-400 text-sm font-mono font-medium mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-in slide-in-from-bottom-4 duration-700">
          <Terminal className="w-4 h-4" />
          <span>system.initialize("next_gen_learning")</span>
        </div>
        
        {/* Main Title Container */}
        <div className="relative mb-16 transition-all duration-700 group max-w-[90vw] animate-in zoom-in-95 duration-1000">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white">
              ฝึกทำโจทย์คณิตศาสตร์ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-300 drop-shadow-sm">
                ด้วยพลังแห่ง AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              ประสบการณ์ใหม่ของการเรียนรู้บน iPad <br className="hidden md:block" />
              ระบบโจทย์อัจฉริยะวิเคราะห์จุดอ่อน พร้อม Canvas ทดเลขได้ดั่งใจ
            </p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="relative px-10 py-4 rounded-full font-bold text-lg md:text-xl text-white overflow-hidden group mb-24 transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 transition-all group-hover:scale-110 duration-500" />
          {/* Animated border glow */}
          <div className="absolute inset-[-2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full" />
          
          <span className="relative flex items-center justify-center gap-3">
            <Zap className="w-6 h-6 fill-current" />
            เริ่มทำโจทย์ทันที
          </span>
        </button>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative px-4 z-20">
          {/* Feature 1 */}
          <div className="group relative rounded-3xl bg-white/40 dark:bg-[#0a0a0a]/60 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/80 p-8 transition-all hover:border-blue-400/50 dark:hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/50 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">AI Generated</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                โจทย์คณิตศาสตร์สร้างใหม่ทุกข้อจาก Gemini 2.5 ตรงตามหลักสูตร แม่นยำและหลากหลาย ไม่ซ้ำซาก
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="group relative rounded-3xl bg-white/40 dark:bg-[#0a0a0a]/60 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/80 p-8 transition-all hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 dark:from-indigo-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100/50 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-indigo-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <PencilLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Smart Canvas</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                จดบันทึกและทดเลขได้ทันทีบนหน้าจอ รองรับ Apple Pencil อย่างเต็มรูปแบบ ลื่นไหลไร้รอยต่อ
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-3xl bg-white/40 dark:bg-[#0a0a0a]/60 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/80 p-8 transition-all hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 dark:from-cyan-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100/50 dark:bg-cyan-900/30 flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Instant Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                รู้ผลตรวจทันที พร้อมระบบคำใบ้ (Hints) และคำอธิบายวิธีทำอย่างละเอียดเป็นขั้นเป็นตอน
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal Footer */}
      <footer className="w-full mt-auto py-12 px-6 relative z-20 border-t border-gray-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg opacity-80">
            <span className="text-gray-900 dark:text-gray-100">MathQuiz <span className="text-blue-600 dark:text-cyan-400">AI</span></span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400 font-mono">
            <span className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">/about</span>
            <span className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">/docs</span>
            <span className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">/github</span>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600 text-xs font-mono">
            v1.0.0 • POWERED BY GEMINI
          </div>
        </div>
      </footer>
    </div>
  );
}
