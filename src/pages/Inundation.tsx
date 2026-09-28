import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { InundationPrediction } from "../features/inundation/InundationPrediction";

export function InundationPage({ locationId = "palasia" }: { locationId?: string }) {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <Link
            to="/flood-risk"
            className="mb-2 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Flood risk
          </Link>
          <h1 className="font-display text-2xl font-semibold md:text-3xl">Inundation prediction</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Where water spreads, how deep it gets, and when it arrives.
          </p>
        </div>
      </header>
      <InundationPrediction locationId={locationId} />
    </div>
  );
}
