import { Badge } from "@/components/ui/badge";
import { useIntl } from "react-intl";
import {
  IconBriefcase,
  IconSchool,
  IconCode,
  IconStar,
  IconRocket,
  IconBolt,
  IconCoffee,
  IconMoon,
} from "@tabler/icons-react";

const badges = [
  {
    id: "badge.open_to_work",
    icon: IconBriefcase,
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  {
    id: "badge.undergraduate",
    icon: IconSchool,
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: "badge.full_stack",
    icon: IconCode,
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    id: "badge.open_source",
    icon: IconStar,
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  },
  {
    id: "badge.indie_hacker",
    icon: IconRocket,
    className: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  },
  {
    id: "badge.fast_learner",
    icon: IconBolt,
    className:
      "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    id: "badge.coffee_driven",
    icon: IconCoffee,
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    id: "badge.night_coder",
    icon: IconMoon,
    className:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  },
];

export default function BadgeBar() {
  const intl = useIntl();

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const Icon = badge.icon;

        return (
          <Badge key={badge.id} className={`${badge.className}`}>
            <Icon />
            {intl.formatMessage({ id: badge.id })}
          </Badge>
        );
      })}
    </div>
  );
}
