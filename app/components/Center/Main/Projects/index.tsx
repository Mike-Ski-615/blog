import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router";
import { PROJECT_SLUGS, type Project } from "@/data/projects";
import { useProjects } from "@/hooks/useProjects";
import { getProjectStatusStyle } from "@/lib/project-status";
import { TransitionImage } from "@/components/TransitionImage";
import { Badge } from "@/components/ui/badge";

type ProjectReturnState = {
  viewTransitionProjectSlug?: string;
};

type ProjectCardData = Pick<
  Project,
  "slug" | "cover" | "name" | "status" | "summary"
>;

function ProjectCard({ project }: { project: ProjectCardData }) {
  const intl = useIntl();
  const statusStyle = getProjectStatusStyle(project.status);
  const statusLabel = intl.formatMessage({
    id: `common.status.${project.status}`,
  });

  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      data-project-slug={project.slug}
      className="group flex w-full flex-col p-4 text-left transition-colors hover:bg-muted/40"
    >
      <div className="flex flex-col gap-3 transition-all duration-300 group-hover:-translate-y-1">
        <TransitionImage
          transitionName={`project-cover-${project.slug}`}
          src={project.cover}
          alt={project.name}
        />

        <div className="flex flex-col gap-2 px-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 truncate text-xl font-semibold leading-tight tracking-tight text-foreground">
              {project.name}
            </h3>

            <Badge
              variant="outline"
              className={`shrink-0 ${statusStyle.badge}`}
            >
              <span className="relative size-1.5 rounded-full bg-current before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-current" />
              <span>{statusLabel}</span>
            </Badge>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.summary}
          </p>

          <span className="flex items-center gap-1 pt-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            {intl.formatMessage({ id: "projectCard.viewDetails" })}
            <IconArrowNarrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const intl = useIntl();
  const projectsBySlug = useProjects();
  const location = useLocation();
  const returnProjectSlug = (location.state as ProjectReturnState | null)
    ?.viewTransitionProjectSlug;

  useLayoutEffect(() => {
    if (!returnProjectSlug) {
      return;
    }

    document
      .querySelector(`[data-project-slug="${returnProjectSlug}"]`)
      ?.scrollIntoView({ block: "center", inline: "nearest" });
  }, [returnProjectSlug]);

  const projects = PROJECT_SLUGS.map<ProjectCardData>((slug) => {
    const project = projectsBySlug[slug];
    return {
      slug,
      cover: project.cover,
      name: project.name,
      status: project.status,
      summary: project.summary,
    };
  });
  const projectRows = projects.reduce<ProjectCardData[][]>((rows, project) => {
    const currentRow = rows[rows.length - 1];

    if (!currentRow || currentRow.length === 2) {
      rows.push([project]);
    } else {
      currentRow.push(project);
    }

    return rows;
  }, []);

  return (
    <>
      <div className="px-4 py-2 text-lg font-medium">
        {intl.formatMessage({ id: "introduce.projects" })}
      </div>
      <div className="double-divider" />
      <div className="px-1">
        {projectRows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
              {row[0] ? <ProjectCard project={row[0]} /> : null}
              <div className="double-divider md:hidden" />
              <div
                className="relative hidden overflow-hidden md:block"
                style={{ width: 5 }}
              >
                <div
                  className="double-divider absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
                  style={{ width: 2000 }}
                />
              </div>
              {row[1] ? <ProjectCard project={row[1]} /> : null}
            </div>
            {rowIndex < projectRows.length - 1 && (
              <div className="double-divider" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
