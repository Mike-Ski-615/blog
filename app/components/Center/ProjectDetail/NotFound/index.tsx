import { useSiteContent } from "@/hooks/useSiteContent";

export function NotFound() {
  const { ui } = useSiteContent();

  return (
    <section className="relative flex min-h-[calc(100dvh-27rem-(var(--divider-block-size)*4))] items-center overflow-hidden px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
      >
        <p className=" select-none whitespace-nowrap text-[clamp(6rem,18vw,14rem)] font-semibold text-foreground/2.5 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          404 404 404 404 404
        </p>
      </div>

      <div className="relative flex max-w-2xl flex-col gap-4 sm:gap-4">
        <p className=" text-xs uppercase tracking-[0.45em] text-muted-foreground">
          {ui.notFound.eyebrow}
        </p>
        <h1 className=" text-[clamp(4rem,14vw,8rem)] font-semibold leading-none text-foreground">
          404
        </h1>
        <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {ui.notFound.description}
        </p>
      </div>
    </section>
  );
}
