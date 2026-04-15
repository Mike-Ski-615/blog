import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProjects";
import { useIntl } from "react-intl";

type StackUsedProps = {
  slug: string;
};

export default function StackUsed({ slug }: StackUsedProps) {
  const intl = useIntl();
  const project = useProject(slug);
  const title = intl.formatMessage({ id: "projectDetail.stack" });
  const stack = project.stack;

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="font-semibold text-title">{title}</h1>
      <div className="flex flex-wrap items-center gap-1.5">
        {stack.map((item) => (
          <Button key={item} size="xs" variant="outline">
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
