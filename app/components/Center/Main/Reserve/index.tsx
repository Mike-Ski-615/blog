import { Button } from "@/components/ui/button";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { siteConfig } from "@/site/config";

export default function Reserve() {
  const { ui } = useSiteContent();
  const bookingUrl = siteConfig.contact.bookingUrl?.trim();

  if (!bookingUrl) {
    return null;
  }

  return (
    <Button variant="default" size="sm" className="" asChild>
      <a href={bookingUrl} target="_blank" rel="noreferrer">
        <IconCalendarWeek data-icon="inline-start" />
        {ui.actions.reserve}
      </a>
    </Button>
  );
}
