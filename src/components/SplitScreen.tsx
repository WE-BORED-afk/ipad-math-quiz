"use client";

import QuizEngine from "./QuizEngine";
import DrawingCanvas from "./DrawingCanvas";

export default function SplitScreen() {
  return (
    <div className="flex w-full flex-col lg:flex-row">
      {/* Left Pane: Quiz Engine */}
      <div className="w-full lg:w-[45%] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-colors duration-300">
        {/* No fixed height or overflow-auto here to let body handle scrolling */}
        <QuizEngine />
      </div>

      {/* Right Pane: Drawing Canvas - sticky so it stays visible while scrolling */}
      <div className="w-full lg:w-[55%] h-[600px] lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 relative bg-[#f8f9fa] dark:bg-black transition-colors duration-300 flex-shrink-0">
        <DrawingCanvas />
      </div>
    </div>
  );
}
