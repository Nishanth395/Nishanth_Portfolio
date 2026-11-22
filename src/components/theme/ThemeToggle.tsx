"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "darkroom";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center hairline-border hover:bg-surface text-ink-primary transition-colors"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
