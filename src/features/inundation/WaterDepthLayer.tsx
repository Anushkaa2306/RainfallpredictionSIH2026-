export function WaterDepthLayer({ depth, affected }: { depth: string; affected: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-border bg-background/85 p-3 backdrop-blur">
        <div className="text-[10px] uppercase text-muted-foreground">Peak depth</div>
        <div className="mt-1 font-display text-2xl font-semibold text-warning">{depth}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">Affected {affected}</div>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-md border border-border bg-background/85 p-3 backdrop-blur">
        <span className="text-[10px] text-muted-foreground">DEPTH</span>
        <div className="h-2 flex-1 rounded-full bg-linear-to-r from-primary via-warning to-critical" />
        <div className="flex gap-3 text-[9px] text-muted-foreground">
          <span>0.2 m</span>
          <span>0.8 m</span>
          <span>1.5+ m</span>
        </div>
      </div>
    </>
  );
}
