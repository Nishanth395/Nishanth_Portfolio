"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono uppercase tracking-wider hairline-border bg-surface hover:bg-canvas text-ink-primary transition-colors focus-visible:outline-2 focus-visible:outline-cobalt shrink-0 ${className}`}
      aria-label={`Switch to ${theme === "broadsheet" ? "Darkroom" : "Broadsheet"} mode`}
    >
      {theme === "broadsheet" ? (
        <>
          <Moon className="w-3.5 h-3.5 text-ink-meta shrink-0" />
          <span className="hidden sm:inline">[DARKROOM]</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-cobalt shrink-0" />
          <span className="hidden sm:inline">[BROADSHEET]</span>
        </>
      )}
    </button>
  );
}
