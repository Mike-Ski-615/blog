import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useIntl } from "react-intl";
import BadgeBar from "@/components/Center/Main/BadgeBar";
import Reserve from "@/components/Center/Main/Reserve";
import SendEmail from "../SendEmail";
import AccountSection from "../AccountSection";

export default function Introduce() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-start p-4 gap-3 h-auto">
      <p className="text-sm">
        {intl.formatMessage({ id: "introduce.greeting" })}
      </p>

      <p className="text-sm">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-5">
              {intl.formatMessage({ id: "introduce.school" })}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-1">
            <div className="font-semibold">
              {intl.formatMessage({ id: "introduce.school" })}
            </div>
            <div>{intl.formatMessage({ id: "introduce.major" })}</div>
            <div className="text-xs text-muted-foreground">
              {intl.formatMessage({ id: "introduce.major_en" })}
            </div>
          </HoverCardContent>
        </HoverCard>
        {intl.formatMessage({ id: "introduce.status" })}
      </p>
      <div className="flex gap-2">
        <Reserve />
        <SendEmail />
      </div>
      <AccountSection />
      <BadgeBar />
    </div>
  );
}
