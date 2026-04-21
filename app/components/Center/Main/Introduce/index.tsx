import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import BadgeBar from "@/components/Center/Main/BadgeBar";
import Reserve from "@/components/Center/Main/Reserve";
import { useSiteContent } from "@/hooks/useSiteContent";
import SendEmail from "../SendEmail";
import AccountSection from "../AccountSection";
import { siteConfig } from "@/site/config";

export default function Introduce() {
  const {
    home: { about },
  } = useSiteContent();
  const hasContactActions = Boolean(
    siteConfig.contact.bookingUrl?.trim() || siteConfig.resume.email.trim(),
  );

  return (
    <div className="flex flex-col items-start gap-2 p-4">
      <p className="text-sm leading-7 text-foreground/90">{about.greeting}</p>

      <p className="text-sm leading-7 text-foreground/90">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="link" className="h-5 p-0 m-0 text-sm">
              {about.school.name}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-1 rounded-2xl border border-border/70 bg-popover/95 p-4 backdrop-blur-sm">
            <div className=" font-semibold">{about.school.name}</div>
            <div className="text-sm">{about.school.major}</div>
            <div className=" text-xs text-muted-foreground">
              {about.school.majorEnglish}
            </div>
          </HoverCardContent>
        </HoverCard>
        {about.status}
      </p>
      {hasContactActions ? (
        <div className="mt-1 flex flex-wrap gap-2.5">
          <Reserve />
          <SendEmail />
        </div>
      ) : null}
      <AccountSection />
      <BadgeBar />
    </div>
  );
}
