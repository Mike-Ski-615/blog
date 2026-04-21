import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  defaultLanguage: "en-US",
  avatarSrc: "/images/avatar/user.webp",
  resume: {
    href: "/documents/resume.md",
    downloadName: "resume.md",
    email: "gvjk0631@gmail.com",
  },
  contact: {
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/Mike-Ski-615",
        side: "bottom",
        profile: {
          name: "Mike-Ski-615",
          subtitle: "GitHub Profile",
          description:
            "Open source projects, experiments, and the source for this resume site.",
        },
      },
    ],
  },
  visitorCount: 100,
} satisfies SiteConfig;
