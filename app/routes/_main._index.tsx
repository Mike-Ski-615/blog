import Experiences from "@/components/Center/Main/Experiences";
import GithubHeatmap from "@/components/Center/Main/GithubHeatmap";
import Introduce from "@/components/Center/Main/Introduce";
import Introduction from "@/components/Center/Main/Introduction";
import Newsletter from "@/components/Center/Main/Newsletter";
import Now from "@/components/Center/Main/Now";
import Projects from "@/components/Center/Main/Projects";
import Resume from "@/components/Center/Main/Resume";
import SkillsTechnologies from "@/components/Center/Main/SkillsTechnologies";
import UserCard from "@/components/Center/Main/UserCard";
import SectionFrame from "@/components/Center/SectionFrame";
import { ScrollAnchorToc } from "@/components/ScrollAnchorToc";

export default function Home() {
  return (
    <>
      <ScrollAnchorToc />

      <SectionFrame id="profile">
        <UserCard />
      </SectionFrame>

      <SectionFrame id="about">
        <Introduce />
      </SectionFrame>

      <SectionFrame id="projects">
        <Projects />
      </SectionFrame>

      <SectionFrame id="github">
        <GithubHeatmap />
      </SectionFrame>

      <SectionFrame id="experiences">
        <Experiences />
      </SectionFrame>

      <SectionFrame id="skills">
        <SkillsTechnologies />
      </SectionFrame>

      <SectionFrame id="now">
        <Now />
      </SectionFrame>

      <SectionFrame id="resume">
        <Resume />
      </SectionFrame>

      <SectionFrame id="newsletter">
        <Newsletter />
      </SectionFrame>

      <SectionFrame id="introduction">
        <Introduction />
      </SectionFrame>
    </>
  );
}
