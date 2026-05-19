"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DrawingCanvas() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDarkMode = currentTheme === 'dark';

  return (
    <div className="absolute inset-0 z-0 isolate">
      <Tldraw 
        inferDarkMode={isDarkMode}
      />
    </div>
  );
}
