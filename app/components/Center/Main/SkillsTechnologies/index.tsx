import { Button } from "@/components/ui/button";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandPrisma,
  IconBrandTailwind,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandGit,
  IconBrandGithub,
  IconBrandRust,
  IconBrandPython,
  IconBrandThreejs,
  IconBrandVite,
  IconBrandVue,
  IconBrandRadixUi,
  IconBrandDocker,
} from "@tabler/icons-react";
import { useIntl } from "react-intl";

const skills = [
  { name: "React", icon: IconBrandReact },
  { name: "Next.js", icon: IconBrandNextjs },
  { name: "Node.js", icon: IconBrandNodejs },
  { name: "MongoDB", icon: IconBrandMongodb },
  { name: "MySQL", icon: IconBrandMysql },
  { name: "Prisma", icon: IconBrandPrisma },
  { name: "Tailwind CSS", icon: IconBrandTailwind },
  { name: "JavaScript", icon: IconBrandJavascript },
  { name: "TypeScript", icon: IconBrandTypescript },
  { name: "Git", icon: IconBrandGit },
  { name: "GitHub", icon: IconBrandGithub },
  { name: "Rust", icon: IconBrandRust },
  { name: "Python", icon: IconBrandPython },
  { name: "Three.js", icon: IconBrandThreejs },
  { name: "Vite", icon: IconBrandVite },
  { name: "Vue.js", icon: IconBrandVue },
  { name: "Radix UI", icon: IconBrandRadixUi },
  { name: "Docker", icon: IconBrandDocker },
  { name: "Shadcn UI" },
  { name: "Motion" },
  { name: "GSAP" },
  { name: "PostgreSQL" },
  { name: "Bun" },
  { name: "tRPC" },
  { name: "pnpm" },
  { name: "eslint" },
];

export default function SkillsTechnologies() {
  const intl = useIntl();

  return (
    <>
      <div className="px-4 py-2 h-auto text-lg font-medium">
        {intl.formatMessage({ id: "introduce.skills" })}
      </div>
      <div className="double-divider" />
      <ul className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 h-auto">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <li key={skill.name}>
              <Button variant="outline">
                {Icon && <Icon size={18} />}
                {skill.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
