import { BackToTopButton } from "@/components/BackToTopButton";
import DotGrid from "@/components/Center/Main/DotGrid";
import ViewportFade from "@/components/Center/Main/ViewportFade";
import SectionFrame from "@/components/Center/SectionFrame";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <main className="flex flex-col">
      <ViewportFade />
      <SectionFrame>
        <DotGrid />
      </SectionFrame>
      <Outlet />
      <SectionFrame>
        <DotGrid />
      </SectionFrame>
      <BackToTopButton />
    </main>
  );
}
