"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CHANNEL_COLOR,
  CHANNEL_LABEL,
  CHANNEL_ORDER,
  COLORS,
  data,
} from "../lib/data";
import SectionHeader from "./SectionHeader";
import Takeaway from "./Takeaway";

const channels = CHANNEL_ORDER.map((c) => {
  const row = data.by_channel.find((r) => r.channel === c)!;
  return { ...row, label: CHANNEL_LABEL[c] };
});

interface PanelProps {
  title: string;
  unit?: string;
  dataKey: keyof (typeof channels)[number];
  formatter?: (value: number) => string;
  domainMax?: number;
}

function Panel({ title, dataKey, formatter, domainMax, unit }: PanelProps) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-white p-4">
      <div className="mb-1 flex items-baseline justify-between">
        <div className="text-sm font-semibold text-[var(--navy)]">{title}</div>
        {unit && <div className="text-xs text-slate-500">{unit}</div>}
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={channels}
            margin={{ top: 12, right: 8, bottom: 4, left: -12 }}
          >
            <CartesianGrid stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
              domain={domainMax ? [0, domainMax] : undefined}
              tickFormatter={(v: number) =>
                formatter ? formatter(v) : v.toString()
              }
            />
            <Tooltip
              cursor={{ fill: "rgba(15,23,42,0.04)" }}
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
            <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
              {channels.map((c) => (
                <Cell key={c.channel} fill={CHANNEL_COLOR[c.channel]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function ChannelScorecard() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="01 / The Headline"
        title="Chat underperforms on every dimension while carrying the most volume"
        subtitle="Four channels compared on CSAT, handle time, reopen rate, and volume share."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel
          title="CSAT"
          unit="% positive"
          dataKey="csat"
          formatter={(v) => `${v.toFixed(0)}%`}
          domainMax={100}
        />
        <Panel
          title="Average Handle Time"
          unit="minutes"
          dataKey="aht"
          formatter={(v) => v.toFixed(1)}
          domainMax={20}
        />
        <Panel
          title="Reopen Rate"
          unit="%"
          dataKey="reopen"
          formatter={(v) => `${v.toFixed(0)}%`}
          domainMax={50}
        />
        <Panel
          title="Volume Share"
          unit="% of tickets"
          dataKey="volume_pct"
          formatter={(v) => `${v.toFixed(0)}%`}
          domainMax={50}
        />
      </div>
      <div className="mt-4 rounded-lg border border-[var(--card-border)] bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-[var(--navy)]">
          Channel detail
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)] text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-4 font-medium">Channel</th>
                <th className="py-2 pr-4 text-right font-medium">Tickets</th>
                <th className="py-2 pr-4 text-right font-medium">Volume %</th>
                <th className="py-2 pr-4 text-right font-medium">CSAT %</th>
                <th className="py-2 pr-4 text-right font-medium">AHT (min)</th>
                <th className="py-2 pr-4 text-right font-medium">Reopen %</th>
                <th className="py-2 pr-2 text-right font-medium">% of cost</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {channels.map((c) => {
                const isChat = c.channel === "chat";
                const isPhone = c.channel === "phone";
                const rowClass = isChat
                  ? "bg-[#FCEFEC] text-[var(--red)] font-medium"
                  : isPhone
                  ? "bg-[#EAF7EF]"
                  : "";
                return (
                  <tr
                    key={c.channel}
                    className={`border-b border-[var(--card-border)] last:border-0 ${rowClass}`}
                  >
                    <td className="py-2 pr-4 font-medium">
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                        style={{ backgroundColor: CHANNEL_COLOR[c.channel] }}
                      />
                      {c.label}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums">
                      {c.tickets.toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums">
                      {c.volume_pct.toFixed(1)}%
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums">
                      {c.csat.toFixed(1)}%
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums">
                      {c.aht.toFixed(1)}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums">
                      {c.reopen.toFixed(1)}%
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums">
                      {c.cost_pct.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
        <span
          className="mt-1 inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: COLORS.red }}
        />
        Chat is highlighted to make the gap legible. Phone shaded for contrast.
        Cost % derived from total handle minutes per channel.
      </div>
      <Takeaway
        variant="alert"
        insight="Phone clears 87% CSAT. Chat clears 53%. Same period, same customers."
        implication="The 34-point spread is structural, not seasonal. Chat is the only channel with reopens, the longest handle time, and the most volume, all at once."
        action={{
          title: "Re-architect chat closure to fix reopens",
          description:
            "Add a 'did this fully resolve your issue?' confirmation step before close. Route any reopened ticket to the original agent or a senior agent, not back into the queue.",
        }}
      />
    </section>
  );
}
