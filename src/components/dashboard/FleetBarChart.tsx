
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { name: "Operacionais", value: 9 },
  { name: "Em manutenção", value: 3 },
  { name: "Paradas", value: 3 },
];

const barColors = [
  "hsl(var(--status-operational))",
  "hsl(var(--status-maintenance))",
  "hsl(var(--status-warning))"
];

export default function FleetBarChart() {
  return (
    <div className="w-full h-60 flex items-center justify-center">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barRadius={18}>
            <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
