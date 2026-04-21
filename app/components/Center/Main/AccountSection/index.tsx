import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { siteConfig } from "@/site/config";
import type { SocialLinkConfig } from "@/types";

function SocialHoverCardItem({ social }: { social: SocialLinkConfig }) {
  const initials = social.profile.name.trim().slice(0, 1).toUpperCase();

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
        className="w-72 bg-popover p-3 ring-1 ring-border/60"
      >
        <div className="flex items-start gap-3">
          <div className=" flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            {initials}
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <p className=" truncate font-semibold leading-none">
              {social.profile.name}
            </p>
            <p className=" truncate text-xs text-muted-foreground">
              {social.profile.subtitle}
            </p>
            {social.profile.description ? (
              <p className="text-xs leading-relaxed text-foreground/90">
                {social.profile.description}
              </p>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function AccountSection() {
  const { ui } = useSiteContent();
  const socialLinks = siteConfig.contact.socials.filter((social) =>
    social.href.trim(),
  );

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p>
        {ui.actions.accountPrefix}{" "}
        <span className="font-semibold">{ui.actions.accountHighlight}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((social) => (
          <SocialHoverCardItem key={social.label} social={social} />
        ))}
      </div>
    </div>
  );
}
