import Header from "@/components/Center/ProjectDetail/Header";
import Image from "@/components/Center/ProjectDetail/Image";
import Main from "@/components/Center/ProjectDetail/Main";
import ThreeTabs from "@/components/Center/ProjectDetail/ThreeTabs";
import SectionFrame from "@/components/Center/SectionFrame";
import { Tabs } from "@/components/ui/tabs";
import type { Route } from "./+types/_main.projects.$slug";
import { ScrollRestoration } from "react-router";

export default function ProjectDetailRoute({ params }: Route.ClientLoaderArgs) {
  return (
    <>
      <ScrollRestoration />
      <SectionFrame>
        <Header slug={params.slug} />
      </SectionFrame>
      <SectionFrame>
        <Image slug={params.slug} />
      </SectionFrame>
      <Tabs defaultValue="overview" className="contents">
        <SectionFrame>
          <ThreeTabs slug={params.slug} />
        </SectionFrame>
        <SectionFrame>
          <Main slug={params.slug} />
        </SectionFrame>
      </Tabs>
    </>
  );
}
