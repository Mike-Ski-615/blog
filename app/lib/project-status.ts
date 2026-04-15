import type { ProjectStatus } from "@/data/projects";

type ProjectStatusStyle = {
  badge: string;
};

const STATUS_STYLE: Record<ProjectStatus, ProjectStatusStyle> = {
  building: {
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  online: {
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  beta: {
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  concept: {
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
};

export function getProjectStatusStyle(status: ProjectStatus): ProjectStatusStyle {
  return STATUS_STYLE[status];
}
