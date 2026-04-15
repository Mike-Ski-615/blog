export default function ViewportFade() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 shrink-0 bg-linear-to-b from-background/85 via-background/35 to-transparent backdrop-blur-sm mask-[linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.45)_58%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.45)_58%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 shrink-0 bg-linear-to-t from-background/85 via-background/35 to-transparent backdrop-blur-sm mask-[linear-gradient(to_top,black_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.45)_58%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,0.88)_24%,rgba(0,0,0,0.45)_58%,transparent_100%)]"
      />
    </>
  );
}
