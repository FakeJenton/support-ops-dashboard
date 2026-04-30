"use client";

import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { COLORS, ISSUE_LABEL, data } from "../lib/data";
import SectionHeader from "./SectionHeader";

const COMPLEXITY = ["account", "payment"] as const;
const WAIT_STATE = ["delivery", "refund"] as const;

function bucketColor(issue: string): string {
  if ((COMPLEXITY as readonly string[]).includes(issue)) return COLORS.red;
  if ((WAIT_STATE as readonly string[]).includes(issue)) return COLORS.amber;
  return COLORS.gray;
}

function bucketLabel(issue: string): string {
  if ((COMPLEXITY as readonly string[]).includes(issue))
    return "Complexity issue";
  if ((WAIT_STATE as readonly string[]).includes(issue))
    return "Wait-state issue";
  return "Baseline";
}

const points = data.by_issue_type.map((row) => ({
  name: ISSUE_LABEL[row.issue_type],
  issue: row.issue_type,
  escalation: row.escalation,
  reopen: row.reopen,
  tickets: row.tickets,
  csat: row.csat,
  bucket: bucketLabel(row.issue_type),
  fill: bucketColor(row.issue_type),
}));

const overallEscalation = data.overview.overall_escalation;
const overallReopen = data.overview.overall_reopen;

interface TooltipPayload {
  payload?: (typeof points)[number];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-white p-3 text-xs shadow-md">
      <div className="font-semibold text-[var(--navy)]">{p.name}</div>
      <div className="mt-1 text-slate-500">{p.bucket}</div>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 tabular-nums text-slate-700">
        <span>Tickets</span>
        <span className="text-right">{p.tickets.toLocaleString()}</span>
        <span>Escalation</span>
        <span className="text-right">{p.escalation.toFixed(1)}%</span>
        <span>Reopen</span>
        <span className="text-right">{p.reopen.toFixed(1)}%</span>
        <span>CSAT</span>
        <span className="text-right">{p.csat.toFixed(1)}%</span>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COLORS.red }}
        />
        Complexity (account, payment) - escalate faster
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COLORS.amber }}
        />
        Wait-state (delivery, refund) - move off chat
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COLORS.gray }}
        />
        Baseline (login, other)
      </div>
    </div>
  );
}

export default function IssueQuadrant() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="Two Failure Modes"
        title="Issue type splits cleanly into two failure modes"
        subtitle="Escalation rate (x) maps complexity. Reopen rate (y) maps unresolved customer state. Account and payment cluster on the right (need tier 2 sooner). Delivery and refund cluster on top (need async, not synchronous chat)."
      />
      <div className="rounded-lg border border-[var(--card-border)] bg-white p-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 16, right: 32, bottom: 32, left: 16 }}>
              <CartesianGrid stroke="#F1F5F9" />
              <XAxis
                type="number"
                dataKey="escalation"
                domain={[4, 12]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 12, fill: "#64748B" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
                label={{
                  value: "Escalation rate",
                  position: "insideBottom",
                  offset: -8,
                  style: { fontSize: 12, fill: "#475569" },
                }}
              />
              <YAxis
                type="number"
                dataKey="reopen"
                domain={[12, 22]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 12, fill: "#64748B" }}
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
                label={{
                  value: "Reopen rate",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12, fill: "#475569" },
                }}
              />
              <ZAxis
                type="number"
                dataKey="tickets"
                range={[400, 1800]}
                name="Tickets"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={overallEscalation}
                stroke="#94A3B8"
                strokeDasharray="4 4"
                label={{
                  value: `Avg ${overallEscalation.toFixed(1)}%`,
                  position: "top",
                  fontSize: 10,
                  fill: "#64748B",
                }}
              />
              <ReferenceLine
                y={overallReopen}
                stroke="#94A3B8"
                strokeDasharray="4 4"
                label={{
                  value: `Avg ${overallReopen.toFixed(1)}%`,
                  position: "right",
                  fontSize: 10,
                  fill: "#64748B",
                }}
              />
              <Scatter data={points}>
                {points.map((p) => (
                  <Cell key={p.issue} fill={p.fill} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2">
          <Legend />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 sm:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.issue}
              className="flex items-center gap-2 rounded border border-[var(--card-border)] bg-slate-50 p-2"
            >
              <span
                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: p.fill }}
              />
              <span className="font-medium text-[var(--navy)]">{p.name}</span>
              <span className="ml-auto tabular-nums text-slate-500">
                esc {p.escalation.toFixed(1)}% / re {p.reopen.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
