import { IconQuoteOpen } from "@tabler/icons-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Introduction() {
  const {
    home: { introduction },
  } = useSiteContent();

  return (
    <div className="group relative flex flex-col items-center overflow-hidden py-4 px-2 text-center sm:py-6 sm:px-4">
      <IconQuoteOpen className="size-12" />
      <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
        <p className=" text-balance text-xl font-semibold leading-7 text-title sm:text-3xl">
          "{introduction.quote}"
        </p>
      </blockquote>
      <div className="z-10 mt-6 flex items-center gap-3 sm:mt-8">
        <div className="h-px w-8 bg-muted-foreground"></div>
        <span className=" text-xs font-medium uppercase text-muted-foreground sm:text-sm">
          {introduction.author}
        </span>
        <div className="h-px w-8 bg-muted-foreground"></div>
      </div>
    </div>
  );
}
