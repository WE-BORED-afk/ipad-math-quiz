"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-14 h-8" />;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative flex items-center p-1 w-14 h-7 rounded-full border transition-all duration-300 group ${isDark ? 'border-cyan-500/50 bg-blue-900/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'border-gray-300 bg-gray-100 shadow-inner'}`}
        aria-label="Toggle theme"
      >
        {/* Sliding Circle */}
        <div 
          className={`absolute w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${isDark ? 'translate-x-7 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'translate-x-0 bg-white'}`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-white" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </div>
        
        {/* Background Icons */}
        <div className="flex justify-between w-full px-1.5 opacity-50 transition-opacity">
          <Sun className="w-3 h-3 text-amber-500" />
          <Moon className="w-3 h-3 text-cyan-400" />
        </div>
      </button>
    </div>
  );
}
