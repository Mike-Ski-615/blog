type TransitionImageProps = {
  transitionName: string;
  src: string;
  alt: string;
};

export function TransitionImage({
  transitionName,
  src,
  alt,
}: TransitionImageProps) {
  return (
    <div className="relative size-full aspect-video rounded-xl border border-border p-1 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="block size-full object-cover rounded-lg"
        style={{ viewTransitionName: transitionName }}
      />
    </div>
  );
}
