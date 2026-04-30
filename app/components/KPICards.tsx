import { data } from "../lib/data";

interface KpiProps {
  label: string;
  value: string;
  subtext?: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}

function csatTone(value: number): KpiProps["tone"] {
  if (value >= 70) return "good";
  if (value >= 60) return "warn";
  return "bad";
}

function toneClass(tone: KpiProps["tone"]) {
  switch (tone) {
    case "good":
      return "text-[var(--green)]";
    case "warn":
      return "text-[#B7791F]";
    case "bad":
      return "text-[var(--red)]";
    default:
      return "text-[var(--navy)]";
  }
}

function Card({ label, value, subtext, tone = "neutral" }: KpiProps) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className={`mt-2 text-3xl font-semibold ${toneClass(tone)}`}>
        {value}
      </div>
      {subtext && (
        <div className="mt-1 text-xs text-slate-500">{subtext}</div>
      )}
    </div>
  );
}

export default function KPICards() {
  const o = data.overview;
  const totalHours = Math.round(o.total_handle_minutes / 60);
  return (
    <section className="mx-auto max-w-7xl px-6 pt-8 sm:px-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card
          label="Total Tickets"
          value={o.total_tickets.toLocaleString()}
          subtext={`${totalHours.toLocaleString()} agent-hours of handle time`}
        />
        <Card
          label="Overall CSAT"
          value={`${o.overall_csat.toFixed(1)}%`}
          subtext="Tickets rated 4-5 / 5"
          tone={csatTone(o.overall_csat)}
        />
        <Card
          label="Avg Handle Time"
          value={`${o.overall_aht.toFixed(1)} min`}
          subtext="Per ticket, all channels"
        />
        <Card
          label="Reopen Rate"
          value={`${o.overall_reopen.toFixed(1)}%`}
          subtext="Concentrated entirely in chat"
          tone="bad"
        />
      </div>
    </section>
  );
}
