import { useIntl } from "react-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import type { LinkType, Project } from "@/data/projects";
import { LINK_CONFIG } from "@/lib/project-links";
import { getProjectStatusStyle } from "@/lib/project-status";

type OverviewTabProps = {
  project: Project;
};

type ProjectLinkItem = {
  type: LinkType;
  href: string;
  Icon: (typeof LINK_CONFIG)[LinkType]["icon"];
  label: string;
  order: number;
};

export function OverviewTab({ project }: OverviewTabProps) {
  const intl = useIntl();
  const statusStyle = getProjectStatusStyle(project.status);
  const statusLabel = intl.formatMessage({
    id: `common.status.${project.status}`,
  });
  const stackTitle = intl.formatMessage({ id: "projectDetail.stack" });
  const linkItems = Object.entries(project.links ?? {})
    .map(([type, href]) => {
      const linkType = type as LinkType;
      const config = LINK_CONFIG[linkType];

      if (!config || !href) {
        return null;
      }

      return {
        type: linkType,
        href,
        Icon: config.icon,
        label: intl.formatMessage({ id: config.messageId }),
        order: config.order,
      };
    })
    .filter((item): item is ProjectLinkItem => item !== null)
    .sort((a, b) => a.order - b.order);

  return (
    <TabsContent value="overview">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="min-w-0 flex-1 text-2xl font-bold leading-tight tracking-tight text-title">
            {project.name}
          </h1>
          <Badge variant="outline" className={`shrink-0 ${statusStyle.badge}`}>
            <span className="relative size-1.5 rounded-full bg-current before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-current" />
            <span>{statusLabel}</span>
          </Badge>
        </div>

        <div className="flex flex-col gap-2 text-base text-primary">
          <p>{project.intro}</p>
          <p>{project.detail}</p>
        </div>

        {linkItems.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {linkItems.map(({ type, href, Icon, label }) => (
              <Button key={`${type}-${href}`} asChild variant="outline" size="sm">
                <a href={href} target="_blank" rel="noreferrer">
                  <Icon data-icon="inline-start" />
                  {label}
                </a>
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-title">{stackTitle}</h2>
          <div className="flex flex-wrap items-center gap-1.5">
            {project.stack.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
