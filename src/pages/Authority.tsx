import { ShieldCheck } from "lucide-react";
import { Panel } from "../components/dashboard/Panel";

export function Authority() {
  return <div className="space-y-5 p-4 md:p-6">
    <header><p className="text-xs font-semibold uppercase text-primary">Operations · Indore</p><h1 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Authority workspace</h1><p className="mt-1 text-sm text-muted-foreground">A dedicated view for verified alerts and response coordination.</p></header>
    <Panel title="Response coordination" detail="Connected to the local demo environment">
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="grid size-11 place-items-center rounded-full bg-primary/15 text-primary"><ShieldCheck className="size-5" /></span>
        <div><h2 className="text-sm font-semibold">Authority actions are not connected</h2><p className="mt-1 max-w-md text-xs text-muted-foreground">This workspace is ready for authenticated response tools. No dispatch or public alert will be sent from the current demo.</p></div>
      </div>
    </Panel>
  </div>;
}