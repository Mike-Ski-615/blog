import { createContext, useContext, useEffect, useState } from "react";

export type DividerStyle =
  | "double-solid"
  | "single-dashed"
  | "soft-fade"
  | "dot-chain";

type DividerStyleProviderProps = {
  children: React.ReactNode;
  defaultStyle?: DividerStyle;
  storageKey?: string;
};

type DividerStyleProviderState = {
  dividerStyle: DividerStyle;
  setDividerStyle: (style: DividerStyle) => void;
};

const initialState: DividerStyleProviderState = {
  dividerStyle: "double-solid",
  setDividerStyle: () => null,
};

const DividerStyleProviderContext =
  createContext<DividerStyleProviderState>(initialState);

const DIVIDER_STYLE_VALUES: DividerStyle[] = [
  "double-solid",
  "single-dashed",
  "soft-fade",
  "dot-chain",
];

const isBrowser = () => typeof window !== "undefined";

const getStoredDividerStyle = (
  storageKey: string,
  fallback: DividerStyle,
): DividerStyle => {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const storedStyle = window.localStorage.getItem(storageKey);
    if (
      storedStyle &&
      DIVIDER_STYLE_VALUES.includes(storedStyle as DividerStyle)
    ) {
      return storedStyle as DividerStyle;
    }
  } catch {
    // Ignore storage access failures (private mode, disabled storage, SSR).
  }

  return fallback;
};

export function DividerStyleProvider({
  children,
  defaultStyle = "double-solid",
  storageKey = "site-divider-style",
}: DividerStyleProviderProps) {
  const [dividerStyle, setDividerStyleState] =
    useState<DividerStyle>(defaultStyle);

  useEffect(() => {
    setDividerStyleState(getStoredDividerStyle(storageKey, defaultStyle));
  }, [defaultStyle, storageKey]);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const root = window.document.documentElement;
    root.dataset.dividerStyle = dividerStyle;
  }, [dividerStyle]);

  return (
    <DividerStyleProviderContext.Provider
      value={{
        dividerStyle,
        setDividerStyle: (style) => {
          if (isBrowser()) {
            try {
              window.localStorage.setItem(storageKey, style);
            } catch {
              // Ignore storage write failures and still update in-memory state.
            }
          }
          setDividerStyleState(style);
        },
      }}
    >
      {children}
    </DividerStyleProviderContext.Provider>
  );
}

export const useDividerStyle = () => {
  const context = useContext(DividerStyleProviderContext);

  if (context === undefined) {
    throw new Error(
      "useDividerStyle must be used within a DividerStyleProvider",
    );
  }

  return context;
};
