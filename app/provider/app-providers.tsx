import type { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "@/locales/en";
import zhMessages from "@/locales/zh";
import { DividerStyleProvider } from "@/provider/divider-style-provider";
import {
  LanguageProvider,
  type Language,
  useLanguage,
} from "@/provider/language-provider";
import { ThemeProvider } from "@/provider/theme-provider";

const messages: Record<Language, Record<string, string>> = {
  "en-US": enMessages,
  "zh-CN": zhMessages,
};

function IntlMessagesProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DividerStyleProvider>
          <IntlMessagesProvider>{children}</IntlMessagesProvider>
        </DividerStyleProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
