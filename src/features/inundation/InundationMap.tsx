import { TerrainScene } from "../../components/map/terrain-scene";

export function InundationMap({ level }: { level: number }) {
  return (
    <div className="relative h-[55vh] min-h-[430px]">
      <TerrainScene level={level} />
    </div>
  );
}
