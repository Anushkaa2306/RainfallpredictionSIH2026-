import type { RiskDriver } from "./risk.types";

export function RiskDrivers({ drivers = [] }: { drivers?: RiskDriver[] }) {
  if (drivers.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        Risk-driver breakdown is not supplied by the current demo model.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {drivers.map((driver) => (
        <li
          key={driver.label}
          className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <div className="text-sm font-medium">{driver.label}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{driver.detail}</div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-semibold">{driver.value}</div>
            <div
              className={`mt-1 text-[9px] uppercase ${driver.state === "demo" ? "text-warning" : "text-muted-foreground"}`}
            >
              {driver.state === "demo" ? "Demo input" : "Unavailable"}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
