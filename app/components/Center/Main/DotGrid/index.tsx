export default function DotGrid() {
  return (
    <div className="p-2 h-48">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(var(--border) 1.25px, transparent 1.25px)`,
          backgroundSize: `8px 8px`,
        }}
      />
    </div>
  );
}
