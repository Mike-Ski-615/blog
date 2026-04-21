import { Button } from "@/components/ui/button";
import { IconMail } from "@tabler/icons-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { siteConfig } from "@/site/config";

export default function SendEmail() {
  const { ui } = useSiteContent();
  const email = siteConfig.resume.email.trim();

  if (!email) {
    return null;
  }

  return (
    <Button size="sm" variant="outline" className="" asChild>
      <a href={`mailto:${email}`}>
        <IconMail data-icon="inline-start" />
        {ui.actions.sendEmail}
      </a>
    </Button>
  );
}
