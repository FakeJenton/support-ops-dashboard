"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, data } from "../lib/data";
import SectionHeader from "./SectionHeader";

const bins = data.aht_bins.map((b) => ({
  ...b,
  bin_label: b.bin === "25+" ? "25+ min" : `${b.bin} min`,
}));

export default function AhtCsatChart() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="Quality vs Speed"
        title="Long tickets are bad tickets"
        subtitle="CSAT collapses from 74% on tickets under 5 minutes to 52% on tickets over 25 minutes. First-response time, by contrast, has no measurable CSAT relationship. The bottleneck is resolution quality, not greeting speed."
      />
      <div className="rounded-lg border border-[var(--card-border)] bg-white p-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={bins}
              margin={{ top: 16, right: 24, bottom: 8, left: 8 }}
            >
              <CartesianGrid stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="bin_label"
                tick={{ fontSize: 12, fill: "#64748B" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="tickets"
                orientation="left"
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Tickets",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 11, fill: "#64748B" },
                }}
              />
              <YAxis
                yAxisId="csat"
                orientation="right"
                domain={[40, 80]}
                tick={{ fontSize: 11, fill: "#64748B" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                label={{
                  value: "CSAT",
                  angle: 90,
                  position: "insideRight",
                  style: { fontSize: 11, fill: "#64748B" },
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  const v = typeof value === "number" ? value : Number(value);
                  if (name === "CSAT") return `${v.toFixed(1)}%`;
                  return v.toLocaleString();
                }}
                labelStyle={{ color: "#1F3A5F", fontWeight: 600 }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                yAxisId="tickets"
                dataKey="tickets"
                name="Tickets"
                fill={COLORS.navyLight}
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="csat"
                type="monotone"
                dataKey="csat"
                name="CSAT"
                stroke={COLORS.red}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.red }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600 sm:grid-cols-4">
          <div className="rounded border border-[var(--card-border)] bg-slate-50 p-3">
            <div className="font-semibold text-[var(--navy)]">22-pt drop</div>
            <div className="mt-0.5">CSAT from sub-5min to 25+ min</div>
          </div>
          <div className="rounded border border-[var(--card-border)] bg-slate-50 p-3">
            <div className="font-semibold text-[var(--navy)]">94% of volume</div>
            <div className="mt-0.5">Lives in 5-20 minute bins</div>
          </div>
          <div className="rounded border border-[var(--card-border)] bg-slate-50 p-3">
            <div className="font-semibold text-[var(--navy)]">Chat AHT 15.0</div>
            <div className="mt-0.5">Sits in the 15-20 collapse zone</div>
          </div>
          <div className="rounded border border-[var(--card-border)] bg-slate-50 p-3">
            <div className="font-semibold text-[var(--navy)]">Phone AHT 9.2</div>
            <div className="mt-0.5">Sits in the 5-10 high-CSAT zone</div>
          </div>
        </div>
      </div>
    </section>
  );
}
