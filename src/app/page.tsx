"use client";

import { useState } from "react";
import SplitScreen from "@/components/SplitScreen";
import LandingHero from "@/components/LandingHero";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return <LandingHero onStart={() => setHasStarted(true)} />;
  }

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500 font-sans">
      <header className="sticky top-0 h-16 bg-white/60 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-blue-900/30 flex items-center justify-between px-6 shrink-0 z-[9999] transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(59,130,246,0.05)]">
        <button 
          onClick={() => setHasStarted(false)}
          className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition-opacity group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-cyan-600 text-white text-sm italic overflow-hidden shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/20 group-hover:shadow-blue-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -ml-4 w-1/2" />
            M
          </div>
          <span className="tracking-tight text-gray-900 dark:text-gray-100">MathQuiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500">AI</span></span>
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setHasStarted(false)}
            className="px-4 py-1.5 text-sm font-medium rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            หน้าแรก
          </button>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-800" />
          <ThemeToggle />
        </div>
      </header>
      <div className="flex-1 relative">
        <SplitScreen />
      </div>
    </main>
  );
}
