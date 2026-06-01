"use client";

import { useState } from "react";
import SplitScreen from "@/components/SplitScreen";
import LandingHero from "@/components/LandingHero";


export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      {/* Landing Hero — hidden after start, but kept mounted */}
      <div className={hasStarted ? "hidden" : ""}>
        <LandingHero onStart={() => setHasStarted(true)} />
      </div>

      {/* Main App — always mounted so DrawingCanvas never resets */}
      <main className={`min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500 font-sans ${!hasStarted ? "hidden" : ""}`}>
        {/* Variant 3: Solid White (Opaque) - Text forced dark */}
        <header className="sticky top-0 h-16 bg-white/95 dark:bg-white/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-300 flex items-center justify-between px-6 shrink-0 z-[9999] shadow-sm transition-all duration-500">
          <button 
            onClick={() => setHasStarted(false)}
            className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition-opacity group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm italic overflow-hidden shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -ml-4 w-1/2" />
              M
            </div>
            <span className="tracking-tight text-gray-900">MathQuiz <span className="text-blue-600">AI</span></span>
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setHasStarted(false)}
              className="px-4 py-1.5 text-sm font-medium rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-300"
            >
              หน้าแรก
            </button>
          </div>
        </header>
        <div className="flex-1 relative">
          <SplitScreen />
        </div>
      </main>
    </>
  );
}
