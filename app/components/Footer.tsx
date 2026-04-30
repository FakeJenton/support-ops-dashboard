export default function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-7xl px-6 pb-10 sm:px-10">
      <div className="rounded-lg border border-[var(--card-border)] bg-white p-5 text-xs leading-relaxed text-slate-600">
        <div className="font-semibold uppercase tracking-wider text-slate-500">
          Data quality notes
        </div>
        <ul className="mt-2 space-y-1.5">
          <li>
            <span className="font-medium text-[var(--navy)]">No agent_id:</span>{" "}
            individual variance is not measurable in this dataset. Some of what
            looks like channel variance may be operator variance.
          </li>
          <li>
            <span className="font-medium text-[var(--navy)]">
              Reopens captured only on chat:
            </span>{" "}
            other channels show 0% reopen, which likely reflects an
            instrumentation gap rather than perfect resolution.
          </li>
          <li>
            <span className="font-medium text-[var(--navy)]">FRT and CSAT:</span>{" "}
            first-response time shows no relationship to CSAT across all
            buckets. Worth confirming the operational definition matches the
            SLA being measured.
          </li>
        </ul>
        <div className="mt-4 border-t border-[var(--card-border)] pt-3 text-slate-500">
          Q1 2026 Support Operations dashboard. 16,000 tickets across phone,
          email, social, and chat. A static analysis of synthetic ticket data
          built with Next.js, Tailwind, and Recharts.
        </div>
      </div>
    </footer>
  );
}
