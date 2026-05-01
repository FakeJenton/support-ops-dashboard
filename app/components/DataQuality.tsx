import SectionHeader from "./SectionHeader";
import Takeaway from "./Takeaway";

export default function DataQuality() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 sm:px-10">
      <SectionHeader
        eyebrow="What we can't see"
        title="Two instrumentation gaps cap further analysis"
        subtitle="Things this dataset cannot answer, and what to do about it."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--card-border)] bg-white p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Gap 1
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--navy)]">
            No agent_id field
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Some of what looks like channel variance may be operator variance.
            We cannot separate them without an agent identifier on each ticket.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--card-border)] bg-white p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Gap 2
          </div>
          <div className="mt-2 text-lg font-semibold text-[var(--navy)]">
            Reopens captured only on chat
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Phone, email, and social all show 0% reopen, which is almost
            certainly an instrumentation gap rather than perfect resolution.
          </p>
        </div>
      </div>
      <Takeaway
        variant="neutral"
        insight="Reliable channel comparisons require agent-level instrumentation."
        implication="Without agent_id, team, and tenure, we are at the ceiling of what this dataset can prove. The next layer of analysis (individual variance, training cohorts, tenure curves) is gated on capturing those fields."
        action={{
          title: "Instrument agent_id, team, and tenure on every ticket",
          description:
            "Add the three fields at ticket capture across all channels. Capture reopens uniformly across channels, not just chat. Backfill historical tickets where possible.",
        }}
      />
    </section>
  );
}
