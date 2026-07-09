// ─── ThemeProvider ───────────────────────────────────────────────────────────
// Custom theme provider (replaces next-themes) for React 19 compatibility.
// Uses localStorage + class strategy with "light" | "dark" | "system".
// The initial theme is applied via a beforeInteractive script in layout.tsx
// to prevent FOUC. This component hydrates and takes over from there.
//
// Exports:
//   ThemeProvider (default) — wraps the app
//   useTheme() — hook returning { theme, resolvedTheme, setTheme }
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // On mount: read localStorage + apply
  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem("theme") as Theme | null;
      const initial: Theme = stored || "system";
      setThemeState(initial);

      const resolved = initial === "system" ? getSystemTheme() : initial;
      setResolvedTheme(resolved);
      applyTheme(resolved);
    });
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const r = getSystemTheme();
        setResolvedTheme(r);
        applyTheme(r);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
    const resolved = t === "system" ? getSystemTheme() : t;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
