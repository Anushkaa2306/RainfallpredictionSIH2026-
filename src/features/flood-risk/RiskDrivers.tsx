import type { RiskDriver } from "./risk.types";

export function RiskDrivers({ drivers = [] }: { drivers?: RiskDriver[] }) {
  if (drivers.length === 0) {
    return <p className="text-xs text-muted-foreground">Risk-driver breakdown is not supplied by the current demo model.</p>;
  }

  return <ul className="divide-y divide-border">
    {drivers.map((driver) => <li key={driver.label} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div><div className="text-sm font-medium">{driver.label}</div><div className="text-xs text-muted-foreground">{driver.detail}</div></div>
      <span className="shrink-0 text-sm font-semibold">{driver.value}</span>
    </li>)}
  </ul>;
}