import { IconEye } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/site/config";

export default function VisitorCount() {
  if (siteConfig.visitorCount === undefined) {
    return null;
  }

  return (
    <Badge variant="secondary">
      <IconEye />
      {siteConfig.visitorCount}
    </Badge>
  );
}
