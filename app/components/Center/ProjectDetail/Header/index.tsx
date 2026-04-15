import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { useIntl } from "react-intl";
import { Link } from "react-router";

type HeaderProps = {
  slug: string;
};

export default function Header({ slug }: HeaderProps) {
  const intl = useIntl();

  return (
    <div className="flex justify-between items-center py-2 px-4 h-auto">
      <div className="flex items-center gap-2 text-lg font-bold leading-tight text-title">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            to="/"
            state={{ viewTransitionProjectSlug: slug }}
            viewTransition
          >
            <IconChevronLeft />
          </Link>
        </Button>
        {intl.formatMessage({ id: "projectDetail.title" })}
      </div>
      <ModeToggle />
    </div>
  );
}
