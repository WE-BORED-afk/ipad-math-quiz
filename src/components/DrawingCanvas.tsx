"use client";

import { Tldraw, Editor } from "tldraw";
import "tldraw/tldraw.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DrawingCanvas() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync dark mode whenever theme or editor changes
  useEffect(() => {
    if (!editor) return;
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDarkMode = currentTheme === "dark";
    editor.user.updateUserPreferences({ colorScheme: isDarkMode ? "dark" : "light" });
  }, [editor, theme, systemTheme]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 isolate">
      <Tldraw onMount={setEditor} />
    </div>
  );
}
