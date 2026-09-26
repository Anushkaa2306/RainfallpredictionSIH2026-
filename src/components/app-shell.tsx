import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Bell, CloudRain, Map, Mountain, Route as RouteIcon, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./button";

const nav = [
  { to: "/", label: "Risk overview", icon: Map },
  { to: "/inundation", label: "Inundation", icon: Mountain },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><CloudRain className="size-5" /></span>
          <span className="min-w-0"><strong className="block truncate font-display text-sm">FloodWatch AI</strong><span className="block text-[10px] uppercase text-muted-foreground">Urban resilience network</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-safe" /> Systems operational</div>
          <Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="size-4" /><span className="absolute mt-[-24px] ml-[22px] size-2 rounded-full bg-critical" /></Button>
          <Button variant="secondary" size="sm"><ShieldAlert className="size-4" /> <span className="hidden sm:inline">Authority mode</span></Button>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 border-r border-border p-4 lg:block">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase text-muted-foreground">Operations</div>
          <nav className="space-y-1">
            {nav.map(({ to, label, icon: Icon }) => <Link key={to} to={to} className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors ${path === to ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}><Icon className="size-4" />{label}</Link>)}
            <button className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"><RouteIcon className="size-4" />Safe routes</button>
            <button className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"><Activity className="size-4" />Sensor health</button>
          </nav>
          <div className="absolute bottom-5 left-4 right-4 border-t border-border pt-4 text-xs text-muted-foreground"><div className="flex justify-between"><span>Data latency</span><strong className="text-safe">42 sec</strong></div><div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-[88%] bg-safe" /></div></div>
        </aside>
        <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background lg:hidden">
        {nav.map(({ to, label, icon: Icon }) => <Link key={to} to={to} className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] ${path === to ? "text-primary" : "text-muted-foreground"}`}><Icon className="size-5" />{label}</Link>)}
      </nav>
    </div>
  );
}
