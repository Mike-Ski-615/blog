import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RoleCycleProps {
  roles: string[];
}

export function RoleCycle({ roles }: RoleCycleProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length <= 1) return;

    const interval = setInterval(() => {
      setIsExiting(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setIsExiting(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles]);

  if (!roles || roles.length === 0) return null;

  return (
    <div className=" relative flex h-5 w-42 flex-col justify-center overflow-hidden text-[0.78rem] text-muted-foreground/90">
      <div
        className={cn(
          "absolute w-full whitespace-nowrap duration-500 fill-mode-forwards",
          isExiting
            ? "animate-out fade-out slide-out-to-top-4"
            : "animate-in fade-in slide-in-from-bottom-4",
        )}
      >
        {roles[index]}
      </div>
    </div>
  );
}
