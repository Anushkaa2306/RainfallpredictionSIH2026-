import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RainfallForecastPoint } from "./rainfall.types";

export function RainfallChart({ rainfall }: { rainfall: RainfallForecastPoint[] }) {
  return <div className="h-56 px-3 pb-3">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={rainfall} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs><linearGradient id="rainfall-forecast-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.22} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.01} /></linearGradient></defs>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis unit=" mm/hr" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} width={52} />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6 }} formatter={(value, name) => [`${value} mm/hr`, name === "actual" ? "Observed" : "Forecast"]} />
        <ReferenceLine x="Now" stroke="var(--border)" strokeDasharray="3 3" />
        <Area type="monotone" dataKey="forecast" stroke="none" fill="url(#rainfall-forecast-fill)" tooltipType="none" />
        <Line type="monotone" dataKey="actual" name="Observed" stroke="var(--foreground)" strokeWidth={2.5} connectNulls={false} dot={{ r: 3, fill: "var(--foreground)" }} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="forecast" name="Forecast" stroke="var(--primary)" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 2, fill: "var(--primary)" }} activeDot={{ r: 4 }} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}