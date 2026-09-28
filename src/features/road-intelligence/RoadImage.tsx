export function RoadImage({ src, alt }: { src: string | undefined; alt: string }) {
  if (!src)
    return (
      <div className="grid aspect-video place-items-center rounded-md bg-secondary text-xs text-muted-foreground">
        No verified road image
      </div>
    );
  return <img src={src} alt={alt} className="aspect-video w-full rounded-md object-cover" />;
}
