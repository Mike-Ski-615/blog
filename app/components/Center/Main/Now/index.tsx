import { Badge } from "@/components/ui/badge";
import { IconBook2, IconCodeDots, IconTargetArrow } from "@tabler/icons-react";
import { useIntl } from "react-intl";

const nowItems = [
  {
    id: "shipping",
    icon: IconCodeDots,
    titleId: "now.shipping.title",
    descriptionId: "now.shipping.description",
    badgeId: "now.shipping.badge",
  },
  {
    id: "learning",
    icon: IconBook2,
    titleId: "now.learning.title",
    descriptionId: "now.learning.description",
    badgeId: "now.learning.badge",
  },
  {
    id: "direction",
    icon: IconTargetArrow,
    titleId: "now.direction.title",
    descriptionId: "now.direction.description",
    badgeId: "now.direction.badge",
  },
];

export default function Now() {
  const intl = useIntl();

  return (
    <>
      <div className="px-4 py-2 text-lg font-medium">
        {intl.formatMessage({ id: "now.title" })}
      </div>
      <div className="double-divider" />

      <div className="px-1">
        {nowItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.id}>
              <article className="flex gap-3 p-4 transition-colors hover:bg-muted/40">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <Icon />
                </div>

                <div className="min-w-0 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold leading-tight">
                      {intl.formatMessage({ id: item.titleId })}
                    </h3>
                    <Badge variant="secondary">
                      {intl.formatMessage({ id: item.badgeId })}
                    </Badge>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {intl.formatMessage({ id: item.descriptionId })}
                  </p>
                </div>
              </article>

              {index < nowItems.length - 1 && (
                <div className="double-divider" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
