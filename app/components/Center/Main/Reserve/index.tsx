import { Button } from "@/components/ui/button";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useIntl } from "react-intl";

export default function Reserve() {
  const intl = useIntl();

  return (
    <Button variant="default" size="sm">
      <IconCalendarWeek />
      {intl.formatMessage({ id: "reserve.trigger" })}
    </Button>
  );
}
