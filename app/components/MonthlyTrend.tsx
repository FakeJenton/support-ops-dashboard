"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, data } from "../lib/data";
import SectionHeader from "./SectionHeader";
import Takeaway from "./Takeaway";

const months = data.by_month;

interface PanelProps {
  title: string;
  unit?: string;
  kind: "bar" | "line";
  dataKey: keyof (typeof months)[number];
  color: string;
  formatter?: (value: number) => string;
  domain?: [number, number];
}

function Panel({
  title,
  unit,
  kind,
  dataKey,
  color,
  formatter,
  domain,
}: PanelProps) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-white p-4">
      <div className="mb-1 flex items-baseline justify-between">
        <div className="text-sm font-semibold text-[var(--navy)]">{title}</div>
        {unit && <div className="text-xs text-slate-500">{unit}</div>}
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          {kind === "bar" ? (
            <BarChart
              data={months}
              margin={{ top: 12, right: 12, bottom: 4, left: -10 }}
            >
              <CartesianGrid stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="month_label"
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                domain={domain}
                tickFormatter={(v: number) =>
                  formatter ? formatter(v) : v.toLocaleString()
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
                formatter={(value) => {
                  const v = typeof value === "number" ? value : Number(value);
                  return formatter ? formatter(v) : v.toLocaleString();
                }}
                labelStyle={{ color: "#1F3A5F", fontWeight: 600 }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                  fontSize: 12,
                }}
              />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart
              data={months}
              margin={{ top: 12, right: 12, bottom: 4, left: -10 }}
            >
              <CartesianGrid stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="month_label"
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                domain={domain}
                tickFormatter={(v: number) =>
                  formatter ? formatter(v) : v.toString()
                }
              />
              <Tooltip
                formatter={(value) => {
                  const v = typeof value === "number" ? value : Number(value);
                  return formatter ? formatter(v) : v.toString();
                }}
                labelStyle={{ color: "#1F3A5F", fontWeight: 600 }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: color }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MonthlyTrend() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="03 / Counter-Narrative"
        title="Monthly KPIs are flat across the quarter"
        subtitle="Volume, CSAT, and handle time traced by month."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Panel
          title="Ticket Volume"
          unit="tickets"
          kind="bar"
          dataKey="tickets"
          color={COLORS.navyLight}
          domain={[0, 6500]}
          formatter={(v) => v.toLocaleString()}
        />
        <Panel
          title="CSAT"
          unit="% positive"
          kind="line"
          dataKey="csat"
          color={COLORS.navy}
          domain={[60, 75]}
          formatter={(v) => `${v.toFixed(1)}%`}
        />
        <Panel
          title="Average Handle Time"
          unit="minutes"
          kind="line"
          dataKey="aht"
          color={COLORS.red}
          domain={[10, 15]}
          formatter={(v) => `${v.toFixed(2)}`}
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Y-axis ranges are tight on purpose. Auto-scaling to zero would hide the
        actual movement (or absence of it).
      </p>
      <Takeaway
        variant="neutral"
        insight="CSAT moved 1.4 points across the entire quarter. There is no Q1 decline to explain."
        implication="Any aggregate 'things are getting worse' narrative is a channel-mix artifact. Heavier-chat months look worse without anything actually changing in operations."
      />
    </section>
  );
}
