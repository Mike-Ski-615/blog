import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useLayoutEffect } from "react";
import { Link, useLocation, useViewTransitionState } from "react-router";
import SectionHeader from "@/components/Center/SectionHeader";
import { projectSlugs } from "@/content";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useProjects } from "@/hooks/useProjects";
import { TransitionImage } from "@/components/TransitionImage";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

type ProjectReturnState = {
  viewTransitionProjectSlug?: string;
};

type ProjectCardData = Pick<
  Project,
  "slug" | "cover" | "name" | "status" | "summary"
>;

function ProjectCard({
  project,
  statusLabel,
  viewDetailsLabel,
}: {
  project: ProjectCardData;
  statusLabel: string;
  viewDetailsLabel: string;
}) {
  const projectHref = `/${project.slug}`;
  const isProjectTransitioning = useViewTransitionState(projectHref);
  const transitionName = isProjectTransitioning
    ? `project-cover-${project.slug}`
    : "none";

  return (
    <Link
      to={projectHref}
      viewTransition
      data-project-slug={project.slug}
      className="group flex w-full flex-col p-4 text-left transition-colors hover:bg-muted/30 sm:p-6"
    >
      <div className="flex flex-col gap-4 transition-all duration-300 group-hover:-translate-y-1">
        <TransitionImage
          transitionName={transitionName}
          src={project.cover}
          alt={project.name}
        />

        <div className="flex flex-col gap-2.5 px-2.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className=" min-w-0 flex-1 truncate text-xl font-semibold leading-tight text-foreground">
              {project.name}
            </h3>

            <Badge
              variant="outline"
              className=" shrink-0 bg-muted text-foreground"
            >
              <span className="relative size-1.5 rounded-full bg-current before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-current" />
              <span>{statusLabel}</span>
            </Badge>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>

          <span className=" flex items-center gap-1 pt-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            {viewDetailsLabel}
            <IconArrowNarrowRight data-icon="inline-end" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const {
    home: { projects: projectsSection },
    ui,
  } = useSiteContent();
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

  const projects = projectSlugs.map<ProjectCardData>((slug) => {
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
      <SectionHeader>{projectsSection.title}</SectionHeader>
      {projectRows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
            {row[0] ? (
              <ProjectCard
                project={row[0]}
                statusLabel={ui.common.status[row[0].status]}
                viewDetailsLabel={projectsSection.viewDetailsLabel}
              />
            ) : null}
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
            {row[1] ? (
              <ProjectCard
                project={row[1]}
                statusLabel={ui.common.status[row[1].status]}
                viewDetailsLabel={projectsSection.viewDetailsLabel}
              />
            ) : null}
          </div>
          {rowIndex < projectRows.length - 1 && (
            <div className="double-divider" />
          )}
        </div>
      ))}
    </>
  );
}
