"use client";

import {
  CHANNEL_LABEL,
  CHANNEL_ORDER,
  HeatmapCell,
  ISSUE_LABEL,
  ISSUE_ORDER,
  data,
} from "../lib/data";
import SectionHeader from "./SectionHeader";

function csatColor(csat: number): string {
  const min = 45;
  const mid = 65;
  const max = 90;
  if (csat <= min) return "#C0392B";
  if (csat <= mid) {
    const t = (csat - min) / (mid - min);
    return mix("#C0392B", "#F1C40F", t);
  }
  if (csat <= max) {
    const t = (csat - mid) / (max - mid);
    return mix("#F1C40F", "#1E8449", t);
  }
  return "#1E8449";
}

function mix(c1: string, c2: string, t: number): string {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function textColor(csat: number): string {
  return csat >= 60 && csat <= 78 ? "#1F2937" : "#FFFFFF";
}

function findCell(
  channel: string,
  issue: string
): HeatmapCell | undefined {
  return data.channel_issue_heatmap.find(
    (c) => c.channel === channel && c.issue_type === issue
  );
}

export default function ChannelIssueHeatmap() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="Channel x Issue"
        title="CSAT by channel and issue type"
        subtitle="Phone clears 85% across every issue. Chat sits below 60% on every issue. The channel choice dominates the issue type entirely."
      />
      <div className="rounded-lg border border-[var(--card-border)] bg-white p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-28 py-2 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Channel
                </th>
                {ISSUE_ORDER.map((issue) => (
                  <th
                    key={issue}
                    className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {ISSUE_LABEL[issue]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHANNEL_ORDER.map((ch) => (
                <tr key={ch}>
                  <td className="py-1.5 pr-3 text-sm font-medium text-[var(--navy)]">
                    {CHANNEL_LABEL[ch]}
                  </td>
                  {ISSUE_ORDER.map((issue) => {
                    const cell = findCell(ch, issue);
                    if (!cell) return <td key={issue} />;
                    const bg = csatColor(cell.csat);
                    const fg = textColor(cell.csat);
                    return (
                      <td key={issue} className="px-1 py-1">
                        <div
                          className="group relative rounded p-2 text-center transition hover:scale-[1.02]"
                          style={{ backgroundColor: bg, color: fg }}
                          title={`${cell.tickets.toLocaleString()} tickets - AHT ${cell.aht.toFixed(
                            1
                          )} min - reopen ${cell.reopen.toFixed(1)}%`}
                        >
                          <div className="text-base font-semibold tabular-nums">
                            {cell.csat.toFixed(0)}%
                          </div>
                          <div className="text-[10px] tabular-nums opacity-90">
                            {cell.tickets.toLocaleString()}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div>Hover or tap a cell for AHT and reopen detail.</div>
          <div className="flex items-center gap-2">
            <span>50%</span>
            <span
              className="inline-block h-3 w-32 rounded"
              style={{
                background:
                  "linear-gradient(to right, #C0392B, #F1C40F, #1E8449)",
              }}
            />
            <span>90%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
