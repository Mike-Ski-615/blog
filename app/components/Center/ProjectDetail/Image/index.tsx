import { TransitionImage } from "@/components/TransitionImage";
import { useProject } from "@/hooks/useProjects";

type ImageProps = {
  slug: string;
};

export default function Image({ slug }: ImageProps) {
  const project = useProject(slug);

  return (
    <div className="px-4 w-full p-4">
      <TransitionImage
        transitionName={`project-cover-${slug}`}
        src={project.cover}
        alt={project.name}
      />
    </div>
  );
}
