"use client";

import QuizEngine from "./QuizEngine";
import DrawingCanvas from "./DrawingCanvas";

export default function SplitScreen() {
  return (
    // Fixed-height container = viewport minus header
    // Left scrolls internally, right stays fixed
    <div className="flex w-full flex-col lg:flex-row lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      {/* Left Pane: scrollable */}
      <div className="w-full lg:w-[45%] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-colors duration-300 lg:overflow-y-auto">
        <QuizEngine />
      </div>

      {/* Right Pane: fixed height, canvas fills it */}
      <div className="w-full lg:w-[55%] h-[600px] lg:h-full relative bg-[#f8f9fa] dark:bg-black transition-colors duration-300 flex-shrink-0">
        <DrawingCanvas />
      </div>
    </div>
  );
}
