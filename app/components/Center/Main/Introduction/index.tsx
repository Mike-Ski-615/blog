import { IconQuoteOpen } from "@tabler/icons-react";
import { useIntl } from "react-intl";

export default function Introduction() {
  const intl = useIntl();
  const quote = intl.formatMessage({ id: "introduction.quote" });
  const author = intl.formatMessage({ id: "introduction.author" });

  return (
    <div className="py-4 sm:py-6 flex flex-col items-center text-center relative overflow-hidden group">
      <IconQuoteOpen size={48} />
      <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
        <p className="text-xl sm:text-3xl font-bold italic text-title leading-relaxed tracking-tight">
          "{quote}"
        </p>
      </blockquote>
      <div className="sm:mt-8 mt-6 flex items-center gap-3 z-10">
        <div className="h-px w-8 bg-muted-foreground"></div>
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          {author}
        </span>
        <div className="h-px w-8 bg-muted-foreground"></div>
      </div>
    </div>
  );
}
