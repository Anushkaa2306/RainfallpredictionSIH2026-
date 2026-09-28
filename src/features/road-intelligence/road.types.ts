export type RoadCondition = "Open" | "Waterlogged" | "Closed";

export type RoadAlert = {
  id: string;
  name: string;
  area: string;
  condition: RoadCondition;
  updatedAt: string;
  imageUrl?: string;
};
