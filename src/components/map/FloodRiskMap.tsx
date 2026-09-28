import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getFloodRiskAreas } from "../../services/predictionApi";
import { floodMapConfig } from "../../data/constants/map";
import { getZoneCenter } from "../../lib/map/coordinates";
import { getRiskColor } from "../../lib/risk/risk";

type Zone = ReturnType<typeof getFloodRiskAreas>[number];

export function FloodRiskMap({ selectedZoneId, onZoneSelect }: { selectedZoneId: string; onZoneSelect: (zoneId: string) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: floodMapConfig.styleUrl,
      center: floodMapConfig.center,
      zoom: floodMapConfig.initialZoom,
      pitch: 0,
      antialias: true,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl(), "bottom-left");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    mapRef.current = map;

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const zones = getFloodRiskAreas();
    zones.forEach((zone) => {
      const marker = new maplibregl.Marker({ element: createZoneMarker(zone, zone.id === selectedZoneId, onZoneSelect), anchor: "center" })
        .setLngLat(getZoneCenter(zone))
        .addTo(map);
      markersRef.current[zone.id] = marker;
    });

    const selectedZone = zones.find((zone) => zone.id === selectedZoneId) ?? zones[0];
    map.flyTo({
      center: getZoneCenter(selectedZone),
      zoom: floodMapConfig.selectedZoneZoom,
      essential: true,
      pitch: 0,
    });
  }, [selectedZoneId, onZoneSelect]);

  return <div ref={containerRef} className="h-[420px] w-full" aria-label="MapLibre flood risk map of Indore" />;
}

function createZoneMarker(zone: Zone, isSelected: boolean, onZoneSelect: (zoneId: string) => void) {
  const element = document.createElement("button");
  element.type = "button";
  element.setAttribute("aria-label", `${zone.name}, ${zone.risk} flood risk`);
  element.style.border = "none";
  element.style.background = "transparent";
  element.style.cursor = "pointer";
  element.style.padding = "0";
  element.style.display = "block";
  element.style.font = "inherit";

  element.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; transform:translate(-50%, -50%);">
      <span style="display:inline-block; width:${isSelected ? 15 : 12}px; height:${isSelected ? 15 : 12}px; border-radius:9999px; border:2px solid rgba(255,255,255,0.96); background:${getRiskColor(zone.risk)}; box-shadow:${isSelected ? "0 0 0 8px rgba(239,68,68,0.15), 0 14px 26px rgba(15,23,42,0.22)" : "0 0 0 6px rgba(148,163,184,0.12), 0 10px 20px rgba(15,23,42,0.18)"};"></span>
      <span aria-hidden="true" style="display:inline-flex; align-items:center; justify-content:center; padding:5px 10px; border-radius:9999px; background:rgba(255,255,255,0.88); border:1px solid rgba(15,23,42,0.08); color:#111827; font-size:10px; font-weight:700; letter-spacing:0.04em; box-shadow:0 8px 20px rgba(15,23,42,0.12); white-space:nowrap;">${zone.name}</span>
    </div>
  `;

  element.addEventListener("click", () => onZoneSelect(zone.id));
  return element;
}