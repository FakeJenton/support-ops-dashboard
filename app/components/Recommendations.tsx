import SectionHeader from "./SectionHeader";

interface Rec {
  number: number;
  title: string;
  rationale: string;
  impact?: string;
}

const RECS: Rec[] = [
  {
    number: 1,
    title: "Re-architect chat closure to fix reopens",
    rationale:
      "Add a confirmation step before closing a chat ticket and route any reopen to the original or a senior agent rather than back into the queue.",
    impact: "Targets the 39.7% chat reopen rate.",
  },
  {
    number: 2,
    title: "Deflect wait-state issues to async channels",
    rationale:
      "Build an in-app refund tracker and delivery-status flow so customers don't open chat tickets that depend on external events agents can't trigger.",
    impact: "30% chat deflection saves ~510 agent-hours per quarter.",
  },
  {
    number: 3,
    title: "Deploy AI-assisted resolution in chat",
    rationale:
      "Embed reply-drafting and customer-context retrieval (order status, refund eligibility) directly in the agent console.",
    impact: "Targets the 5.8-minute AHT gap between chat and phone.",
  },
  {
    number: 4,
    title: "Route account and payment directly to tier 2",
    rationale:
      "These two categories generate 48% of all escalations from 33% of volume. A simple intent-classification step at intake bypasses first-touch chat.",
    impact: "Addresses ~48% of escalations with one workflow change.",
  },
  {
    number: 5,
    title: "Instrument agent_id, team, and tenure",
    rationale:
      "The dataset has no agent identifier, so individual variance is invisible. Until we capture it, channel and customer-mix variance can't be separated from agent variance.",
    impact: "Unlocks the next layer of analysis.",
  },
];

export default function Recommendations() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="Recommendations"
        title="What to do about it"
        subtitle="Five operational moves, ranked by leverage. Items 1 to 3 attack the chat workflow directly. Item 4 is a routing fix. Item 5 is the data prerequisite for everything that comes after."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {RECS.map((r) => (
          <div
            key={r.number}
            className="flex flex-col rounded-lg border border-[var(--card-border)] bg-white p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold tabular-nums text-[var(--red)]">
                {r.number.toString().padStart(2, "0")}
              </span>
              <h3 className="flex-1 text-base font-semibold leading-snug text-[var(--navy)]">
                {r.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {r.rationale}
            </p>
            {r.impact && (
              <div className="mt-4 rounded border border-dashed border-[var(--card-border)] bg-slate-50 px-3 py-2 text-xs text-slate-700">
                <span className="font-semibold text-[var(--navy)]">Impact:</span>{" "}
                {r.impact}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
