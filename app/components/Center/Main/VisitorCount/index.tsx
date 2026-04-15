import { IconEye } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function VisitorCount() {
  return (
    <Badge variant="secondary">
      <IconEye />
      100
    </Badge>
  );
}
