import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const THEME_VALUES: Theme[] = ["dark", "light", "system"];

const isBrowser = () => typeof window !== "undefined";

const getStoredTheme = (storageKey: string, fallback: Theme): Theme => {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme && THEME_VALUES.includes(storedTheme as Theme)) {
      return storedTheme as Theme;
    }
  } catch {
    // Ignore storage access failures (private mode, disabled storage, SSR).
  }

  return fallback;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => getStoredTheme(storageKey, defaultTheme),
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (isBrowser()) {
        try {
          window.localStorage.setItem(storageKey, theme);
        } catch {
          // Ignore storage write failures and still update in-memory state.
        }
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
