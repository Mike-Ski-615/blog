export const PROJECT_SLUGS = [
  "nextjs-authentication-scaffold",
  "three-d-face-particles",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type LinkType = "github" | "demo" | "website" | "readme" | "issues";

export type ProjectStatus = "building" | "online" | "beta" | "concept";

export type Project = {
  slug: ProjectSlug;
  cover: string;
  name: string;
  summary: string;
  intro: string;
  detail: string;
  status: ProjectStatus;
  stack: string[];
  links?: Partial<Record<LinkType, string>>;
};

export type ProjectLocale = "en" | "zh";
