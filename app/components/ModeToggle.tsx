import {
  IconDots,
  IconLanguage,
  IconLineDashed,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { useIntl } from "react-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type DividerStyle,
  useDividerStyle,
} from "@/provider/divider-style-provider";
import { useLanguage } from "@/provider/language-provider";
import { useTheme } from "@/provider/theme-provider";

const dividerStyles: DividerStyle[] = [
  "double-solid",
  "single-dashed",
  "soft-fade",
  "dot-chain",
];

export function ModeToggle() {
  const intl = useIntl();
  const { theme, setTheme } = useTheme();
  const { dividerStyle, setDividerStyle } = useDividerStyle();
  const { locale, setLocale } = useLanguage();

  const onThemeChange = (value: string) => {
    if (value === "light" || value === "dark" || value === "system") {
      setTheme(value);
    }
  };

  const onLocaleChange = (value: string) => {
    if (value === "en-US" || value === "zh-CN") {
      setLocale(value);
    }
  };

  const onDividerStyleChange = (value: string) => {
    if (dividerStyles.includes(value as DividerStyle)) {
      setDividerStyle(value as DividerStyle);
    }
  };

  const cycleDividerStyle = () => {
    const currentIndex = dividerStyles.indexOf(dividerStyle);
    const nextStyle = dividerStyles[(currentIndex + 1) % dividerStyles.length];
    setDividerStyle(nextStyle);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={intl.formatMessage({ id: "settings.button.aria" })}
        >
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          {intl.formatMessage({ id: "settings.menu.label" })}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          {intl.formatMessage({ id: "settings.menu.theme" })}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={onThemeChange}>
          <DropdownMenuRadioItem value="light">
            <IconSun />
            {intl.formatMessage({ id: "settings.theme.light" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <IconMoon />
            {intl.formatMessage({ id: "settings.theme.dark" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <IconSettings />
            {intl.formatMessage({ id: "settings.theme.system" })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          {intl.formatMessage({ id: "settings.menu.divider" })}
        </DropdownMenuLabel>
        <DropdownMenuItem onSelect={cycleDividerStyle}>
          <IconLineDashed />
          {intl.formatMessage({ id: "settings.divider.cycle" })}
          <DropdownMenuShortcut>
            {intl.formatMessage({ id: `settings.divider.${dividerStyle}` })}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconSettings />
            {intl.formatMessage({ id: "settings.divider.presets" })}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-52">
            <DropdownMenuRadioGroup
              value={dividerStyle}
              onValueChange={onDividerStyleChange}
            >
              <DropdownMenuRadioItem value="double-solid">
                <IconSettings />
                {intl.formatMessage({ id: "settings.divider.double-solid" })}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="single-dashed">
                <IconSettings />
                {intl.formatMessage({ id: "settings.divider.single-dashed" })}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="soft-fade">
                <IconSettings />
                {intl.formatMessage({ id: "settings.divider.soft-fade" })}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dot-chain">
                <IconSettings />
                {intl.formatMessage({ id: "settings.divider.dot-chain" })}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          {intl.formatMessage({ id: "settings.menu.language" })}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale} onValueChange={onLocaleChange}>
          <DropdownMenuRadioItem value="en-US">
            <IconLanguage />
            {intl.formatMessage({ id: "settings.language.en" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="zh-CN">
            <IconLanguage />
            {intl.formatMessage({ id: "settings.language.zh" })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
