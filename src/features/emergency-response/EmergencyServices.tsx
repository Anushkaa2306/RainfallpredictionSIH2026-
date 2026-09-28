import { Panel } from "../../components/dashboard/Panel";
import { getEmergencyServices } from "../../services/emergencyApi";
import type { EmergencyService } from "./emergency.types";
import { EmergencyContacts } from "./EmergencyContacts";
import { HospitalCard } from "./HospitalCard";
import { ShelterCard } from "./ShelterCard";

export function EmergencyServices() {
  const services = getEmergencyServices();

  return (
    <Panel title="Nearby critical services" detail="Deterministic demo directory">
      <div className="divide-y divide-border">
        {services.map((service: EmergencyService) => {
          const name = service.name.toLowerCase();
          if (name.includes("hospital"))
            return <HospitalCard key={service.name} service={service} />;
          if (name.includes("shelter")) return <ShelterCard key={service.name} service={service} />;
          const Icon = service.icon;
          return (
            <div key={service.name} className="flex items-center gap-3 p-4">
              <span className="grid size-9 place-items-center rounded-md bg-secondary">
                <Icon className={`size-4 ${service.tone}`} />
              </span>
              <div>
                <div className="text-sm font-medium">{service.name}</div>
                <div className="text-xs text-muted-foreground">{service.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
      <EmergencyContacts />
    </Panel>
  );
}
