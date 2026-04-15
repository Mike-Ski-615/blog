import { enProjects } from "./en";
import { zhProjects } from "./zh";
import type { ProjectLocale, Project, ProjectSlug } from "./types";

export const projectsByLocale: Record<ProjectLocale, Record<ProjectSlug, Project>> = {
  en: enProjects,
  zh: zhProjects,
};

export * from "./types";
