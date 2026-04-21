import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router";

type HeaderProps = {
  slug: string;
};

export default function Header({ slug }: HeaderProps) {
  const { ui } = useSiteContent();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className=" flex items-center gap-2 text-lg font-semibold leading-tight text-title">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            to="/"
            state={{ viewTransitionProjectSlug: slug }}
            viewTransition
          >
            <IconChevronLeft data-icon="inline-start" />
          </Link>
        </Button>
        {ui.projectDetail.title}
      </div>
      <ModeToggle />
    </div>
  );
}
