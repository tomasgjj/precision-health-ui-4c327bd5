import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AppTheme = "ocean" | "midnight" | "light";

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "ocean",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const THEME_KEY = "laudovoz-theme";

const themeClassMap: Record<AppTheme, string> = {
  ocean: "",
  midnight: "theme-midnight",
  light: "theme-light",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(THEME_KEY) as AppTheme) || "ocean";
    }
    return "ocean";
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    Object.values(themeClassMap).forEach((cls) => {
      if (cls) root.classList.remove(cls);
    });
    // Add current
    const cls = themeClassMap[theme];
    if (cls) root.classList.add(cls);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (t: AppTheme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
