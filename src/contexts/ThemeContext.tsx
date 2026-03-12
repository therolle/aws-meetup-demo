import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Type definitions
type Theme = "light" | "dark";
type ThemePreference = Theme | null;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Safe localStorage operations with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("localStorage.getItem failed:", error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("localStorage.setItem failed:", error);
    }
  },
};

// Helper functions for theme management
const getStoredTheme = (): ThemePreference => {
  const stored = safeLocalStorage.getItem("theme-preference");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return null;
};

const setStoredTheme = (theme: Theme): void => {
  safeLocalStorage.setItem("theme-preference", theme);
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// ThemeProvider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme: stored preference → system theme → default to light
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = getStoredTheme();
    if (stored) {
      return stored;
    }
    return getSystemTheme();
  });

  // Apply theme class to document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Listen for system theme changes (only when no user preference exists)
  useEffect(() => {
    // Check if matchMedia is supported
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if no stored preference exists
      const storedPreference = getStoredTheme();
      if (!storedPreference) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      setStoredTheme(newTheme);
      return newTheme;
    });
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook for consuming theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
