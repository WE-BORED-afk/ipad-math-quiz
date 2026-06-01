"use client";


import { Brain, PencilLine, Zap, Code2, ArrowRight, CheckCircle2 } from "lucide-react";

interface LandingHeroProps {
  onStart: () => void;
}

const features = [
  {
    icon: Brain,
    title: "โจทย์ AI",
    desc: "Gemini 2.5 สร้างโจทย์ใหม่ทุกข้อ ครอบคลุม A-Level และ TGAT",
    stat: "∞",
    statLabel: "โจทย์ไม่ซ้ำ",
    accent: "#3b82f6",
    bg: "bg-blue-500",
  },
  {
    icon: PencilLine,
    title: "Canvas ทดเลข",
    desc: "เขียนลงหน้าจอได้ทันที Apple Pencil รองรับเต็มรูปแบบ",
    stat: "✎",
    statLabel: "Apple Pencil",
    accent: "#06b6d4",
    bg: "bg-cyan-500",
  },
  {
    icon: Code2,
    title: "เฉลยขั้นตอน",
    desc: "Hints ค่อยๆ ไกด์ และอธิบายวิธีทำแบบ step-by-step",
    stat: "3",
    statLabel: "ระดับ hints",
    accent: "#6366f1",
    bg: "bg-indigo-500",
  },
];

const highlights = [
  "A-Level · TGAT · TPAT",
  "Dark & Light mode",
  "ไม่ต้องสมัครสมาชิก",
];

export default function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#f8fafc] dark:bg-[#07070a] text-gray-900 dark:text-gray-100 overflow-hidden font-sans">

      {/* Background grid — subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      {/* Single warm ambient light — top-center, not overpowering */}
      <div className="pointer-events-none absolute top-[-10%] left-[50%] -translate-x-1/2 w-[80%] h-[55%] rounded-full blur-[130px] bg-blue-500/10 dark:bg-blue-500/8" />

      {/* ─── Nav ─── */}
      <nav className="relative z-30 w-full max-w-6xl mx-auto px-8 pt-7 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-600/30">
            M
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            MathQuiz <span className="text-blue-600 dark:text-blue-400">AI</span>
          </span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 pt-24 pb-14">

        {/* Badge */}
        {/* Removed completely */}

        {/* ── H1: serif display + sans weight contrast ── */}
        <h1 className="mb-6 leading-[1.05]" style={{ textWrap: "balance" }}>
          {/* Serif line — the focal point per bolder.md */}
          <span
            className="block text-[clamp(3rem,8vw,5.5rem)] font-normal text-gray-950 dark:text-white tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontStyle: "italic" }}
          >
            ฝึกโจทย์คณิตศาสตร์
          </span>
          {/* Sans line — weight 900, accent color */}
          <span className="block text-[clamp(2rem,5.5vw,3.75rem)] font-black tracking-tight text-blue-600 dark:text-blue-400 mt-1">
            ด้วยพลัง AI
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed mb-4">
          โจทย์ใหม่ทุกครั้ง ครบ A-Level · TGAT<br />พร้อม Canvas ทดเลขและเฉลยขั้นตอน
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mb-10">
          {highlights.map((h) => (
            <span key={h} className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/70" />
              {h}
            </span>
          ))}
        </div>

        {/* CTA — solid, no layers */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-base transition-colors duration-150 shadow-lg shadow-blue-600/20"
        >
          <Zap className="w-4 h-4 fill-current" />
          เริ่มทำโจทย์เลย
          <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform duration-150" />
        </button>
      </div>

      {/* ─── Feature Cards ─── */}
      {/* bolder.md: "stronger hierarchy, clearer weight contrast, more committed density" */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, stat, statLabel, bg }) => (
            <div
              key={title}
              className="group rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-white/[0.03] p-6 flex flex-col gap-5 hover:border-gray-300 dark:hover:border-white/12 transition-colors duration-150 overflow-hidden relative"
            >
              {/* Large muted stat — spatial drama without gimmick */}
              <div className="absolute top-4 right-5 text-[2.5rem] font-black text-gray-100 dark:text-white/6 leading-none select-none tabular-nums">
                {stat}
              </div>

              <div className="relative flex flex-col gap-3">
                {/* Icon pill */}
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>

                <div>
                  {/* Card heading — weight 700 */}
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>

              {/* Stat label — bottom, small mono */}
              <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/6">
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wide">{statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className="relative z-20 mt-auto border-t border-gray-200 dark:border-white/5 py-7 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            MathQuiz <span className="text-blue-600 dark:text-blue-400">AI</span>
          </span>
          <div className="flex gap-6 text-xs font-mono text-gray-400 dark:text-gray-500">
            <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">/about</span>
            <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">/docs</span>
            <span className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">/github</span>
          </div>
          <span className="text-xs font-mono text-gray-400 dark:text-gray-600">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
