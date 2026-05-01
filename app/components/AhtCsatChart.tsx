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
import Takeaway from "./Takeaway";

const bins = data.aht_bins.map((b) => ({
  ...b,
  bin_label: b.bin === "25+" ? "25+ min" : `${b.bin} min`,
}));

export default function AhtCsatChart() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="04 / Mechanism"
        title="Long tickets are bad tickets"
        subtitle="Ticket count and CSAT plotted against handle-time bin."
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
      </div>
      <Takeaway
        variant="alert"
        insight="CSAT collapses 22 points as handle time grows from 5 to 25 minutes."
        implication="Resolution quality drives satisfaction, not greeting speed. Chat sits at 15 minutes (the collapse zone). Phone sits at 9 (the high-CSAT zone). First-response time, by contrast, shows no CSAT relationship at all."
        action={{
          title: "Deploy AI-assisted resolution in chat",
          description:
            "Embed reply-drafting and customer-context retrieval (order status, refund eligibility, prior tickets) directly in the agent console. Target the 5.8-minute AHT gap between chat and phone.",
        }}
      />
    </section>
  );
}
