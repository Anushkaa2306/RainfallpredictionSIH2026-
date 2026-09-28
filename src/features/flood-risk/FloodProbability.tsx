export function FloodProbability({ probability }: { probability: number }) {
  const clampedProbability = Math.max(0, Math.min(100, probability));

  return <div className="min-w-24">
    <div className="mb-1 flex items-center justify-between gap-2 text-xs"><span className="font-medium">{clampedProbability}%</span><span className="text-[10px] text-muted-foreground">probability</span></div>
    <div className="h-1.5 overflow-hidden rounded-full bg-secondary" role="meter" aria-label="Flood probability" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clampedProbability}>
      <div className="h-full rounded-full bg-warning" style={{ width: `${clampedProbability}%` }} />
    </div>
  </div>;
}