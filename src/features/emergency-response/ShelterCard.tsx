import type { EmergencyService } from "./emergency.types";

export function ShelterCard({ service }: { service: EmergencyService }) {
  const Icon = service.icon;
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="grid size-9 place-items-center rounded-md bg-secondary">
        <Icon className={`size-4 ${service.tone}`} />
      </span>
      <div>
        <div className="text-sm font-medium">{service.name}</div>
        <div className="text-xs text-muted-foreground">{service.meta}</div>
      </div>
    </div>
  );
}
