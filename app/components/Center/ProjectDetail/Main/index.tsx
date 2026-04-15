import { useProject } from "@/hooks/useProjects";
import { useLanguage } from "@/provider/language-provider";
import { OverviewTab } from "./OverviewTab";
import { ReadmeTab } from "./ReadmeTab";
import { WebsiteTab } from "./WebsiteTab";

type MainProps = {
  slug: string;
};

export default function Main({ slug }: MainProps) {
  const project = useProject(slug);
  const { locale } = useLanguage();

  return (
    <>
      <OverviewTab project={project} />
      <ReadmeTab locale={locale} slug={project.slug} />
      <WebsiteTab githubUrl={project.links?.github} />
    </>
  );
}
