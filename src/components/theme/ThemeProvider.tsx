"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "broadsheet" | "darkroom";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("darkroom");

  useEffect(() => {
    // Read theme from document attribute (set by head script) or localStorage
    const saved = localStorage.getItem("nb-theme") as ThemeMode | null;
    if (saved === "broadsheet" || saved === "darkroom") {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const initial: ThemeMode = "darkroom";
      setThemeState(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("nb-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  };

  const toggleTheme = () => {
    const next = theme === "broadsheet" ? "darkroom" : "broadsheet";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
