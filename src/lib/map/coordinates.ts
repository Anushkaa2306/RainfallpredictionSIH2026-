export function getZoneCenter(zone: { lng: number; lat: number }): [number, number] {
  return [zone.lng, zone.lat];
}