import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/Center/SectionHeader";
import { IconBook2, IconCodeDots, IconTargetArrow } from "@tabler/icons-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { NowIconKey } from "@/types";

const nowIconMap: Record<NowIconKey, typeof IconCodeDots> = {
  "code-dots": IconCodeDots,
  book: IconBook2,
  target: IconTargetArrow,
};

export default function Now() {
  const {
    home: { now },
  } = useSiteContent();

  return (
    <>
      <SectionHeader>{now.title}</SectionHeader>

      {now.items.map((item, index) => {
        const Icon = nowIconMap[item.icon];

        return (
          <div key={item.id}>
            <article className="flex gap-4 p-4 transition-colors hover:bg-muted/30">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/20">
                <Icon aria-hidden="true" />
              </div>

              <div className="min-w-0 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className=" text-lg font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <Badge variant="secondary" className="">
                    {item.badge}
                  </Badge>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>

            {index < now.items.length - 1 && <div className="double-divider" />}
          </div>
        );
      })}
    </>
  );
}
