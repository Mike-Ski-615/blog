import { useLanguage } from "@/provider/language-provider";
import { projectsByLocale, type ProjectLocale, type ProjectSlug } from "@/data/projects";

function toProjectLocale(locale: string): ProjectLocale {
  return locale === "zh-CN" ? "zh" : "en";
}

export function useProjects() {
  const { locale } = useLanguage();
  return projectsByLocale[toProjectLocale(locale)];
}

export function useProject(slug: string) {
  const projects = useProjects();
  return projects[slug as ProjectSlug];
}
