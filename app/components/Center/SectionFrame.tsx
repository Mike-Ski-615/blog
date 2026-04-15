import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionFrameProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  innerClassName?: string;
  divider?: boolean;
};

export default function SectionFrame({
  children,
  className,
  id,
  innerClassName,
  divider = true,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-4 bg-background", className)}
    >
      <div
        className={cn(
          "max-w-172.5 mx-2 sm:mx-8 md:mx-auto relative section-frame",
          innerClassName,
        )}
      >
        {children}
      </div>

      {divider && <div className="double-divider" />}
    </section>
  );
}
