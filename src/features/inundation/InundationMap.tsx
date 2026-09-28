import { TerrainScene } from "../../components/map/terrain-scene";
import type { InundationFrame } from "./inundation.types";

export function InundationMap({ frame }: { frame: InundationFrame }) {
  return (
    <div className="absolute inset-0">
      <TerrainScene depthGrid={frame.depthGrid} />
    </div>
  );
}
