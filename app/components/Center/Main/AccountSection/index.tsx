import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useIntl } from "react-intl";

type HoverSide = "left" | "top" | "bottom" | "right";

type SocialLink = {
  label: string;
  href: string;
  side: HoverSide;
  profile: {
    nameId: string;
    emailId: string;
    signatureId?: string;
  };
  theme: {
    cardClassName: string;
    avatarClassName: string;
  };
};

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/",
    side: "left",
    profile: {
      nameId: "accountSection.github.name",
      emailId: "accountSection.github.email",
      signatureId: "accountSection.github.signature",
    },
    theme: {
      cardClassName:
        "from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800",
      avatarClassName:
        "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900",
    },
  },
  {
    label: "Rednote",
    href: "https://www.xiaohongshu.com/",
    side: "bottom",
    profile: {
      nameId: "accountSection.rednote.name",
      emailId: "accountSection.rednote.email",
      signatureId: "accountSection.rednote.signature",
    },
    theme: {
      cardClassName:
        "from-rose-100 via-pink-50 to-rose-50 dark:from-rose-950/50 dark:via-rose-950/20 dark:to-zinc-900",
      avatarClassName:
        "bg-rose-600 text-white dark:bg-rose-400 dark:text-rose-950",
    },
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/",
    side: "bottom",
    profile: {
      nameId: "accountSection.tiktok.name",
      emailId: "accountSection.tiktok.email",
      signatureId: "accountSection.tiktok.signature",
    },
    theme: {
      cardClassName:
        "from-cyan-100 via-emerald-50 to-cyan-50 dark:from-cyan-950/40 dark:via-zinc-900 dark:to-emerald-950/20",
      avatarClassName:
        "bg-cyan-700 text-cyan-50 dark:bg-cyan-400 dark:text-cyan-950",
    },
  },
  {
    label: "Discord",
    href: "https://discord.com/",
    side: "bottom",
    profile: {
      nameId: "accountSection.discord.name",
      emailId: "accountSection.discord.email",
    },
    theme: {
      cardClassName:
        "from-indigo-100 via-blue-50 to-indigo-50 dark:from-indigo-950/60 dark:via-zinc-900 dark:to-blue-950/30",
      avatarClassName:
        "bg-indigo-700 text-indigo-50 dark:bg-indigo-300 dark:text-indigo-950",
    },
  },
];

function SocialHoverCardItem({ social }: { social: SocialLink }) {
  const intl = useIntl();
  const name = intl.formatMessage({ id: social.profile.nameId });
  const email = intl.formatMessage({ id: social.profile.emailId });
  const signature = social.profile.signatureId
    ? intl.formatMessage({ id: social.profile.signatureId })
    : null;
  const initials = name.slice(0, 1).toUpperCase();

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="secondary" size="xs" asChild>
          <a href={social.href} target="_blank" rel="noreferrer">
            {social.label}
          </a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        side={social.side}
        className={cn(
          "w-72 bg-linear-to-br p-3 ring-1 ring-border/60",
          social.theme.cardClassName,
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm",
              social.theme.avatarClassName,
            )}
          >
            {initials}
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate font-semibold leading-none">
              {name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {email}
            </p>
            {signature ? (
              <p className="text-xs leading-relaxed text-foreground/90">
                {signature}
              </p>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function AccountSection() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-2">
      <p>
        {intl.formatMessage({ id: "accountSection.prefix" })}{" "}
        <span className="font-semibold">
          {intl.formatMessage({ id: "accountSection.socials" })}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((social) => (
          <SocialHoverCardItem key={social.label} social={social} />
        ))}
      </div>
    </div>
  );
}
